-- Seat identity and Boardroom post cadence fields.
-- Additive only: values remain nullable and are not populated by this migration.

ALTER TABLE mc_agents
  ADD COLUMN IF NOT EXISTS did text,
  ADD COLUMN IF NOT EXISTS public_key text,
  ADD COLUMN IF NOT EXISTS backstage_pass_id uuid REFERENCES user_credentials(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_mc_agents_did
  ON mc_agents(did)
  WHERE did IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_mc_agents_backstage_pass_id
  ON mc_agents(backstage_pass_id)
  WHERE backstage_pass_id IS NOT NULL;

ALTER TABLE mc_fishbowl_profiles
  ADD COLUMN IF NOT EXISTS last_posted_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_mc_fishbowl_profiles_last_posted
  ON mc_fishbowl_profiles(api_key_hash, last_posted_at DESC)
  WHERE last_posted_at IS NOT NULL;

COMMENT ON COLUMN mc_agents.did IS
  'Optional public decentralized identifier for a seat or agent.';
COMMENT ON COLUMN mc_agents.public_key IS
  'Optional public verification key material for seat identity.';
COMMENT ON COLUMN mc_agents.backstage_pass_id IS
  'Optional link to the user credential row that backs this seat identity.';
COMMENT ON COLUMN mc_fishbowl_profiles.last_posted_at IS
  'Timestamp of the profile author''s most recent Boardroom post. Passive reads and status pings do not update this value.';

NOTIFY pgrst, 'reload schema';
