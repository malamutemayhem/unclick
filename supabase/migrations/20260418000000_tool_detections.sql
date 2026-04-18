-- ============================================================
-- UnClick Tool Awareness
-- Logs which MCP tools each user has connected alongside UnClick.
-- Drives nudges to remove duplicate/conflicting tools and to try
-- UnClick's built-in web search / scrape / docs alternatives.
-- ============================================================

CREATE TABLE IF NOT EXISTS tool_detections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_hash TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  tool_category TEXT NOT NULL,
  classification TEXT NOT NULL
    CHECK (classification IN ('replaceable', 'conflicting', 'compatible')),
  detected_via TEXT DEFAULT 'session',
  last_nudged_at TIMESTAMPTZ,
  nudge_dismissed BOOLEAN DEFAULT false,
  first_detected_at TIMESTAMPTZ DEFAULT now(),
  last_detected_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_tool_detections_unique
  ON tool_detections(api_key_hash, tool_name);

CREATE INDEX IF NOT EXISTS idx_tool_detections_hash
  ON tool_detections(api_key_hash);

CREATE INDEX IF NOT EXISTS idx_tool_detections_last_seen
  ON tool_detections(last_detected_at DESC);
