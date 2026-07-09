"use client";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/admin";

let browserClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseBrowser() {
  if (browserClient) {
    return browserClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) {
    throw new Error(
      "Missing public env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    );
  }

  browserClient = createClient<Database>(supabaseUrl, publishableKey);
  return browserClient;
}
