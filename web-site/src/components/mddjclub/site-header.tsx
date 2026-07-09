"use client";

import Link from "next/link";
import { Grid2X2, Headset, Search } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { LeadType } from "@/types/mddjclub";

import { LeadModal } from "./lead-modal";
import { mainNavLinks, topUtilityLinks } from "./site-data";

type SiteHeaderProps = {
  activePath: "/" | "/list" | "/login" | "/recovery-list";
  mobileSimple?: boolean;
};

export function SiteHeader({ activePath, mobileSimple = false }: SiteHeaderProps) {
  const [leadType, setLeadType] = useState<LeadType | null>(null);

  const openLeadModal = (type: LeadType) => {
    setLeadType(type);
  };

  const closeLeadModal = () => {
    setLeadType(null);
  };

  if (mobileSimple) {
    return (
      <>
        <header className="border-b border-[#edf1f6] bg-white">
          <div className="mx-auto flex max-w-[390px] items-center justify-between px-4 py-3 text-[#1f2937]">
            <Link href="/" className="text-[13px] font-semibold tracking-[0.02em]">
              蒙佳哆商行
            </Link>
            <Grid2X2 className="size-4 text-[#6b7280]" />
          </div>
          <div className="grid grid-cols-3 gap-2 border-t border-[#edf1f6] px-4 py-3">
            <ActionButton label="账号上架" color="bg-black" onClick={() => openLeadModal("账号上架")} />
            <ActionButton label="求购" color="bg-[#ff7e18]" onClick={() => openLeadModal("求购")} />
            <ActionButton
              label="客服"
              color="bg-[#3a8ee6]"
              icon={<Headset className="size-3.5" />}
              onClick={() => openLeadModal("客服")}
            />
          </div>
        </header>
        <LeadModal defaultType={leadType} open={leadType !== null} onClose={closeLeadModal} />
      </>
    );
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)]",
          activePath === "/login" && "shadow-none"
        )}
      >
        {activePath !== "/login" ? (
          <>
            <div className="hidden border-b border-[#edf1f6] bg-[#f9fafc] lg:block">
              <div className="mx-auto flex h-[26px] max-w-[1240px] items-center justify-between px-4 text-[12px] text-[#666]">
                <span>欢迎来到蒙佳哆商行平台！</span>
                <div className="flex items-center gap-5">
                  {topUtilityLinks.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={link.label === "联系客服" ? () => openLeadModal("客服") : undefined}
                      className="transition-colors hover:text-[#3a8ee6]"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mx-auto flex h-[58px] max-w-[1240px] items-center gap-4 px-4">
              <Link href="/" className="shrink-0 text-[22px] font-semibold tracking-[0.03em] text-[#333]">
                蒙佳哆商行
              </Link>
              <nav className="hidden items-center gap-8 lg:flex">
                {mainNavLinks.map((link) => {
                  const isActive = link.href === activePath;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "relative py-4 text-[16px] font-medium text-[#333]",
                        isActive &&
                          "text-[#3a8ee6] after:absolute after:bottom-[14px] after:left-0 after:h-[2px] after:w-full after:bg-[#3a8ee6]"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="ml-auto hidden w-full max-w-[260px] items-center rounded-full bg-[#f6f8fb] px-4 py-2 text-[#9ca3af] lg:flex">
                <Search className="mr-2 size-4" />
                <span className="text-[13px]">搜索游戏、账号...</span>
              </div>
              <div className="hidden items-center gap-3 lg:flex">
                <ActionButton label="账号上架" color="bg-black" onClick={() => openLeadModal("账号上架")} />
                <ActionButton label="求购" color="bg-[#ff7e18]" onClick={() => openLeadModal("求购")} />
                <ActionButton
                  label="客服"
                  color="bg-[#3a8ee6]"
                  icon={<Headset className="size-4" />}
                  onClick={() => openLeadModal("客服")}
                />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 lg:hidden">
              <Link href="/" className="text-[18px] font-semibold text-[#333]">
                蒙佳哆商行
              </Link>
              <Grid2X2 className="size-4 text-[#6b7280]" />
            </div>
          </>
        ) : (
          <div className="mx-auto flex h-[56px] max-w-[1280px] items-center justify-between px-5 lg:h-[80px] lg:px-8">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-[18px] font-semibold text-[#333] lg:text-[22px]">
                蒙佳哆商行
              </Link>
              <span className="text-[20px] font-semibold text-[#111827]">欢迎登录</span>
            </div>
            <div className="flex items-center gap-5 text-[14px] text-[#6b7280]">
              <Link href="/">返回首页</Link>
              <Link href="#">帮助中心</Link>
              <Link href="#">关于我们</Link>
            </div>
          </div>
        )}
      </header>
      <LeadModal defaultType={leadType} open={leadType !== null} onClose={closeLeadModal} />
    </>
  );
}

type ActionButtonProps = {
  color: string;
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
};

function ActionButton({ color, icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-[6px] px-5 py-3 text-[14px] font-semibold text-white",
        color
      )}
    >
      {icon}
      {label}
    </button>
  );
}
