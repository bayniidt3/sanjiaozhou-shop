"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, MessageSquareText } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/products", label: "产品管理", icon: Boxes },
  { href: "/messages", label: "用户留言管理", icon: MessageSquareText },
];

export function Sidebar({ basePath }: { basePath: string }) {
  const pathname = usePathname();
  const normalizedPath = pathname.startsWith(basePath) ? pathname.slice(basePath.length) || "/" : pathname;

  return (
    <aside className="flex w-full flex-col rounded-[28px] border border-white/60 bg-[linear-gradient(180deg,rgba(8,31,56,0.95),rgba(12,47,80,0.96))] p-5 text-white shadow-[0_28px_60px_rgba(2,12,27,0.28)] lg:w-[250px]">
      <div>
        <div className="text-[13px] uppercase tracking-[0.32em] text-[#95b7d6]">MDDJCLUB</div>
        <div className="mt-2 text-[28px] font-semibold">后台管理</div>
        <div className="mt-2 text-[14px] text-[#bfd3e6]">站点地址：mddjclub.top/admin</div>
      </div>
      <nav className="mt-8 space-y-2">
        {items.map((item) => {
          const active = normalizedPath === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={`${basePath}${item.href}`}
              className={cn(
                "flex items-center gap-3 rounded-[18px] px-4 py-3 text-[15px] transition-all",
                active ? "bg-white text-[#0c355d] shadow-[0_12px_24px_rgba(255,255,255,0.12)]" : "text-[#d7e7f6] hover:bg-white/8",
              )}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
