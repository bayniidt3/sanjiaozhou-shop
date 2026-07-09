import Link from "next/link";
import { Inbox } from "lucide-react";

import { SiteFooter } from "@/components/mddjclub/site-footer";
import { SiteHeader } from "@/components/mddjclub/site-header";

export default function RecoveryListPage() {
  return (
    <>
      <div className="lg:hidden">
        <SiteHeader activePath="/recovery-list" mobileSimple />
      </div>
      <div className="hidden lg:block">
        <SiteHeader activePath="/recovery-list" />
      </div>
      <main className="min-h-[60vh]">
        <div className="mddj-container py-4 text-[13px] text-[#7f8aa3] lg:py-5">首页 / 求购列表</div>
        <div className="mddj-container pb-16">
          <section className="rounded-[16px] bg-white px-6 py-[72px] text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#eef6ff] text-[#4698f3]">
              <Inbox className="size-9" />
            </div>
            <h1 className="mt-6 text-[32px] font-semibold text-[#1f2937]">求购列表暂未开放内容</h1>
            <p className="mx-auto mt-3 max-w-[560px] text-[15px] leading-7 text-[#7f8aa3]">
              这里先保留一个空提示页，后续你接后台管理时可以直接把求购数据列表、筛选条件和详情流接进来。
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link
                href="/list"
                className="rounded-[10px] bg-[#4698f3] px-6 py-3 text-[14px] font-semibold text-white"
              >
                返回租号大厅
              </Link>
              <Link
                href="/"
                className="rounded-[10px] border border-[#dce5f0] px-6 py-3 text-[14px] font-semibold text-[#6b7280]"
              >
                返回首页
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
