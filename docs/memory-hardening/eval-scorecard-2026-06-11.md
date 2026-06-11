# Memory Eval Scorecard (2026-06-11 night pass)

Deterministic lane-10 harness (`runMemoryHardeningEval`, LocalBackend, local hash embeddings). Full hardened flag set: scopes, write gate, reconcile, hard forget, provenance.

| Configuration | recall@5 | latest_value | forget_compliance | duplicate_rate | scorecard |
| --- | --- | --- | --- | --- | --- |
| Frozen lane-10 baseline (2026-06-04) | 1.0 | 1.0 | 1.0 | 0.667 | 0.667 |
| Tonight, fusion OFF | 1.0 | 1.0 | 1.0 | 0.0 | 0.833 |
| Tonight, fusion ON | 1.0 | 1.0 | 1.0 | 0.0 | 0.833 |

Notes:

- Before tonight's fixes, `latest-value` FAILED in both configurations under the full flag set: the write gate's cool-down treated a changed value ("channel is beta" vs "channel is alpha", similarity 0.76) as a NOOP and silently dropped the newer fact. Fixed by the value-change supersede rule in `write-gate.ts` (small token swap on the same subject now routes to UPDATE/supersession; paraphrase rewrites still NOOP).
- With the gate off, fusion ranked the older value first because recency used `created_at` (seconds apart) instead of the declared `valid_from` (days apart). Fixed in `orderByEffectiveScore`.
- `scope-bleed` fails in every configuration including the frozen baseline: the fixture writes "private" as a plain category without scope context, so it measures an aspirational contract. Real scope enforcement is covered by `scopes.test.ts`. Fixing the fixture is a follow-up chip.
- Flip decision: fused retrieval meets the master-plan gate (at or above baseline on every metric), so `MEMORY_FUSED_RETRIEVAL_ENABLED` now defaults ON with `0`/`false` as the kill switch.

Reproduce: set the flag matrix and call `runMemoryHardeningEval(new LocalBackend())` (see `src/memory/__tests__/eval-harness.test.ts`).
