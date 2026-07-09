# MDDJCLUB Admin

独立后台项目，建议作为单独站点部署。

## 功能

- 产品管理：上架 / 下架
- 用户留言管理：查看、标记已联系、归档
- Node.js API：Next.js Route Handlers
- 数据库：Supabase

## 本地开发

```bash
cd admin
npm install
cp .env.example .env.local
npm run dev
```

本地访问：

- `http://localhost:3000`

## Supabase 表结构

执行 [supabase/schema.sql](/Users/cc/Repository/sanjiaozhou-shop/admin/supabase/schema.sql)

## 环境变量

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## 说明

- 当前后台使用浏览器侧 Supabase publishable key 直连数据库。
- 需要在 Supabase 为 `products` 和 `lead_messages` 配置允许后台读写的策略；测试阶段也可以临时关闭这两张表的 RLS。
- 前台 `web-site` 目前还是静态数据；后续接入时可调用后台同库表，仅读取 `products.status = published` 的数据。
