// Define the types based on the hook data structure
interface RawWebsite {
  id: string;
  url: string;
  ticks: {
    id: string;
    createdAt: string;
    status: string;
    latency: number;
  }[];
}

// Define the processed website type that our components expect
export interface ProcessedWebsite {
  id: string;
  name: string;
  url: string;
  status: "up" | "down";
  uptime: string;
  responseTime: string;
  lastChecked: string;
  history: boolean[];
}

/**
 * Processes raw website data from the API into the format needed by our components
 * Aggregates ticks into 3-minute windows
 */
export function processWebsiteData(websites: RawWebsite[]): ProcessedWebsite[] {
  return websites.map((website) => {
    // Sort ticks by createdAt in descending order (newest first)
    const sortedTicks = [...website.ticks].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Get the current status from the most recent tick
    const currentStatus =
      sortedTicks.length > 0
        ? sortedTicks[0].status === "up"
          ? "up"
          : "down"
        : "up"; // Default to up if no ticks

    // Calculate average response time
    const avgResponseTime =
      sortedTicks.length > 0
        ? Math.round(
            sortedTicks.reduce((sum, tick) => sum + tick.latency, 0) /
              sortedTicks.length
          )
        : 0;

    // Calculate uptime percentage
    const upTicks = sortedTicks.filter((tick) => tick.status === "up").length;
    const uptimePercentage =
      sortedTicks.length > 0
        ? ((upTicks / sortedTicks.length) * 100).toFixed(2)
        : "100.00";

    // Get the last checked time
    const lastChecked =
      sortedTicks.length > 0
        ? formatTimeAgo(new Date(sortedTicks[0].createdAt))
        : "Never";

    // Aggregate ticks into 3-minute windows
    const aggregatedHistory = aggregateTicksIntoWindows(sortedTicks, 3, 10);

    return {
      id: website.id,
      name: extractDomainName(website.url), // Extract a name from the URL
      url: website.url,
      status: currentStatus as "up" | "down",
      uptime: `${uptimePercentage}%`,
      responseTime: `${avgResponseTime}ms`,
      lastChecked,
      history: aggregatedHistory,
    };
  });
}

/**
 * Aggregates ticks into time windows of specified minutes
 * Returns an array of boolean values indicating if all ticks in each window were up
 */
function aggregateTicksIntoWindows(
  ticks: { createdAt: string; status: string }[],
  minutesPerWindow: number,
  maxWindows: number
): boolean[] {
  if (ticks.length === 0) {
    return Array(maxWindows).fill(true); // Default to all up if no ticks
  }

  // Create a map to store the status for each time window
  const windowMap = new Map<number, boolean>();

  // Get the current time and calculate the start time for the oldest window
  const now = new Date();
  const oldestWindowStart = new Date(
    now.getTime() - minutesPerWindow * maxWindows * 60 * 1000
  );

  // Initialize all windows as up (true)
  for (let i = 0; i < maxWindows; i++) {
    const windowStart = new Date(
      now.getTime() - minutesPerWindow * (i + 1) * 60 * 1000
    );
    const windowIndex = Math.floor(
      windowStart.getTime() / (minutesPerWindow * 60 * 1000)
    );
    windowMap.set(windowIndex, true);
  }

  // Process each tick
  ticks.forEach((tick) => {
    const tickTime = new Date(tick.createdAt);

    // Skip ticks older than our oldest window
    if (tickTime < oldestWindowStart) {
      return;
    }

    // Calculate which window this tick belongs to
    const windowIndex = Math.floor(
      tickTime.getTime() / (minutesPerWindow * 60 * 1000)
    );

    // If any tick in a window is down, mark the whole window as down
    if (tick.status !== "up" && windowMap.has(windowIndex)) {
      windowMap.set(windowIndex, false);
    }
  });

  // Convert the map to an array of boolean values
  const result: boolean[] = [];
  const windowIndices = Array.from(windowMap.keys()).sort((a, b) => b - a); // Sort newest first

  // Take only the most recent windows up to maxWindows
  for (let i = 0; i < Math.min(windowIndices.length, maxWindows); i++) {
    result.push(windowMap.get(windowIndices[i]) || false);
  }

  // Pad with true values if we don't have enough windows
  while (result.length < maxWindows) {
    result.push(true);
  }

  return result;
}

/**
 * Extracts a domain name from a URL to use as a website name
 */
function extractDomainName(url: string): string {
  // Remove protocol if present
  let domain = url.replace(/^https?:\/\//, "");

  // Remove path, query, etc.
  domain = domain.split("/")[0];

  // Remove www. if present
  domain = domain.replace(/^www\./, "");

  return domain;
}

/**
 * Formats a date as a relative time string (e.g., "2 minutes ago")
 */
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
}
