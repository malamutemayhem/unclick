# Background-session connectors + native git push: why there is friction, and the fix

Status: diagnosis confirmed against `main` via connector code search. The native
git push is BUILT and DEPLOYED; the connectors stall on a missing env key; the
friction is that this worker environment is not configured to use what already
exists. The fixes below are mostly environment config, not new code.

## Symptom

In background / agent / web sessions, connectors report "not connected" (Vercel,
Supabase, etc.), and `git push`/`fetch` is blocked - so work falls back to the
slow connector `push_files` path. Interactive sessions work. It looks like many
connector bugs; it is really an environment-not-wired-up problem.

## Root cause 1: no api key in the session environment

Every credential path derives its key material from the user's UnClick api key:

- `api/credentials.ts` decrypts server-side using a key derived from the api key
  in the `Authorization: Bearer` header (PBKDF2). This coupling is DELIBERATE
  (proof-of-possession): credentials stay tied to the current key.
- `packages/mcp-server/src/vault-bridge.ts` reads `process.env.UNCLICK_API_KEY`;
  if it is absent it SKIPS the credential lookup and returns "not connected" -
  the credential row exists, the lookup never ran.
- Memory tenancy (`api_key_hash`) likewise has no tenant without the key.

Background/web sessions carry NO `UNCLICK_API_KEY` (confirmed: a live web session
had zero `UNCLICK_*` env vars). So the lookups silently no-op.

## Root cause 2: the native git push exists, but this environment cannot reach it

The native push is REAL and on `main` (verified by code search), not missing as a
prior version of this doc wrongly claimed:

- `api/git-proxy.ts` (+ `api/git-proxy.test.ts`) - an authenticated git
  smart-HTTP proxy. Authenticates by the caller's UnClick api key, looks up that
  account's GitHub token server-side, forwards real git protocol to github.com.
  The GitHub token never leaves UnClick.
- `vercel.json` routes it, so it is live on Vercel.
- `scripts/unclick-git-remote.mjs` (+ test) - the helper that points a repo's git
  remote at the proxy so plain `git push` just works.
- `scripts/check-app-connection-readiness.mjs` - readiness check.
- `docs/github-connector-native-push.md` - canonical reference.

So why the friction here? This worker environment is not wired to use it:

1. A harness-injected global `insteadOf` rewrites every `github.com` URL to a
   dead local proxy (`127.0.0.1:41729`) that demands a password no session has.
2. Egress to `unclick.world` is BLOCKED (HTTPS CONNECT returns 403), so the
   deployed proxy is unreachable from this session.
3. No `UNCLICK_API_KEY` for the proxy to authenticate against (root cause 1).
4. `scripts/unclick-git-remote.mjs` is never run at session start.

## Fixes

### A. Set the api key in the environment - fixes connectors + git auth (quickest)

Add `UNCLICK_API_KEY` (a dedicated, revocable key) as a configured environment
variable on the Claude Code web environment. Every session then resolves
connector credentials and can authenticate to the git proxy. No code, no deploy.

### B. Let the environment reach + use the native proxy (the real native push)

No new code needed - the proxy already exists. Configure the environment:

1. Allow egress to `unclick.world` and `github.com` in the environment network
   policy (today both are blocked, which is what forces the connector fallback).
2. Run `node scripts/unclick-git-remote.mjs` at session start (setup script /
   SessionStart hook) so the git remote points at the deployed proxy.
3. The key from fix A authenticates the push.

Then plain `git push` / PR / merge work natively in every session. Canonical
reference: `docs/github-connector-native-push.md`.

### C. Durable hardening - scoped agent keys + token refresh

1. Issue scoped, revocable agent keys (`agt_`) for automation instead of handing
   out the full `uc_` key. The format is already recognized in `api/credentials.ts`
   but the path is unimplemented.
2. Keep credentials tied to the presenting key (proof-of-possession) per the
   2026-06-25 incident decision; do NOT blanket re-key. To let an agent key use a
   connector, grant that credential to the agent key EXPLICITLY (a deliberate,
   per-credential, revocable grant) rather than making all keys decrypt all creds.
3. Add OAuth `refresh_token` storage + refresh-on-call so expiring tokens renew.

## Sequencing

A now (instant relief) -> B (turn the already-built native push on for worker
sessions: egress + remote script) -> C (scoped keys + refresh as hardening).

## Correction log

An earlier version of this doc stated `api/git-proxy.ts` did not exist and the
native proxy needed building. That was wrong - it was a stale-local-clone error.
The proxy, its tests, the remote-config script, the readiness checker, the vercel
route, and the docs are all on `main`.
