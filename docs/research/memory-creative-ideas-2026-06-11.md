# Memory Creative Ideas Session (2026-06-11)

**Context:** follow-up to `docs/memory-hardening/memory-operations-review-2026-06-11.md`. Ideas ranked by confidence-it-works times market edge. Sources: the Drive deep-research corpus (MemoryUpdate, ContextPass_RAG), the mid-2026 memory-platform field study, and the live code audit.

## Shipped in this pass (high confidence, immediate edge)

1. **Recycle bin live by default.** `MEMORY_RECYCLE_BIN_ENABLED` now defaults ON (env `0`/`false` is the kill switch). `forget` routes to a restorable bin; `empty_recycle_bin` is the only permanent path. Edge: restorable deletion with a verified-clean permanent path.
2. **Contradiction signal on reconcile (lane-2 closeout).** A genuine contradiction now emits a `memory_contradiction` signal (visible via `check_signals`) with both values and timestamps. Edge: surfacing the conflict to the user/agents is the trust play the research called "contradiction radar".
3. **Per-fact expiry (`expires_at`).** `add_fact`/`save_fact` accept `expires_at` (alias `valid_until`), mapped to bi-temporal `valid_to`; both backends already filter expired facts from every recall surface, so this was pure parameter plumbing. Edge: near-zero-cost expiry that composes with point-in-time `as_of` queries.
4. **`get_context_block`.** One call returns a compact, prompt-ready markdown block: standing rules, profile, durable facts, plus query-relevant memories when a query is given, with source receipts and a char budget. Edge: cheap-first deterministic layers before any graph bill.
5. **Pattern promotion (flag-gated off, `MEMORY_PATTERN_PROMOTION_ENABLED`).** Deterministic episodic-to-semantic promotion: clusters similar episode events, and when a behavior repeats (default 3+ occurrences) proposes a durable fact through the write gate with provenance `pattern:<n>-episodes`. Edge: pattern inference with receipts. Flag stays off until the eval harness scores it.

## Next bets (high confidence, not yet built)

6. **Publish the eval scorecard.** The lane-10 harness already produces write precision, duplicate rate, forget compliance, and scope leakage. Render it on unclick.world beside a category-level capability table. This directly fixes the public proof gap, which was a visibility failure, not a capability failure.
7. **Fused retrieval default-on after baseline.** Run the eval harness with `MEMORY_FUSED_RETRIEVAL_ENABLED` on vs off; flip the default if recall@5 holds. The research rule stands: do not market hybrid while the keyword short-circuit is the production path.
8. **Recall rehearsal (`review_memory_queue`).** Deterministic op returning the top facts due for review (stale `last_verified_at`, low reinforcement) with keep/update/archive actions wired to existing ops. Pairs with the recycle bin; "memory hygiene as a feature" exists nowhere in the field.
9. **Criteria retrieval.** `search_memory` accepting weighted criteria (category weights, recency bias, confidence floor). UnClick can ship it in the open core.
10. **Byte-exact KV memory.** A `kv_exact` store that is hash-verified and never embedded or paraphrased (connection strings, exact commands, IDs). Verbatim state should stay separate from semantic memory because agents constantly corrupt verbatim strings through paraphrase.

## Parked (real but not now)

- **Time-aware memory lanes** (current/historical/expired views): bi-temporal columns already support it; needs a read surface and admin UI.
- **Mission memory capsules** (task-scoped TTL bundles): wait for Rooms/Autopilot integration so capsules map to jobs.
- **Graph/temporal layer**: revisit only if multi-hop "what was true when" queries become core; typed links cover current demand.
- **Memory webhooks**: signals cover the in-product story; external webhooks belong with the developer platform work.
