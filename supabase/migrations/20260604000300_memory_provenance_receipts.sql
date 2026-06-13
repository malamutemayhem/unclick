-- Lane-03 (migration band 01xx): Provenance & Memory Receipts
--
-- Adds the three canonical provenance columns to the facts tables so every
-- durable memory can carry a receipt:
--   - source_agent_id : THE single agent-identity column (owner == source) -
--                       which agent learned/wrote this fact.
--   - source_ref      : origin pointer (url / tool-call id / message id / pr /
--                       commit). Never a secret (sanitised in code on write).
--   - receipt_id      : link to an XPass/AnswerPass/conversation receipt, when
--                       one exists.
-- confidence already exists on these tables and is treated as first-class
-- provenance (no schema change needed for it).
--
-- Reused, already present (no rename): extractor_id, prompt_version, model_id,
-- commit_sha, pr_number.
--
-- Additive and idempotent. Behaviour is gated in code behind
-- MEMORY_PROVENANCE_ENABLED (default off); these columns are inert until the
-- coordinator flips the flag during integration.

-- Managed cloud
ALTER TABLE mc_extracted_facts
  ADD COLUMN IF NOT EXISTS source_agent_id TEXT,
  ADD COLUMN IF NOT EXISTS source_ref      TEXT,
  ADD COLUMN IF NOT EXISTS receipt_id      TEXT;

COMMENT ON COLUMN mc_extracted_facts.source_agent_id IS
  'Lane-03 provenance: the single agent-identity column (owner == source) - which agent learned/wrote this fact.';
COMMENT ON COLUMN mc_extracted_facts.source_ref IS
  'Lane-03 provenance: origin pointer (url / tool-call id / message id / pr / commit). Never a secret.';
COMMENT ON COLUMN mc_extracted_facts.receipt_id IS
  'Lane-03 provenance: link to an XPass/AnswerPass/conversation receipt, when one exists.';

CREATE INDEX IF NOT EXISTS idx_mc_ef_provenance
  ON mc_extracted_facts (api_key_hash, source_agent_id)
  WHERE source_agent_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_mc_ef_receipt
  ON mc_extracted_facts (api_key_hash, receipt_id)
  WHERE receipt_id IS NOT NULL;

-- BYOD
ALTER TABLE extracted_facts
  ADD COLUMN IF NOT EXISTS source_agent_id TEXT,
  ADD COLUMN IF NOT EXISTS source_ref      TEXT,
  ADD COLUMN IF NOT EXISTS receipt_id      TEXT;

COMMENT ON COLUMN extracted_facts.source_agent_id IS
  'Lane-03 provenance: the single agent-identity column (owner == source) - which agent learned/wrote this fact.';
COMMENT ON COLUMN extracted_facts.source_ref IS
  'Lane-03 provenance: origin pointer (url / tool-call id / message id / pr / commit). Never a secret.';
COMMENT ON COLUMN extracted_facts.receipt_id IS
  'Lane-03 provenance: link to an XPass/AnswerPass/conversation receipt, when one exists.';

CREATE INDEX IF NOT EXISTS idx_ef_provenance
  ON extracted_facts (source_agent_id)
  WHERE source_agent_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_ef_receipt
  ON extracted_facts (receipt_id)
  WHERE receipt_id IS NOT NULL;
