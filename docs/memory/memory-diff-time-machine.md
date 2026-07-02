# Memory Time Machine: memory_diff

**Status:** shipped (read-only memory operation)
**Surface:** `unclick_call` with `endpoint_id: "memory.memory_diff"`, or the direct handler name `memory_diff`
**Code:** `packages/mcp-server/src/memory/diff.ts` (pure logic), `local.ts` and `supabase.ts` (`memoryDiff`), `handlers.ts` (dispatch)
**Tests:** `packages/mcp-server/src/__tests__/memory-diff.test.ts` (vitest)

## What it is

UnClick Memory is bi-temporal: every fact records when it was created, invalidated, superseded, or archived, and `search_memory` already supports `as_of` recall (what did I know at instant T). `memory_diff` is the missing companion: a changelog between two instants.

It answers, with receipts:

- "What did my agent learn this week?"
- "What changed in memory since I was last here?"
- "Which facts got corrected or retired between Monday and today?"

No mainstream agent-memory product exposes its history this way. The bi-temporal data already existed; this operation makes it visible.

## Usage

```json
{ "endpoint_id": "memory.memory_diff", "params": { "from": "7d" } }
```

| Param | Type | Default | Notes |
| --- | --- | --- | --- |
| `from` | string | 7d before `to` | ISO 8601 timestamp or relative duration (`30m`, `12h`, `7d`, `4w`), measured back from now. `since` is accepted as an alias. Bare numbers like `"7"` are rejected as ambiguous. |
| `to` | string | now | Same formats as `from`. A reversed window is swapped, not rejected. |
| `limit` | number | 20 | Per-bucket entry cap (1 to 100). Counts stay exact totals for the window; `response_bounds.truncated_buckets` flags capped buckets. |
| `include_sessions` | boolean | true | Include session summaries saved in the window. |

## Report shape

```text
window            { from, to }            resolved ISO window
headline          one-line plain-English summary
facts_added       created in the window
facts_superseded  superseded_by set, close stamp in the window (old -> new id)
facts_invalidated invalidated in the window (with reason where stored), excludes superseded
facts_archived    moved to the recycle bin in the window (with reason)
sessions_saved    session summaries written in the window
counts            exact totals per bucket, independent of limit
response_bounds   per_bucket_limit + truncated_buckets + unavailable_buckets
```

Fact text is capped at 160 chars and summaries at 240 so strict MCP clients stay under payload limits. Use `search_memory` for full text.

## Design notes

- Pure bucketing lives in `diff.ts`; both backends collect raw rows and delegate, so local JSON and Supabase reports are shape-identical.
- The Supabase implementation runs four window queries on `extracted_facts` (created via `created_at`, invalidated via `invalidated_at`, superseded via `updated_at` because the supersede RPCs do not set `valid_to`, archived via `archived_at`) plus one on session summaries. Every query is tenancy-scoped in managed mode and carries `count: "exact"`, so counts stay exact even though entry lists are capped.
- `invalidation_reason` exists only on the local backend; the Supabase invalidate RPCs keep the reason in the audit table, so `reason` is null there.
- A superseded fact also carries an invalidation close stamp; `superseded_by` is the discriminator, so it lands in `facts_superseded` only.
- Older BYOD installer schemas can lack bi-temporal columns. Each bucket degrades independently: a missing column retries with a core column set where possible, otherwise the bucket is listed in `response_bounds.unavailable_buckets` instead of failing the call.
- Scope-aware (lane-04): when `MEMORY_SCOPES_ENABLED` is on, rows pass through `isFactInScope`, so quarantined, private, and credential-gated facts never leak through the changelog. With scope filtering active, counts come from the filtered rows rather than the raw count queries.
- Read-only: no signals, no writes, no flags required. Safe at any tier.

## Follow-up ideas (not built)

- Business-context (standing rule) change tracking in the same report.
- A `load_memory` nudge ("3 memory changes since your last session") powered by this op.
- Admin UI timeline view on `/admin/memory` rendering the same report.
