-- Worker 9, 02xx band: facts-vs-events typed memory split.
-- Default behavior remains off until MEMORY_TYPED_SPLIT_ENABLED is enabled.

ALTER TABLE IF EXISTS mc_extracted_facts
  ADD COLUMN IF NOT EXISTS memory_class TEXT NOT NULL DEFAULT 'semantic';

ALTER TABLE IF EXISTS extracted_facts
  ADD COLUMN IF NOT EXISTS memory_class TEXT NOT NULL DEFAULT 'semantic';

DO $$
BEGIN
  IF to_regclass('public.mc_extracted_facts') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'mc_extracted_facts_memory_class_check'
         AND conrelid = 'public.mc_extracted_facts'::regclass
     ) THEN
    ALTER TABLE mc_extracted_facts
      ADD CONSTRAINT mc_extracted_facts_memory_class_check
      CHECK (memory_class IN ('episodic', 'semantic', 'procedural', 'task'));
  END IF;

  IF to_regclass('public.extracted_facts') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'extracted_facts_memory_class_check'
         AND conrelid = 'public.extracted_facts'::regclass
     ) THEN
    ALTER TABLE extracted_facts
      ADD CONSTRAINT extracted_facts_memory_class_check
      CHECK (memory_class IN ('episodic', 'semantic', 'procedural', 'task'));
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS mc_session_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_hash TEXT NOT NULL,
  session_id TEXT,
  memory_class TEXT NOT NULL DEFAULT 'episodic'
    CHECK (memory_class IN ('episodic', 'semantic', 'procedural', 'task')),
  event_kind TEXT NOT NULL DEFAULT 'episode',
  content TEXT NOT NULL,
  summary TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  source_fact_id UUID REFERENCES mc_extracted_facts(id) ON DELETE SET NULL,
  source_session_summary_id UUID REFERENCES mc_session_summaries(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mc_session_events_tenant_recent
  ON mc_session_events(api_key_hash, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_mc_session_events_tenant_session_recent
  ON mc_session_events(api_key_hash, session_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_mc_session_events_tenant_class_recent
  ON mc_session_events(api_key_hash, memory_class, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_mc_session_events_payload
  ON mc_session_events USING GIN(payload);

CREATE TABLE IF NOT EXISTS session_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT,
  memory_class TEXT NOT NULL DEFAULT 'episodic'
    CHECK (memory_class IN ('episodic', 'semantic', 'procedural', 'task')),
  event_kind TEXT NOT NULL DEFAULT 'episode',
  content TEXT NOT NULL,
  summary TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  source_fact_id UUID REFERENCES extracted_facts(id) ON DELETE SET NULL,
  source_session_summary_id UUID REFERENCES session_summaries(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_session_events_recent
  ON session_events(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_session_events_session_recent
  ON session_events(session_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_session_events_class_recent
  ON session_events(memory_class, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_session_events_payload
  ON session_events USING GIN(payload);

COMMENT ON COLUMN mc_extracted_facts.memory_class IS
  'Worker 9 typed memory class. Episodic rows are excluded from fact search when MEMORY_TYPED_SPLIT_ENABLED is on.';

COMMENT ON COLUMN extracted_facts.memory_class IS
  'Worker 9 typed memory class. Episodic rows are excluded from fact search when MEMORY_TYPED_SPLIT_ENABLED is on.';
