# Supabase migration-runner (dogfood) - implementation spec

Status: **safety core shipped** (`packages/mcp-server/src/supabase-migration-guard.ts` + tests, 8/8 passing). The runner itself (HTTP + auth + wiring) is specced here and must be built by a session that can read current `main` and security-reviewed before it touches prod. This was authored on a branch behind `main`, so reconcile against the live connector code.

## Goal

Let UnClick apply a Supabase migration to a connected project **via the caller's UnClick key**, so an agent can run "deploy the migration" with no human pasting SQL into a dashboard. This is handoff section 6.3 ("migration automation"), and the manual step we just did by hand for PR #1586.

## Why it doesn't work today

The Supabase connector is **read-only**: `supabase_list_projects`, `supabase_get_project` are both "Read-only Management API call". There is no run-SQL action. (Confirmed live: a session call also returned `not_connected` without the key - the separate credential-unlock issue.)

## The proven pattern to copy: api/git-proxy.ts

GitHub's native push already solves the identical shape: authenticate the caller by their UnClick key, look up **that account's** provider token server-side, call the provider, never expose the secret. The migration-runner is the same pattern pointed at Supabase.

## The endpoint

Supabase Management API runs SQL via `POST https://api.supabase.com/v1/projects/{project_ref}/database/query` with an `Authorization: Bearer <token>` header and a JSON body of `{ "query": "<SQL>" }`. The connected Supabase token must have scope for this endpoint (the read-only tools only need project-read; this needs database query). Verify the connected token's scope, or document the re-connect.

## New connector action(s)

Add to `packages/mcp-server/src/supabase-tool.ts` (the file that holds `supabase_list_projects`), wire in `tool-wiring.ts` (ADDITIONAL_TOOLS + ADDITIONAL_HANDLERS) and `connector-setup.ts`:

- `supabase_apply_migration({ project_ref, sql, allow_destructive?, dry_run? })`
  1. Resolve the caller's Supabase token server-side (same resolver the read-only tools use; token never returned to the agent).
  2. **Run `guardMigrationSql(sql, { allowDestructive: allow_destructive })`** (this PR). If `ok` is false, refuse and return the reason - no network call.
  3. If `dry_run`, return the guard verdict + statement summary without executing.
  4. POST to the Management API query endpoint. Apply the connector standard: request timeout, clean 429, two-lane (caller vs upstream) errors, `stampMeta` (source / freshness / next_steps). Log only non-secret context (project_ref, statement count) - never the token.
  5. Return rows / status.

Optionally a thin `supabase_run_sql` for read-only checks (gate with `isReadOnlySql`).

## Guardrails (must-haves before prod use)

1. **guardMigrationSql** deny-by-default for DROP/TRUNCATE/DELETE (this PR).
2. **Ordering + history**: prefer applying via the Supabase migration pipeline so migration history is recorded; if running raw, apply files in filename order and record what ran.
3. **Migrations-before-code invariant**: never wire the runner to auto-run *after* a deploy. Keep the migrate-then-deploy rule and bake it into any orchestration.
4. **Approval gate**: destructive or multi-statement applies require an explicit human approval step, not a silent agent call.
5. **Transaction** where the statements allow it, so a mid-script failure rolls back.

## Open question to verify first

`main` now has a CI check named **apply** (it ran green on the PR #1586 merge commit `ebcfdf3`). Before building a new runner, check what that job does - if it already applies pending Supabase migrations on merge, this feature may be about **exposing/triggering** that existing job rather than a new SQL path. Read `.github/workflows/` for the apply job.

## What shipped in this increment

- `packages/mcp-server/src/supabase-migration-guard.ts` - pure deny-by-default SQL guard (`guardMigrationSql`, `isReadOnlySql`, `stripNonCode`).
- `packages/mcp-server/src/supabase-migration-guard.test.ts` - 8 vitest cases incl. the real PR #1586 migrations (pass) and DROP/TRUNCATE/DELETE (blocked), with comment/string/dollar-quote stripping.

What remains: the resolver + HTTP action + wiring + the apply-job check above + security review. Net-new prod-touching code - do not enable without review.
