# Background-session connectors: why they fail, and the fix

Status: diagnosis confirmed in code; mitigation is a config change (no deploy); the durable fix is a reviewed change. This doc is the plan, not yet implemented.

## Symptom

In background / agent / web sessions, connectors report "not connected" (Vercel, Supabase, etc.), `git push`/`fetch` is blocked, and Memory tenant-scoping can break. Interactive sessions work. It looks like many separate connector bugs; it is actually two root causes.

## Root cause 1 (the big one): no api key in the session environment

Every credential path derives its decryption key from the user's UnClick api key:

- `api/credentials.ts` decrypts server-side: `deriveKey(apiKey, salt)` = PBKDF2-SHA256 over the api key from the `Authorization: Bearer` header.
- `packages/mcp-server/src/vault-bridge.ts:105` reads `process.env.UNCLICK_API_KEY`; if it is absent it SKIPS the Supabase credential lookup entirely and returns a "not configured" / "not connected" error (the credential row exists; the lookup never ran).
- `packages/mcp-server/src/server.ts` computes `api_key_hash` from `UNCLICK_API_KEY`; without it, Memory tenant scoping has no tenant.

Background/web sessions do not carry `UNCLICK_API_KEY` in their environment, so all of the above silently no-op. Confirmed: a live web session has no `UNCLICK_*` env vars at all.

> The decryptor is fine and already server-side. The session just isn't holding a key to present.

## Root cause 2 (separate): git is trapped by a harness rewrite

The sandbox injects a global `insteadOf` that rewrites every `github.com` URL to a local proxy (`127.0.0.1:41729`) that demands a password no session has. There is NO UnClick git proxy in the repo (`api/git-proxy.ts` does not exist; earlier notes claiming it does were wrong). A `GITHUB_TOKEN` is present and reaches github.com directly through the agent HTTPS proxy when the injected config is bypassed.

## Fixes

### A. Mitigation - quickest, no code, no deploy (fixes root cause 1 everywhere)

Set `UNCLICK_API_KEY` as a configured environment variable on the Claude Code web environment. Every session (foreground and background) then has a key, and the existing server-side decryption resolves all connector credentials + Memory tenancy. Use a DEDICATED, revocable api key for automation, not your primary one. Caveat: a `uc_` key in env is full-power; the scoped version is fix C.

### B. Git recipe (fixes root cause 2 per session)

Use the token + bypass the injected rewrite:

```
GIT_CONFIG_GLOBAL=/dev/null \
  git -c http.sslCAInfo=/root/.ccr/ca-bundle.crt \
      -c http.extraheader="AUTHORIZATION: bearer $GITHUB_TOKEN" \
      <clone|fetch|push> https://github.com/<owner>/<repo> <ref>
```

Proper fix: configure working git auth at the environment level so native `git` just works, or build a real `api/git-proxy.ts` that authenticates by UnClick api key and forwards git protocol (net-new; what prior notes wrongly assumed existed).

### C. Durable fix - scoped agent keys + token refresh (the recommended, reviewed change)

1. Re-key credential encryption so it is NOT tied to the raw api key string. Today `key = PBKDF2(rawApiKey)`, so only the exact `uc_` key that encrypted a credential can decrypt it - an `agt_` key cannot. Move to: random per-credential data key (DEK), wrapped under a per-ACCOUNT master key the server holds, addressed by `api_key_hash` (stable across a user's `uc_`/`agt_` keys). Then any valid key for the account authenticates; the server unwraps and decrypts. Requires a one-time re-encryption migration of existing rows.
2. Implement the `agt_` agent-key path. The format is already recognized (`api/credentials.ts:182`) but unimplemented. Issue scoped, revocable agent keys for automation (least privilege per connector / per scope) instead of handing out the full `uc_` key.
3. Add OAuth `refresh_token` storage + refresh-on-call so expiring tokens auto-renew (no refresh handling exists today; only in-memory caches in a couple of connectors).

## Sequencing

A now (instant relief) -> B as a documented recipe / env-level git fix -> C as the hardened, reviewed replacement for A. C needs a decision on the re-keying approach before implementation.
