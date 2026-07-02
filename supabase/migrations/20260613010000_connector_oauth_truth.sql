-- Connector auth truth fixes + missing popular connectors.
-- Operator-reported 2026-06-13: GitHub showed "Add key" though the whole
-- OAuth path (code, scopes, callback) already treats it as a sign-in app;
-- the platform_connectors row was never flipped. Google Workspace and
-- Microsoft 365 rows said 'oauth' while every code path checks 'oauth2'.
-- Spotify and Dropbox have working catalog tools but no connector rows,
-- so the Apps page falsely showed them as Built-in.
-- Idempotent: safe to re-run.

-- 1. Normalize the oauth/oauth2 string mismatch (google-workspace,
--    microsoft-graph, and any future drift).
UPDATE platform_connectors SET auth_type = 'oauth2' WHERE auth_type = 'oauth';

-- 2. GitHub is a sign-in app. The /connect/github page keeps a manual
--    token fallback while the OAuth client env is not yet configured.
UPDATE platform_connectors
SET auth_type = 'oauth2',
    setup_url = 'https://github.com/settings/developers'
WHERE id = 'github';

-- 3. Missing rows for apps whose tools already ship. Key-based today;
--    they flip to oauth2 when their provider apps are registered.
INSERT INTO platform_connectors (id, name, category, auth_type, description, setup_url, test_endpoint, sort_order) VALUES
  ('spotify', 'Spotify', 'Music & Media', 'oauth2', 'Search, playlists, library, and listening data', 'https://developer.spotify.com/dashboard', 'https://api.spotify.com/v1/me', 110),
  ('dropbox', 'Dropbox', 'Storage',       'oauth2', 'Files, folders, and account access',            'https://www.dropbox.com/developers/apps', 'https://api.dropboxapi.com/2/users/get_current_account', 111)
ON CONFLICT (id) DO UPDATE SET
  auth_type     = EXCLUDED.auth_type,
  setup_url     = EXCLUDED.setup_url,
  test_endpoint = EXCLUDED.test_endpoint;
