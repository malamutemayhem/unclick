-- ============================================================
-- UnClick Chat
--
-- Chat is a conversation surface beside the Orchestrator Story /
-- Timeline / Log. It hosts two kinds of conversation:
--   human   - person to person rooms
--   agent   - a human talking to one or more AI seats
--   council - a human talking to a team of seats that deliberate
--
-- A seat is AI capacity of one explicit lane:
--   subscription - spawned through Crews / MCP sampling (your plan)
--   api          - server proxied on your own provider key (the vault)
--   local        - an offline model on your machine (browser direct)
--
-- The lane is always stamped on the row and never inferred, so the
-- system cannot mistake a subscription seat for an api seat.
--
-- All access is service-role only via /api/memory-admin and /api/chat,
-- scoped by api_key_hash, RLS deny-all (the chat_messages pattern).
-- ============================================================

CREATE TABLE IF NOT EXISTS chat_threads (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_hash    TEXT        NOT NULL,
  kind            TEXT        NOT NULL DEFAULT 'agent'
                               CHECK (kind IN ('human', 'agent', 'council')),
  title           TEXT,
  created_by      TEXT        NOT NULL,
  -- Typed roster. Each member is { type: 'human' | 'seat', id,
  -- seat_id?, seat_lane?: 'subscription' | 'api' | 'local',
  -- provider?, model? }. No provider key is ever stored here.
  participants    JSONB       NOT NULL DEFAULT '[]'::jsonb,
  metadata        JSONB       NOT NULL DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_threads_owner
  ON chat_threads (api_key_hash, kind, updated_at DESC);

CREATE TABLE IF NOT EXISTS chat_thread_messages (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_hash    TEXT        NOT NULL,
  thread_id       UUID        NOT NULL REFERENCES chat_threads(id) ON DELETE CASCADE,
  sender_id       TEXT        NOT NULL,
  sender_kind     TEXT        NOT NULL
                               CHECK (sender_kind IN ('human', 'agent', 'system')),
  -- Set when sender_kind = 'agent'. seat_lane is the explicit lane the
  -- turn ran on; model is stamped per message for attribution and the
  -- per-model token meter.
  seat_id         TEXT,
  seat_lane       TEXT        CHECK (seat_lane IN ('subscription', 'api', 'local')),
  model           TEXT,
  content         TEXT        NOT NULL,
  status          TEXT        NOT NULL DEFAULT 'complete'
                               CHECK (status IN ('streaming', 'complete', 'error')),
  -- Token counts drive the live per-model meter. Null until known;
  -- local turns may estimate.
  tokens_in       INTEGER,
  tokens_out      INTEGER,
  metadata        JSONB       NOT NULL DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_thread_messages_thread
  ON chat_thread_messages (api_key_hash, thread_id, created_at);

-- ---- RLS: deny-all, service-role only (mirrors chat_messages) ----

ALTER TABLE chat_threads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "No direct access" ON chat_threads;
CREATE POLICY "No direct access" ON chat_threads
  USING (false)
  WITH CHECK (false);

ALTER TABLE chat_thread_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "No direct access" ON chat_thread_messages;
CREATE POLICY "No direct access" ON chat_thread_messages
  USING (false)
  WITH CHECK (false);

-- ---- Realtime so the Chat window gets sub-second fan-out ----
-- The browser subscribes for the event signal then reads the
-- authoritative row through a service-role action (RLS still denies
-- direct reads).

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'chat_thread_messages'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE chat_thread_messages';
  END IF;
END$$;
