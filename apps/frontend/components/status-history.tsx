import { UptimeStatus } from "@/lib/process-website-data";
import { cn } from "@/lib/utils";

interface StatusHistoryProps {
  history: UptimeStatus[];
  className?: string;
}

export function StatusHistory({ history, className }: StatusHistoryProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex w-full gap-1">
        {history.map((status, index) => (
          <div
            key={index}
            className={cn(
              "h-8 flex-1 rounded-sm",
              status === "good"
                ? "bg-green-500 dark:bg-green-600"
                : status === "bad"
                  ? "bg-red-500 dark:bg-red-600"
                  : "bg-gray-500 dark:bg-gray-600"
            )}
            title={status ? "Operational" : "Service disruption"}
          />
        ))}
      </div>
    </div>
  );
}
