import Link from "next/link";
import { Headphones, Lock, Smartphone } from "lucide-react";

export function LoginPanel() {
  return (
    <section className="mx-auto w-full max-w-[1120px] rounded-[26px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)] lg:grid lg:grid-cols-[1.1fr_0.9fr]">
      <div className="hidden rounded-l-[26px] bg-gradient-to-b from-[#4693ed] to-[#3779c8] p-14 text-white lg:flex lg:flex-col lg:justify-end">
        <div className="space-y-5">
          <h2 className="text-[56px] font-semibold tracking-[0.02em]">专业、安全、低价</h2>
          <p className="max-w-[360px] text-[18px] leading-9 text-white/90">
            国内领先的游戏服务平台，为千万玩家提供优质租号服务。
          </p>
          <div className="space-y-5 pt-8 text-[18px] font-semibold">
            <div className="flex items-center gap-3">
              <Smartphone className="size-5" />
              极速上号体验
            </div>
            <div className="flex items-center gap-3">
              <Headphones className="size-5" />
              24h专业客服
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[340px]">
          <h1 className="text-[44px] font-semibold text-[#1f2937]">欢迎登录</h1>
          <p className="mt-3 text-[16px] text-[#6b7280]">
            没有账号？{" "}
            <Link href="#" className="font-semibold text-[#409eff]">
              立即注册
            </Link>
          </p>
          <div className="mt-12 flex gap-10 border-b border-[#edf1f6] text-[16px] font-semibold">
            <button className="border-b-2 border-[#409eff] pb-3 text-[#409eff]">密码登录</button>
            <button className="pb-3 text-[#6b7280]">验证码登录</button>
          </div>
          <div className="mt-7 space-y-4">
            <label className="flex h-[52px] items-center gap-3 rounded-[8px] border border-[#dbe4ef] px-4 text-[#b6becd]">
              <Smartphone className="size-4" />
              <span>请输入手机号</span>
            </label>
            <label className="flex h-[52px] items-center gap-3 rounded-[8px] border border-[#dbe4ef] px-4 text-[#b6becd]">
              <Lock className="size-4" />
              <span>请输入密码</span>
            </label>
            <button className="mt-2 h-[52px] w-full rounded-[12px] bg-[#4698f3] text-[18px] font-semibold text-white">
              登录
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
