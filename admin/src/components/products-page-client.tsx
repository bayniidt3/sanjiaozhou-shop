"use client";

import { useEffect, useState } from "react";
import { ProductsTable } from "@/components/products-table";
import { SummaryCard } from "@/components/summary-card";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import type { ProductRecord } from "@/types/admin";

export function ProductsPageClient() {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const supabase = getSupabaseBrowser();
        const { data, error: queryError } = await supabase
          .from("products")
          .select("*")
          .order("updated_at", { ascending: false });

        if (queryError) {
          throw queryError;
        }

        setProducts((data ?? []) as ProductRecord[]);
      } catch (loadError) {
        setError((loadError as Error).message);
      } finally {
        setLoading(false);
      }
    };

    void loadProducts();
  }, []);

  const publishedCount = products.filter((item) => item.status === "published").length;

  return (
    <section className="space-y-5">
      <div className="rounded-[32px] border border-white/70 bg-white/66 p-6 shadow-[0_28px_70px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[14px] uppercase tracking-[0.28em] text-[#73839b]">Products</div>
            <h1 className="mt-3 text-[34px] font-semibold text-[#10243c]">产品管理</h1>
            <p className="mt-2 max-w-[680px] text-[15px] leading-7 text-[#5f7087]">
              支持新增、编辑、删除、上架和下架产品。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SummaryCard label="总产品数" value={products.length} accent="#0f4c81" />
            <SummaryCard label="已上架" value={publishedCount} accent="#f4c76b" />
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-[32px] border border-[#f2c7c7] bg-white/80 p-6 text-[#6d4c4c] shadow-[0_28px_70px_rgba(15,23,42,0.08)]">
          {error}
        </div>
      ) : (
        <ProductsTable initialProducts={products} loading={loading} />
      )}
    </section>
  );
}
