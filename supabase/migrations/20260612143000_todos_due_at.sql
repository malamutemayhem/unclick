-- Jobs due dates (workspace team layer, Stage 2a chip 1).
-- Adds an optional due_at timestamp to the todo substrate so both job lanes
-- can answer "what is due today". Additive and reversible: nullable column,
-- nothing existing reads it, dropping the column restores the prior shape.
--
-- Idempotent: guarded with IF NOT EXISTS so re-applying is a safe no-op.

ALTER TABLE mc_fishbowl_todos
  ADD COLUMN IF NOT EXISTS due_at timestamptz;

-- Partial index for "due soon" reads; skips the many rows with no due date.
CREATE INDEX IF NOT EXISTS idx_mc_fishbowl_todos_tenant_due
  ON mc_fishbowl_todos(api_key_hash, due_at)
  WHERE due_at IS NOT NULL;
