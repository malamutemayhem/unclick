-- AI provider keys (account-scoped, login-authed, server-encrypted).
--
-- enc_scheme marks how a user_credentials row is encrypted:
--   'apikey' (default) -> AES key derived from the user's UnClick master key
--   'server'           -> AES key derived from a stable SERVER secret bound to
--                         the account lane (UNCLICK_AI_KEY_SECRET). These rows
--                         are readable on a logged-in session alone and are
--                         untouched by master-key rotation.
--
-- Additive + non-destructive. lane_hash is re-asserted here so this migration
-- is self-contained even if the Layer 1 migration has not been applied.

alter table user_credentials add column if not exists lane_hash  text;
alter table user_credentials add column if not exists enc_scheme text not null default 'apikey';
