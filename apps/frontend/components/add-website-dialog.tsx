"use client";

import type React from "react";

import { useState, useTransition } from "react";
import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { API_BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { useWebsites } from "@/hooks/useWebsite";

export function AddWebsiteDialog() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const { getToken } = useAuth();
  const { refreshWebsites } = useWebsites();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setUrlError("");

    // Validate inputs
    let isValid = true;
    if (!url.trim()) {
      setUrlError("URL is required");
      isValid = false;
    } else {
      // Basic URL validation
      // Remove http:// or https:// for simplicity
      const cleanUrl = url.replace(/^https?:\/\//, "");
      if (
        !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/.test(
          cleanUrl
        )
      ) {
        setUrlError("Please enter a valid URL");
        isValid = false;
      }
    }

    if (isValid) {
      startTransition(async () => {
        try {
          console.log("url is ", url);
          const token = await getToken();
          const response = await axios.post(
            `${API_BACKEND_URL}/api/v1/website`,
            { url },
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          console.log("Response is", response);
          refreshWebsites();
          toast.success("Website added successfully");
          setUrl("");
          setOpen(false);
          //   setUrl("");
          //   setOpen(false);
        } catch (error) {
          console.error("error adding website", error);
          toast.error("Error adding website. Please try again later.");
        }
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hover:cursor-pointer" variant={"secondary"}>
          Add Website
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Website to Monitor</DialogTitle>
          <DialogDescription>
            Enter the details of the website you want to monitor for uptime.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Input
                id="url"
                placeholder="example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={urlError ? "border-red-500" : ""}
              />
            </div>
            {urlError && <p className="text-xs text-red-500">{urlError}</p>}
            <p className="text-xs text-muted-foreground">
              Enter the domain without http:// or https://
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {isPending ? "Loading..." : "Add Website"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
