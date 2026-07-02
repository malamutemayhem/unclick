# Keys, Credentials and App Connections (Troubleshooting)

Consolidated from a cross-worker audit (2026-06-29). This is the single reference for
"my apps/keys look disconnected" and related credential failures. Everything here is
grounded in files you can open. No em dashes per repo style.

## 0. Five different "keys" - most confusion is conflating them

1. **Login** (magic-link / OAuth session) - proves who you are. Account identity.
2. **UnClick API key `uc_...`** - the human's primary key. Two jobs: (a) scopes your data,
   (b) for user-scheme creds, locks/unlocks your saved app secrets. Rotatable.
3. **Worker/agent key `agt_...`** - headless/CI keys, accepted everywhere `uc_` is
   (`api/mcp.ts`). Independently revocable. (Backend in the worker-keys PR #1623, paused.)
4. **Server master secret `UNCLICK_AI_KEY_SECRET`** (+ `_V2` fallback) - the server-held
   envelope key for server-scheme creds. Set once, NEVER rotate, or every server-scheme
   key becomes unreadable.
5. **Provider secrets** (OpenRouter, Anthropic, GitHub token, Dropbox token, ...) - the
   actual third-party keys, stored encrypted.

## 1. Three credential stores - read paths MUST merge ALL of them

- `user_credentials` - the main vault (OAuth logins + manual keys).
- `platform_credentials` - older single-secret "quick-connect" store (fallback).
- `managed_app_connections` - managed connection rows.

**Failure class (most common "connected but the app can't see it"):** a read path that
queries only one or two of these. `scripts/check-app-connection-readiness.mjs` is the
master guard that asserts the merge across the credentials API, MCP keychain status, and
the admin "Connected" badge. If you add a store or change a query, confirm it merges all
three.

## 2. Two crypto schemes that look alike but are NOT interchangeable

The live vault (`user_credentials`) uses ONE scheme. A second "canonical helper" exists
that is incompatible and must never touch vault rows.

- **Real vault scheme** (`api/lib/chat-crypto.ts`, `api/credentials.ts`, `api/backstagepass.ts`):
  AES-256-GCM, PBKDF2 **100,000** iterations, SHA-256, 32-byte salt, 12-byte IV, stored as
  **four hex columns** `encryption_iv`, `encryption_tag`, `encrypted_data`, `encryption_salt`.
- **`api/lib/crypto-helpers.ts`** (a consolidation that DRIFTED): PBKDF2 **210,000**
  iterations, 16-byte salt, stored as a **single dot-joined base64 string**
  `` `${ivB64}.${tagB64}.${ciphertextB64}` ``. **Cannot decrypt any existing vault row.**

**Rule:** for `user_credentials`, use the 100k / four-hex-column scheme. Do not "modernize"
onto `crypto-helpers.ts` without migrating every row. 100k is fine here because the PBKDF2
input is a high-entropy random key (uc_ = 128-bit, agt_ = 256-bit), not a human password.

## 3. Two key-derivation passwords = two decrypt audiences (the connector wall)

Same AES-256-GCM/PBKDF2 primitive; the PBKDF2 password differs and decides who can decrypt:

- **User scheme** (BYO / 3rd-party connector creds): password = the user's **raw uc_/agt_
  key**. No server master key. Only the raw-key holder can decrypt, so a logged-in web
  session (JWT) alone CANNOT. This is the zero-knowledge wall behind "use my Dropbox from
  web chat doesn't work." Reveal/rotate REQUIRE the plaintext key in the request body
  (proof-of-possession).
- **Server scheme** (AI provider keys, and the new connector vault behind a flag), rows
  carry `enc_scheme = 'server'`: password = `` `${UNCLICK_AI_KEY_SECRET}:${lane_hash}` ``.
  Server-held secret + account lane, so the server decrypts on a session alone AND it
  survives key rotation. See `chat-crypto.ts` `serverSchemePassword`/`encryptForAccount`/
  `readProviderKeyForAccount`.

**Rule:** pick the scheme by who must decrypt. Session-decryptable + rotation-proof ->
server scheme (bound to `lane_hash`). Max zero-knowledge -> user scheme. Reading a
user-scheme cred on a session-only path will never decrypt; that is a design wall, not a bug.

## 4. Tenancy: `lane_hash` vs `key_hash`, and why rotation orphans connections

- All durable rows scope by the account lane = `lane_hash ?? key_hash`
  (`resolveAccountLane` in `api/lib/account-lane.ts`), from either a session JWT or a raw key.
- `lane_hash` is set once at key birth and PRESERVED across rotation; a user's multiple
  keys consolidate to one lane (fixes the 2026-06 "tenant lane-split" incident where
  `reset_api_key` swapped `key_hash` in place and history "vanished").
- **User-scheme connector creds are bound to `key_hash`** (encryption derives from the raw
  key) and indexed by `api_key_hash`, so rotating `uc_` orphans them: the new hash can't
  find them and the new key can't decrypt them. They are orphaned, not deleted, and are
  unrecoverable once the old key is destroyed (the security property working). Only a
  one-time reconnect restores them.
- **Memory survives rotation** because it is only labelled by the hash, never encrypted
  with the key.
- The durable fix = **envelope encryption keyed by `lane_hash` + server secret** (the
  "Layer 2" work, server-scheme connector vault, PR #1644, flag-off). Then login alone is
  enough and rotation never orphans. Caveat: Layer 2 only protects creds saved AFTER it is
  on; pre-existing orphans still need a reconnect.

## 5. Auth paths and the plaintext-vs-hash env trap

`api/mcp.ts` has three ways in: `Authorization: Bearer <key>`, `?key=<key>` query param,
and Supabase session cookie. Env-injection detail: the bearer/query path sets plaintext
`UNCLICK_API_KEY`; the cookie path sets only `UNCLICK_API_KEY_HASH`.

**Failure class (smells like "keys broken everywhere"):** read-only keychain status can run
from just the hash, but DECRYPTING a stored credential needs the plaintext `UNCLICK_API_KEY`
plus the Supabase URL + service-role key. If the MCP server runtime is missing any of those
three, `keychain-tool.ts` returns null and everything looks disconnected. Check those env
vars first.

## 6. "Saved" vs "live-proven" - conflating them makes connections vanish

- `hasSavedConnection` = a credential row exists. `isConnected` = live-tested
  (`connection_state === 'connected'` AND `last_tested_at` set). States: connected, pending,
  failing.
- **Rule:** the Connected lens and Manage button key off **saved**, not proof, or saved
  OAuth/key rows disappear until re-proven (guard:
  `admin_apps_separates_saved_visibility_from_live_proof`). (#1642 made status tell the truth
  and always offers reconnect.)
- A successful provider call stamps `markCredentialLiveTested("<platform>")` -> PATCH
  `last_tested_at`. A connector that works but never stamps stays stuck on "Needs check"
  forever. `keychain_status` returning `connected: true` is NOT proof; live-test before
  believing it (`health: stale` / `needs_recheck: true` = probably broken until reconnected).

## 7. OAuth flow rules (round-trips but credential never lands)

- `oauth-init` and `oauth-callback` must use IDENTICAL env-var names for client id / secret
  / redirect (guard `oauth_env_names_match_start_and_callback`). Note `VERCEL_CLIENT_ID`
  (NOT `VERCEL_OAUTH_CLIENT_ID`).
- PKCE on in BOTH or neither; state must be signed (`OAUTH_STATE_SECRET` /
  `MCP_OAUTH_SIGNING_SECRET`).
- When env is unconfigured, init returns `setup_pending` and Connect keeps the token
  fallback visible.
- Resolution order (`vault-bridge.ts`): for oauth2, try the latest web login
  (`tryResolveFromUnClickApi`) BEFORE legacy keychain (`tryResolveFromKeychain`) so a stale
  quick-connect token cannot shadow a fresh reconnect.
- GitHub/builder is special: a connected catalog app is NOT a push credential. Builder needs
  a real contents-write / git-push path; the git proxy keeps the token server-side.

## 8. The recurring dropped-column bug (api_keys has no `api_key`)

`public.api_keys` has only `key_hash` (the plaintext `api_key` column was dropped after
Phase 1). Any `select=key_hash,api_key` 400s the WHOLE PostgREST request; the session->tenant
resolver returns null and the surface fail-opens to "no connections" / 401. To a logged-in
user this reads as their apps being disconnected in the web UI.

Fixed occurrences: `backstagepass-settings.ts` (#1638), then `backstagepass.ts` (`resolveTenant`),
`testpass-run.ts`, `uxpass-run.ts` (#1646). **Prevention: grep for `select=` ... `api_key`
against `api_keys` before any session-credential change; select `key_hash` only.**

## 9. Multi-key gotchas

- If an account has more than one `api_keys` row, every surface MUST resolve to the same one
  or creds saved under hash A are invisible to a surface that resolves hash B. Canonical
  query: `?user_id=eq.<id>&is_active=eq.true&order=last_used_at.desc.nullslast&select=key_hash&limit=1`.
  Must match across `api/mcp.ts` (`validateSessionCookie`), `memory-admin`, `backstagepass`.
- `.eq("user_id", id).maybeSingle()` / `.single()` on `api_keys` THROWS the moment a user
  has more than one key. Audit `generate_api_key`, `reset_api_key`, `delete_account` (and any
  new code) when introducing a second key per user (e.g. worker keys).

## 10. Env-secret gotchas

- **Empty value reads as "missing."** `UNCLICK_AI_KEY_SECRET === ""` is falsy, so guards
  trip with "not configured" even though the var exists. Diagnose with an endpoint that
  prints env var NAMES and LENGTHS, never values (`api/diag-env.ts`; delete once fixed).
  Guard on non-empty length, not presence. `_V2` fallback dodges a poisoned/empty original:
  `process.env.UNCLICK_AI_KEY_SECRET || process.env.UNCLICK_AI_KEY_SECRET_V2`.
- `UNCLICK_AI_KEY_SECRET` must be set and IDENTICAL across Prod and Preview, or server-scheme
  keys are unreadable in one env.
- Clock skew can masquerade as a key problem (gotrue "Session issued in the future").
- Never print or log secret values. If a key appears on screen, rotate it.

## 11. "Lanes are channels, not key gates"

Tenant identity comes from the authenticated session, never a key in hand. Persistence,
history reads, and deliberation run off session tenancy + service role; they must never
require the plaintext UnClick key. The plaintext key's ONLY job is to decrypt the user's own
provider key for the upstream call. A spurious "set your API key" error inside an
authenticated session means a save/read path wrongly reached for the plaintext key (the Crews
regression). Error copy names the channel that needs attention, never a missing UnClick key.

## 12. Fast triage checklist

1. MCP runtime env: is plaintext `UNCLICK_API_KEY` set (not just `_HASH`)? Supabase URL +
   service key present? Missing any -> universal "disconnected."
2. Grep for `select=` with `api_key` against `api_keys` (dropped column -> 400).
3. Does the failing read path merge all three credential stores?
4. Is the Connected lens keyed off `hasSavedConnection`, not `isConnected`?
5. Does the failing connector stamp `markCredentialLiveTested` on success?
6. OAuth app: init/callback env names match, PKCE consistent, state secret present?
7. Stale keychain token shadowing a fresh reconnect (resolution order)?
8. "Decryption failed" on rows that used to work -> mixing crypto schemes (100k hex vs 210k
   dot-joined), or the cred is user-scheme being read on a session-only path.
9. Data "vanished" after a key reset -> something scoped on `key_hash` not `lane_hash`, or a
   pre-Layer-2 user-scheme cred orphaned by rotation (needs reconnect).

Run `node scripts/check-app-connection-readiness.mjs` (optionally `--live --live-url=<prod>`)
for a per-platform pass/blocker receipt.

## 13. Open work (as of 2026-06-29)

- Worker keys (#1623): reshape onto `lane_hash` instead of the primary-key remap; keep
  account-scoped, independently revocable, rotation-safe.
- Reconcile the two `user_credentials` migrations (lane_hash vs enc_scheme) before more land.
- Turn on / roll out the Layer 2 server-scheme connector vault (#1644 shipped flag-off).
- One-time reconnect for connections orphaned by past rotations (unrecoverable in code).

## File map

- `api/lib/chat-crypto.ts` - canonical 100k/hex vault crypto + server-scheme helpers.
- `api/lib/account-lane.ts` - `resolveAccountLane`, `laneForKeyHash`, `laneForUserId`.
- `api/lib/crypto-helpers.ts` - 210k/dot-joined; do NOT use for `user_credentials`.
- `api/credentials.ts`, `api/backstagepass.ts`, `api/backstagepass-settings.ts` - vault read/write/stamp + session resolvers.
- `api/ai-provider-key.ts`, `api/ai-provider-balance.ts` - server-scheme AI keys.
- `api/oauth-init.ts`, `api/oauth-callback.ts`, `api/oauth-state.ts` - OAuth flow.
- `api/mcp.ts` - bearer / query / cookie auth resolution.
- `packages/mcp-server/src/vault-bridge.ts`, `keychain-tool.ts` - agent credential resolution.
- `scripts/check-app-connection-readiness.mjs` - the master guard; best single reference.
- `user_credentials` columns: `lane_hash`, `api_key_hash` (legacy), `platform_slug`, `label`,
  `enc_scheme`, `encrypted_data`, `encryption_iv`, `encryption_tag`, `encryption_salt`,
  `is_valid`, `last_tested_at`, `last_used_at`, `last_rotated_at`, `expires_at`.
