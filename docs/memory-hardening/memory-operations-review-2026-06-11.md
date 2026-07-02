# Memory Operations Review (2026-06-11)

**Status:** completed review with fixes
**Scope:** full operational check of UnClick Memory, gap analysis against the deep-research corpus (Drive: MemoryUpdate series, ContextPass_RAG series) and the wider memory-platform field, plus improvements shipped in the same PR.
**Inputs:** `MEMORY_HARDENING_MASTER_PLAN.md`, `docs/research/memory-direction-next-gen.md`, `docs/memory/active_facts-contract-v1.md`, the Drive deep-research folder, live MCP smoke tests against the deployed server, and the full local test suite.

## 1. Verification results: the system is working

| Check | Result |
| --- | --- |
| Memory module tests (local) | 225 tests / 59 suites, all passing (includes the new coverage added by this review) |
| Full `@unclick/mcp-server` suite | Passing end to end, including wiring gates and depth-ladder checks |
| Live `load_memory` | Returns compact profile card, retrieval plan, source receipts, response bounds |
| Live `search_memory` | Hybrid keyword + vector RRF results with scope weights and effective scores |
| Live write gate | Correctly REJECTED a low-confidence smoke-test fact (`low_confidence_without_provenance`) and emitted a `fact_not_saved` signal visible via `check_signals` |
| Hardening lanes 1-10 | 9 of 10 substantially complete in code; lane 1 increment 2 (RRF fusion) implemented but flag-gated off; lane 6 optional reranker intentionally deferred |

## 2. Gaps found

### Fixed in this PR

1. **Recycle-bin model was missing (operator decision 2026-06-08).** `forget` was either a soft invalidate or an immediate permanent tombstone; there was no restorable bin and no empty-bin step. Shipped now behind `MEMORY_RECYCLE_BIN_ENABLED` (default off):
   - `archive_memory` moves a fact to status `archived` (hidden from every recall surface by the existing `status === 'active'` filters, content preserved).
   - `restore_memory` returns it to active recall. Both are idempotent.
   - `list_archived` shows bin contents.
   - `empty_recycle_bin` is the only permanent deletion path while the flag is on; it runs the lane-05 forget cascade (embeddings, typed links, snapshots, episodes) per fact and emits a signal.
   - With the flag on, `forget` routes non-archived facts into the bin instead of deleting.
   - Implemented in both backends (`local.ts`, `supabase.ts`) with parity tests in `recycle-bin.test.ts`.
2. **Five memory operations had no test coverage**: `list_library`, `get_conversation_detail`, `store_code`, `memory_status`, `embedding_state`. Added `ops-coverage.test.ts` covering all five, including the three embedding degradation states (local provider ready, OpenAI without key reports `missing_credentials`, default disabled keeps keyword retrieval).

### Open gaps (prioritized backlog)

1. **Fused retrieval flag is off in production.** The RRF fusion (lane 1 increment 2) exists and is tested, but `MEMORY_FUSED_RETRIEVAL_ENABLED` default-off means production search still keyword-short-circuits. The research verdict applies: "do not ship hybrid while the vector half is dead." Action: run the lane-10 eval harness against baseline with the flag on, then flip it.
2. **Boardroom contradiction event not wired.** The master plan promises one Boardroom event per genuine contradiction; `reconcile_fact` resolves and records but does not post the event. Small chip: emit via the existing `emitSignal` path.
3. **Backend parity, Supabase-only surfaces.** Library history purge on forget and conversation-detail depth are Supabase-only; the local backend has the history table but not the full version semantics. Low risk, worth a parity test sweep.
4. **Lane 6 reranker deferred.** `MEMORY_RERANK_ENABLED` shortlist reranker (cohere_rerank) remains unbuilt. Only worth doing if eval ndcg@10 plateaus after fusion is enabled.
5. **Admin UI for the recycle bin.** This PR ships the MCP/ops layer only. The admin Memory tab needs Bin view, Restore, and Empty Bin actions before user-facing rollout (`src/pages/admin/AdminMemory.tsx`).
6. **Unowned research backlog** (recommended in the Drive corpus, in no build lane): byte-exact kv store (never embedded or paraphrased), recall rehearsal (periodic keep/update/scope/delete review), time-aware memory lanes (current/historical/expired views), mission memory capsules (task-scoped TTL bundles), memory + corpus fusion (ContextPass tie-in).
7. **Public proof gap.** UnClick's public memory proof, docs, and evals were less visible than the system itself. Action: publish the lane-10 eval scorecard and a category-level capability page; the eval harness already produces the numbers.

## 3. Market position (mid-2026 field)

Table stakes across the field: extraction, dedup with ADD/UPDATE/DELETE/NOOP, scoped semantic search, contradiction handling, temporal validity, MCP delivery, and published benchmarks. UnClick covers all of these except published benchmarks (gap 7 above).

Where UnClick is ahead:

- **Memory quality controls.** UnClick's write gate, provenance receipts, write-precision metrics, and consolidation directly target junk accumulation, duplicate storms, and recall re-extraction feedback loops. The gate is verified live.
- **True forget with compliance scoring.** Forget cascades through embeddings, typed links, snapshots, and episodes, and scores `forget_compliance`.
- **Provenance and receipts everywhere.** Source receipts surface in `load_memory` output. No incumbent leads with this.
- **Identity + credential + Boardroom binding.** Credential quarantine on disconnect and Boardroom-scoped visibility remain distinctive.
- **Memory passport.** Signed export/import with zero-credential-leak gating answers the walled-garden critique directly.

Where the field is ahead:

- **Graph-native systems**: bi-temporal edge invalidation at graph level and templated context blocks. UnClick's bi-temporal facts plus typed links cover most of this without graph cost; revisit only if multi-hop temporal queries become core.
- **Stateful-agent systems**: sleep-time compute is a polished version of UnClick's consolidation heartbeat; UnClick's consolidation job exists but the flag and cadence are conservative.
- **Managed memory APIs**: criteria retrieval and memory webhooks as platform features; UnClick signals cover part of the webhook story.
- **Published benchmarks**: UnClick's eval harness exists; its scorecard is not public.

## 4. Recommended next chips (in order)

1. Flip `MEMORY_FUSED_RETRIEVAL_ENABLED` after an eval-harness baseline run (lane 1 closeout).
2. Boardroom contradiction event on reconcile (lane 2 closeout).
3. Recycle-bin admin UI (this PR's feature, user-facing half) and then flip `MEMORY_RECYCLE_BIN_ENABLED`.
4. Publish the eval scorecard and a category-level memory capability page.
5. Backend parity sweep for library history and conversation detail.
