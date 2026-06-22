# App connection readiness

This is the rollout contract for login-first app connections in the UnClick app
bubble. It captures the repeatable lessons from previous connector launches
without making any one provider the pattern.

## The rule

Do not call an app "live" from a green dashboard badge alone. A live connection
means the same account is visible in three places:

1. the user-facing Apps catalog and Connect page
2. the server OAuth and credential storage path
3. the tool-facing MCP/keychain status path

If those disagree, the app is not ready for users yet.

Also keep two customer states separate:

- **Saved/manageable:** the customer has added access. It belongs in Connected
  apps and should offer Manage/Disconnect, even while it needs a live check.
- **Verified/live:** the app has passed a real check. Only this earns the green
  Connected badge and tool-facing proof.

Never make the Connected apps lens depend only on verified/live proof, or saved
OAuth/key rows disappear and customers think the connection failed.

## What the guard checks

Run:

```bash
npm run check:app-connections
```

For one app:

```bash
node scripts/check-app-connection-readiness.mjs --platform=<slug>
```

For production env proof:

```bash
npm run check:app-connections:live
```

For one production app:

```bash
node scripts/check-app-connection-readiness.mjs --platform=<slug> --live-url=https://unclick.world
```

The guard verifies:

- The app exists in `src/data/app-catalog.generated.json` in a real category.
- Default login-first apps that users expect immediately also appear in the
  Popular lens, not only in the full catalog.
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
- The browser starts login through the server, receives a provider URL or
  setup-pending fallback, and does not depend on public client IDs for
  server-owned OAuth apps.
- Server-owned OAuth apps are listed in the Connect page server-client allowlist
  so the provider login button renders before any production env probe runs.
- The stored credential slug matches the app slug that users connected, so
  dashboard status, reconnect, disconnect, and MCP tool calls all describe the
  same account.
- Tool schemas keep the token field optional for login-first apps, so agents can
  call normal business arguments while UnClick resolves the stored token.
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
- `src/components/apps/appLenses.ts`,
  `src/components/apps/ConnectAppModal.tsx`, and
  `src/pages/admin/AdminTools.tsx` keep saved/manageable connection visibility
  separate from verified/live proof. The Connected apps lens uses saved state;
  the green Connected badge uses proof state.
- When `--live-url` is passed, production `/api/oauth-init` returns a
  provider-ready login payload and not `setup_pending`. This catches the exact
  "code is live, provider env is missing client ID/client secret" failure.
- When production rejects a new platform entirely, the guard reports the API
  error text so "not deployed yet" is visibly different from "deployed but env
  missing."

Regression tests live in:

```bash
npm run test:app-connections
```

They intentionally break catalog visibility, Popular lens visibility, Connect
page button allowlisting, setup-pending fallback, keychain parity, and OAuth env
mapping, plus the saved-vs-verified Admin Apps split, to prove the guard catches
the failures.

## XPass routing

Connector login work is now routed through the XPass gate room. Changes touching
OAuth app connections, credential storage, connect pages, catalog/icon
visibility, or keychain status select:

- ConnectorPass for the combined app-bubble connection contract
- TestPass for deterministic readiness proof
- UXPass for login, saved-state, and fallback experience
- FlowPass for the OAuth journey
- SecurityPass for OAuth and credential storage
- RotatePass for credential lifecycle and redaction
- CopyPass for public connection copy and fallback wording
- CommonSensePass for "no connected badge without tool-facing proof" and "saved
  connections must stay visible while waiting for proof"
- SlopPass for implementation quality when source files change

## Live proof checklist

Before telling a user "live":

1. Run `npm run check:app-connections`.
2. Run the production check:
   `npm run check:app-connections:live`, or the one-app variant while working
   on a single connector.
3. Confirm the app appears in `/admin/apps` search.
4. Open `/connect/:slug` and confirm provider login is the primary path.
5. Confirm setup-pending errors keep the token fallback visible.
6. After connecting, check the app status from the MCP/keychain side, not only
   the dashboard badge.
7. For production, confirm the deployed alias is live and the same checks pass
   against the production account context.

## Provider split

Some providers expose both a UnClick app connection and a separate hosted MCP
login. Treat those as different products:

- The UnClick app connection lives at `/connect/:slug`, stores a credential for
  UnClick tools, and should appear in the Apps connected state.
- A provider-hosted MCP login belongs to the provider. It can be documented as a
  separate path, but it must not be described as the same stored UnClick app
  connection.
- Any fallback token path must say it is a fallback. The popup login remains the
  primary path when provider setup is ready.
