import Link from "next/link";
import { MessageCircle, PhoneCall } from "lucide-react";

import { footerColumns } from "./site-data";

export function SiteFooter() {
  return (
    <footer className="bg-[#2d303d] text-white">
      <div className="mx-auto max-w-[1240px] px-4 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(2,1fr)_1.2fr]">
          <div>
            <div className="inline-block bg-white px-2 py-1 text-[18px] font-semibold text-[#333]">
              蒙佳哆商行
            </div>
            <p className="mt-6 max-w-[280px] text-[14px] leading-7 text-[#9ea5b9]">
              专业、安全、低价的游戏账号租赁平台。
            </p>
          </div>
          {footerColumns.slice(0, 2).map((column) => (
            <div key={column.title}>
              <h3 className="text-[20px] font-semibold">{column.title}</h3>
              <div className="mt-6 space-y-4 text-[15px] text-[#d7deef]">
                {column.links.map((link) => (
                  <Link key={link} href="#" className="block">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div>
            <h3 className="text-[20px] font-semibold">联系我们</h3>
            <div className="mt-6 rounded-[10px] bg-[#363948] p-5">
              <div className="flex items-center gap-3 border-b border-white/8 pb-4 text-[#d7deef]">
                <PhoneCall className="size-4 text-[#3a8ee6]" />
                <div>
                  <div className="text-[13px]">客服热线</div>
                  <div className="mt-1 text-[18px] text-white">-</div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-[#d7deef]">
                <MessageCircle className="size-4 text-[#3a8ee6]" />
                <div>
                  <div className="text-[13px]">客服微信</div>
                  <div className="mt-1 text-[18px] text-white">-</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-5 border-t border-white/8 pt-8 text-[13px] text-[#8f96aa] lg:flex-row lg:items-center lg:justify-between">
          <p>© 2026 蒙佳哆商行 版权所有　渝ICP备2026002277号-2</p>
          <div className="flex gap-6">
            <Link href="#">用户协议</Link>
            <Link href="#">隐私政策</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
