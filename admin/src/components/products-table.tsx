"use client";

import Image from "next/image";
import { useState, useTransition } from "react";

import type { ProductRecord, ProductStatus } from "@/types/admin";

import { formatDateTime } from "@/lib/format";
import { StatusPill } from "@/components/status-pill";

export function ProductsTable({ initialProducts }: { initialProducts: ProductRecord[] }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [products, setProducts] = useState(initialProducts);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (product: ProductRecord) => {
    const nextStatus: ProductStatus = product.status === "published" ? "draft" : "published";
    setPendingId(product.id);

    startTransition(async () => {
      const response = await fetch(`${basePath}/api/products`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id, status: nextStatus }),
      });

      if (!response.ok) {
        setPendingId(null);
        return;
      }

      const nextProduct = (await response.json()) as ProductRecord;
      setProducts((current) => current.map((item) => (item.id === nextProduct.id ? nextProduct : item)));
      setPendingId(null);
    });
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/92 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
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
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => handleToggle(product)}
                      className="rounded-full bg-[#0f4c81] px-4 py-2 text-[13px] font-semibold text-white disabled:opacity-50"
                    >
                      {disabled ? "处理中..." : product.status === "published" ? "下架" : "上架"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
