"use client";

import { AddWebsiteDialog } from "@/components/add-website-dialog";
import { WebsiteCard } from "@/components/website-card";
import { useWebsites } from "@/hooks/useWebsite";
import { processWebsiteData } from "@/lib/process-website-data";
import React from "react";

const Dashboard = () => {
  const { websites: websitesData } = useWebsites();

  console.log("websites received from backend", websitesData);

  const websites = processWebsiteData(websitesData);
  console.log("processed websites are", websites);
  //   const handleAddWebsite = (name: string, url: string) => {
  //     console.log(`Adding website: ${name} (${url})`);
  //   };

  const handleTestNow = (websiteId: string) => {
    // In a real app, you would trigger a test for this website
    console.log(`Testing website with ID: ${websiteId}`);
  };

  const handleViewDetails = (websiteId: string) => {
    // In a real app, you would navigate to a details page
    console.log(`Viewing details for website with ID: ${websiteId}`);
  };

  return (
    <div className="container mx-auto mt-4 max-w-lg">
      <div className="flex justify-between items-center mb-4">
        <h2>Dashboard Page</h2>
        <AddWebsiteDialog />
      </div>
      <div>
        {websites.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">
              No websites to monitor yet. Add your first website to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {websites.map((website) => (
              <WebsiteCard
                key={website.id}
                website={website}
                onTestNow={handleTestNow}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
