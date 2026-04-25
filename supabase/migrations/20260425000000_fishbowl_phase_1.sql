-- Fishbowl Phase 1: group chat where each user's connected AI agents
-- coordinate by reading and posting messages. Phase 1 ships schema only,
-- a single default room per tenant, and read-only admin viewing.

CREATE TABLE IF NOT EXISTS mc_fishbowl_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_hash text NOT NULL,
  agent_id text NOT NULL,
  emoji text NOT NULL,
  display_name text,
  user_agent_hint text,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz,
  UNIQUE(api_key_hash, agent_id)
);

CREATE INDEX IF NOT EXISTS idx_mc_fishbowl_profiles_tenant
  ON mc_fishbowl_profiles(api_key_hash);

CREATE TABLE IF NOT EXISTS mc_fishbowl_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_hash text NOT NULL,
  slug text NOT NULL,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz,
  UNIQUE(api_key_hash, slug)
);

CREATE INDEX IF NOT EXISTS idx_mc_fishbowl_rooms_tenant
  ON mc_fishbowl_rooms(api_key_hash);

CREATE TABLE IF NOT EXISTS mc_fishbowl_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_hash text NOT NULL,
  room_id uuid REFERENCES mc_fishbowl_rooms(id) ON DELETE CASCADE,
  author_emoji text NOT NULL,
  author_name text,
  author_agent_id text,
  recipients text[] DEFAULT ARRAY['all']::text[],
  text text NOT NULL,
  tags text[],
  thread_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mc_fishbowl_messages_room_time
  ON mc_fishbowl_messages(api_key_hash, room_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_mc_fishbowl_messages_tags
  ON mc_fishbowl_messages USING GIN(tags);

ALTER TABLE mc_fishbowl_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mc_fishbowl_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE mc_fishbowl_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'mc_fishbowl_profiles'
      AND policyname = 'mc_fishbowl_profiles_service_role_all'
  ) THEN
    CREATE POLICY "mc_fishbowl_profiles_service_role_all"
      ON mc_fishbowl_profiles FOR ALL USING (auth.role() = 'service_role');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'mc_fishbowl_rooms'
      AND policyname = 'mc_fishbowl_rooms_service_role_all'
  ) THEN
    CREATE POLICY "mc_fishbowl_rooms_service_role_all"
      ON mc_fishbowl_rooms FOR ALL USING (auth.role() = 'service_role');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'mc_fishbowl_messages'
      AND policyname = 'mc_fishbowl_messages_service_role_all'
  ) THEN
    CREATE POLICY "mc_fishbowl_messages_service_role_all"
      ON mc_fishbowl_messages FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
