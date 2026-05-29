-- AutopilotIQ outcome ledger (Phase 0, Slice 0a) - capture only.
-- Immutable per-attempt record of what AutoPilot tried and how it ended.
-- Additive: nothing reads this table to change routing or behaviour yet.
-- Tenant-scoped and append-only. Raw inputs are never stored (only inputs_hash);
-- secrets/credentials are refused by the recorder helper before any write.

CREATE TABLE IF NOT EXISTS mc_autopilot_outcomes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_hash text NOT NULL,
  job_id text NOT NULL,
  parent_job_id text,
  attempt_n integer NOT NULL DEFAULT 1 CHECK (attempt_n >= 1),
  task_type text NOT NULL,
  actor_agent_id text NOT NULL,
  -- route_taken: { seat, model, prompt_version, tool_set }
  route_taken jsonb NOT NULL DEFAULT '{}'::jsonb,
  inputs_hash text NOT NULL,
  xpass_verdict text NOT NULL DEFAULT 'none'
    CHECK (xpass_verdict IN ('PASS', 'BLOCKER', 'HOLD', 'SUPPRESS', 'ROUTE', 'none')),
  outcome text NOT NULL
    CHECK (outcome IN ('success', 'fail', 'hold')),
  outcome_reason text NOT NULL
    CHECK (outcome_reason IN (
      'clean_pass',
      'proof_landed',
      'recovered',
      'awaiting_proof',
      'awaiting_review',
      'gated_hold',
      'xpass_fail',
      'tool_error',
      'model_refusal',
      'budget_exceeded',
      'user_revert',
      'timeout',
      'policy_block',
      'rate_limit',
      'missing_proof',
      'duplicate_claim',
      'stale_owner',
      'wrong_route',
      'unknown_error'
    )),
  confidence text NOT NULL DEFAULT 'silence'
    CHECK (confidence IN ('hard_gate', 'soft_gate', 'silence')),
  -- cost_signal: { tokens, wall_ms, usd, retries }
  cost_signal jsonb NOT NULL DEFAULT '{}'::jsonb,
  human_touch text NOT NULL DEFAULT 'auto'
    CHECK (human_touch IN ('auto', 'edited', 'reverted', 'approved')),
  receipt_id text,
  idempotency_key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  closed_at timestamptz,
  seq bigserial UNIQUE
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_mc_autopilot_outcomes_idempotency
  ON mc_autopilot_outcomes(api_key_hash, idempotency_key);

CREATE INDEX IF NOT EXISTS idx_mc_autopilot_outcomes_job
  ON mc_autopilot_outcomes(api_key_hash, job_id, attempt_n DESC);

CREATE INDEX IF NOT EXISTS idx_mc_autopilot_outcomes_task_type
  ON mc_autopilot_outcomes(api_key_hash, task_type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_mc_autopilot_outcomes_outcome
  ON mc_autopilot_outcomes(api_key_hash, outcome, outcome_reason, created_at DESC);

ALTER TABLE mc_autopilot_outcomes ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'mc_autopilot_outcomes'
      AND policyname = 'mc_autopilot_outcomes_service_role_all'
  ) THEN
    CREATE POLICY "mc_autopilot_outcomes_service_role_all"
      ON mc_autopilot_outcomes FOR ALL USING (auth.role() = 'service_role');
  END IF;
END$$;

NOTIFY pgrst, 'reload schema';
