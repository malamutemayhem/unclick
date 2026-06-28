-- Circle account links: people-linking under Connections.
--
-- Contracts stay neutral (account_links/link_permissions/link_access_audit).
-- The UI label "Circle" lives in src/config/product-names.ts only.
-- No API keys, connector credentials, or customer secrets are stored here.

CREATE TABLE IF NOT EXISTS account_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  recipient_email_norm TEXT GENERATED ALWAYS AS (lower(btrim(recipient_email))) STORED,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT account_links_status_check
    CHECK (status IN ('pending', 'accepted', 'declined', 'cancelled', 'unlinked')),
  CONSTRAINT account_links_not_self_check
    CHECK (recipient_user_id IS NULL OR requester_user_id <> recipient_user_id)
);

CREATE INDEX IF NOT EXISTS idx_account_links_requester
  ON account_links (requester_user_id, status, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_account_links_recipient
  ON account_links (recipient_user_id, status, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_account_links_recipient_email
  ON account_links (recipient_email_norm, status, updated_at DESC);

CREATE UNIQUE INDEX IF NOT EXISTS idx_account_links_pending_email_unique
  ON account_links (requester_user_id, recipient_email_norm)
  WHERE status IN ('pending', 'accepted');

CREATE OR REPLACE FUNCTION touch_account_links_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_account_links_updated_at ON account_links;
CREATE TRIGGER trg_account_links_updated_at
  BEFORE UPDATE ON account_links
  FOR EACH ROW
  EXECUTE FUNCTION touch_account_links_updated_at();

CREATE TABLE IF NOT EXISTS link_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  link_id UUID NOT NULL REFERENCES account_links(id) ON DELETE CASCADE,
  owner_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  grantee_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  permission TEXT NOT NULL,
  owner_enabled BOOLEAN NOT NULL DEFAULT false,
  grantee_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT link_permissions_permission_check
    CHECK (permission IN ('shared_memory', 'shared_orchestrator')),
  CONSTRAINT link_permissions_not_self_check
    CHECK (owner_user_id <> grantee_user_id),
  CONSTRAINT link_permissions_unique_direction
    UNIQUE (link_id, owner_user_id, grantee_user_id, permission)
);

CREATE INDEX IF NOT EXISTS idx_link_permissions_owner
  ON link_permissions (owner_user_id, permission, owner_enabled);

CREATE INDEX IF NOT EXISTS idx_link_permissions_grantee
  ON link_permissions (grantee_user_id, permission, grantee_enabled);

CREATE OR REPLACE FUNCTION touch_link_permissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_link_permissions_updated_at ON link_permissions;
CREATE TRIGGER trg_link_permissions_updated_at
  BEFORE UPDATE ON link_permissions
  FOR EACH ROW
  EXECUTE FUNCTION touch_link_permissions_updated_at();

CREATE TABLE IF NOT EXISTS link_access_audit (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  link_id UUID REFERENCES account_links(id) ON DELETE SET NULL,
  actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  target_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  permission TEXT,
  ip TEXT,
  user_agent TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_link_access_audit_actor
  ON link_access_audit (actor_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_link_access_audit_target
  ON link_access_audit (target_user_id, created_at DESC);

ALTER TABLE account_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_access_audit ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'account_links' AND policyname = 'service_role_all'
  ) THEN
    CREATE POLICY "service_role_all" ON account_links FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'account_links' AND policyname = 'block_anon_access'
  ) THEN
    CREATE POLICY "block_anon_access" ON account_links FOR ALL TO anon USING (false) WITH CHECK (false);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'account_links' AND policyname = 'block_authenticated_direct_access'
  ) THEN
    CREATE POLICY "block_authenticated_direct_access" ON account_links FOR ALL TO authenticated USING (false) WITH CHECK (false);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'link_permissions' AND policyname = 'service_role_all'
  ) THEN
    CREATE POLICY "service_role_all" ON link_permissions FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'link_permissions' AND policyname = 'block_anon_access'
  ) THEN
    CREATE POLICY "block_anon_access" ON link_permissions FOR ALL TO anon USING (false) WITH CHECK (false);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'link_permissions' AND policyname = 'block_authenticated_direct_access'
  ) THEN
    CREATE POLICY "block_authenticated_direct_access" ON link_permissions FOR ALL TO authenticated USING (false) WITH CHECK (false);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'link_access_audit' AND policyname = 'service_role_all'
  ) THEN
    CREATE POLICY "service_role_all" ON link_access_audit FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'link_access_audit' AND policyname = 'block_anon_access'
  ) THEN
    CREATE POLICY "block_anon_access" ON link_access_audit FOR ALL TO anon USING (false) WITH CHECK (false);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'link_access_audit' AND policyname = 'block_authenticated_direct_access'
  ) THEN
    CREATE POLICY "block_authenticated_direct_access" ON link_access_audit FOR ALL TO authenticated USING (false) WITH CHECK (false);
  END IF;
END $$;

COMMENT ON TABLE account_links IS
  'Account-to-account Circle invites and links. Links are anchored to auth.users, never API keys.';

COMMENT ON TABLE link_permissions IS
  'Per-person, per-direction, both-sides-opt-in Circle permissions. A share is active only when owner_enabled and grantee_enabled are true.';

COMMENT ON TABLE link_access_audit IS
  'Privacy-visible audit trail for Circle invites, link changes, permission changes, and stop-all-sharing actions.';
