# App connection readiness

This is the rollout contract for login-first app connections such as GitHub,
Vercel, Supabase, and future OAuth apps in the UnClick app bubble.

## The rule

Do not call an app "live" from a green dashboard badge alone. A live connection
means the same account is visible in three places:

1. the user-facing Apps catalog and Connect page
2. the server OAuth and credential storage path
3. the tool-facing MCP/keychain status path

If those disagree, the app is not ready for users yet.

## What the guard checks

Run:

```bash
npm run check:app-connections
```

For one app:

```bash
node scripts/check-app-connection-readiness.mjs --platform=vercel
```

The guard verifies:

- The app exists in `src/data/app-catalog.generated.json` in a real category.
- `src/lib/connectors.ts` exposes provider login and labels token entry as a
  fallback.
- `packages/mcp-server/src/connector-setup.ts` and
  `src/data/connector-setup.generated.json` have setup metadata.
- `api/oauth-init.ts` allow-lists the platform, maps client ID and redirect URI
  env vars, and returns `setup_pending` instead of a dead end when provider
  setup is incomplete.
- `api/oauth-callback.ts` agrees with OAuth start on env var names, PKCE, and
  credential extraction.
- `api/oauth-state.ts` can sign and verify state for the provider.
- `src/pages/Connect.tsx` keeps "Use a token instead" visible when provider
  login is not switched on.
- `src/components/apps/ConnectAppModal.tsx` sends OAuth apps to
  `/connect/:slug`.
- `src/components/apps/AppIcon.tsx` and `appIconGlyphs.ts` have a render path
  so the app does not disappear visually.
- `api/credentials.ts`, `api/memory-admin.ts`, and
  `packages/mcp-server/src/keychain-tool.ts` all see the same connection
  sources: `platform_credentials`, `user_credentials`, and
  `managed_app_connections`.

Regression tests live in:

```bash
npm run test:app-connections
```

They intentionally break catalog visibility, setup-pending fallback, keychain
parity, and OAuth env mapping to prove the guard catches the failures.

## XPass routing

Connector login work is now routed through the XPass gate room. Changes touching
OAuth app connections, credential storage, connect pages, catalog/icon
visibility, or keychain status select:

- TestPass for deterministic readiness proof
- UXPass for login and fallback experience
- FlowPass for the OAuth journey
- SecurityPass for OAuth and credential storage
- RotatePass for credential lifecycle and redaction
- CommonSensePass for "no connected badge without tool-facing proof"
- SlopPass for implementation quality when source files change

## Live proof checklist

Before telling a user "live":

1. Run `npm run check:app-connections`.
2. Confirm the app appears in `/admin/apps` search.
3. Open `/connect/:slug` and confirm provider login is the primary path.
4. Confirm setup-pending errors keep the token fallback visible.
5. After connecting, check the app status from the MCP/keychain side, not only
   the dashboard badge.
6. For production, confirm the deployed alias is live and the same checks pass
   against the production account context.

## Provider notes

Vercel has two legitimate paths:

- UnClick app connection: `/connect/vercel`, stores the token for UnClick-side
  Vercel actions.
- Vercel hosted MCP: Vercel's own MCP sign-in, separate from the UnClick account
  connection.

Supabase has the same split:

- UnClick app connection: `/connect/supabase`, stores Supabase Management API
  access for UnClick workflows.
- Supabase hosted MCP: Supabase's own developer MCP sign-in. It should be scoped
  with `project_ref` and `read_only` where possible, and it is not the same as
  the UnClick app-bubble connection.

If Supabase shows setup pending, the expected missing live config is usually
`SUPABASE_OAUTH_CLIENT_ID` and/or `SUPABASE_OAUTH_CLIENT_SECRET`.
