create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  source_product_id text unique,
  title text not null,
  image_url text not null,
  tags text[] not null default '{}',
  price numeric(10, 2) not null,
  original_price numeric(10, 2) not null,
  deposit numeric(10, 2) not null,
  rent text not null,
  ratio numeric(10, 2) not null,
  weapon text not null,
  seller text,
  status text not null default 'published' check (status in ('published', 'draft')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lead_messages (
  id uuid primary key default gen_random_uuid(),
  lead_type text not null check (lead_type in ('账号上架', '求购', '客服')),
  contact_name text not null,
  contact_value text not null,
  remark text,
  current_assets text,
  coin_only text,
  aw text,
  knife_skin text,
  status text not null default 'new' check (status in ('new', 'contacted', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.lead_messages add column if not exists current_assets text;
alter table public.lead_messages add column if not exists coin_only text;
alter table public.lead_messages add column if not exists aw text;
alter table public.lead_messages add column if not exists knife_skin text;
alter table public.lead_messages drop constraint if exists lead_messages_lead_type_check;
alter table public.lead_messages
  add constraint lead_messages_lead_type_check
  check (lead_type in ('账号上架', '求购', '客服'));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

drop trigger if exists lead_messages_set_updated_at on public.lead_messages;
create trigger lead_messages_set_updated_at
before update on public.lead_messages
for each row
execute function public.set_updated_at();

insert into public.products (
  source_product_id,
  title,
  image_url,
  tags,
  price,
  original_price,
  deposit,
  rent,
  ratio,
  weapon,
  seller,
  status
) values
  ('89131', '钻石953m9格7体7负', '/images/mddjclub/10-ff76a6d620deaeae9bb372579d5c4fb6.jpg', '{"恒金玫瑰","天际线","幽蓝"}', 2076.55, 2443.00, 1000.00, '15m/天', 45.88, 'AWM/47', '180***4040', 'published'),
  ('89132', '铂金770m9格7体7负', '/images/mddjclub/11-abcba28b06727249ec90baf7b3b74220.png', '{"恒金玫瑰","天际线","幽蓝"}', 1677.90, 1974.00, 898.00, '20m/天', 45.88, 'AWM/249', '177***5576', 'published'),
  ('89137', '铂金976m9格7体7负', '/images/mddjclub/16-c01fadb35bb2e96bdd4e8c46ccabab55.png', '{"天际线","恒金玫瑰","幽蓝"}', 2201.76, 2502.00, 1001.00, '20m/天', 44.31, 'AWM/208', '182****1990', 'draft')
on conflict (source_product_id) do nothing;

insert into public.lead_messages (
  lead_type,
  contact_name,
  contact_value,
  current_assets,
  coin_only,
  aw,
  knife_skin,
  remark,
  status
) values
  ('求购', '张先生', '微信 mddj001', '5000', '3000', '2把', '蝴蝶刀', '优先联系晚上 8 点后', 'new'),
  ('客服', '李女士', '13800000000', null, null, null, null, '想咨询押金规则', 'contacted')
on conflict do nothing;
