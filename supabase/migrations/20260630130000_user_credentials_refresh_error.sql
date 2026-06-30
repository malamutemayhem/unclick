-- Connector vault: surface WHY an OAuth refresh failed.
--
-- When a stored access token is expiring and api/credentials.ts tries to mint a
-- fresh one via the refresh_token, that refresh can fail for a precise reason
-- (no refresh token saved, missing server client env, the provider rejected the
-- grant, the provider was unreachable). Today the failure is swallowed and the
-- stale token is returned, so the operator only ever sees an opaque "reauth
-- required" much later. These two columns record the LAST refresh failure so the
-- Apps page can tell the user exactly what to fix (and clear it on success).
--
-- This migration is ADDITIVE and NON-DESTRUCTIVE: both columns are nullable and
-- added with IF NOT EXISTS. No existing row, value, index, or behaviour changes.
--
-- RLS IS DELIBERATELY UNCHANGED. The service-role-only policies from
-- 20260420030000_user_credentials.sql still fully govern this table; these
-- columns are written/read only by the Vercel API functions using
-- SUPABASE_SERVICE_ROLE_KEY. This file adds NO policy and weakens nothing. The
-- reason stored here is a short string code (e.g. "provider_rejected:400"),
-- never a token value or secret.

ALTER TABLE public.user_credentials
  ADD COLUMN IF NOT EXISTS last_refresh_error text;

ALTER TABLE public.user_credentials
  ADD COLUMN IF NOT EXISTS last_refresh_error_at timestamptz;

COMMENT ON COLUMN public.user_credentials.last_refresh_error IS
  'Last OAuth refresh failure reason code (no_refresh_token, no_config, missing_client_env, provider_rejected:<status>, network_error). NULL once a refresh succeeds. Never a token or secret.';
COMMENT ON COLUMN public.user_credentials.last_refresh_error_at IS
  'Timestamp of the last OAuth refresh failure recorded in last_refresh_error. NULL once a refresh succeeds.';

-- Reload PostgREST schema cache so the new columns are selectable immediately.
notify pgrst, 'reload schema';
