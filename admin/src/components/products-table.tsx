"use client";

import Image from "next/image";
import { useEffect, useState, useTransition } from "react";

import type { ProductRecord, ProductStatus } from "@/types/admin";

import { formatDateTime } from "@/lib/format";
import { ProductFormDialog } from "@/components/product-form-dialog";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { StatusPill } from "@/components/status-pill";

export function ProductsTable({ initialProducts, loading = false }: { initialProducts: ProductRecord[]; loading?: boolean }) {
  const [products, setProducts] = useState(initialProducts);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductRecord | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleToggle = (product: ProductRecord) => {
    const nextStatus: ProductStatus = product.status === "published" ? "draft" : "published";
    setPendingId(product.id);

    startTransition(async () => {
      const supabase = getSupabaseBrowser();
      const { data, error } = await supabase
        .from("products")
        .update({ status: nextStatus, updated_at: new Date().toISOString() } as never)
        .eq("id", product.id)
        .select("*")
        .single();

      if (error || !data) {
        setPendingId(null);
        return;
      }

      const nextProduct = data as ProductRecord;
      setProducts((current) => current.map((item) => (item.id === nextProduct.id ? nextProduct : item)));
      setPendingId(null);
    });
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("确认删除这个产品吗？删除后无法恢复。");

    if (!confirmed) {
      return;
    }

    setPendingId(id);

    startTransition(async () => {
      const supabase = getSupabaseBrowser();
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (!error) {
        setProducts((current) => current.filter((item) => item.id !== id));
      }

      setPendingId(null);
    });
  };

  const handleSubmit = (payload: Record<string, unknown>) => {
    startTransition(async () => {
      const supabase = getSupabaseBrowser();
      const query = editingProduct
        ? supabase.from("products").update({ ...payload, updated_at: new Date().toISOString() } as never).eq("id", editingProduct.id)
        : supabase.from("products").insert({ ...payload, updated_at: new Date().toISOString() } as never);
      const { data, error } = await query.select("*").single();

      if (error || !data) {
        return;
      }

      const savedProduct = data as ProductRecord;
      setProducts((current) =>
        editingProduct ? current.map((item) => (item.id === savedProduct.id ? savedProduct : item)) : [savedProduct, ...current],
      );
      setDialogOpen(false);
      setEditingProduct(null);
    });
  };

  return (
    <>
      <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/92 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between border-b border-[#eef2f6] px-6 py-5">
          <div className="text-[15px] font-semibold text-[#10243c]">产品列表</div>
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setDialogOpen(true);
            }}
            className="rounded-full bg-[#0f4c81] px-4 py-2 text-[13px] font-semibold text-white"
          >
            新增产品
          </button>
        </div>
        <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-[#f6f9fc] text-[13px] uppercase tracking-[0.16em] text-[#7b8aa1]">
            <tr>
              <th className="px-6 py-4 font-medium">产品</th>
              <th className="px-4 py-4 font-medium">售价</th>
              <th className="px-4 py-4 font-medium">押金</th>
              <th className="px-4 py-4 font-medium">状态</th>
              <th className="px-4 py-4 font-medium">更新时间</th>
              <th className="px-6 py-4 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-[#7b8aa1]">
                  正在加载产品数据...
                </td>
              </tr>
            ) : null}
            {products.map((product) => {
              const disabled = isPending && pendingId === product.id;

              return (
                <tr key={product.id} className="border-t border-[#eef2f6] text-[14px] text-[#23364d]">
                  <td className="px-6 py-4">
                    <div className="flex min-w-[280px] items-center gap-4">
                      <Image
                        src={product.image_url}
                        alt={product.title}
                        width={96}
                        height={64}
                        unoptimized
                        className="h-16 w-24 rounded-[16px] object-cover"
                      />
                      <div>
                        <div className="font-semibold">{product.title}</div>
                        <div className="mt-1 text-[12px] text-[#7b8aa1]">来源ID：{product.source_product_id || "-"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">￥{product.price}</td>
                  <td className="px-4 py-4">￥{product.deposit}</td>
                  <td className="px-4 py-4">
                    <StatusPill tone={product.status === "published" ? "success" : "warning"}>
                      {product.status === "published" ? "已上架" : "已下架"}
                    </StatusPill>
                  </td>
                  <td className="px-4 py-4 text-[#6d7c92]">{formatDateTime(product.updated_at)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(product);
                          setDialogOpen(true);
                        }}
                        className="rounded-full border border-[#dbe5ee] px-4 py-2 text-[13px] font-semibold text-[#4a5b71]"
                      >
                        编辑
                      </button>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => handleToggle(product)}
                        className="rounded-full bg-[#0f4c81] px-4 py-2 text-[13px] font-semibold text-white disabled:opacity-50"
                      >
                        {disabled ? "处理中..." : product.status === "published" ? "下架" : "上架"}
                      </button>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => handleDelete(product.id)}
                        className="rounded-full border border-[#f0c2c2] px-4 py-2 text-[13px] font-semibold text-[#b24b4b] disabled:opacity-50"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>
      <ProductFormDialog
        key={editingProduct?.id || "new-product"}
        open={dialogOpen}
        product={editingProduct}
        submitting={isPending}
        onClose={() => {
          setDialogOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
}
