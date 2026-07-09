import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "蒙佳哆商行 - 专业游戏账号租赁平台",
  description: "国内专业的游戏账号租赁平台，提供安全、便捷、低价的一站式租号服务。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
