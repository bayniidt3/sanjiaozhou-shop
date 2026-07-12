import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
    trailingSlash: true, // 防止刷新404
};

export default nextConfig;
