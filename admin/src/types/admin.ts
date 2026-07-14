export type ProductStatus = "published" | "draft";

export type ProductRecord = {
  id: string;
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
  created_at: string;
  updated_at: string;
};

export type MessageStatus = "new" | "contacted" | "archived";

export type LeadMessageRecord = {
  id: string;
  lead_type: "账号上架" | "求购" | "客服" | "类型2";
  contact_name: string;
  contact_value: string;
  remark: string | null;
  current_assets: string | null;
  coin_only: string | null;
  aw: string | null;
  knife_skin: string | null;
  status: MessageStatus;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      products: {
        Row: ProductRecord;
        Insert: Omit<ProductRecord, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<ProductRecord, "id" | "created_at">> & {
          id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      lead_messages: {
        Row: LeadMessageRecord;
        Insert: Omit<LeadMessageRecord, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<LeadMessageRecord, "id" | "created_at">> & {
          id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
  };
};
