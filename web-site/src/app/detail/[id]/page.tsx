import { notFound } from "next/navigation";

import { DetailPageClient } from "@/components/mddjclub/detail-page-client";
import { getProductDetailById, listCards } from "@/components/mddjclub/site-data";
import { SiteFooter } from "@/components/mddjclub/site-footer";
import { SiteHeader } from "@/components/mddjclub/site-header";

type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return listCards.map((card) => ({ id: card.id }));
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const product = getProductDetailById(id);

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
