# Finish UnClick Buildout - Git-Write Session Runbook

This is a turnkey runbook for a session that has **normal git write access and CI
log access** (Claude desktop app, or a properly configured web session). The
prior web sessions could not finish these items because they had read-only git
and could not push large files (`push_files` carries file bytes through the
model context, so a 600 KB file like `tool-wiring.ts` exceeds the limit). All
the design, tests, and decisions are already done; this just lands them.

Run `load_memory` first - it carries the decisions and the standing rules below.

## Ground rules (loss-prevention, non-negotiable)

- Never delete branches or PRs immediately. Keep merged branches at least 30 days.
- Before any destructive git op (force-push, rebase, branch delete), create a
  timestamped backup branch or tag FIRST.
- Keep GitHub's "Automatically delete head branches" setting OFF.

## Task 1: Land the Supabase write connector

Fully built, tested (12 tests), and all gates green, sitting in the patch
`supabase-write-connector.patch` (commit `8995146`, includes the destructive-SQL
guard). Chris has the patch file - attach it to this session.

```bash
git checkout -b claude/supabase-write-connector main
git am < supabase-write-connector.patch      # or: git apply supabase-write-connector.patch
cd packages/mcp-server && npm install && npm run build && npm test    # expect all green
git push -u origin claude/supabase-write-connector
# then open a draft PR
```

Adds `supabase_execute_sql` + `supabase_apply_migration` via the Supabase
Management API, scoped per user through the UnClick keychain, with a guard that
blocks DROP / TRUNCATE / DELETE-no-WHERE / UPDATE-no-WHERE / ALTER-DROP-COLUMN /
GRANT / REVOKE unless `confirm: true`. End-customer experience stays "one MCP,
connect your own Supabase, your AI runs SQL/migrations on your DB."

## Task 2: Get Circle PR #1582 green

Two CI causes. Cause 1 (an unwired `supabase-write-tool.ts` that broke the
connector catalog gates) is already fixed on the branch (commit `6df2124`).
Cause 2 is still red, fails fast (~40s, in the build phase) and could not be
diagnosed from a read-only session. See the diagnosis comment on PR #1582.

```bash
git fetch origin
git checkout claude/compassionate-turing-rdkexs
git branch backup/compassionate-turing-rdkexs-$(date -u +%Y%m%d-%H%M%S)   # backup first
git rebase origin/main
# read the real CI failure (Actions tab / gh run view), fix cause 2
cd packages/mcp-server && npm run build && npm test
git push --force-with-lease
```

Branch-behind-main is the most likely cause of "passes locally, fails CI"; the
rebase plus reading the actual annotation should resolve it.

## Task 3: Build the file workspace + push-by-reference (the big unlock)

Design: `docs/prd/unclick-file-workspace.md`. This permanently removes the
large-file push wall.

- Increment 1 (smallest viable): a push-by-reference git action that commits
  files already staged server-side (start with the existing memory blob store),
  so file bytes never pass through the model.
- Increment 2: real workspace - chunked upload + connector-source ingest (Drive
  / Dropbox / OneDrive) + GB storage + file listing.
- Increment 3: retention automation (backup-before-destructive, prune job,
  workspace lifecycle).

Backend infra (UnClick API + MCP). Build with tests; ship via normal git push.

## Task 4: Retention - finish the lifecycle

- Merge PR #1596 (backup-tag workflow, already shipped) so every push is archived.
- Add the prune half: a scheduled job that deletes ONLY `backup/*` tags older
  than 30 days. Run it in dry-run mode first. Keep it separate and reviewed -
  it is the only destructive piece.

## Reference index

- Patch: `supabase-write-connector.patch` (commit `8995146`, with guard)
- PRDs: `docs/prd/unclick-file-workspace.md`, `docs/prd/memory-circle-sharing.md`
- Open PRs: #1582 (Circle), #1595 (workspace design), #1596 (backup workflow)
- Already done and live: memory `extracted_facts` fix (PR #1593, merged), the
  Circle consent table migration (applied to prod).
- Memory: `load_memory` has the decisions and standing rules.
