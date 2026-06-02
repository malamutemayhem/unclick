-- Tenant-level Apps on/off state for the Apps library.
-- One row per api_key_hash. disabled_apps holds the app slugs the user turned
-- OFF in the admin Apps page. Empty or missing row means every app is on
-- (backward compatible default). The MCP server reads this to hide disabled
-- apps' tools from ListTools and to refuse calls to them, so turning an app off
-- actually stops the AI from using it.
CREATE TABLE IF NOT EXISTS tenant_app_state (
  api_key_hash TEXT PRIMARY KEY,
  disabled_apps TEXT[] NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (mirror existing service-only pattern: reads/writes go through the service
-- role from the API and the MCP server, scoped by api_key_hash in the query).
ALTER TABLE tenant_app_state ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'tenant_app_state' AND policyname = 'service_role_all'
  ) THEN
    CREATE POLICY "service_role_all" ON tenant_app_state FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
END $$;
