-- Managed app connections are broker pointers, not raw credential storage.
--
-- The sensitive token/key/session lives with the managed auth provider. UnClick
-- stores only the tenant scope, platform, provider connection id, and health
-- metadata needed to show "Connected" consistently across devices.

CREATE TABLE IF NOT EXISTS managed_app_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  api_key_hash TEXT NOT NULL,
  platform_slug TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'nango',
  provider_config_key TEXT,
  external_connection_id TEXT NOT NULL,
  auth_mode TEXT NOT NULL DEFAULT 'managed_oauth',
  status TEXT NOT NULL DEFAULT 'pending',
  account_label TEXT,
  scope_summary TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  connected_at TIMESTAMPTZ,
  last_checked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT managed_app_connections_status_check
    CHECK (status IN ('pending', 'connected', 'revoked', 'error')),
  CONSTRAINT managed_app_connections_auth_mode_check
    CHECK (auth_mode IN ('managed_oauth', 'managed_api_key', 'external_mcp')),
  CONSTRAINT managed_app_connections_unique
    UNIQUE (api_key_hash, platform_slug, provider, external_connection_id)
);

CREATE INDEX IF NOT EXISTS idx_managed_app_connections_lookup
  ON managed_app_connections (api_key_hash, platform_slug, status);

CREATE INDEX IF NOT EXISTS idx_managed_app_connections_external
  ON managed_app_connections (provider, provider_config_key, external_connection_id);

ALTER TABLE managed_app_connections ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'managed_app_connections'
      AND policyname = 'service_role_all'
  ) THEN
    CREATE POLICY "service_role_all"
      ON managed_app_connections
      FOR ALL TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'managed_app_connections'
      AND policyname = 'block_anon_access'
  ) THEN
    CREATE POLICY "block_anon_access"
      ON managed_app_connections
      FOR ALL TO anon
      USING (false)
      WITH CHECK (false);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'managed_app_connections'
      AND policyname = 'block_authenticated_direct_access'
  ) THEN
    CREATE POLICY "block_authenticated_direct_access"
      ON managed_app_connections
      FOR ALL TO authenticated
      USING (false)
      WITH CHECK (false);
  END IF;
END $$;

COMMENT ON TABLE managed_app_connections IS
  'Broker-backed app connections. Stores provider connection pointers and status only, never raw customer secrets.';

COMMENT ON COLUMN managed_app_connections.external_connection_id IS
  'Opaque id from the managed auth provider. Not a token, key, or password.';

COMMENT ON COLUMN managed_app_connections.metadata IS
  'Non-secret provider metadata for status and diagnostics. Do not store credentials here.';
