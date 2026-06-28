-- Layer 1 of the rotation-safe connections fix.
--
-- Problem: user_credentials is scoped only by api_key_hash (the API key that
-- was active when the row was saved). Rotating the key changes api_key_hash, so
-- the lookup (which uses the CURRENT key) no longer finds the rows and the app
-- shows "Connected 0" even though nothing was deleted.
--
-- Fix (Layer 1, non-crypto): add a stable lane_hash so connections are scoped to
-- the account lane, which survives rotation. Reads switch to lane_hash; a row
-- whose api_key_hash != the current key is flagged "needs reconnect" in the UI.
-- (Layer 2 adds the umbrella vault key so reconnect is not even needed.)
--
-- This migration is additive and non-destructive: it only adds a column, an
-- index, and a conservative backfill. No secret data is moved or re-encrypted.

alter table user_credentials add column if not exists lane_hash text;

-- Backfill: link each credential to its account's stable lane via the api_keys
-- row whose key_hash OR lane_hash matches the credential's recorded
-- api_key_hash. Rows under fully-retired keys (no matching api_keys row) stay
-- null: those are the already-orphaned connections that need a one-time
-- reconnect, and they must not be guessed at.
update user_credentials uc
set lane_hash = ak.lane_hash
from api_keys ak
where uc.lane_hash is null
  and ak.lane_hash is not null
  and (uc.api_key_hash = ak.key_hash or uc.api_key_hash = ak.lane_hash);

-- Lane-scoped reads need this index.
create index if not exists user_credentials_lane_hash_idx
  on user_credentials (lane_hash);
