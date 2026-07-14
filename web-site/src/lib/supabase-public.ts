import type { LeadType, ProductCard, ProductDetail } from "@/types/mddjclub";

type ProductRow = {
  id: string;
  source_product_id: string | null;
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
  status: "published" | "draft";
  created_at: string;
  updated_at: string;
};

type LeadInsertPayload = {
  contactName: string;
  contactValue: string;
  leadType: LeadType;
  remark: string;
  aw?: string;
  coinOnly?: string;
  currentAssets?: string;
  knifeSkin?: string;
};

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Missing public env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    );
  }

  return { publishableKey, url };
}

function getSupabaseHeaders(contentType = false) {
  const { publishableKey } = getSupabaseConfig();

  return {
    apikey: publishableKey,
    Authorization: `Bearer ${publishableKey}`,
    ...(contentType ? { "Content-Type": "application/json" } : {}),
  };
}

function buildDiscount(price: number, originalPrice: number) {
  if (!price || !originalPrice) {
    return "特价";
  }

  const value = ((price / originalPrice) * 10).toFixed(1).replace(/\.0$/, "");
  return `${value}折`;
}

function formatMoney(value: number) {
  return value.toFixed(2);
}

function mapRowToCard(row: ProductRow): ProductCard {
  return {
    id: row.source_product_id || row.id,
    image: row.image_url,
    title: row.title,
    discount: buildDiscount(row.price, row.original_price),
    tags: row.tags ?? [],
    ratio: formatMoney(row.ratio),
    deposit: formatMoney(row.deposit),
    rent: row.rent,
    weapon: row.weapon,
    price: formatMoney(row.price),
    originalPrice: formatMoney(row.original_price),
    seller: row.seller ?? undefined,
  };
}

function buildDetailSections(row: ProductRow) {
  return [
    {
      title: "基础信息",
      items: [
        { label: "产品标题", value: row.title },
        { label: "来源产品ID", value: row.source_product_id || "-" },
        { label: "租期", value: row.rent || "-" },
        { label: "武器信息", value: row.weapon || "-" },
      ],
    },
    {
      title: "价格与卖家",
      items: [
        { label: "售价", value: formatMoney(row.price) },
        { label: "原价", value: formatMoney(row.original_price) },
        { label: "押金", value: formatMoney(row.deposit) },
        { label: "比例", value: formatMoney(row.ratio) },
        { label: "卖家", value: row.seller || "平台商家" },
        { label: "标签", value: (row.tags ?? []).join(" / ") || "-" },
      ],
    },
  ];
}

export async function fetchPublishedProductCards() {
  const { url } = getSupabaseConfig();
  const response = await fetch(
    `${url}/rest/v1/products?select=*&status=eq.published&order=updated_at.desc`,
    {
      cache: "no-store",
      headers: getSupabaseHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const rows = (await response.json()) as ProductRow[];
  return rows.map(mapRowToCard);
}

async function fetchPublishedProductRowByField(field: "id" | "source_product_id", value: string) {
  const { url } = getSupabaseConfig();
  const query = new URLSearchParams({
    select: "*",
    status: "eq.published",
    [field]: `eq.${value}`,
    limit: "1",
  });

  const response = await fetch(`${url}/rest/v1/products?${query.toString()}`, {
    cache: "no-store",
    headers: getSupabaseHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product detail");
  }

  const rows = (await response.json()) as ProductRow[];
  return rows[0] ?? null;
}

export async function fetchPublishedProductDetailById(id: string): Promise<ProductDetail | null> {
  const row =
    (await fetchPublishedProductRowByField("source_product_id", id)) ??
    (await fetchPublishedProductRowByField("id", id));

  if (!row) {
    return null;
  }

  const card = mapRowToCard(row);

  return {
    ...card,
    actionLabel: "立即联系",
    detailSections: buildDetailSections(row),
    gallery: [row.image_url],
    lastVisitor: "后台实时同步",
  };
}

export async function createLeadMessage(payload: LeadInsertPayload) {
  const { url } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/lead_messages`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(true),
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      contact_name: payload.contactName,
      contact_value: payload.contactValue,
      lead_type: payload.leadType,
      remark: payload.remark || null,
      current_assets: payload.currentAssets?.trim() || null,
      coin_only: payload.coinOnly?.trim() || null,
      aw: payload.aw?.trim() || null,
      knife_skin: payload.knifeSkin?.trim() || null,
      status: "new",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create lead message");
  }

  return response.json();
}
