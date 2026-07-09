import { ListPageClient } from "@/components/mddjclub/list-page-client";
import { SiteFooter } from "@/components/mddjclub/site-footer";
import { SiteHeader } from "@/components/mddjclub/site-header";

export default function ListPage() {
  return (
    <>
      <div className="lg:hidden">
        <SiteHeader activePath="/list" mobileSimple />
      </div>
      <div className="hidden lg:block">
        <SiteHeader activePath="/list" />
      </div>
      <main className="pb-0">
        <div className="mddj-container py-4 text-[13px] text-[#7f8aa3] lg:py-5">首页 / 租号大厅</div>
        <ListPageClient />
      </main>
      <SiteFooter />
    </>
  );
}
