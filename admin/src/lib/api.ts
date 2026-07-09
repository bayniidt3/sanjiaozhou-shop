import { getSupabaseAdmin } from "@/lib/supabase";
import type { LeadMessageRecord, MessageStatus, ProductRecord, ProductStatus } from "@/types/admin";

type ProductMutationInput = {
  title: string;
  image_url: string;
  tags: string[];
  price: number;
  original_price: number;
  deposit: number;
  rent: string;
  ratio: number;
  weapon: string;
  seller: string | null;
  source_product_id: string | null;
  status: ProductStatus;
};

export async function listProducts() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("products").select("*").order("updated_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as ProductRecord[];
}

export async function updateProductStatus(id: string, status: ProductStatus) {
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

export async function createProduct(input: ProductMutationInput) {
  const supabase = getSupabaseAdmin();
  const payload = {
    ...input,
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase.from("products").insert(payload as never).select("*").single();

  if (error) {
    throw error;
  }

  return data as ProductRecord;
}

export async function updateProduct(id: string, input: ProductMutationInput) {
  const supabase = getSupabaseAdmin();
  const payload = {
    ...input,
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase
    .from("products")
    .update(payload as never)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as ProductRecord;
}

export async function deleteProduct(id: string) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw error;
  }
}

export async function listMessages() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("lead_messages").select("*").order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as LeadMessageRecord[];
}

export async function updateMessageStatus(id: string, status: MessageStatus) {
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
