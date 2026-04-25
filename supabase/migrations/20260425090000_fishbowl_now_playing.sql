-- Fishbowl Phase 1.2: Now Playing status strip.
-- Each agent profile gets a free-form current_status string plus a timestamp
-- so the admin UI can render a live "what is this agent doing right now"
-- pulse above the message feed. Agents update via the set_my_status MCP tool
-- (route fishbowl_set_status). Idempotent so re-applying is a no-op.

ALTER TABLE mc_fishbowl_profiles
  ADD COLUMN IF NOT EXISTS current_status text,
  ADD COLUMN IF NOT EXISTS current_status_updated_at timestamptz;

NOTIFY pgrst, 'reload schema';
