-- Connector vault: server-scheme login-connect support.
--
-- Lets a logged-in user connect apps (OAuth / API-key credentials) WITHOUT
-- pasting or minting their private UnClick api key. Such rows are stored on
-- user_credentials with enc_scheme = 'server' and are bound to the account lane
-- (lane_hash), encrypted with the stable server secret UNCLICK_AI_KEY_SECRET -
-- the exact scheme already shipped for AI provider keys
-- (20260629090000_ai_provider_keys_enc_scheme.sql) and api/ai-provider-key.ts.
--
-- This migration is ADDITIVE and NON-DESTRUCTIVE: it only adds a lookup index.
-- The lane_hash and enc_scheme columns already exist from migration
-- 20260629090000; they are NOT re-added here. enc_scheme still defaults
-- 'apikey', so existing rows and the agent (vault-bridge UNCLICK_API_KEY) path
-- are unchanged.
--
-- RLS IS DELIBERATELY UNCHANGED. The service-role-only policies from
-- 20260420030000_user_credentials.sql (service_role FOR ALL; anon and
-- authenticated denied) still fully govern this table. Server-scheme rows are
-- read/written only by the Vercel API functions using SUPABASE_SERVICE_ROLE_KEY;
-- anon/authenticated clients remain blocked. This file adds NO policy and
-- weakens nothing.

-- Partial index for the server-scheme lookup path
-- (api/credentials.ts and api/ai-provider-key.ts):
--   ...?lane_hash=eq.<lane>&enc_scheme=eq.server&platform_slug=eq.<slug>
-- Scoped to enc_scheme = 'server' so it stays small and only covers the
-- login-connect rows, leaving the existing api_key_hash indexes untouched.
CREATE INDEX IF NOT EXISTS idx_user_credentials_lane_platform_server
  ON user_credentials (lane_hash, platform_slug)
  WHERE enc_scheme = 'server';
