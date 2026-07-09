"use client";

import { Search } from "lucide-react";

import { filterRows } from "./site-data";

type FilterPanelProps = {
  selectedFilters: Record<string, string>;
  onFilterChange: (label: string, value: string) => void;
};

export function FilterPanel({ selectedFilters, onFilterChange }: FilterPanelProps) {
  return (
    <section className="rounded-[14px] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:p-8">
      <div className="space-y-5">
        {filterRows.map((row) => (
          <div
            key={row.label}
            className="grid gap-3 border-b border-dashed border-[#edf1f6] pb-4 last:border-b-0 last:pb-0 lg:grid-cols-[88px_1fr]"
          >
            <div className="pt-1 text-[14px] font-medium text-[#666]">{row.label}：</div>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {row.values.map((value, index) => {
                const isActive = selectedFilters[row.label] === value;
                const isRange = row.compact && (index === 0 || index === 2);
                return (
                  <button
                    type="button"
                    onClick={() => onFilterChange(row.label, value)}
                    key={`${row.label}-${value}-${index}`}
                    className={[
                      "rounded-[6px] px-3 py-1.5 text-[13px] transition-colors",
                      isActive ? "bg-[#4da2ff] text-white" : "text-[#4b5563]",
                      isRange && !isActive ? "border border-[#e7edf5] bg-[#f9fbff] text-[#9aa3b2]" : "",
                    ].join(" ")}
                  >
                    {value}
                  </button>
                );
              })}
              {row.values.length > 8 ? (
                <span className="px-1 py-1.5 text-[13px] font-medium text-[#4f90ea]">展开</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-4 rounded-[12px] border border-[#edf1f6] bg-[#fbfcff] p-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-5 text-[14px] font-medium text-[#7f8aa3]">
          <span className="text-[#4f90ea]">默认排序</span>
          <span>价格 ⇅</span>
          <span>最新发布</span>
          <span>比例 ⇅</span>
          <span>AW数量 ⇅</span>
        </div>
        <div className="flex items-center rounded-[8px] border border-[#e6ecf5] bg-white px-3 py-2 text-[#9aa3b2] lg:w-[224px]">
          <Search className="mr-2 size-4" />
          <span className="text-[13px]">搜索商品关键字</span>
        </div>
      </div>
    </section>
  );
}
