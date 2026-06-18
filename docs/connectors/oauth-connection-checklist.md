# OAuth App Connection Checklist

Learnings from the Higgsfield connection saga. Use this checklist when adding
any new OAuth/sign-in connector to prevent the same sync gaps.

---

## The problem pattern

UnClick has three credential stores. If an OAuth connector writes to one but
the tool reads from another, the user connects successfully but the tool says
"not connected". This happened with Higgsfield because:

1. OAuth callback stored the token in `user_credentials` (via `/api/credentials`)
2. The tool used `requireCredential()` which only checks args + env vars
3. `keychain_status` MCP tool only checked `platform_credentials` table

---

## Credential stores (know all three)

| Store | Table | Written by | Read by |
|-------|-------|-----------|---------|
| OAuth/Connect path | `user_credentials` | `/api/oauth-callback`, `/api/credentials` POST | vault-bridge `resolveCredentials()`, `/api/credentials` GET, admin_tools merge |
| Keychain path | `platform_credentials` | `keychain_connect` MCP tool | `keychain_status`, `keychainGetCredential()` |
| Managed broker path | `managed_app_connections` | `/api/managed-connection-webhook` | `/api/credentials` GET fallback, admin_tools merge |

---

## Checklist for a new OAuth connector

### 1. OAuth flow (api/)

- [ ] Platform added to `ALLOWED_PLATFORMS` in `api/oauth-init.ts`
- [ ] Token exchange logic added to `api/oauth-callback.ts` (either in
      `PLATFORM_CONFIGS` or as a custom exchange function)
- [ ] Redirect URI env vars documented (`{PLATFORM}_CLIENT_ID`,
      `{PLATFORM}_CLIENT_SECRET`, `{PLATFORM}_REDIRECT_URI`)
- [ ] `storeCredentials()` call stores the token with field names that match
      what the tool expects

### 2. Vault-bridge connector config (packages/mcp-server/src/connectors/)

- [ ] Connector config file created: `connectors/{slug}.ts`
- [ ] Config imported and registered in `connectors/index.ts` CONNECTORS map
- [ ] `credentialFields[].key` matches the field name stored by OAuth callback
      (e.g., `access_token`, not `api_key` if OAuth stores `access_token`)
- [ ] `authType` set to `"oauth2"` so the UI and vault-bridge know the flow

### 3. Tool uses vault-bridge (packages/mcp-server/src/{slug}-tool.ts)

- [ ] Tool imports `resolveCredentials` from `./vault-bridge.js`
- [ ] Tool calls `await resolveCredentials("{slug}", args)` instead of
      `requireCredential("{slug}", args)`
- [ ] Tool handles both `access_token` (from OAuth) and `api_key` (direct)
      for backward compatibility
- [ ] Error message includes setup URL for the Connect page

### 4. Connector setup entry (connector-setup.ts)

- [ ] `CONNECTOR_SETUP` row exists for the slug (used by `notConnectedFor()`
      and the generic "not connected" card if vault-bridge is unavailable)
- [ ] `setupUrl` points to the provider's key/token page

### 5. Admin UI (src/pages/admin/)

- [ ] `admin_tools` action in `api/memory-admin.ts` merges credentials from
      all three stores for this platform
- [ ] Admin UI correctly shows Connected/Add key/Setup based on the merged
      credential source
- [ ] If the platform has a hosted MCP (like Higgsfield), the UI separates
      that option from the UnClick-stored credential

### 6. Tool wiring (packages/mcp-server/src/tool-wiring.ts)

- [ ] Tool descriptions say "Uses your connected {Platform} account or a
      {credential type}" instead of implying API key is the only option
- [ ] `api_key` parameter description says "Omit if {Platform} is already
      connected in UnClick"

### 7. Keychain status (keychain-tool.ts)

- [ ] `keychainStatus()` checks `user_credentials` as fallback when
      `platform_credentials` has no match (already implemented for all
      platforms after the Higgsfield fix)

### 8. Test coverage

- [ ] Colocated test file exists: `{slug}-tool.test.ts`
- [ ] Test covers credential resolution from both inline args and
      vault-bridge
- [ ] OAuth callback test covers the platform's token exchange

---

## Field name mapping gotcha

The biggest pitfall: OAuth stores `access_token` but some tools expect
`api_key`. The vault-bridge resolves by field key from the connector config.
If the OAuth callback stores `{ access_token: "..." }` but the connector
config has `credentialFields: [{ key: "api_key" }]`, the bridge will not
match.

Rule: the connector config's `credentialFields[].key` MUST match the field
names stored by the OAuth callback. If the tool also accepts a direct
`api_key` arg, handle that separately (check args.api_key first, then fall
through to vault-bridge resolution).

---

## Quick diagnostic

If a user reports "connected on dashboard but MCP says not connected":

1. Check which table the credential is in: `user_credentials` or
   `platform_credentials`
2. Check if the tool uses `resolveCredentials()` (vault-bridge, reads
   `user_credentials`) or `requireCredential()` (connector-setup, reads
   only args + env)
3. Check if the connector has a config in `connectors/index.ts` (required
   for vault-bridge)
4. Check if field names match between what OAuth stored and what the
   connector config expects
