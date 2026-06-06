-- lane-08: decay, effective score, and consolidation receipts
-- Reserved migration band: 07xx.

ALTER TABLE IF EXISTS mc_extracted_facts
  ADD COLUMN IF NOT EXISTS effective_score REAL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS decayed_confidence REAL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS heat_score REAL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_decay_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS decay_reason TEXT,
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS consolidation_group_id TEXT,
  ADD COLUMN IF NOT EXISTS consolidation_receipt JSONB;

ALTER TABLE IF EXISTS extracted_facts
  ADD COLUMN IF NOT EXISTS effective_score REAL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS decayed_confidence REAL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS heat_score REAL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_decay_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS decay_reason TEXT,
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS consolidation_group_id TEXT,
  ADD COLUMN IF NOT EXISTS consolidation_receipt JSONB;

CREATE INDEX IF NOT EXISTS idx_mc_ef_lane08_effective_score
  ON mc_extracted_facts(api_key_hash, status, decay_tier, effective_score DESC);

CREATE INDEX IF NOT EXISTS idx_ef_lane08_effective_score
  ON extracted_facts(status, decay_tier, effective_score DESC);

CREATE INDEX IF NOT EXISTS idx_mc_ef_lane08_consolidation_group
  ON mc_extracted_facts(api_key_hash, consolidation_group_id)
  WHERE consolidation_group_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_ef_lane08_consolidation_group
  ON extracted_facts(consolidation_group_id)
  WHERE consolidation_group_id IS NOT NULL;

COMMENT ON COLUMN mc_extracted_facts.effective_score IS
  'lane-08 computed ordering input for memory retrieval and startup heat.';
COMMENT ON COLUMN extracted_facts.effective_score IS
  'lane-08 computed ordering input for memory retrieval and startup heat.';

COMMENT ON COLUMN mc_extracted_facts.consolidation_receipt IS
  'lane-08 JSON receipt recording duplicate collapse provenance union.';
COMMENT ON COLUMN extracted_facts.consolidation_receipt IS
  'lane-08 JSON receipt recording duplicate collapse provenance union.';
