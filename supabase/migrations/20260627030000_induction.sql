-- ─── Induction: the onboarding an AI agent reads when it connects ────────────
--
-- The Induction is an ordered, grouped checklist of easy-English rules that a
-- connected agent is meant to read top-to-bottom (Phase 2 adds a connect-time
-- gate that forces the reading). It is GLOBAL platform content, not per-tenant:
-- one induction ships to every UnClick account. It is edited from the admin
-- page /admin/induction and brokered entirely by api/induction.ts.
--
-- Convention: mc_* managed-cloud tables are service_role-only. RLS is enabled
-- with NO policies so the service role (used by api/induction.ts) is the only
-- writer/reader; the public GET in that endpoint is read-only and unscoped by
-- design (the content is the same for everyone). When the table is empty the
-- endpoint falls back to the built-in DEFAULT_INDUCTION, so seeding here is not
-- required and the default content stays in one place (TypeScript).

CREATE TABLE IF NOT EXISTS mc_induction_rows (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section       TEXT NOT NULL,
  section_order INTEGER NOT NULL DEFAULT 0,
  position      INTEGER NOT NULL DEFAULT 0,
  rule          TEXT NOT NULL,
  why           TEXT,
  enabled       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE mc_induction_rows ENABLE ROW LEVEL SECURITY;
-- No policies on purpose: service_role bypasses RLS, same as the other mc_*
-- managed tables. All access goes through api/induction.ts.

CREATE INDEX IF NOT EXISTS mc_induction_rows_order_idx
  ON mc_induction_rows (section_order, position);
