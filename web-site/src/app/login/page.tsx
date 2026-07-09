import Link from "next/link";

import { LoginPanel } from "@/components/mddjclub/login-panel";
import { SiteHeader } from "@/components/mddjclub/site-header";

export default function LoginPage() {
  return (
    <>
      <div className="hidden lg:block">
        <SiteHeader activePath="/login" />
      </div>
      <div className="lg:hidden">
        <header className="border-b border-[#edf1f6] bg-white">
          <div className="mx-auto flex max-w-[390px] items-start justify-between px-5 py-4">
            <div className="text-[22px] font-semibold text-[#111827]">
              <div className="flex items-center gap-2">
                <span>蒙佳哆商行</span>
                <span className="text-[18px]">欢迎登录</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-[14px] leading-6 text-[#4b5563]">
              <Link href="/">返回首页</Link>
              <Link href="#">帮助中心</Link>
              <Link href="#">关于我们</Link>
            </div>
          </div>
        </header>
      </div>
      <main className="min-h-[calc(100vh-56px)] bg-[radial-gradient(circle_at_top,#f3f7fd,transparent_48%),linear-gradient(180deg,#f8fafc_0%,#f3f6fb_100%)] px-5 py-8 lg:min-h-[calc(100vh-80px)] lg:px-8 lg:py-14">
        <LoginPanel />
        <div className="mx-auto mt-12 flex max-w-[1120px] flex-col items-center gap-5 text-[13px] text-[#9aa3b2] lg:mt-10">
          <p>© 2026 蒙佳哆商行 | 渝ICP备2026002277号-2</p>
          <div className="flex gap-6">
            <Link href="#">关于我们</Link>
            <Link href="#">帮助中心</Link>
            <Link href="#">用户协议</Link>
            <Link href="#">隐私政策</Link>
          </div>
        </div>
      </main>
    </>
  );
}
