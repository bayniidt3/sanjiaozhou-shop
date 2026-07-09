import { hasServerEnv } from "@/lib/env";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { LeadMessageRecord, MessageStatus, ProductRecord, ProductStatus } from "@/types/admin";

export async function listProducts() {
  if (!hasServerEnv()) {
    return [];
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("products").select("*").order("updated_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as ProductRecord[];
}

export async function updateProductStatus(id: string, status: ProductStatus) {
  if (!hasServerEnv()) {
    throw new Error("Missing server env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY");
  }

  const supabase = getSupabaseAdmin();
  const updates = { status, updated_at: new Date().toISOString() };
  const { data, error } = await supabase
    .from("products")
    .update(updates as never)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as ProductRecord;
}

export async function listMessages() {
  if (!hasServerEnv()) {
    return [];
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("lead_messages").select("*").order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as LeadMessageRecord[];
}

export async function updateMessageStatus(id: string, status: MessageStatus) {
  if (!hasServerEnv()) {
    throw new Error("Missing server env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY");
  }

  const supabase = getSupabaseAdmin();
  const updates = { status, updated_at: new Date().toISOString() };
  const { data, error } = await supabase
    .from("lead_messages")
    .update(updates as never)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as LeadMessageRecord;
}
