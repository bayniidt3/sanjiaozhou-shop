import { notFound } from "next/navigation";

import { DetailPageClient } from "@/components/mddjclub/detail-page-client";
import { SiteFooter } from "@/components/mddjclub/site-footer";
import { SiteHeader } from "@/components/mddjclub/site-header";
import { fetchPublishedProductDetailById } from "@/lib/supabase-public";

type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const product = await fetchPublishedProductDetailById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="lg:hidden">
        <SiteHeader activePath="/list" mobileSimple />
      </div>
      <div className="hidden lg:block">
        <SiteHeader activePath="/list" />
      </div>
      <main className="pb-0">
        <DetailPageClient product={product} />
      </main>
      <SiteFooter />
    </>
  );
}
