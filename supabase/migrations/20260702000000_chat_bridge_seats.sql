-- ============================================================
-- Subscription seat bridge
--
-- The subscription seat lane runs a chat turn on the user's OWN
-- consumer plan (Claude Pro/Max via the Claude Code CLI, ChatGPT
-- Plus/Pro via the Codex CLI). Those CLIs are signed in on the
-- user's machine, so the server never talks to a provider for this
-- lane. Instead the website enqueues a job here and a small local
-- bridge worker (npx @unclick/mcp-server seat-bridge) claims it,
-- runs the CLI headless, and posts the reply back.
--
--   chat_bridge_seats - one row per registered local bridge worker;
--                       last_seen_at drives online/offline presence.
--   chat_bridge_jobs  - queued subscription seat turns and results.
--
-- No provider credential, OAuth token, or CLI session material is
-- EVER stored in these tables. The bridge authenticates with the
-- account's uc_/agt_ key like any other worker; jobs carry only the
-- composed prompt text and the reply.
--
-- All access is service-role only via /api/chat-bridge, scoped by
-- api_key_hash, RLS deny-all (the chat_threads pattern).
-- ============================================================

CREATE TABLE IF NOT EXISTS chat_bridge_seats (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_hash    TEXT        NOT NULL,
  -- Which official CLI the bridge drives (claude-code, codex-cli,
  -- gemini-cli, copilot-cli, cursor-cli, ...). The runtime is the traffic
  -- channel, never an auth gate (see docs/prd/chat.md, lane rules). The
  -- CHECK is a format guard; the live allowlist is enforced app-side
  -- (packages/mcp-server/src/seat-bridge-runtimes.ts) so adding a runtime
  -- does not need a migration.
  runtime         TEXT        NOT NULL
                               CHECK (runtime ~ '^[a-z0-9][a-z0-9-]{0,31}$'),
  handle          TEXT        NOT NULL,
  label           TEXT,
  last_seen_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (api_key_hash, handle)
);

CREATE INDEX IF NOT EXISTS idx_chat_bridge_seats_lane
  ON chat_bridge_seats (api_key_hash, last_seen_at DESC);

CREATE TABLE IF NOT EXISTS chat_bridge_jobs (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  -- The enqueuing caller's lane. The bridge may only claim jobs on
  -- its own lane.
  api_key_hash    TEXT        NOT NULL,
  -- The lane the finished assistant turn persists under (the thread
  -- owner's lane for shared rooms), resolved at enqueue time.
  persist_lane    TEXT,
  thread_id       UUID,
  seat_handle     TEXT        NOT NULL,
  runtime         TEXT        NOT NULL
                               CHECK (runtime ~ '^[a-z0-9][a-z0-9-]{0,31}$'),
  status          TEXT        NOT NULL DEFAULT 'pending'
                               CHECK (status IN ('pending', 'claimed', 'done', 'error')),
  -- The chat Build-mode toggle for this turn. The bridge passes it to the
  -- tool child, which enforces the same read/build endpoint policy as the
  -- api lane (packages/mcp-server/src/tool-mode-policy.ts).
  tool_mode       TEXT        NOT NULL DEFAULT 'read'
                               CHECK (tool_mode IN ('read', 'build')),
  -- Composed prompt material only. Never a key, never CLI auth state.
  system          TEXT,
  prompt          TEXT        NOT NULL,
  -- Image attachments for the turn: [{name, media_type, data}] with data
  -- base64 encoded. Size-capped at enqueue and scrubbed to [] when the
  -- job finishes so the queue table stays lean.
  attachments     JSONB       NOT NULL DEFAULT '[]'::jsonb,
  result_content  TEXT,
  error           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  claimed_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_chat_bridge_jobs_queue
  ON chat_bridge_jobs (api_key_hash, status, created_at);

-- ---- RLS: deny-all, service-role only (mirrors chat_threads) ----

ALTER TABLE chat_bridge_seats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "No direct access" ON chat_bridge_seats;
CREATE POLICY "No direct access" ON chat_bridge_seats
  USING (false)
  WITH CHECK (false);

ALTER TABLE chat_bridge_jobs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "No direct access" ON chat_bridge_jobs;
CREATE POLICY "No direct access" ON chat_bridge_jobs
  USING (false)
  WITH CHECK (false);

COMMENT ON TABLE chat_bridge_seats IS
  'Registered local subscription-seat bridge workers. last_seen_at drives presence.';
COMMENT ON TABLE chat_bridge_jobs IS
  'Queued subscription seat chat turns. Prompt text and replies only; no credentials.';

NOTIFY pgrst, 'reload schema';
