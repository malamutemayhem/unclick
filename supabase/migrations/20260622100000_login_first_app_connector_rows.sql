-- Keep customer-facing Apps rows aligned with shipped login-first tools.
-- These tools already exist in the code catalog and /connect flow; if their
-- platform_connectors row is missing, Admin Apps can mislabel them as Built-in.
-- Idempotent: safe to re-run.

INSERT INTO platform_connectors (id, name, category, auth_type, description, setup_url, test_endpoint, sort_order) VALUES
  (
    'gmail',
    'Gmail',
    'Messaging & email',
    'oauth2',
    'Search, read, and send mail through the connected customer Gmail account',
    'https://unclick.world/connect/gmail',
    NULL,
    112
  ),
  (
    'google-drive',
    'Google Drive',
    'Productivity',
    'oauth2',
    'Browse, search, and read files through the connected customer Google Drive account',
    'https://unclick.world/connect/google-drive',
    NULL,
    113
  ),
  (
    'onedrive',
    'OneDrive',
    'Productivity',
    'oauth2',
    'Browse, search, and read files through the connected customer OneDrive account',
    'https://unclick.world/connect/onedrive',
    NULL,
    114
  ),
  (
    'higgsfield',
    'Higgsfield',
    'AI',
    'oauth2',
    'Image, video, character, and campaign generation through the connected customer Higgsfield account',
    'https://higgsfield.ai/mcp',
    NULL,
    115
  )
ON CONFLICT (id) DO UPDATE SET
  name          = EXCLUDED.name,
  category      = EXCLUDED.category,
  auth_type     = EXCLUDED.auth_type,
  description   = EXCLUDED.description,
  setup_url     = EXCLUDED.setup_url,
  test_endpoint = EXCLUDED.test_endpoint,
  sort_order    = EXCLUDED.sort_order;
