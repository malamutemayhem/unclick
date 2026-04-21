-- Track when each BackstagePass credential was last rotated (values re-encrypted).
--
-- The admin surface uses this to surface overdue credentials with a
-- visible warning so the user knows which ones need a rotation. The
-- warning threshold is computed client-side (currently 90 days); the
-- schema just stores the raw timestamp.
--
-- Distinction from existing columns:
--   created_at       : row insert time, never changes.
--   updated_at       : any field change (label, values, is_valid, ...).
--   last_tested_at   : last time the testConnection action ran.
--   last_used_at     : last time /api/backstagepass reveal decrypted this row.
--   last_rotated_at  : last time the VALUES were re-encrypted (new secret).
--
-- Backfill for existing rows: start them at created_at so they do not
-- all appear "just rotated" the moment this migration runs. New rows
-- created after this migration land with DEFAULT NOW() via the second
-- ALTER below.

ALTER TABLE user_credentials
  ADD COLUMN IF NOT EXISTS last_rotated_at TIMESTAMPTZ;

UPDATE user_credentials
  SET last_rotated_at = created_at
  WHERE last_rotated_at IS NULL;

ALTER TABLE user_credentials
  ALTER COLUMN last_rotated_at SET DEFAULT NOW();

COMMENT ON COLUMN user_credentials.last_rotated_at IS
  'Timestamp of the last values-rotation (re-encryption) for this credential. Set to created_at on insert, updated by the BackstagePass update_values action. Drives the rotation-overdue warning in the admin UI.';
