-- ============================================================
-- UnClick Tenant Settings
-- Per-API-key key/value store for opt-in toggles like
-- autoload (whether the MCP server pre-loads memory at session
-- start) and other preferences. Decoupled from memory_configs
-- so users on local-storage memory still have settings.
-- ============================================================

CREATE TABLE IF NOT EXISTS tenant_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_hash TEXT NOT NULL,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(api_key_hash, key)
);

CREATE INDEX IF NOT EXISTS idx_tenant_settings_hash ON tenant_settings(api_key_hash);
