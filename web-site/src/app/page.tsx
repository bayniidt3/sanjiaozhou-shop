import Link from "next/link";
import { ArrowRight, ChevronRight, Wallet } from "lucide-react";

import { ProductCard } from "@/components/mddjclub/product-card";
import { marketRows } from "@/components/mddjclub/site-data";
import { SiteFooter } from "@/components/mddjclub/site-footer";
import { SiteHeader } from "@/components/mddjclub/site-header";
import { fetchPublishedProductCards } from "@/lib/supabase-public";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredCards = (await fetchPublishedProductCards()).slice(0, 6);

  return (
    <>
      <div className="lg:hidden">
        <SiteHeader activePath="/" mobileSimple />
      </div>
      <div className="hidden lg:block">
        <SiteHeader activePath="/" />
      </div>
      <main className="pb-0">
        <div className="mddj-container pt-4 lg:pt-6">
          <section className="grid gap-4 lg:grid-cols-[208px_1fr]">
            <aside className="overflow-hidden rounded-[10px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
              <div className="flex items-center gap-2 bg-[#3a8ee6] px-4 py-3 text-[15px] font-semibold text-white">
                <Wallet className="size-4" />
                热门游戏分类
              </div>
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-3">
                  <img src="/images/mddjclub/3-hafu-b1o76fjs.png" alt="三角洲" className="size-8 rounded-[6px]" />
                  <div>
                    <div className="text-[15px] font-semibold text-[#333]">三角洲</div>
                    <div className="text-[12px] text-[#a0a8b6]">分类</div>
                  </div>
                </div>
                <ChevronRight className="size-4 text-[#b7c0cf]" />
              </div>
            </aside>
            <div className="relative overflow-hidden rounded-[10px] bg-[#9cc2ff]">
              <img
                src="/images/mddjclub/2-e6428ed2ce24a95e2285e97482a56acb.jpg"
                alt="上架攻略"
                className="h-full min-h-[160px] w-full object-cover"
              />
              <div className="absolute inset-y-0 left-3 flex items-center lg:left-5">
                <button className="flex size-8 items-center justify-center rounded-full bg-white/14 text-white backdrop-blur">
                  <ChevronRight className="size-4 rotate-180" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-3 flex items-center lg:right-5">
                <button className="flex size-8 items-center justify-center rounded-full bg-white/14 text-white backdrop-blur">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </section>
        </div>

        <section className="mddj-container mt-6">
          <div className="rounded-[12px] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:p-5">
            <div className="flex items-start justify-between gap-4 border-b border-[#eef2f7] pb-4">
              <div>
                <div className="flex items-center gap-2 text-[18px] font-semibold text-[#333]">
                  <span className="text-[#222]">▣</span>
                  哈夫币行情
                </div>
                <p className="mt-2 text-[13px] text-[#7f8aa3]">
                  更新时间 {new Date().toLocaleDateString()}， 以下比例展示均为977带刀皮账号
                </p>
              </div>
              <Link href="#" className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-[#4f90ea]">
                查看更多
                <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="mt-4 overflow-hidden rounded-[12px] border border-[#eef2f7]">
              <table className="w-full text-left text-[14px]">
                <thead className="bg-[#fafcff] text-[#7f8aa3]">
                  <tr>
                    <th className="px-5 py-4 font-medium">商行</th>
                    <th className="px-5 py-4 font-medium">比例</th>
                    <th className="px-5 py-4 font-medium">备注</th>
                    <th className="px-5 py-4 font-medium">更新时间</th>
                  </tr>
                </thead>
                <tbody>
                  {marketRows.map((row) => (
                    <tr key={row.seller} className="border-t border-[#eef2f7] bg-white">
                      <td className="px-5 py-4 font-semibold text-[#333]">{row.seller}</td>
                      <td className="px-5 py-4 text-[20px] font-semibold text-[#222]">⌗ {row.ratio}</td>
                      <td className="px-5 py-4 text-[#5e6779]">{row.note}</td>
                      <td className="px-5 py-4 font-medium text-[#4b5563]">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mddj-container mt-16">
          <div className="mb-7">
            <h2 className="text-[32px] font-semibold text-[#1f2937]">特价推荐</h2>
            <p className="mt-2 text-[14px] text-[#7f8aa3]">热门类型，快速挑选心仪账号</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredCards.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/list"
              className="inline-flex items-center gap-2 rounded-[10px] border border-[#bed8ff] bg-[#f6fbff] px-7 py-3 text-[14px] font-semibold text-[#4f90ea]"
            >
              查看更多
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section className="mt-14 bg-gradient-to-b from-[#4194ee] to-[#3781d8] py-16 text-center text-white lg:mt-20 lg:py-20">
          <div className="mddj-container">
            <h2 className="text-[32px] font-semibold lg:text-[52px]">准备好开始您的游戏之旅了吗？</h2>
            <Link
              href="/list"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-[16px] font-semibold text-[#4f90ea]"
            >
              立即租号
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
