# MDDJCLUB Admin

独立后台项目，部署目标为 `mddjclub.top/admin`。

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

默认建议配置：

- `NEXT_PUBLIC_BASE_PATH=/admin`
- 本地访问 `http://localhost:3000/admin`

## Supabase 表结构

执行 [supabase/schema.sql](/Users/cc/Repository/sanjiaozhou-shop/admin/supabase/schema.sql)

## Vercel 环境变量

- `NEXT_PUBLIC_BASE_PATH=/admin`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 说明

- 当前后台直接使用服务端 Supabase key 查询和更新数据。
- 生产环境建议在 Vercel 项目中限制来源，并按需补登录鉴权。
- 前台 `web-site` 目前还是静态数据；后续接入时可调用后台同库表，仅读取 `products.status = published` 的数据。
