"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import useSwr from "swr";
import { API_BACKEND_URL } from "@/config";
import { WebsiteWithTicks } from "db/client";

export function useWebsites() {
  const { getToken } = useAuth();

  // Define a fetcher that gets the token and makes an authorized request
  const fetcher = async (url: string) => {
    const token = await getToken();
    return axios
      .get(url, { headers: { Authorization: token } })
      .then((res) => res.data);
  };

  // Use SWR at the top level of the hook
  const { data, error, isValidating, mutate } = useSwr<WebsiteWithTicks[]>(
    `${API_BACKEND_URL}/api/v1/websites`,
    fetcher,
    {
      // Refresh the data every minute
      refreshInterval: 1000 * 60,
    }
  );

  // Set websites to the fetched data or default to an empty array
  const websites = data || [];

  return {
    websites,
    error,
    isLoading: !data && !error,
    refreshWebsites: mutate,
    isValidating,
  };
}
