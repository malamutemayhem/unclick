-- Tenant settings table + AI chat columns.
-- tenant_settings is keyed by the same api_key_hash used in memory_configs,
-- memory_devices, etc. One row per workspace/tenant.

CREATE TABLE IF NOT EXISTS tenant_settings (
  api_key_hash text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE tenant_settings
  ADD COLUMN IF NOT EXISTS ai_chat_enabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS ai_chat_provider text NOT NULL DEFAULT 'google',
  ADD COLUMN IF NOT EXISTS ai_chat_model text NOT NULL DEFAULT 'gemini-2.0-flash',
  ADD COLUMN IF NOT EXISTS ai_chat_api_key_encrypted text,
  ADD COLUMN IF NOT EXISTS ai_chat_system_prompt text,
  ADD COLUMN IF NOT EXISTS ai_chat_max_turns integer NOT NULL DEFAULT 20;

CREATE INDEX IF NOT EXISTS tenant_settings_ai_chat_enabled_idx
  ON tenant_settings (ai_chat_enabled)
  WHERE ai_chat_enabled = true;
