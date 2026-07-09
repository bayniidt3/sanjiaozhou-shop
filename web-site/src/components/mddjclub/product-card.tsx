import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";

import type { ProductCard as ProductCardType } from "@/types/mddjclub";

type ProductCardProps = {
  product: ProductCardType;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-[12px] border border-[#e9eef6] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="relative">
        <img src={product.image} alt={product.title} className="aspect-[1.17] w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-[#2d303d] px-2.5 py-1 text-[12px] font-semibold text-white">
          普通+自营
        </span>
        {product.badge ? (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white">
            {product.badge}
          </span>
        ) : null}
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#4da2ff] px-2 py-0.5 text-[12px] font-semibold text-white">
            {product.discount}
          </span>
          <h3 className="line-clamp-1 text-[16px] font-semibold text-[#333]">{product.title}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#cfe5ff] bg-[#f5fbff] px-2 py-0.5 text-[11px] font-medium text-[#5b9df7]"
            >
              {tag}
            </span>
          ))}
        </div>
        {product.seller ? (
          <div className="flex items-center gap-2 text-[12px] text-[#7f8aa3]">
            <ShieldCheck className="size-3.5 text-[#3a8ee6]" />
            <span>{product.seller}</span>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2 text-[12px] text-[#666]">
          <span className="rounded-full bg-[#f5f7fb] px-2.5 py-1">比例 {product.ratio}</span>
          <span className="rounded-full bg-[#f5f7fb] px-2.5 py-1">押金 {product.deposit}</span>
          <span className="rounded-full bg-[#f5f7fb] px-2.5 py-1">{product.rent}</span>
          <span className="rounded-full bg-[#f5f7fb] px-2.5 py-1">{product.weapon}</span>
        </div>
        <div className="flex items-end justify-between gap-3 pt-1">
          <div>
            <div className="text-[14px] font-semibold text-[#333]">
              ￥<span className="text-[34px] leading-none">{product.price}</span>
            </div>
            <div className="mt-1 text-[12px] text-[#a1a8b8] line-through">￥{product.originalPrice}</div>
          </div>
          <Link href={`/detail/${product.id}`} className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#4f90ea]">
            立即查看
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
