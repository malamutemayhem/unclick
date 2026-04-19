-- ============================================================
-- UnClick Build Desk
-- Structured coding work items, AI worker registry, and dispatch
-- event log. All rows tenant-scoped by api_key_hash (SHA-256 of
-- the UnClick API key, mirroring the memory BYOD pattern).
-- ============================================================

-- Structured work items with plans + acceptance criteria
CREATE TABLE IF NOT EXISTS build_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  api_key_hash TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'planned', 'dispatched', 'in_progress', 'review', 'done', 'failed'
  )),
  plan_json JSONB,
  acceptance_criteria_json JSONB,
  assigned_worker_id UUID,
  parent_task_id UUID REFERENCES build_tasks(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_build_tasks_hash ON build_tasks(api_key_hash);
CREATE INDEX IF NOT EXISTS idx_build_tasks_status ON build_tasks(api_key_hash, status);
CREATE INDEX IF NOT EXISTS idx_build_tasks_parent ON build_tasks(parent_task_id);

-- AI coding backends (Claude Code, Codex CLI, Cursor, Gemini CLI, custom MCP)
CREATE TABLE IF NOT EXISTS build_workers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  api_key_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  worker_type TEXT NOT NULL CHECK (worker_type IN (
    'claude_code', 'codex', 'cursor_cli', 'gemini_cli', 'custom_mcp'
  )),
  connection_config_json JSONB,
  status TEXT NOT NULL DEFAULT 'offline' CHECK (status IN (
    'available', 'busy', 'offline'
  )),
  last_health_check_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_build_workers_hash ON build_workers(api_key_hash);
CREATE INDEX IF NOT EXISTS idx_build_workers_status ON build_workers(api_key_hash, status);

-- Append-only log of every dispatch, progress update, and result
CREATE TABLE IF NOT EXISTS build_dispatch_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  api_key_hash TEXT NOT NULL,
  task_id UUID NOT NULL REFERENCES build_tasks(id) ON DELETE CASCADE,
  worker_id UUID NOT NULL REFERENCES build_workers(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'dispatched', 'accepted', 'progress', 'completed', 'failed'
  )),
  payload_json JSONB
);

CREATE INDEX IF NOT EXISTS idx_build_dispatch_hash ON build_dispatch_events(api_key_hash);
CREATE INDEX IF NOT EXISTS idx_build_dispatch_task ON build_dispatch_events(task_id);
CREATE INDEX IF NOT EXISTS idx_build_dispatch_worker ON build_dispatch_events(worker_id);
