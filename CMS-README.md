# Together with Garmon — CMS setup

The site reads its content from Supabase. Until that's wired up, the public
site renders a baked-in copy of the same defaults so nothing breaks.

## What's editable

Every content area you'd normally need to update during a campaign:

- **Site settings** — hero tagline, donate URL, pledge receiver URL, election
  dates and labels, the district label, every counter (pledges, donors, doors
  knocked) and goal, every photo on the public site, contact info, paid-for-by
  disclaimer, and the full About-page copy.
- **Pillars** — the six "actually fix" cards on the home page.
- **Issues** — full platform list plus per-issue deep-dive content (story,
  problem, push-for bullets, reframe).
- **Endorsements** — the names in the "Trusted by" strip.
- **Events** — public events list (with a `Featured` tag that surfaces on the
  home teaser, plus arbitrary tags like `5 for 5`, `GOTV`, etc.).
- **News** — press hits and op-eds shown on `/news`.
- **Volunteer options** — checkboxes shown on the volunteer page.
- **Media** — image library; uploads land in a public Supabase Storage bucket
  and any field that takes a URL can reference them.

The admin also has read-only views of:

- **Pledges** — submissions mirrored from the public site (Campaign Nucleus
  remains the canonical source). Exportable to CSV.
- **Contact messages** — submissions from the contact form, with status
  transitions (`new` → `replied` → `archived`).

## One-time setup (Supabase project)

1. Create a Supabase project (any region near the campaign is fine).
2. **SQL editor → New query → paste the contents of `supabase/schema.sql`**
   and run it. This creates every table, RLS policy, and the `media` storage
   bucket.
3. Then run `supabase/seed.sql` to populate today's defaults.
4. Add at least one admin email:

   ```sql
   insert into admin_users (email) values ('you@campaign.com');
   ```

5. **Auth → URL configuration**
   - Site URL: `https://togetherwithgarmon.com`
   - Add `https://preview.togetherwithgarmon.com/admin`,
     `https://togetherwithgarmon.com/admin`, and (if used) `http://localhost:8765/admin`
     to the Redirect allow-list. Magic-link sign-in won't return without these.

6. **Settings → API** — copy the project URL and the **anon (public)** key
   into `config.js`. The `service_role` key never goes in this repo.

   ```js
   window.CMS_CONFIG = {
     supabaseUrl: 'https://<project>.supabase.co',
     supabaseAnonKey: '<anon_public_key>',
   };
   ```

## Daily use

- Public site: <https://togetherwithgarmon.com> (or the preview domain).
- Admin: <https://togetherwithgarmon.com/admin>.
  - Enter your email, click the magic link, get back a signed-in session.
  - The sidebar has every editor; pick a section, edit, save.
  - For images, use the **Media** tab to upload, then paste the URL into any
    image field — or use the inline **Upload** button beside any image picker.
- The public site fetches from Supabase on every load. Edits show up on the
  next refresh (cache headers are 60s on `.css/.jsx/.html`, immutable on
  `/assets/*` only).

## Adding more admins

```sql
insert into admin_users (email) values ('teammate@campaign.com');
```

That's it. They sign in by magic link the same way.

## What lives where

```
supabase/
  schema.sql        Tables, RLS, storage bucket, is_admin() helper
  seed.sql          Idempotent defaults — re-running only inserts missing rows

lib/data.js         Public-site data layer (Supabase client + fallbacks)
config.js           Public Supabase URL + anon key (safe to commit)

admin.html          Admin SPA entry, served at /admin via vercel.json rewrite
admin/
  admin-app.jsx     Auth, shell, every editor and viewer in one file
  admin-styles.css  Admin-only styles
```

## Troubleshooting

- **"CMS not configured"** on `/admin` — `config.js` is missing the URL or
  anon key. Fill it in and redeploy.
- **Magic link doesn't bring you back** — the `/admin` URL isn't in your
  Auth → URL configuration → Redirect allow-list.
- **"Not authorised"** after sign-in — the email isn't in `admin_users`.
- **Edits don't persist** — check that RLS policies are in place and your
  user shows up in `select * from admin_users`.
- **Images upload but don't display** — confirm the `media` storage bucket is
  marked public (the schema does this for you).
