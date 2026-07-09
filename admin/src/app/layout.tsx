import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "MDDJCLUB 后台",
  description: "产品管理与用户留言管理后台",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
