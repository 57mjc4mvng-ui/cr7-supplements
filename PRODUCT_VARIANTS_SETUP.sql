-- CR7 product variants: one product can have many size/flavour/price combinations
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  size text,
  flavour text,
  price numeric(10,2) not null default 0,
  mrp numeric(10,2) default 0,
  stock integer default 0,
  in_stock boolean default true,
  sku text,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists product_variants_product_idx on public.product_variants(product_id);
alter table public.product_variants enable row level security;
drop policy if exists "Public can view product variants" on public.product_variants;
create policy "Public can view product variants" on public.product_variants for select to anon, authenticated using (true);
drop policy if exists "Admins can insert product variants" on public.product_variants;
create policy "Admins can insert product variants" on public.product_variants for insert to authenticated with check (public.is_admin_or_owner());
drop policy if exists "Admins can update product variants" on public.product_variants;
create policy "Admins can update product variants" on public.product_variants for update to authenticated using (public.is_admin_or_owner()) with check (public.is_admin_or_owner());
drop policy if exists "Admins can delete product variants" on public.product_variants;
create policy "Admins can delete product variants" on public.product_variants for delete to authenticated using (public.is_admin_or_owner());
grant select on table public.product_variants to anon, authenticated;
grant insert, update, delete on table public.product_variants to authenticated;
