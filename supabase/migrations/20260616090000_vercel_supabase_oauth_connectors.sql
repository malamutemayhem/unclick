-- Vercel and Supabase are sign-in connectors, not shared operator keys.
-- Idempotent live-catalog repair for admin Apps and new-account onboarding.

INSERT INTO platform_connectors (id, name, category, auth_type, description, setup_url, test_endpoint, sort_order) VALUES
  (
    'vercel',
    'Vercel',
    'Developer Tools',
    'oauth2',
    'Deployments, projects, domains, and environment variables through the connected user''s Vercel account',
    'https://vercel.com/oauth/authorize',
    'https://api.vercel.com/v6/projects',
    3
  ),
  (
    'supabase',
    'Supabase',
    'Developer Tools',
    'oauth2',
    'Supabase Management API access through the connected user''s Supabase account',
    'https://api.supabase.com/v1/oauth/authorize',
    'https://api.supabase.com/v1/projects',
    2
  )
ON CONFLICT (id) DO UPDATE SET
  name          = EXCLUDED.name,
  category      = EXCLUDED.category,
  auth_type     = EXCLUDED.auth_type,
  description   = EXCLUDED.description,
  setup_url     = EXCLUDED.setup_url,
  test_endpoint = EXCLUDED.test_endpoint,
  sort_order    = EXCLUDED.sort_order;
