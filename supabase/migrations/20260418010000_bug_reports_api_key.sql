-- Scope bug_reports to an api_key_hash so users can see their own submissions
-- from the admin panel. The table is assumed to already exist (provisioned
-- manually per api/report-bug.ts header comment). This migration is idempotent.

ALTER TABLE IF EXISTS bug_reports
  ADD COLUMN IF NOT EXISTS api_key_hash TEXT;

CREATE INDEX IF NOT EXISTS idx_bug_reports_api_key_hash
  ON bug_reports(api_key_hash, created_at DESC);
