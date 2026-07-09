"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react";
import { useState } from "react";

import type { ProductDetail } from "@/types/mddjclub";

import { LeadModal } from "./lead-modal";

type DetailPageClientProps = {
  product: ProductDetail;
};

export function DetailPageClient({ product }: DetailPageClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [leadOpen, setLeadOpen] = useState(false);

  const activeImage = product.gallery[activeIndex] ?? product.gallery[0] ?? product.image;

  const goPrev = () => {
    setActiveIndex((current) => (current === 0 ? product.gallery.length - 1 : current - 1));
  };

  const goNext = () => {
    setActiveIndex((current) => (current === product.gallery.length - 1 ? 0 : current + 1));
  };

  return (
    <>
      <div className="mddj-container py-4 text-[13px] text-[#4f90ea] lg:py-6">
        <Link href="/list">返回</Link>
      </div>
      <div className="mddj-container pb-12">
        <section className="grid gap-4 lg:grid-cols-[1.55fr_0.95fr] lg:gap-5">
          <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <div className="relative bg-[#101722]">
              <img src={activeImage} alt={product.title} className="aspect-[1.35] w-full object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-[12px] font-semibold text-white">
                仓库纯币图片
              </span>
              {product.gallery.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/32 text-white backdrop-blur"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/32 text-white backdrop-blur"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              ) : null}
              {product.gallery.length > 1 ? (
                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                  {product.gallery.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={[
                        "size-3 rounded-full border border-white/25",
                        index === activeIndex ? "bg-white" : "bg-white/40",
                      ].join(" ")}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[16px] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full bg-[#4da2ff] px-2.5 py-1 text-[12px] font-semibold text-white">
                  {product.discount}
                </span>
                <h1 className="text-[22px] font-semibold text-[#1f2937] lg:text-[26px]">{product.title}</h1>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-[18px] font-semibold text-[#ff6b00]">￥</span>
                <span className="text-[48px] font-bold leading-none text-[#ff4d35]">{product.price}</span>
                <span className="pb-1 text-[16px] text-[#a1a8b8] line-through">￥{product.originalPrice}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Chip>比例 {product.ratio}</Chip>
                <Chip>押金 {product.deposit}</Chip>
                <Chip>{product.rent}</Chip>
                <Chip>{product.weapon}</Chip>
              </div>
            </div>

            <div className="rounded-[16px] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
              <div className="flex items-center gap-4">
                <img
                  src={product.sellerAvatar || "/images/mddjclub/5-5c8df237b49c7471e317b0b90b7f9df4.png"}
                  alt={product.seller || "卖家"}
                  className="size-14 rounded-full bg-[#eef4fb] object-cover"
                />
                <div>
                  <div className="text-[18px] font-semibold text-[#1f2937]">{product.seller || "平台商家"}</div>
                  <div className="mt-1 text-[13px] text-[#98a2b3]">{product.lastVisitor || "最近浏览"}</div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 rounded-[16px] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:grid-cols-[92px_92px_1fr]">
              <ActionGhost icon={<Share2 className="size-4" />} label="分享" />
              <ActionGhost icon={<Heart className="size-4" />} label="收藏" />
              <button
                type="button"
                onClick={() => setLeadOpen(true)}
                className="h-[52px] rounded-[16px] bg-[#ffbf0b] text-[18px] font-semibold text-[#111827]"
              >
                {product.actionLabel || "下单"}
              </button>
            </div>
          </div>
        </section>

        <div className="mt-5 space-y-5">
          {product.detailSections.map((section) => (
            <section
              key={section.title}
              className="rounded-[16px] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:p-5"
            >
              <h2 className="mb-4 text-[26px] font-semibold text-[#1f2937]">{section.title}</h2>
              <div className="grid gap-3 lg:grid-cols-2">
                {section.items.map((item) => (
                  <div
                    key={`${section.title}-${item.label}`}
                    className={item.label === "不可使用物品备注" ? "lg:col-span-2" : ""}
                  >
                    <div className="rounded-[14px] border border-[#e8edf5] bg-[#f8fbff] px-4 py-3 text-[15px] font-medium text-[#475467]">
                      <span className="font-semibold text-[#667085]">{item.label}：</span> {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <LeadModal defaultType="求购" open={leadOpen} onClose={() => setLeadOpen(false)} />
    </>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-[#f5f7fb] px-3 py-2 text-[14px] font-semibold text-[#667085]">{children}</span>;
}

function ActionGhost({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex h-[52px] items-center justify-center gap-2 rounded-[16px] border border-[#e7edf5] bg-white text-[15px] font-semibold text-[#667085]"
    >
      {icon}
      {label}
    </button>
  );
}
