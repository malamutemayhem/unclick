-- user_credentials: add status columns the BackstagePass admin UI
-- needs to show per-credential health and surface rotation reminders.
--
-- Why these columns live on user_credentials (the encrypted vault) and
-- not on platform_credentials (the older Keychain-MVP table, which
-- already has is_valid / last_tested_at): the admin UI is being
-- unified onto user_credentials as the single source of truth for
-- BackstagePass. Keeping the status inline avoids a join and a schema-
-- drift trap where two tables disagree about whether a credential is
-- active. platform_credentials stays for backwards compatibility with
-- older MCP flows but is no longer read by the admin UI.
--
-- Defaults:
--   is_valid       DEFAULT TRUE   — credentials are assumed good at insert
--                                   time; flipped to FALSE when a
--                                   test-connection action fails.
--   last_tested_at DEFAULT NULL   — never tested until the UI pings it.
--   last_used_at   DEFAULT NULL   — set by the MCP vault-bridge when a
--                                   decrypt actually happens in the wild.

ALTER TABLE user_credentials
  ADD COLUMN IF NOT EXISTS is_valid        BOOLEAN       DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS last_tested_at  TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_used_at    TIMESTAMPTZ;

-- Index for the common "show me credentials that haven't been touched
-- in a while" / rotation-reminder scan. Partial index so we only pay
-- for rows that have ever been tested.
CREATE INDEX IF NOT EXISTS idx_user_credentials_last_tested
  ON user_credentials (last_tested_at DESC NULLS LAST)
  WHERE last_tested_at IS NOT NULL;

COMMENT ON COLUMN user_credentials.is_valid IS
  'Whether the last test-connection succeeded. Defaults to TRUE until a test fails.';

COMMENT ON COLUMN user_credentials.last_tested_at IS
  'When the credential was last pinged against its platform. NULL = never tested.';

COMMENT ON COLUMN user_credentials.last_used_at IS
  'When the credential was last decrypted and used by the MCP vault-bridge. NULL = never read by an agent.';
