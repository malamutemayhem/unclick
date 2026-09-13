-- Extend the server-only project connector store with the narrowly-scoped
-- Dropbox workspace credential. The MCP implementation hard-limits this
-- credential to UnClick/Context and UnClick/Credentials/System Information;
-- it is never exposed through the general Dropbox connector.
ALTER TABLE public.system_connector_credentials
  DROP CONSTRAINT IF EXISTS system_connector_credentials_provider_check;

ALTER TABLE public.system_connector_credentials
  ADD CONSTRAINT system_connector_credentials_provider_check
  CHECK (provider IN ('gitea', 'vercel', 'supabase', 'dropbox'));
