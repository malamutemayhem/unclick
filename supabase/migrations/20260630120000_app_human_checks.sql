-- App "Human checked" flags for the admin AppTesting page.
--
-- Why this table exists:
--   The admin AppTesting page (src/pages/admin/AdminAppTesting.tsx) shows the
--   automated test status of every app. Automated status answers "did a tool
--   call return something", but not "did a human actually verify this app end to
--   end" (e.g. checked the real inbox, listed the real root folder). This table
--   records that separate human sign-off: one boolean per app slug, curated by
--   an admin and read back on the same admin-only page.
--
--   It is intentionally GLOBAL (one row per slug, not per tenant): "a person
--   verified this app" is a property of the catalog entry, set by a super-admin.
--   Writes go only through api/app-human-checks.ts, which gates every write on
--   the ADMIN_EMAILS allowlist.

create table if not exists public.app_human_checks (
  -- App catalog slug (matches APP_CATALOG[].slug). One row per app.
  slug        text        primary key,
  -- Whether a human has verified this app. An absent row means "use the page's
  -- built-in default" (the launch connectors default to checked).
  checked     boolean     not null default true,
  -- Email of the admin who last set it (audit trail; not load-bearing).
  checked_by  text,
  updated_at  timestamptz not null default now()
);

-- Service-role only. Like workspace_files and user_credentials, this is never
-- reachable by anon/auth clients - api/app-human-checks.ts holds the service
-- role key server-side and gates every write on the ADMIN_EMAILS allowlist.
alter table public.app_human_checks enable row level security;

comment on table public.app_human_checks is
  'Admin "Human checked" sign-off per app slug for the AppTesting page. Service-role only; written via api/app-human-checks.ts (ADMIN_EMAILS-gated).';

notify pgrst, 'reload schema';
