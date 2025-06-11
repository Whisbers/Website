// hooks/useReleases.ts
import { useEffect, useState } from "react";

export interface Release {
  tag_name: string;
  name: string;
  body: string;
  html_url: string;
  assets: {
    name: string;
    browser_download_url: string;
  }[];
  published_at: string;
}

export function useReleases() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Use the Supabase Edge Function proxy instead of direct GitHub API call
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/github-releases`;
    
    fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Ensure data is an array
        if (Array.isArray(data)) {
          setReleases(data);
          setError(null);
        } else {
          // If data is not an array (e.g., error response), set empty array
          setReleases([]);
          setError(data.message || "Failed to fetch releases");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching releases:", err);
        setReleases([]);
        setError(err.message || "Failed to fetch releases");
        setLoading(false);
      });
  }, []);

  return { releases, loading, error };
}