// import { WebsiteStatus } from "";

import { WebsiteStatus, WebsiteTick, WebsiteWithTicks } from "db/client";

// Define the new uptime status type
export type UptimeStatus = "good" | "bad" | "unknown";
// Define the processed website type that our components expect
export interface ProcessedWebsite {
  id: string;
  name: string;
  url: string;
  status: UptimeStatus;
  uptime: string;
  responseTime: string;
  lastChecked: string;
  history: UptimeStatus[];
}
// Helper function to map raw tick status to our UptimeStatus
function mapTickStatus(status: WebsiteStatus): UptimeStatus {
  if (status === "GOOD") return "good";
  if (status === "BAD") return "bad";
  return "unknown";
}

/**
 * Processes raw website data from the API into the format needed by our components
 * Aggregates ticks into 3-minute windows
 */
export function processWebsiteData(
  websites: WebsiteWithTicks[]
): ProcessedWebsite[] {
  console.log("raw websites recived inside process", websites);

  return websites.map((website) => {
    // Sort ticks by createdAt in descending order (newest first)
    const sortedTicks = [...website.ticks].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const currentStatus =
      sortedTicks.length > 0 ? mapTickStatus(sortedTicks[0].status) : "unknown"; // Default to unknown if no ticks

    // Calculate average response time
    const avgResponseTime =
      sortedTicks.length > 0
        ? Math.round(
            sortedTicks.reduce((sum, tick) => sum + tick.latency, 0) /
              sortedTicks.length
          )
        : 0;

    const goodTicks = sortedTicks.filter(
      (tick) => tick.status === "GOOD"
    ).length;

    const uptimePercentage =
      sortedTicks.length > 0
        ? ((goodTicks / sortedTicks.length) * 100).toFixed(2)
        : "unknown";

    // Get the last checked time
    const lastChecked =
      sortedTicks.length > 0
        ? formatTimeAgo(new Date(sortedTicks[0].createdAt))
        : "Never";

    // Aggregate ticks into 3-minute windows
    const aggregatedHistory = simpleAggregateTicks(sortedTicks, 3, 10);

    console.log("aggregrated history is ", aggregatedHistory);

    return {
      id: website.id,
      name: extractDomainName(website.url), // Extract a name from the URL
      url: website.url,
      status: currentStatus,
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
function simpleAggregateTicks(
  ticks: WebsiteTick[],
  minutesPerWindow: number,
  maxWindows: number
): Array<"good" | "bad" | "unknown"> {
  // Sort ticks descending by date (newest first)
  const sortedTicks = [...ticks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const now = Date.now();
  const windowResults: Array<"good" | "bad" | "unknown"> = [];

  for (let i = 0; i < maxWindows; i++) {
    const windowEnd = new Date(now - i * minutesPerWindow * 60_000);
    const windowStart = new Date(now - (i + 1) * minutesPerWindow * 60_000);

    // Collect ticks that fall into this window
    const windowTicks = sortedTicks.filter((tick) => {
      const tickTime = new Date(tick.createdAt).getTime();
      return (
        tickTime <= windowEnd.getTime() && tickTime > windowStart.getTime()
      );
    });

    // Decide the status of this window
    if (windowTicks.some((t) => t.status === "BAD")) {
      windowResults.push("bad");
    } else if (windowTicks.some((t) => t.status === "GOOD")) {
      windowResults.push("good");
    } else {
      windowResults.push("unknown");
    }
  }

  // This array is from newest to oldest (i=0 is the newest window).
  return windowResults;
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
