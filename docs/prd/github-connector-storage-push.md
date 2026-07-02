# GitHub Connector: Storage-Handoff Push (byte-exact, any-size, no agent key)

Status: PROPOSED (priority 1). Owner sign-off required before Phase 2 (touches
Supabase Storage + server-side GitHub auth; FLEET_SYNC hard stop).

## Problem

Agents that run in remote containers (Claude Code on the web, fleet workers)
often cannot run native `git push`: the container's git remote points at a
local credential-injecting proxy that is not always handed a credential, so
push returns 401/128. Today the only working write path is the UnClick GitHub
connector's `push_files`, which carries file content **as tool-call
parameters** (the agent pastes the file text).

That paste channel has three hard limits:

1. Size. Large files cannot be carried. Concretely, the ~478 KB generated
   `docs/UnClick-brainmap.generated.{md,json}` pair could not be pushed during
   PR #1573, which left a required CI check red.
2. Byte-exactness. Large pastes can corrupt (an observed homoglyph swap,
   ASCII `B` to a Cyrillic lookalike, on big base64 blobs). A single changed
   byte fails generated-file and lockfile checks.
3. Binary. Non-text files cannot be pasted at all.

The result: agents hand-reproduce files, and some files simply cannot be
pushed from a container. We need a transport that is binary-safe, any-size,
and byte-exact, without handing the agent a GitHub credential.

## Goal

Land arbitrary file changes on GitHub through the existing UnClick GitHub App
connector, from any agent container, with:

- no paste (raw bytes, any size),
- byte-exact integrity (verified by checksum),
- no GitHub credential ever exposed to the agent runtime,
- a good experience for any UnClick account that connects GitHub (this is a
  public, multi-tenant product feature, not an internal/fleet-only tool).

## Public-facing requirement (multi-tenant)

This ships to every UnClick account, so the design must be correct for a
brand-new user, not just the internal fleet repo. Requirements:

- Per-account auth. A push session runs under the calling UnClick account and
  commits using THAT account's own connected GitHub (its OAuth / GitHub App
  installation), never a shared or admin login.
- Repo scope from the account. Allowed repos are exactly what that account's
  GitHub connection grants. An account can never push to a repo it has not
  connected.
- Tenant isolation. Signed upload URLs and staged blobs are namespaced per
  account and per push session. One account can never read, overwrite, or
  push another account's files.
- Clean first run. If the account has not connected GitHub yet, the connector
  returns a clear "connect your GitHub" prompt with the connect link, not a
  cryptic error (today's path can surface a raw "missing api_key"). After a
  one-time connect, begin_push / commit_push just work.
- Same surface everywhere. The agent flow is identical across Claude.ai,
  ChatGPT connectors, IDE clients, and fleet workers; nothing is hard-wired to
  one repo or one login.

## Chosen design: file-upload handoff, UnClick commits server-side

The file leaves the agent container as a real upload (not paste), lands in a
private Supabase Storage staging area, and UnClick's server commits it to
GitHub using the connector's existing server-side GitHub App auth, then
deletes the staged blob.

Flow:

1. `github_action(action: "begin_push", repo, branch, base_branch?, message, files: [{ path, sha256, size }])`
   UnClick creates a `push_session_id` and returns one short-lived **signed
   upload URL** per file (Supabase Storage), each scoped to that session.
2. The agent uploads each file's raw bytes with an HTTP PUT to its signed URL.
   No paste. Any size. Exact bytes.
3. `github_action(action: "commit_push", push_session_id)`
   UnClick server-side:
   a. Reads the staged blobs from Storage.
   b. Verifies each blob's sha256 against the value declared in `begin_push`.
   c. Commits them to `branch` (creating it from `base_branch` if it does not
      exist) via the same git-data path `push_files` already uses
      (blob -> tree -> commit -> ref) under the GitHub App installation token.
   d. Returns `commit_sha`, `tree_sha`, and per-file post-commit sha256.
   e. Deletes the staged blobs (auto-clean).
4. `github_action(action: "abort_push", push_session_id)` cleans up staged
   blobs without committing.

### Why this shape

- The GitHub key never leaves UnClick. UnClick already holds the GitHub App
  install auth and already commits server-side for `push_files`; this reuses
  that proven path. The agent only ever gets a write-only, single-path,
  short-TTL upload URL, not a git credential.
- Binary-safe, any-size, byte-exact: raw upload plus sha256 verification at
  upload and after commit. The brainmap pair would push in one session.
- Minimal new trust surface: no agent-held secret, unlike the token-mint
  alternative.

## Components

- Supabase Storage bucket `gh-push-staging` (private). Objects keyed
  `push/<push_session_id>/<path-hash>`. Write only via UnClick-minted signed
  URLs; read only by the UnClick service role. TTL sweep deletes orphaned
  objects.
- API endpoints (Vercel functions under `api/`):
  - mint signed upload URLs for a push session,
  - commit-from-storage (verify + git-data commit + cleanup),
  - abort/cleanup.
  These reuse the existing GitHub App auth and the existing repo-scope authz
  used by `push_files`.
- Connector actions in `packages/mcp-server/src/github-tool.ts`: `begin_push`,
  `commit_push`, `abort_push` as thin clients over those endpoints. Existing
  `push_files` stays as the small-file fallback.

## Security and governance

- No GitHub credential is returned to the agent.
- Signed upload URLs are write-only, single object path, short TTL
  (target 5 min), one push session.
- Staged blobs are deleted on commit and on abort, plus a TTL sweep.
- Repo scope is enforced server-side, identical to `push_files`.
- Per-account isolation: push sessions, signed URLs, and staged blobs are
  scoped to the calling UnClick account. No account can read, overwrite, or
  push another account's files.
- Audit log records `push_session_id`, repo, branch, file paths, sizes, and
  sha256. Never file content, never secrets.
- This adds a Storage bucket and a server-side push endpoint, so it is a
  FLEET_SYNC hard stop and needs owner sign-off before Phase 2. It is lighter
  than the token-mint design because no write credential ever reaches the
  agent.

## Acceptance tests

- Byte-exact: push a 1 MB binary file; sha256 on GitHub matches the source.
- Real incident: push the ~478 KB brainmap `.md` + `.json` in one session and
  confirm the Website check goes green.
- Corruption guard: a blob whose bytes do not match the declared sha256 is
  rejected; no commit is made.
- New branch: `commit_push` creates `branch` from `base_branch` when absent.
- Auto-clean: staging is empty after both commit and abort.
- Authz: an agent cannot target a repo outside its authorized scope.
- Concurrency: two simultaneous sessions do not collide (keyed by session id).
- New account: a freshly connected account completes begin_push -> upload ->
  commit_push with no key handling; an account that has not connected GitHub
  gets a clear connect prompt, not a raw error.
- Tenant isolation: account A cannot read account B's staged blobs, reuse B's
  signed URLs, or push to B's repos.

## Rollout

- Phase 1: this spec, owner sign-off (secrets/storage hard stop).
- Phase 2: bucket + policies + API endpoints + connector actions behind a flag.
- Phase 3: dogfood by pushing the brainmap pair, then default on. Keep
  `push_files` paste path as the fallback for tiny text files.

## Fallback if Storage is rejected

Chunked, checksummed `push_files`: the agent uploads a file in verified pieces
and the server reassembles the blob. This removes the corruption risk but is
still paste-based and slower. The storage handoff is preferred.

## Open questions

- Server-side commit via the git-data API (already proven by `push_files`) vs
  a real `git push` from a server-side checkout. Recommendation: git-data API
  for v1 (no server checkout to manage).
- Max staged file size cap and bucket retention window.
- Whether `begin_push` should also accept deletions (mirror `push_files`
  `deletions[]`) so a single session can add and remove files.
