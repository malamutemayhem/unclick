-- XGate mode setting: the live 3-state dial (off / shadow / block).
-- One shared row keyed 'global' (this deployment shares one XGate posture,
-- mirroring the routing scorecard's 'global' scope). The admin dashboard writes
-- it; the preflight hot path reads it (with a short cache) so the dial controls
-- behaviour live, replacing the UNCLICK_XGATE_MODE env + redeploy. When no row
-- exists the hot path falls back to the env default (shadow), so this is safe
-- to apply before the UI ships.

CREATE TABLE IF NOT EXISTS mc_xgate_settings (
  api_key_hash text PRIMARY KEY,
  mode text NOT NULL DEFAULT 'shadow' CHECK (mode IN ('off', 'shadow', 'block')),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE mc_xgate_settings ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE mc_xgate_settings FROM anon, authenticated;
GRANT ALL ON TABLE mc_xgate_settings TO service_role;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'mc_xgate_settings'
      AND policyname = 'mc_xgate_settings_service_role_all'
  ) THEN
    CREATE POLICY "mc_xgate_settings_service_role_all"
      ON mc_xgate_settings FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
END$$;

NOTIFY pgrst, 'reload schema';
