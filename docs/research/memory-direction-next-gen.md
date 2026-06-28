# Memory Direction Next-Gen Brief

**Status**: Draft build brief  
**Last updated**: 2026-05-10 UTC  
**Linked todo**: `9fe82554-88e9-400d-aff3-32921b8c27e0`  
**Scope**: Memory direction, Profile Card, Library Snapshots, provenance, cheap-first retrieval, Data Island export

## Executive read

UnClick Memory should remain Postgres-backed product state, not loose vector storage. The market pattern is clear: long-term memory systems are moving toward layered memory, graph-aware retrieval, source-linked history, and compact context injection. The UnClick edge is to make that agent-native and human-inspectable inside one tenant-scoped state layer.

The next generation should ship as five connected chips:

1. Profile Card: the compact current-state summary a fresh AI Seat reads first.
2. Library Snapshots: curated shelves that make the Library feel like a living taxonomy instead of a document dump.
3. Provenance Trail: every surfaced memory links back to a fact, summary, document, conversation chunk, or export receipt.
4. Cheap-First Retrieval: deterministic context first, search later, graph/vector only when needed.
5. Data Island Export: one portable package for profile, facts, sessions, library snapshots, raw sources, and redaction notes.

## Current UnClick base

UnClick already has a strong Memory foundation:

- Six layers: business context, sessions, facts, library, conversations, and code.
- Bi-temporal facts with soft-delete and provenance.
- Hybrid retrieval with pgvector plus keyword and recency filters.
- Managed Supabase cloud by default, BYOD Supabase as an escape hatch.
- MCP-first tools: `load_memory`, `save_session`, `save_fact`, `search_memory`, and `save_identity`.
- Tenant scoping through `api_key_hash`.
- Portable export through `admin_export_all`.

Those choices should stay. The next phase should make the layers easier to trust, easier to inspect, and cheaper to load.

## Source-backed market notes

These notes were verified from live public sources on 2026-05-10 UTC and are kept category-level for public docs.

| Source class | What is source-backed | UnClick inference |
| --- | --- | --- |
| Graph-memory systems | Modern memory layers store chat history, build user-level knowledge graphs, retrieve compact context blocks, and keep raw facts available for inspection. | UnClick should capture both user and AI turns, but keep Postgres as the source of truth and make graph-like retrieval an optional derived index. |
| Temporal-memory research | Temporal relationships improve deep memory retrieval and reasoning when they remain source-linked and queryable. | UnClick should model time through bi-temporal state, provenance, and source receipts before adding a heavy graph dependency. |
| Managed memory platforms | The market is moving toward graph memory, webhooks, multimodal support, custom categories, governance, and MCP delivery. | Integrate memory directly with Boardroom, Heartbeat, Orchestrator, Keychain, and Data Island rather than as a standalone SDK. |
| Open-core memory servers | Server mode, self-hosted dashboards, API keys, audit logs, configurable LLMs, embeddings, vector stores, rerankers, and Postgres plus pgvector are common patterns. | Keep BYOD and managed modes, but avoid pushing configuration burden onto normal users. Advanced knobs belong behind admin/operator surfaces. |
| Memory type models | Conversation, session, user, and organization memory should be separated, and secrets must not enter retrievable memory. | UnClick already has richer layers. The missing step is a visible classifier that says why a row is startup-safe, searchable-only, archival, or excluded. |
| Stateful-agent systems | Agent state, memory blocks, messages, reasoning, and tool calls are persisted, with important blocks pinned into context and old messages retrievable after compaction. | Profile Card should be pinned, editable state. Raw conversations and tool receipts should stay retrievable, not always loaded. |

## Recommended architecture

### 1. Profile Card

Purpose: a compact, always-loaded card that tells a fresh AI Seat who the operator is, what UnClick is, what matters now, and what to avoid.

Recommended fields:

- `profile_summary`: stable human and business context.
- `working_now`: active goals and near-term priorities.
- `do_not_repeat`: mistakes, stale assumptions, and wrong-time warnings.
- `timezone_context`: timezone and local-time note, no precise location.
- `memory_health`: warnings such as fact pollution, stale sources, or export gaps.
- `source_receipts`: links to the facts, summaries, and Library Snapshots that built the card.

Implementation guidance:

- Generate from existing business context, high-confidence durable facts, active session summaries, and operator overrides.
- Store as normal tenant-scoped state, preferably a small table or view fed by existing Memory rows.
- Manual edits win over automatic compaction until explicitly reset.
- Never include secrets, auth tokens, billing details, or precise location.

### 2. Library Snapshots

Purpose: turn the Library into buildable shelves, not a pile of documents.

Recommended shelves:

- Product truth: PRDs, current-state docs, target-state docs, ADRs.
- Operator preferences: tone, timezone, merge policy, safety rules.
- Project state: active lanes, completed milestones, blockers, proof receipts.
- Research: category notes, papers, market scans, source links.
- Troubleshooting: issue, cause, fix, proof, expiry.

Implementation guidance:

- Add snapshot rows that point to underlying Library docs and raw chunks.
- Treat snapshots as summaries with provenance, not replacements for sources.
- Support "refresh snapshot" and "show raw sources" separately.
- Use taxonomy tags to route retrieval before semantic search.

### 3. Provenance Trail

Purpose: make every memory answer auditable without loading raw dumps by default.

Recommended receipt shape:

| Field | Meaning |
| --- | --- |
| `memory_id` | Fact, session, library, conversation, or code row id. |
| `source_kind` | `fact`, `session`, `library_snapshot`, `conversation_chunk`, `code_snapshot`, `export_manifest`. |
| `source_uri` | Internal route, file path, PR, issue, or external URL when public. |
| `confidence` | Confidence or trust tier. |
| `redaction_state` | `clean`, `redacted`, `sensitive-hidden`, or `blocked`. |
| `last_verified_at` | Time the claim or source was last checked. |

Implementation guidance:

- Add receipts to Profile Card and Library Snapshot outputs.
- Keep raw source lookup read-only by default.
- Redact sensitive/auth/billing material before storage and before export.
- Record whether a claim is source-backed or inferred.

### 4. Cheap-First Retrieval

Purpose: reduce token cost, latency, and memory bloat while improving first-turn usefulness.

Recommended ladder:

1. Load business context and Profile Card.
2. Load durable startup facts, excluding invalidated rows and operational self-report noise.
3. Load relevant Library Snapshots by taxonomy shelf.
4. Search session summaries and source-linked raw chunks only when the current task needs depth.
5. Use vector or graph retrieval only when deterministic layers do not answer the question.

Implementation guidance:

- The startup payload should remain scarce and curated.
- `active_facts` should prefer durable user facts over operational recency.
- Fact access metrics should reinforce surfaced rows, not hidden candidate pools.
- Use UTC for system timing, operator timezone only for human context and tone.

### 5. Data Island Export

Purpose: make Memory portable, inspectable, and safe to move.

Recommended export package:

- `profile-card.json`
- `facts.jsonl`
- `sessions.jsonl`
- `library-snapshots.jsonl`
- `source-receipts.jsonl`
- `raw-sources-manifest.json`
- `redaction-report.json`

Implementation guidance:

- Reuse `admin_export_all` as the base.
- Include snapshot and provenance layers once they exist.
- Keep source-linked raw dumps opt-in.
- Include redaction state and excluded categories so exports do not silently leak sensitive material.

## Safety and cost guardrails

- Do not capture raw secrets, auth tokens, billing credentials, private keys, or precise location.
- Store timezone and local-time context only as operator context, never as geolocation.
- Prefer summary plus receipts over raw transcript replay.
- Mark operational self-reports as non-startup memory.
- Keep old raw chunks queryable, but do not let them crowd the startup context.
- Require explicit source links for market claims and category notes.
- Keep export and deep lookup read-only unless a separate write chip is scoped.

## Build sequence

| Order | Chip | First implementation slice | Suggested owned files | Focused proof |
| --- | --- | --- | --- | --- |
| 1 | Profile Card v1 | Add a compact generated card from existing business context, durable facts, timezone context, and source receipts. | `api/memory-admin.ts`, `packages/mcp-server/src/*memory*`, `src/pages/admin/AdminYou.tsx` | Unit test for source receipt and manual override precedence. |
| 2 | Library Snapshots v1 | Add snapshot metadata and a read path that groups Library docs by taxonomy shelf. | `api/memory-admin.ts`, `src/pages/admin/AdminMemory.tsx`, migrations | Focused test for shelf grouping and source links. |
| 3 | Provenance Trail v1 | Add receipt fields to Profile Card and Snapshot responses. | Memory service/API layer and admin UI read surfaces | Test that every surfaced card/snapshot item has a receipt. |
| 4 | Cheap-First Retrieval v1 | Update startup context planner to load deterministic layers before semantic search. | `packages/mcp-server`, startup-context SQL/docs | Regression for operational noise exclusion and retrieval ladder order. |
| 5 | Data Island Export v1 | Extend export manifest with snapshots, receipts, and redaction report. | `api/memory-admin.ts`, export docs/tests | Export fixture includes all expected manifests and no blocked categories. |

## Parent closure rule

This parent research card should stop competing with child work once:

- this brief is merged,
- the child chips exist in Boardroom with exact scope,
- each child has owned files and focused tests,
- the parent is downgraded or closed with links to the child chips.

The parent should not stay urgent after that point.
