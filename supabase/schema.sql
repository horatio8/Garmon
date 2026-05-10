-- Together with Garmon — CMS schema
-- Run this once in the Supabase SQL editor for a fresh project.
-- After this, run seed.sql to populate the defaults.

-- ─────────────────────────────────────────────────────────────────────────────
-- Helper: updated_at trigger
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

-- ─────────────────────────────────────────────────────────────────────────────
-- Admin allowlist: which auth users may write to CMS tables.
-- Add rows manually via SQL editor: insert into admin_users (email) values ('you@campaign.com');
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

alter table admin_users enable row level security;
create policy "admins read admin_users" on admin_users for select using (is_admin());
create policy "admins write admin_users" on admin_users for all using (is_admin()) with check (is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- Site settings: single-row JSON config for global stuff.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into site_settings (id, data) values (1, '{}'::jsonb) on conflict do nothing;
create trigger trg_site_settings_updated before update on site_settings
  for each row execute procedure set_updated_at();

alter table site_settings enable row level security;
create policy "public reads settings"  on site_settings for select using (true);
create policy "admins write settings"  on site_settings for all using (is_admin()) with check (is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- Endorsements
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.endorsements (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_endorsements_updated before update on endorsements
  for each row execute procedure set_updated_at();

alter table endorsements enable row level security;
create policy "public reads endorsements" on endorsements for select using (true);
create policy "admins write endorsements" on endorsements for all using (is_admin()) with check (is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- Pillars (home page issue cards)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.pillars (
  id uuid primary key default gen_random_uuid(),
  number text not null,
  tag text not null,
  title text not null,
  body text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_pillars_updated before update on pillars
  for each row execute procedure set_updated_at();

alter table pillars enable row level security;
create policy "public reads pillars" on pillars for select using (true);
create policy "admins write pillars" on pillars for all using (is_admin()) with check (is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- Issues (full platform list + deep-dive content)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.issues (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  number text not null,
  tag text not null,
  title text not null,
  stance text not null,
  -- Deep-dive content (optional: only set if a slug has a full page)
  head text,
  deck text,
  body text,
  story text,
  problem text,
  bullets jsonb not null default '[]'::jsonb,
  reframe text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_issues_updated before update on issues
  for each row execute procedure set_updated_at();

alter table issues enable row level security;
create policy "public reads issues" on issues for select using (true);
create policy "admins write issues" on issues for all using (is_admin()) with check (is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- Events
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  date_label text not null,        -- e.g. "May 28"
  day_label text not null,         -- e.g. "Thu"
  time_label text not null,        -- e.g. "5:30 – 7:30 pm"
  title text not null,
  location text not null,
  host text not null,
  tag text,                        -- "Featured" | "GOTV" | null
  sort_order int not null default 0,
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_events_updated before update on events
  for each row execute procedure set_updated_at();

alter table events enable row level security;
create policy "public reads events" on events for select using (true);
create policy "admins write events" on events for all using (is_admin()) with check (is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- News items
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.news_items (
  id uuid primary key default gen_random_uuid(),
  tag text not null,               -- "Op-ed" | "Press" | etc.
  date_label text not null,        -- e.g. "Dec 12, 2025"
  source text not null,
  title text not null,
  url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_news_updated before update on news_items
  for each row execute procedure set_updated_at();

alter table news_items enable row level security;
create policy "public reads news" on news_items for select using (true);
create policy "admins write news" on news_items for all using (is_admin()) with check (is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- Volunteer interest options (for volunteer page checkboxes)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.volunteer_options (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,        -- e.g. "door"
  label text not null,
  body text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_volunteer_updated before update on volunteer_options
  for each row execute procedure set_updated_at();

alter table volunteer_options enable row level security;
create policy "public reads volunteer_opts" on volunteer_options for select using (true);
create policy "admins write volunteer_opts" on volunteer_options for all using (is_admin()) with check (is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- Contact form submissions (writable by anyone, readable by admins)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text,
  message text not null,
  status text not null default 'new', -- new | replied | archived
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;
create policy "anyone submits contact" on contact_messages for insert with check (true);
create policy "admins read contact"    on contact_messages for select using (is_admin());
create policy "admins update contact"  on contact_messages for update using (is_admin()) with check (is_admin());
create policy "admins delete contact"  on contact_messages for delete using (is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- Pledge mirror (Campaign Nucleus is canonical, this is just so admin can see counts)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.pledges (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text,
  email text,
  phone text,
  location_key text,          -- Location_folly | Location_James | ...
  volunteer_keys jsonb not null default '[]'::jsonb,
  source text not null default 'site',  -- 'site' | 'home_counter' | 'import'
  created_at timestamptz not null default now()
);
create index if not exists idx_pledges_created on pledges (created_at desc);

alter table pledges enable row level security;
create policy "anyone records pledge" on pledges for insert with check (true);
create policy "admins read pledges"   on pledges for select using (is_admin());
create policy "admins update pledges" on pledges for update using (is_admin()) with check (is_admin());
create policy "admins delete pledges" on pledges for delete using (is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- Storage: a single 'media' bucket for CMS-uploaded images
-- ─────────────────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public reads media"   on storage.objects for select using (bucket_id = 'media');
create policy "admins write media"   on storage.objects for insert with check (bucket_id = 'media' and is_admin());
create policy "admins update media"  on storage.objects for update using (bucket_id = 'media' and is_admin()) with check (bucket_id = 'media' and is_admin());
create policy "admins delete media"  on storage.objects for delete using (bucket_id = 'media' and is_admin());
