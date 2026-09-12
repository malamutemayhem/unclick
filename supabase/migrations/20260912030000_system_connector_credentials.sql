-- Project-owned credentials stay separate from user Passport credentials.
-- Values are encrypted by the server before this table is written.
CREATE TABLE IF NOT EXISTS public.system_connector_credentials (
  provider TEXT PRIMARY KEY CHECK (provider IN ('gitea', 'vercel', 'supabase')),
  encrypted_data TEXT NOT NULL,
  encryption_iv TEXT NOT NULL,
  encryption_tag TEXT NOT NULL,
  encryption_salt TEXT NOT NULL,
  credential_version INTEGER NOT NULL DEFAULT 1 CHECK (credential_version > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.system_connector_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "system_connector_service_role" ON public.system_connector_credentials
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "system_connector_block_anon" ON public.system_connector_credentials
  FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "system_connector_block_authenticated" ON public.system_connector_credentials
  FOR ALL TO authenticated USING (false) WITH CHECK (false);
