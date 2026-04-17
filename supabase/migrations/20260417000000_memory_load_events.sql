-- ============================================================
-- UnClick Memory Reliability Instrumentation
-- Logs every MCP tool call so we can measure whether agents
-- are calling get_startup_context first in each session.
-- ============================================================

CREATE TABLE IF NOT EXISTS memory_load_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_hash TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  client_type TEXT,
  was_first_call_in_session BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mle_api_key_hash ON memory_load_events(api_key_hash);
CREATE INDEX IF NOT EXISTS idx_mle_created_at ON memory_load_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mle_tool_name ON memory_load_events(tool_name);
CREATE INDEX IF NOT EXISTS idx_mle_hash_created
  ON memory_load_events(api_key_hash, created_at DESC);
