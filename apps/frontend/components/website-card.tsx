"use client";

import Link from "next/link";
import { CheckCircle, Clock, Globe, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { StatusHistory } from "@/components/status-history";
import { ProcessedWebsite } from "@/lib/process-website-data";

interface WebsiteCardProps {
  website: ProcessedWebsite;
  onTestNow?: (websiteId: string) => void;
  onViewDetails?: (websiteId: string) => void;
}

export function WebsiteCard({
  website,
  onTestNow,
  onViewDetails,
}: WebsiteCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div
            className={cn(
              "h-3 w-3 rounded-full",
              website.status === "good" ? "bg-green-500" : "bg-red-500"
            )}
          />
          <CardTitle className="text-lg">{website.name}</CardTitle>
        </div>
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            website.status === "good"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          )}
        >
          {website.status === "good" ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <XCircle className="h-5 w-5" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <Globe className="mr-1 h-4 w-4" />
          <Link
            href={`https://${website.url}`}
            target="_blank"
            className="hover:underline"
          >
            {website.url}
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Uptime</p>
            <p className="font-medium">{website.uptime}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Response</p>
            <p className="font-medium">{website.responseTime}</p>
          </div>
        </div>
      </CardContent>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="history" className="border-0">
          <AccordionTrigger className="px-6 py-2 text-sm font-medium">
            Last 30 minutes
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <StatusHistory history={website.history} />
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              Last checked {website.lastChecked}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <div className="flex w-full items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails?.(website.id)}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onTestNow?.(website.id)}
          >
            Test Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
