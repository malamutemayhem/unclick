-- XGate control ledger and kill switch state.
-- Service-role storage for pre-execution decisions.

CREATE TABLE IF NOT EXISTS mc_xgate_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ts timestamptz NOT NULL DEFAULT now(),
  api_key_hash text,
  agent_id text,
  session_id text,
  client text,
  model text,
  action_class text NOT NULL,
  tool text NOT NULL,
  target text NOT NULL DEFAULT '',
  environment text NOT NULL CHECK (environment IN ('dev', 'staging', 'prod')),
  verdict text NOT NULL CHECK (verdict IN ('allow', 'deny', 'ask', 'rewrite')),
  rule_id text NOT NULL,
  reason text NOT NULL,
  authority text NOT NULL CHECK (authority IN ('auto', 'human', 'token', 'kill_switch')),
  proof_ref text,
  reversal text
);

CREATE INDEX IF NOT EXISTS idx_mc_xgate_ledger_api_key_ts
  ON mc_xgate_ledger(api_key_hash, ts DESC);

CREATE INDEX IF NOT EXISTS idx_mc_xgate_ledger_session
  ON mc_xgate_ledger(session_id, ts DESC);

CREATE INDEX IF NOT EXISTS idx_mc_xgate_ledger_rule
  ON mc_xgate_ledger(rule_id, ts DESC);

CREATE INDEX IF NOT EXISTS idx_mc_xgate_ledger_verdict
  ON mc_xgate_ledger(verdict, ts DESC);

ALTER TABLE mc_xgate_ledger ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE mc_xgate_ledger FROM anon, authenticated;
GRANT ALL ON TABLE mc_xgate_ledger TO service_role;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'mc_xgate_ledger'
      AND policyname = 'mc_xgate_ledger_service_role_all'
  ) THEN
    CREATE POLICY "mc_xgate_ledger_service_role_all"
      ON mc_xgate_ledger FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS mc_xgate_killswitch (
  api_key_hash text PRIMARY KEY,
  active boolean NOT NULL DEFAULT false,
  reason text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mc_xgate_killswitch_active
  ON mc_xgate_killswitch(active)
  WHERE active = true;

ALTER TABLE mc_xgate_killswitch ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE mc_xgate_killswitch FROM anon, authenticated;
GRANT ALL ON TABLE mc_xgate_killswitch TO service_role;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'mc_xgate_killswitch'
      AND policyname = 'mc_xgate_killswitch_service_role_all'
  ) THEN
    CREATE POLICY "mc_xgate_killswitch_service_role_all"
      ON mc_xgate_killswitch FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
END$$;

NOTIFY pgrst, 'reload schema';
