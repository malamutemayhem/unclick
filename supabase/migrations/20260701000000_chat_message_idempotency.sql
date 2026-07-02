-- ============================================================
-- Chat message send idempotency
--
-- Every mainstream chat protocol makes sends retry-safe with a
-- client-chosen key (Matrix txnId, Slack client_msg_id). The chat
-- composer now stamps each human turn with a client_msg_id UUID; a
-- unique index per thread means a double-click, a flaky network
-- retry, or a re-run serverless invocation can never duplicate the
-- turn. NULL is allowed (agent turns and older clients do not send
-- one) and the partial index ignores it.
-- ============================================================

ALTER TABLE chat_thread_messages
  ADD COLUMN IF NOT EXISTS client_msg_id TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_chat_thread_messages_client_msg
  ON chat_thread_messages (thread_id, client_msg_id)
  WHERE client_msg_id IS NOT NULL;
