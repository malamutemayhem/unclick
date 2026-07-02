# UnClick File Workspace ("Large-PR Room") - PRD

Status: **Increment 1 shipped** - server-side staging + push-by-reference + retention. Endpoint, table, and tests land together and are pushed immediately so the work persists. Not yet wired into a first-party MCP tool (see Roadmap).

## Why

In hosted Claude Code / web sessions, real `git push` is blocked, so all git
goes through UnClick's github connector. That connector carries each file's
**content inline as a tool argument** - the model has to emit the whole file in
one response. A model cannot emit a ~600KB file (for example `tool-wiring.ts`)
in a single turn, so **large files cannot be pushed at all**. Big monorepo edits
hit a hard wall.

The File Workspace is the server-side "room" that removes the wall: the model
streams a file into UnClick in **small chunks**, then a single push **assembles
the chunks server-side and writes them to git by reference** (GitHub Git Data
API). The file content never has to travel back through the model's response, so
size stops mattering.

## How it works

1. **Stage** - `POST /api/workspace?action=put { workspace_id?, path, content, seq? }`.
   Each call appends one chunk (one row). Omit `workspace_id` on the first call
   to get a fresh one back; reuse it for every chunk and every file in the push.
   A 600KB file becomes N small puts, each well under the tool-arg limit.
2. **List** - `GET /api/workspace?workspace_id=...` returns the staged files with
   byte sizes and the retention horizon.
3. **Push** - `POST /api/workspace?action=push { workspace_id, owner, repo, branch, base_branch?, message?, github_token? }`.
   The server assembles every staged file, then writes them to `branch` via the
   Git Data API: **blobs -> tree (on the base tree) -> commit -> ref**. Creates
   the branch off the default/base branch when it does not exist. Any file size.
4. **Prune** - `POST /api/workspace?action=prune` deletes only the caller's rows
   past `expires_at`.

## Auth & tenancy

`Authorization: Bearer <unclick_api_key>`. The key is SHA-256 hashed to scope
every row to one tenant (never stored). The plaintext key also resolves the
caller's **stored GitHub credential** (the same encrypted `user_credentials`
row `api/credentials.ts` writes), so the push needs **no keys at the user's end** -
inline `github_token` and `GITHUB_TOKEN` are fallbacks only.

## Loss-prevention (hard requirement)

Nothing is deleted on push. Rows carry `expires_at` (default **21 days**, inside
the agreed **10-30 day lifecycle**) and a push only marks `pushed_at`. A failed
or mis-targeted push therefore never loses work; cleanup happens later via
`prune`. This complements the already-merged branch-backup workflow (#1596),
which tags an immutable backup on every `claude/**` push.

## Data model

`workspace_files` (central Supabase, migration `20260628120000_unclick_file_workspace.sql`):
one row per chunk - `api_key_hash`, `workspace_id`, `path`, `seq`, `content`,
`pushed_at`, `created_at`, `expires_at`. Service-role only (RLS enabled, no
policy). Indexed for assembly `(api_key_hash, workspace_id, path, seq)` and for
prune `(expires_at)`.

## Tests

`api/workspace.test.ts` (12 tests): retention math, put/push validation, chunk
assembly (including a 50-chunk out-of-order reassembly), tree-entry mapping, and
a mocked end-to-end Git Data API push for both the existing-branch and
new-branch paths.

## Roadmap

- **Increment 1 (done):** endpoint + table + retention + tests. The mechanism
  works end to end via HTTP.
- **Increment 2:** a first-party MCP tool surface (`workspace_put` / `workspace_push`)
  so agents call it directly instead of via raw HTTP. Deferred because wiring a
  new MCP tool edits the ~600KB `tool-wiring.ts` - the exact file this feature
  exists to let us push. Increment 2 will use Increment 1 to push its own wiring.
- **Increment 3:** scheduled prune (cron) and an optional archive-to-storage tier
  for very large blobs.
