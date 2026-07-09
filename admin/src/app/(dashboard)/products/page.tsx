import { ProductsTable } from "@/components/products-table";
import { SummaryCard } from "@/components/summary-card";
import { listProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  try {
    const products = await listProducts();
  const publishedCount = products.filter((item) => item.status === "published").length;

    return (
      <section className="space-y-5">
        <div className="rounded-[32px] border border-white/70 bg-white/66 p-6 shadow-[0_28px_70px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[14px] uppercase tracking-[0.28em] text-[#73839b]">Products</div>
              <h1 className="mt-3 text-[34px] font-semibold text-[#10243c]">产品管理</h1>
              <p className="mt-2 max-w-[680px] text-[15px] leading-7 text-[#5f7087]">
                用于管理前台产品上架和下架状态。后续前台接接口时，只读取 `published` 数据即可。
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <SummaryCard label="总产品数" value={products.length} accent="#0f4c81" />
              <SummaryCard label="已上架" value={publishedCount} accent="#f4c76b" />
            </div>
          </div>
        </div>
        <ProductsTable initialProducts={products} />
      </section>
    );
  } catch (error) {
    return (
      <section className="space-y-5">
        <div className="rounded-[32px] border border-[#f2c7c7] bg-white/80 p-6 shadow-[0_28px_70px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="text-[14px] uppercase tracking-[0.28em] text-[#b45353]">Products Error</div>
          <h1 className="mt-3 text-[34px] font-semibold text-[#10243c]">产品管理加载失败</h1>
          <p className="mt-3 text-[15px] leading-7 text-[#6d4c4c]">{(error as Error).message}</p>
        </div>
      </section>
    );
  }
}
