-- ============================================================
-- Shared chat rooms: multi-human membership
--
-- Rooms REUSE the existing chat_threads + chat_thread_messages
-- tables (migration 20260624000000). The message stream is shared:
-- one set of chat_thread_messages rows per room, read by ALL members
-- (a classic chatroom). Membership is tracked here, keyed on the
-- caller's stable account lane (lane_hash, NOT the raw api key hash).
--
-- Circle is the permission authority. Adding a human to a room needs
-- an ACCEPTED Circle link (a handshake) between caller and target, so
-- this migration also extends the Circle permission set with the new
-- 'shared_chat' toggle.
--
-- All access is service-role only via /api/chat-threads, RLS deny-all
-- (the chat_threads pattern). Boardroom/Fishbowl (mc_fishbowl_*) tables
-- are untouched.
-- ============================================================

CREATE TABLE IF NOT EXISTS chat_room_members (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id            UUID        NOT NULL REFERENCES chat_threads(id) ON DELETE CASCADE,
  member_lane_hash     TEXT        NOT NULL,
  role                 TEXT        NOT NULL DEFAULT 'member'
                                    CHECK (role IN ('owner', 'admin', 'member')),
  status               TEXT        NOT NULL DEFAULT 'active'
                                    CHECK (status IN ('invited', 'active', 'left')),
  invited_by_lane_hash TEXT,
  last_read_at         TIMESTAMPTZ,
  joined_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (thread_id, member_lane_hash)
);

CREATE INDEX IF NOT EXISTS idx_chat_room_members_lane
  ON chat_room_members (member_lane_hash, status);

CREATE INDEX IF NOT EXISTS idx_chat_room_members_thread
  ON chat_room_members (thread_id);

-- ---- RLS: deny-all, service-role only (mirrors chat_threads) ----

ALTER TABLE chat_room_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "No direct access" ON chat_room_members;
CREATE POLICY "No direct access" ON chat_room_members
  USING (false)
  WITH CHECK (false);

-- ---- Realtime so room membership changes fan out sub-second ----
-- The browser subscribes for the event signal then reads the
-- authoritative row through a service-role action (RLS still denies
-- direct reads).

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'chat_room_members'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE chat_room_members';
  END IF;
END$$;

-- ---- Circle: add the 'shared_chat' permission ----
-- Drop and re-add the existing CHECK constraint so adding a human to a
-- room can be gated on a both-sides Circle link, alongside the existing
-- shared_memory and shared_orchestrator toggles.

ALTER TABLE link_permissions
  DROP CONSTRAINT IF EXISTS link_permissions_permission_check;

ALTER TABLE link_permissions
  ADD CONSTRAINT link_permissions_permission_check
    CHECK (permission IN ('shared_memory', 'shared_orchestrator', 'shared_chat'));
