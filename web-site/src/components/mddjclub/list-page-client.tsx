"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { FilterPanel } from "@/components/mddjclub/filter-panel";
import { ProductCard } from "@/components/mddjclub/product-card";
import { filterRows, listCards } from "@/components/mddjclub/site-data";

const initialFilters = Object.fromEntries(filterRows.map((row) => [row.label, row.values[0]]));

export function ListPageClient() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>(initialFilters);

  const filteredCards = useMemo(() => {
    return listCards.filter((card) => {
      const category = selectedFilters["选择分类"];
      if (category !== "全部" && !card.title.includes(category) && !card.tags.some((tag) => tag.includes(category))) {
        return false;
      }

      const region = selectedFilters["选区"];
      if (region !== "全部" && !card.tags.some((tag) => tag.includes(region))) {
        return false;
      }

      const area = selectedFilters["游戏大区"];
      if (area !== "全部" && !card.tags.some((tag) => tag.includes(area))) {
        return false;
      }

      const redSkin = selectedFilters["红皮"];
      if (redSkin !== "无" && redSkin !== "全部" && !card.tags.some((tag) => tag.includes(redSkin))) {
        return false;
      }

      const knifeSkin = selectedFilters["刀皮"];
      if (knifeSkin !== "无" && knifeSkin !== "全部" && !card.tags.some((tag) => tag.includes(knifeSkin))) {
        return false;
      }

      const goldSkin = selectedFilters["金皮"];
      if (goldSkin !== "无" && goldSkin !== "全部" && !card.tags.some((tag) => tag.includes(goldSkin))) {
        return false;
      }

      return true;
    });
  }, [selectedFilters]);

  const handleFilterChange = (label: string, value: string) => {
    setSelectedFilters((current) => ({ ...current, [label]: value }));
  };

  return (
    <div className="mddj-container space-y-5 pb-10 lg:space-y-6">
      <FilterPanel selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
      {filteredCards.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {filteredCards.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <section className="rounded-[14px] bg-white px-6 py-16 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <h2 className="text-[28px] font-semibold text-[#1f2937]">暂无符合条件的账号</h2>
          <p className="mt-3 text-[14px] text-[#7f8aa3]">可以继续切换上方分类条件，后续接后台后这里可替换为真实筛选结果。</p>
        </section>
      )}
      <div className="flex flex-col items-center justify-between gap-4 rounded-[12px] bg-white px-5 py-4 text-[14px] text-[#7f8aa3] shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:flex-row">
        <div>共 {filteredCards.length} 条　12条/页</div>
        <div className="flex items-center gap-2">
          <button className="flex size-8 items-center justify-center rounded-[8px] border border-[#e7edf5] bg-[#fafcff]">
            <ChevronLeft className="size-4" />
          </button>
          <span className="rounded-[8px] bg-[#4da2ff] px-3 py-1.5 text-white">1</span>
          <span className="rounded-[8px] px-3 py-1.5">2</span>
          <span className="rounded-[8px] px-3 py-1.5">3</span>
          <button className="flex size-8 items-center justify-center rounded-[8px] border border-[#e7edf5] bg-[#fafcff]">
            <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span>前往</span>
          <span className="rounded-[8px] border border-[#e7edf5] bg-[#fafcff] px-4 py-2 text-[#4b5563]">1</span>
          <span>页</span>
        </div>
      </div>
    </div>
  );
}
