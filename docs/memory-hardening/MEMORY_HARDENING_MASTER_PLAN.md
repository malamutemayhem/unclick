# UnClick Memory Hardening - Master Build Plan (10 Lanes + Coordinator)

> Single source of truth for the memory-hardening build. Attach this file to each
> builder session. Tell each session its **Worker number**. Every worker reads
> **Part 0 (shared context)** and **Part 1 (ground rules)**, then jumps to its own
> lane in **Part 3**. Session 11 is the **Coordinator** (Part 5) and owns the merge.

- **Author of this plan:** Coordinator session (Worker 11), Claude.
- **Source research:** `MemoryUpdate_1_2.md` and `MemoryUpdate_2_2.md` (the write-manage-read
  diagnosis, the 8 gaps, the competitor landscape, and the moat thesis). This plan
  reconciles that research against the **actual code**, which is further along than
  the research assumed.
- **Repo:** `malamutemayhem/unclick`. Package: `@unclick/mcp-server`.
- **House style:** no em dashes anywhere; keep changes flag-gated; both memory
  backends stay in parity. See Part 1.

---

## How to read this document

1. You are one of 11 sessions.
   - **Workers 1-5** are Claude sessions. Assigned to lanes that reward judgment,
     cross-cutting reasoning, policy nuance, security/RLS care, and prose.
   - **Workers 6-10** are ChatGPT (Codex) sessions. Assigned to lanes that reward
     tight, well-specified algorithmic implementation, SQL/migrations, deterministic
     loops, and harness scaffolding.
   - **Worker 11** is the Coordinator (this Claude session). Runs the Day 0 ground-truth
     audit, publishes the shared contracts, and merges all lanes.
2. Read Part 0 and Part 1 in full. They are binding for everyone.
3. Find your lane in Part 3. Build only inside your lane's scope. If you need a change
   outside your scope, post in the Boardroom and tag the owning lane; do not reach in.
4. Honour the shared contracts in Part 6 (schema registry, metric registry, flag
   registry, interface-extension protocol). They are what let 10 builders run in
   parallel without stomping each other.

---

# PART 0 - Shared Context (every worker reads this)

## 0.1 What we are hardening

UnClick is an AI-agent operating system: one npm install gives an agent 450+ callable
endpoints across 60+ integrations **and** persistent cross-session memory, all over MCP.
The memory module lives in `packages/mcp-server/src/memory/`. This build hardens that
module so UnClick's recall is trustworthy at scale and so memory becomes a differentiated
moat, not just table-stakes recall.

## 0.2 The framing: memory is a write-manage-read loop

The modern consensus (and the source research) is that memory failures are usually
**upstream**, at write time and management time, not at read time. The loop:

- **Write:** decide what is worth remembering, dedup/merge, attach provenance, route
  events away from facts, admit only durable signal.
- **Manage:** reconcile contradictions, decay/expire, consolidate near-duplicates,
  recompute priority, forget cleanly.
- **Read:** retrieve with hybrid signals (vector + keyword + structured identity),
  fuse and rerank, respect scope and time.

A flat "store text and embed it" design loses on all three. This build fixes all three.

## 0.3 The 8 diagnosed gaps (from the research)

1. **Dead vector half** - semantic retrieval not actually contributing.
2. **business_context not searched** - the ~100 always-true standing rules (name,
   timezone, salary target) never enter the search index.
3. **No write dedup/merge** - the same fact piles up under slightly different wording.
4. **Keyword ranking bias to long facts** - concise identity facts buried under verbose logs.
5. **No contradiction reconciliation** - changed facts coexist ambiguously instead of
   superseding cleanly.
6. **No decay/TTL/archival** - stale and resolved items keep loading hot.
7. **Incoherent priority** - load order is not a principled function of scope, confidence,
   recency, and reinforcement.
8. **Facts vs events blurred** - long timestamped logs sit in the same store as atomic
   facts and poison keyword search.

Plus the strategic moat bets: provenance/receipts, credential-aware memory,
Boardroom-scoped visibility, anti-sycophancy correction memory, admission control,
typed memory + scopes, true forget, an eval harness, and an MCP-native memory passport.

## 0.4 CRITICAL: current state is further along than the research assumed

The research docs were written without live code access. The Coordinator's Day 0 audit
(Part 5) is the binding word, but the code review already shows that several gaps are
**partially built**. Do not rebuild what exists. Verified findings (re-confirm in your lane):

- **Exact-hash dedup EXISTS.** `addFact` in `supabase.ts` computes `content_hash` and
  returns the existing row on an exact match. What is missing is **semantic/near-duplicate**
  dedup and an UPDATE/merge decision. (Gap 3 is half-done.)
- **Embedding-on-write EXISTS.** `embedAndStore` writes an embedding for every fact and
  session summary, fire-and-forget, gated behind embeddings being enabled. A local,
  dependency-free hashed-embedding provider EXISTS (`embeddings.ts`).
- **A hybrid BM25 + pgvector RRF RPC EXISTS** (`search_memory_hybrid` /
  `mc_search_memory_hybrid`). BUT `searchMemory` is **keyword-first**: it returns
  `keywordFallback` results and only tries the vector lane when keyword returns **zero**
  rows (`supabase.ts` ~line 725-748). So the vector half is shadowed whenever keyword
  matches anything. **Gap 1 is largely a short-circuit, not a missing feature.** The fix
  is to FUSE the lanes, not to add vector from scratch.
- **business_context is genuinely absent from search.** `keywordFallback` only scans
  `extracted_facts` + `session_summaries`. (Gap 2 is real and unstarted.)
- **Bi-temporal validity EXISTS** (`valid_from` / `valid_to` / `invalidated_at` plus a
  recall-visibility filter). `supersedeFact` and `invalidateFact` EXIST.
- **Provenance fields PARTIALLY exist** on `FactInput` (`extractor_id`, `prompt_version`,
  `model_id`, `commit_sha`, `pr_number`) and `addFact` persists them. Missing: source agent,
  source ref, receipt linkage, confidence-as-provenance, retrieval filter/boost, and surfacing.
- **`manageDecay()` EXISTS** as an interface method; `decay_tier: "hot"` and `last_accessed`
  are set on insert. The decay **policy** is the gap, not the hook.
- **Operational-vs-durable split PARTIALLY exists** (`startup_fact_kind`,
  `isMemoryFactOperational`) and a heartbeat self-echo skip-list exists in
  `shouldSkipEmbedding`. The reported "thousands of near-identical memories" may be
  pre-existing rows or a non-embedding path; the audit must localise the source.
- **There are TWO backends** that both implement `MemoryBackend`: `local.ts` (local JSON)
  and `supabase.ts` (Postgres/pgvector). **Parity is mandatory** (Part 1.3).

The practical consequence: most lanes are **completion and hardening of partial work**,
plus a few genuinely new modules. Treat the research's "build X" as "verify what exists,
then finish and harden X."

## 0.5 The moat thesis (why we are not just chasing benchmarks)

Mem0, Zep, Supermemory, Google Memory Bank, and Letta already lead on raw recall. UnClick
does not win by out-recalling them. UnClick wins on the combination nobody else has:
memory bound to **identity + live credentials + skills**, **MCP-native portability** across
every client, **multi-agent Boardroom** coordination, and a **proof/receipts** culture
(XPass / AnswerPass / XGate). The strategic lanes (provenance, credential-aware,
Boardroom-scoped, anti-sycophancy, passport) are the moat. The parity lanes (retrieval,
dedup, decay, typed split) are the price of entry. We ship both.

---

# PART 1 - Ground Rules (binding for all 11 sessions)

## 1.1 Start ritual (from CLAUDE.md, do this before any edit)

1. Refresh live GitHub, Actions, and Boardroom (Fishbowl) state.
2. `git status`. If the checkout is dirty or belongs to another lane, stop and create a
   fresh worktree from the integration base.
3. Confirm your target files are not already owned by another active PR or worker.
4. Claim your lane chip, post status in the Boardroom, default to a **draft PR** first.

Naming note: say **Boardroom** to the user; expect **Fishbowl** in code, routes, and the
`read_messages` metadata. Do not bulk-rename Fishbowl.

## 1.2 Branching and integration

- **Integration base branch:** `mem-harden/integration` (Coordinator creates it from
  `origin/main` on Day 0). All lanes branch from it, not from each other.
- **Per-lane branch name:** `mem-harden/lane-NN-shortslug`, for example
  `mem-harden/lane-01-retrieval`, `mem-harden/lane-07-write-gate`.
- Open a **draft PR** into `mem-harden/integration` early. Keep it draft until your lane's
  Definition of Done (1.6) is green. The Coordinator merges lanes into integration in
  dependency order (Part 4), then opens the single integration -> `main` PR.
- Never push to another lane's branch. Never push to `main`.

> Note for this Coordinator session: this planning doc is committed on the session branch
> assigned to Worker 11. The 10 builder branches above are created by their own sessions.

## 1.3 Backend parity rule (the most common way to break this build)

Any change to memory behaviour usually touches **all** of:

- `memory/types.ts` - the `MemoryBackend` interface and the input types.
- `memory/supabase.ts` - the Postgres/pgvector implementation.
- `memory/local.ts` - the local JSON implementation.
- `memory/handlers.ts` - the operation dispatcher.
- a colocated test under `memory/__tests__/`.

If you add or change a backend method, you implement it in **both** `supabase.ts` and
`local.ts`, extend the interface in `types.ts`, wire dispatch in `handlers.ts`, and add a
test that runs against both backends. A feature that only works on one backend fails review.

## 1.4 Flag-gating (so half-built lanes never break prod)

Every new behaviour ships behind an environment flag, default **off**, until the Coordinator
flips it during integration. Follow the existing pattern (`MEMORY_OPENAI_EMBEDDINGS_ENABLED`,
`MEMORY_EMBEDDINGS_PROVIDER`). Register your flag in Part 6.3. New retrieval, write-gate,
decay, reconciliation, scope, and consolidation behaviour must be reversible by flag.

## 1.5 Shared-seam edit protocol (anti-stomp)

A few files are touched by many lanes. To avoid merge hell:

- **Additive, anchored, lane-tagged.** When extending a shared file, append your block at
  the end of the relevant section and wrap it in a comment anchor with your lane number,
  for example `// --- lane-07: write-gate admission ---` ... `// --- end lane-07 ---`.
  Do not reflow or reorder existing code in a shared file.
- **`MemoryBackend` interface (`types.ts`):** add new methods in a lane-tagged block at the
  end of the interface. Do not change existing signatures; add overloads or new methods.
- **`handlers.ts` dispatch:** add new `case`/route entries in a lane-tagged block. Do not
  rewrite the existing switch.
- **Migrations:** never edit another lane's migration. Claim a numeric band from the
  registry (Part 6.1) and add your own file.
- If two lanes truly need the same signature change, neither makes it unilaterally. Post in
  the Boardroom; the Coordinator arbitrates and the change lands once.

## 1.6 Definition of Done (per lane, all must be true)

- [ ] Behaviour implemented in **both** backends (or explicitly N/A with a one-line reason).
- [ ] Interface + dispatch wired; no broken existing callers.
- [ ] Flag-gated, default off, flag registered in Part 6.3.
- [ ] Colocated tests pass: `cd packages/mcp-server && npx vitest run <your test file>`.
- [ ] Full package suite green: `npm run test --workspace=@unclick/mcp-server`.
- [ ] Emits the metrics your lane owns (Part 6.2) so Worker 10's harness can measure the delta.
- [ ] No em dashes. No secrets in code, logs, or commits.
- [ ] Draft PR description states: what existed before, what you added, the flag name, the
      backends touched, and the eval metric you expect to move.
- [ ] Security-sensitive lanes (4) include a `/security-review` pass in the PR.

## 1.7 Local proof commands (from CLAUDE.md)

The root Vitest config only includes `src/**` and `api/**`. To prove MCP-package work, run
from the package workspace:

```bash
cd packages/mcp-server
npx vitest run src/memory/__tests__/<your-file>.test.ts   # one file
npm run test --workspace=@unclick/mcp-server               # full package
```

## 1.8 Boardroom status cadence

Post a short status when you (a) claim your lane, (b) publish or consume a shared contract,
(c) hit a cross-lane blocker, (d) open your draft PR, (e) reach Done. Use `post_message`.
Keep it to a line or two. The Coordinator watches the Boardroom to sequence merges.

---

# PART 2 - Architecture Map (real files)

```
packages/mcp-server/src/memory/
  types.ts            # MemoryBackend interface + input types (FactInput already has provenance fields)
  db.ts               # backend factory: local JSON vs Supabase
  handlers.ts         # operation dispatcher (canonical memory op surface)
  supabase.ts         # Postgres/pgvector backend (searchMemory, addFact, manageDecay, ...)
  local.ts            # local JSON backend (must stay in parity)
  embeddings.ts       # embedText (OpenAI or local hashed), shouldSkipEmbedding, getEmbeddingState
  conflicts.ts        # competing-MCP-server detection (NOT fact contradictions - do not overload)
  typed-links.ts      # deterministic typed-link extraction from writes
  instrumentation.ts  # metrics hooks
  session-state.ts    # session continuity
  tenant-settings.ts  # per-tenant config
  quota-policy.ts     # write caps
  __tests__/          # bitemporal, hybrid-search, response-bounds, typed-links, ...
```

Shared seams (touched by many lanes, follow 1.5): `types.ts`, `handlers.ts`, `supabase.ts`,
`local.ts`, `db.ts`. SQL RPCs (`search_memory_hybrid`, `search_facts`, ...) live behind the
Supabase backend and are owned by Worker 6 plus the migration registry.

Key behaviours to know before you touch the read path:
- `searchMemory` = `keywordFallback` first, vector RPC only on empty (the short-circuit).
- `keywordFallback` = tokenise, AND-of-tokens then OR-of-tokens, local scoring, bi-temporal
  visibility filter, tenant scoping via `api_key_hash`.
- `addFact` = exact `content_hash` dedup, insert, fire-and-forget embed + audit.

---

# PART 3 - The 10 Lanes

Each lane lists: **Owner AI + why**, **Objective**, **In / Out of scope**, **Primary files
(you own)**, **Shared seams (anchored edits)**, **Consumes / Provides** (cross-lane
contracts), **Deliverables**, **Acceptance + tests**, **Eval metric**, **Flag**, **Risks**.

The mapping at a glance:

| Worker | AI | Lane | Gaps / bets | Wave |
|---|---|---|---|---|
| 1 | Claude | Retrieval Orchestration & Fusion | 1, 2, 4, 7 (read) | 2 |
| 2 | Claude | Contradiction Reconciliation & Supersession | 5 | 2 |
| 3 | Claude | Provenance & Memory Receipts | 11 (flagship) | 1 |
| 4 | Claude | Scopes, Credential-Aware & Boardroom Visibility | 12, 13, typed scopes | 2 |
| 5 | Claude | Anti-Sycophancy Corrections & True Forget | 14, forget | 2 |
| 6 | ChatGPT (Codex) | Retrieval SQL & Ranking Internals | 1, 4 (mechanics) | 1 |
| 7 | ChatGPT (Codex) | Write-Path Dedup, Merge & Admission Control | 3, 11 (admission) | 2 |
| 8 | ChatGPT (Codex) | Decay, TTL, Archival & Sleep-Time Consolidation | 6, 7, dedup-job | 3 |
| 9 | ChatGPT (Codex) | Facts-vs-Events Split & Typed Memory Routing | 8, typed classes | 1 |
| 10 | ChatGPT (Codex) | Eval Harness, Diagnostics & Memory Passport | eval + portability | 1 & 3 |

Why this split between the two model families:

- **Claude (1-5)** holds the lanes where the hard part is a judgment call: how to fuse and
  order retrieval, how to decide a contradiction is a contradiction, what a "receipt" must
  prove, how credential revocation should quarantine derived memory, and how an
  anti-sycophancy guardrail should refuse to repeat a corrected mistake. These reward
  careful multi-file reasoning, RLS/security care, and prose-grade contracts.
- **ChatGPT (Codex) (6-10)** holds the lanes where the spec is crisp and the work is
  algorithmic or mechanical: BM25 normalisation and RRF SQL, the Mem0-style
  ADD/UPDATE/DELETE/NOOP loop, heat/TTL sweeps, the schema-driven facts/events split, and
  the benchmark harness plus the serialise/deserialise passport. These reward tight,
  well-tested implementation against a fixed contract.

---

## Worker 1 (Claude) - Retrieval Orchestration & Fusion

**Owner why:** the central decision is a judgment call about how vector, keyword, and
structured-identity signals should fuse and how load order should be computed. That is
architecture and policy, not a single algorithm. Pairs tightly with Worker 6, who supplies
the SQL primitives.

**Objective:** make recall actually use every signal. Fix the keyword-first short-circuit so
the vector and keyword lanes **fuse** instead of one shadowing the other; bring
`business_context` into search; and replace ad-hoc ordering with a coherent effective-score
load order (Gaps 1, 2, 4 read-side, and 7 ordering).

**In scope:**
- Restructure `searchMemory` to run keyword + vector and **fuse** (RRF or weighted) rather
  than return keyword and skip vector on non-empty. Keep a flagged fallback to today's
  behaviour.
- Add `business_context` as a third retrieval source in both the fused path and the keyword
  fallback. Identity must be both always-loaded **and** searchable (the Letta / Memory Bank
  pattern).
- Define and apply the **load/startup ordering** as `effective_score = f(scope_weight,
  confidence, recency, reinforcement)`, pinning identity/standing rules to the top by scope
  precedence (the Claude Code CLAUDE.md precedence model), not by term frequency.
- Consume Worker 6's ranking contract (BM25 normalisation + hybrid RPC shape) and Worker 8's
  effective-score fields where available; degrade gracefully when a field is absent.

**Out of scope:** the BM25/vector SQL internals (Worker 6), decay math that produces the
score inputs (Worker 8), write-side anything.

**Primary files (you own):** the `searchMemory` orchestration and the startup/load ordering
in `supabase.ts` and `local.ts`; a small `memory/retrieval-fusion.ts` helper if it keeps the
backends thin.

**Shared seams (anchored):** `handlers.ts` (search/load routes), `types.ts` (any new result
fields).

**Consumes:** Worker 6 (ranking SQL + RRF), Worker 3 (provenance fields, to optionally boost),
Worker 4 (scope filter hook), Worker 8 (effective-score inputs).
**Provides:** the fused retrieval result shape that the eval harness (Worker 10) scores.

**Deliverables:** fused retrieval behind a flag; business_context in search; documented
ordering function; tests proving a paraphrased query and an identity query both surface.

**Acceptance + tests:** paraphrase recall and identity-fact recall both return the right row
in top-5 on a fixture set; extend `__tests__/hybrid-search.test.ts`; add a
`business-context-search.test.ts`.

**Eval metric:** `recall@5` on paraphrase set, `identity_hit_rate`. **Flag:**
`MEMORY_FUSED_RETRIEVAL_ENABLED`.

**Risks:** fusion weights are easy to get wrong; ship with conservative defaults and let the
harness tune. Do not regress tenant scoping or bi-temporal visibility.

---

## Worker 2 (Claude) - Contradiction Reconciliation & Supersession

**Owner why:** deciding that two writes contradict (vs refine, vs co-exist) is exactly the
ambiguous judgment Claude is strong at, and the resolution flows into Boardroom coordination.

**Objective:** when a write conflicts with an existing fact on the same key/subject, do not
silently dual-write. Reconcile with newest-wins + invalidate-with-history, and raise a
**contradiction event** into the Boardroom for visibility/override (Gap 5; idea
"contradiction-as-a-first-class-event").

**In scope:**
- A new `memory/reconcile.ts` module: same-subject conflict detection (key/entity + semantic
  similarity threshold supplied by Worker 6/7 primitives), classify (contradiction vs
  refinement vs duplicate), and resolve. Default newest-wins; older row invalidated with
  history via the existing `invalidateFact` / `supersedeFact`.
- Emit a Boardroom contradiction post (both values, timestamps, provenance) using
  `post_message`, default to auto-resolve-with-flag-for-review.
- Wire reconciliation as an optional step in the write path (cooperates with Worker 7's gate;
  Worker 7 calls into your classifier rather than duplicating it).

**Out of scope:** the generic dedup/merge loop (Worker 7 owns ADD/UPDATE/DELETE/NOOP); the
competing-MCP-server `conflicts.ts` (leave it alone, it is a different concept).

**Primary files (you own):** `memory/reconcile.ts`; the supersession call sites in both
backends.

**Shared seams (anchored):** `handlers.ts` (a `reconcile`/contradiction op), `types.ts`
(contradiction record type), write-path hook in `addFact` (coordinate with Worker 7).

**Consumes:** Worker 7 (write-gate hook point), Worker 6/7 (similarity primitive), Worker 3
(provenance on both sides of the conflict).
**Provides:** the contradiction classifier that Worker 8's consolidation job reuses.

**Deliverables:** reconciliation module; Boardroom contradiction event; supersession chain
that retrieval (Worker 1) and visibility filters already respect.

**Acceptance + tests:** overwrite a fact repeatedly -> latest value served, history
preserved, exactly one contradiction event per genuine conflict (not per duplicate); add
`reconcile.test.ts`; extend `bitemporal.test.ts`.

**Eval metric:** `latest_value_accuracy`, `contradiction_precision`. **Flag:**
`MEMORY_RECONCILE_ENABLED`.

**Risks:** over-firing contradiction events on near-duplicates (coordinate the similarity
threshold with Worker 7); do not delete, always invalidate-with-history.

---

## Worker 3 (Claude) - Provenance & Memory Receipts

**Owner why:** this is the flagship moat differentiator and a cross-cutting contract every
other lane references. Designing what a receipt must prove and how it threads through write,
store, retrieve, and surface is a design-and-prose problem.

**Objective:** every durable memory carries a receipt: who/which agent learned it, from what
source, with what confidence, linked to an XPass/AnswerPass receipt where one exists.
Retrieval can filter or boost by provenance. The admin/profile surface shows the receipt
(Strategic bet 11; "memory receipts").

**In scope:**
- Extend the fact provenance model beyond today's partial fields. Add (via the migration
  registry) `source_agent_id`, `source_ref` (URL / tool call / message id), `receipt_id`,
  and treat `confidence` as first-class provenance. Reuse the existing `extractor_id`,
  `prompt_version`, `model_id`, `commit_sha`, `pr_number`.
- Extend `save_fact` / `addFact` to accept and persist provenance in both backends.
- Provide a provenance **filter/boost** hook for retrieval (Worker 1 calls it) - for example
  "only facts backed by a receipt".
- Surface receipts in `MemoryProfileCard.source_receipts` (the type already exists) and the
  admin view.

**Out of scope:** the admission decision that *requires* provenance (Worker 7 enforces it
using your fields); the eval harness.

**Primary files (you own):** the provenance columns and persistence in both backends; a
`memory/provenance.ts` helper; the receipt-shaping for `MemoryProfileCard`.

**Shared seams (anchored):** `types.ts` (`FactInput` provenance extension block,
`MemoryProfileCardReceipt`), `handlers.ts` (save path), migration registry band.

**Consumes:** nothing blocking (Wave 1). **Provides:** the provenance schema + filter hook
that Workers 1, 2, 7, and 10 all depend on. **Publish your column names on Day 1.**

**Deliverables:** provenance end-to-end; retrieval filter/boost hook; receipts visible on the
profile card.

**Acceptance + tests:** a saved fact round-trips full provenance; a provenance-filtered
search returns only receipt-backed facts; add `provenance.test.ts`.

**Eval metric:** `provenance_coverage` (share of facts with a usable source). **Flag:**
`MEMORY_PROVENANCE_ENABLED`.

**Risks:** you are an upstream contract for four lanes; freeze your column names early and do
not churn them. Never store secrets in `source_ref`.

---

## Worker 4 (Claude) - Scopes, Credential-Aware Memory & Boardroom Visibility

**Owner why:** the hard part is security and access reasoning: RLS, scope enforcement at
retrieval, and quarantine-on-revoke. Getting this subtly wrong leaks data across tenants or
agents. That is a Claude-strength, security-reviewed lane.

**Objective:** introduce typed **scopes** and **visibility tiers** so memory is not one flat
pool, and bind memory derived from a connector/credential to that credential so revoking it
quarantines the derived memory (Strategic bets 12, 13; Doc 1's typed-scopes priority).

**In scope:**
- Visibility tiers on facts: `private` (one agent), `shared` (a Boardroom of agents),
  `user-global`. Add `visibility` and `boardroom_id`. Enforce at retrieval on top of the
  existing `api_key_hash` tenant scoping.
- `credential_scope` on facts: tag a fact derived from a connector (Stripe, Gmail, etc.) with
  its scope; only surface to agents authorised for it; on `keychain_disconnect`, mark derived
  facts stale/quarantined.
- Scope-aware retrieval filter that Worker 1 composes into the fused read path.

**Out of scope:** the connector keychain itself (consume `keychain_*` signals); generic
retrieval ordering (Worker 1).

**Primary files (you own):** a `memory/scopes.ts` module; the RLS/scope filters in both
backends; the disconnect->quarantine hook.

**Shared seams (anchored):** `types.ts` (scope fields), `handlers.ts` (scope-aware ops),
migration registry band, RLS policy migration.

**Consumes:** Worker 3 (provenance, to know which credential a fact came from), Worker 1
(retrieval composition point).
**Provides:** the scope filter hook Worker 1 composes; quarantine signal Worker 8 honours.

**Deliverables:** visibility tiers + credential binding + quarantine-on-revoke, all enforced
at retrieval, all behind a flag, all RLS-safe.

**Acceptance + tests:** scope-bleed test passes (private facts never leak into another
agent/Boardroom; tenant isolation intact); disconnect quarantines derived facts; add
`scopes.test.ts` and an RLS regression test. **Include a `/security-review` in the PR.**

**Eval metric:** `scope_leakage` (must be 0). **Flag:** `MEMORY_SCOPES_ENABLED`.

**Risks:** highest blast radius if RLS is wrong. Default-deny on ambiguity. Coordinate the
schema with Worker 3 and Worker 9 so scope/visibility columns land once.

---

## Worker 5 (Claude) - Anti-Sycophancy Corrections & True Forget

**Owner why:** both halves are guardrail/judgment work. Deciding that a user correction is a
standing rule XGate must honour, and guaranteeing a "forget" truly propagates everywhere,
are correctness-and-trust problems where silent partial behaviour is the failure mode.

**Objective:** (a) a corrections store that turns "no, my target is X" into a high-priority,
always-loaded standing rule that XGate consults to refuse repeating the corrected mistake
(Strategic bet 14). (b) make **forget** a first-class operation that propagates through
facts, embeddings, summaries, caches, and derived snapshots, not just a UI hide (Doc 1
priority 5).

**In scope:**
- A `corrections` category in business_context: always-loaded, highest scope precedence,
  receipt-backed (consume Worker 3). Track a `correction_adherence` metric.
- An XGate pre-response consult hook: before a response, surface relevant corrections so the
  agent does not repeat a corrected mistake. (Integrate with the existing XGate/pass surface;
  do not invent a parallel one.)
- `forget(memory_id)` semantics in both backends: invalidate the fact AND clear/neutralise
  its embedding, remove it from derived taxonomy snapshots and any cached recall, and assert
  it no longer appears in search or summaries.

**Out of scope:** the decay sweeps (Worker 8 - forget is user-intent deletion, not TTL); the
contradiction event (Worker 2).

**Primary files (you own):** a `memory/corrections.ts` module; the `forget` propagation path
in both backends; the XGate consult hook.

**Shared seams (anchored):** `handlers.ts` (corrections + forget ops), `types.ts`, the
always-loaded ordering (coordinate the top-pin with Worker 1).

**Consumes:** Worker 3 (receipts on corrections), Worker 1 (always-loaded ordering), Worker 9
(so forget reaches the events store too).
**Provides:** the forget contract Worker 10's forget-test exercises.

**Deliverables:** corrections store + XGate consult + adherence metric; true-forget
propagation with a test that checks every derived surface.

**Acceptance + tests:** forget-test (a deleted memory disappears from list, search,
embeddings, summaries, snapshots); a corrected mistake is not repeated in a scripted
scenario; add `corrections.test.ts` and `forget-propagation.test.ts`.

**Eval metric:** `forget_compliance` (must be 1.0), `correction_adherence`. **Flag:**
`MEMORY_CORRECTIONS_ENABLED`, `MEMORY_HARD_FORGET_ENABLED`.

**Risks:** forget that misses a derived store is worse than no forget (false assurance).
Enumerate every store with Worker 9 and Worker 8 and assert each.

---

## Worker 6 (ChatGPT / Codex) - Retrieval SQL & Ranking Internals

**Owner why:** this is crisp IR and SQL: BM25 length normalisation, cosine correctness, RRF
fusion, optional reranking. A fixed, well-specified algorithmic contract - Codex's strength.

**Objective:** supply the ranking primitives the read path needs. Fix keyword length bias,
verify the vector path actually returns calibrated cosine scores, implement RRF fusion in
SQL, and offer an optional rerank shortlist. Publish the **ranking contract** Worker 1 builds
on (Gaps 1, 4 mechanics).

**In scope:**
- Audit and fix `search_memory_hybrid` / `mc_search_memory_hybrid`: confirm embeddings are
  written and queried with the same model/dimension, that cosine is not returning 0 from a
  zero-vector or wrong-cast path, and that BM25 uses proper length normalisation so concise
  facts are not buried.
- Implement RRF fusion (operates on ranks) of vector + keyword + (Worker 1 supplies
  business_context rows) as a reusable SQL function / RPC.
- Optional reranker on a shortlist only (latency-aware). A `cohere_rerank` endpoint exists in
  the catalog; wire it as an opt-in, flagged shortlist reranker.
- Provide a tiny benchmark fixture so Worker 10 can regression-test ranking.

**Out of scope:** orchestration / when-to-fuse (Worker 1 owns that policy); business_context
ingestion into the index (Worker 1).

**Primary files (you own):** the search RPC SQL (via migration registry band), any ranking
helper in `supabase.ts`; the parity scoring in `local.ts` keyword path
(`scoreLocalMemoryContent`, `tokenizeLocalMemoryQuery`).

**Shared seams (anchored):** migration registry band for RPC changes.

**Consumes:** Worker 3 (provenance fields exist so ranking can expose them). **Provides:** the
RRF + BM25 + cosine contract (input/output row shape, score fields) - **publish on Day 1** so
Worker 1 can code against it.

**Deliverables:** corrected hybrid RPC; RRF function; optional reranker; documented score
fields (`rrf_score`, `kw_score`, `cosine_score`, `final_score` already appear in the result
shape - keep them populated correctly).

**Acceptance + tests:** paraphrase queries rank the right fact in top-5 via the vector lane;
a long verbose log no longer outranks a short exact identity fact; extend
`hybrid-search.test.ts`.

**Eval metric:** `ndcg@10`, `recall@5` (vector lane in isolation). **Flag:**
`MEMORY_RERANK_ENABLED` (rerank), reuse embeddings flags for the rest.

**Risks:** pgvector cast/dimension bugs are subtle; prove with a stored fixture, not by eye.
Keep the local backend's keyword scoring in parity so tests pass without a DB.

---

## Worker 7 (ChatGPT / Codex) - Write-Path Dedup, Merge & Admission Control

**Owner why:** the Mem0-style ADD/UPDATE/DELETE/NOOP loop and an admission gate are
deterministic, well-specified algorithms with clear acceptance tests - ideal Codex work.

**Objective:** stop duplicates at the source. On write, retrieve top-K similar existing
memories and decide ADD / UPDATE / DELETE / NOOP; extend dedup beyond today's exact-hash to
semantic near-duplicates; and add an admission gate so only durable, provenance-backed,
non-transient writes enter the fact store (Gap 3; Strategic bet 11 admission).

**In scope:**
- A `memory/write-gate.ts` module: embed the candidate, retrieve top-K similar (reuse
  Worker 6's similarity primitive), and run the ADD/UPDATE/DELETE/NOOP decision. Keep the
  existing exact `content_hash` block as the fast path.
- Admission control: require provenance (Worker 3) or a confidence threshold; route transient
  events to the episode store (Worker 9) instead of facts; cool-down so the same trigger
  cannot re-fire in a short window (helps the heartbeat-inflation problem).
- For UPDATE, call Worker 2's reconciliation classifier rather than re-implementing conflict
  logic.

**Out of scope:** the contradiction event/Boardroom post (Worker 2); the consolidation sweep
over already-stored rows (Worker 8 - you gate the write, Worker 8 cleans history).

**Primary files (you own):** `memory/write-gate.ts`; the `addFact` integration in both
backends.

**Shared seams (anchored):** `addFact` in `supabase.ts` and `local.ts` (anchored block),
`handlers.ts` (save path), `types.ts` (admission result type).

**Consumes:** Worker 6 (top-K similarity), Worker 3 (provenance for admission), Worker 2
(reconcile classifier for UPDATE), Worker 9 (episode store for routed events).
**Provides:** the admission decision Worker 10 measures (write precision).

**Deliverables:** the write gate with the four-way decision; semantic dedup; admission +
cool-down; transient routing.

**Acceptance + tests:** duplicate-storm test (replay the same memory-worthy event 100 times
-> one canonical row, not 100); low-confidence/transient writes are rejected or routed; add
`write-gate.test.ts`.

**Eval metric:** `duplicate_rate` (target near 0 new exact/near dups over a run),
`write_precision`. **Flag:** `MEMORY_WRITE_GATE_ENABLED`.

**Risks:** an over-aggressive gate drops real facts (false NOOP). Tune thresholds with the
harness; default to ADD when uncertain, never silently DELETE a user-stated fact.

---

## Worker 8 (ChatGPT / Codex) - Decay, TTL, Archival & Sleep-Time Consolidation

**Owner why:** heat/TTL sweeps and a batch consolidation job are algorithmic, schedulable,
and testable in isolation. Codex implements the policy Worker 1 and the research specify.

**Objective:** finish `manageDecay()` into a real policy (per-category TTL, confidence decay
curve, heat-based eviction, effective-score recompute), and repurpose the ~10-minute
heartbeat from a `load_memory` pinger into a **sleep-time consolidation** pass that clusters
near-duplicates, merges with provenance union, calls reconciliation, decays, and recomputes
priority (Gaps 6, 7; idea "self-healing dedup as a heartbeat job").

**In scope:**
- Per-category TTL + an Ebbinghaus-style confidence decay curve (identity decays slowly,
  in-flight status fast); reinforcement on re-confirmation. Compute the `effective_score`
  fields Worker 1 reads for ordering.
- Heat-based eviction/archival (MemoryOS pattern) using the existing `decay_tier` /
  `last_accessed`. Sweep resolved issues, in-flight claims, and "ignore me" placeholders out
  of hot loading.
- A consolidation job (the repurposed heartbeat): cluster near-dups (Worker 6 similarity),
  merge with provenance union (Worker 3), call Worker 2's reconcile, then decay + recompute.
  Write a consolidation receipt. **Decouple access-count from heartbeat reads** so the
  heartbeat consolidates instead of inflating counts.

**Out of scope:** the write-time gate (Worker 7); user-intent forget (Worker 5).

**Primary files (you own):** the `manageDecay` implementations in both backends; a
`memory/consolidation.ts` job; the heartbeat wiring for the consolidation pass.

**Shared seams (anchored):** `handlers.ts` (decay/consolidate ops), `types.ts`
(effective-score fields), instrumentation.

**Consumes:** Worker 6 (clustering similarity), Worker 7 (merge semantics), Worker 2
(reconcile), Worker 3 (provenance union), Worker 4 (honour quarantine).
**Provides:** the `effective_score` inputs Worker 1 orders on.

**Deliverables:** decay policy; heat eviction; consolidation job with receipts; heartbeat
that consolidates rather than pings.

**Acceptance + tests:** stale/resolved items drop out of hot loading; running consolidation
on a seeded duplicate pile collapses it with history preserved; heartbeat no longer inflates
access counts; add `decay-policy.test.ts` and `consolidation.test.ts`.

**Eval metric:** `hot_set_staleness`, `dedup_collapse_rate`. **Flag:**
`MEMORY_DECAY_V2_ENABLED`, `MEMORY_CONSOLIDATION_ENABLED`.

**Risks:** a consolidation merge that loses provenance or the latest value is a data-loss
bug; always union provenance and defer to reconciliation for conflicts; idempotent, resumable
batches.

---

## Worker 9 (ChatGPT / Codex) - Facts-vs-Events Split & Typed Memory Routing

**Owner why:** a schema-driven separation of episodes from atomic facts, with deterministic
write-time routing, is mechanical and broad - exactly the kind of careful, repetitive,
two-backend change Codex executes cleanly.

**Objective:** stop long timestamped logs from poisoning fact search. Route raw episodes to a
`session_events` / episode store and keep facts atomic; introduce the typed memory classes
(episodic, semantic, procedural, task/ephemeral) the research calls for (Gap 8; Doc 1's typed
memory) (Zep episode subgraph / OpenClaw dated-log pattern).

**In scope:**
- An episode/`session_events` store (or formalise the existing operational/durable split):
  schema, write path, and retrieval that keeps episodes out of the atomic-fact keyword index
  unless explicitly requested.
- A `memory_class` typing on entries: `episodic`, `semantic`, `procedural`, `task`. Wire the
  write path to assign class; give Worker 7 the routing target for transient events.
- Migrate/segregate existing long-log rows out of the fact store (a backfill the Coordinator
  schedules), preserving them as episodes.

**Out of scope:** the write-gate decision logic (Worker 7 decides ADD vs route; you provide
the route target); procedural-memory promotion workflow (out of this build).

**Primary files (you own):** the episode store schema + access in both backends; a
`memory/typed-memory.ts` helper; the backfill script.

**Shared seams (anchored):** `types.ts` (`memory_class`, episode types), `handlers.ts`
(episode ops), migration registry band.

**Consumes:** nothing blocking (Wave 1). **Provides:** the episode store + `memory_class`
that Workers 7 (routing), 5 (forget reaches episodes), and 1 (retrieval excludes episodes by
default) depend on. **Publish your schema on Day 1.**

**Deliverables:** episode store; typed classes; routing target; backfill that de-poisons the
fact index.

**Acceptance + tests:** a long timestamped log is stored as an episode and no longer dominates
keyword search; atomic facts stay atomic; `memory_class` round-trips; add `typed-memory.test.ts`
and an episode-routing test.

**Eval metric:** `fact_index_purity` (share of fact-search hits that are atomic facts, not
logs). **Flag:** `MEMORY_TYPED_SPLIT_ENABLED`.

**Risks:** a backfill that mis-buckets facts as episodes hides them from search; dry-run the
backfill, keep it reversible, and reconcile with Worker 1 on what retrieval excludes.

---

## Worker 10 (ChatGPT / Codex) - Eval Harness, Diagnostics & Memory Passport

**Owner why:** building a benchmark harness from an existing spec, plus a deterministic
signed export/import, is well-bounded tooling work. This lane also measures every other
lane's delta, so it benefits from a builder that produces clean, repeatable scaffolding.

**Objective:** stand up the internal LongMemEval-style harness and the five diagnostic tests
so memory becomes an auditable subsystem with release-over-release numbers; and ship the
MCP-native **memory passport** (signed export/import of memory + identity, not credentials)
that exploits the walled-garden gap competitors cannot close (eval + Strategic bet 17).

**In scope:**
- An eval harness (build on `docs/path-a-eval-harness-spec.md`, `docs/eval-baseline.json`,
  `docs/eval-report.md`): scenarios for paraphrase recall, latest-value, scope-bleed,
  no-answer/abstention, and forget. Emit a scorecard keyed to the metric registry (Part 6.2).
- The five diagnostic tests as runnable fixtures: duplicate-storm, latest-value, scope-bleed,
  no-answer, forget. These double as each lane's acceptance harness.
- The memory passport: a signed, portable JSON bundle export (memory + identity, provenance
  preserved, **never credentials**) and an import with conflict handling (reuse Worker 2's
  reconcile + Worker 7's gate on import).
- Wire metric emission points so the harness reads real numbers, not mocks.

**Out of scope:** changing retrieval/write behaviour (you measure it, you do not tune it -
that is each owning lane).

**Primary files (you own):** an eval harness under the package's test/eval area; a
`memory/passport.ts` export/import module; the diagnostic fixtures.

**Shared seams (anchored):** `handlers.ts` (export/import ops), instrumentation hooks.

**Consumes:** every lane's metrics (Part 6.2); Worker 2 + Worker 7 on import. **Provides:**
the baseline + scorecard the Coordinator uses as the merge gate. **Run a pre-change baseline
in Wave 1, then re-run after each merge.**

**Deliverables:** harness + scorecard; five diagnostic fixtures; passport export/import; a
committed baseline and a re-runnable report.

**Acceptance + tests:** the harness runs green on the pre-change baseline and produces a
scorecard; passport round-trips a memory set with provenance intact and zero credential
leakage; add `passport.test.ts` and `eval-harness.test.ts`.

**Eval metric:** owns the scorecard itself; passport-specific `passport_roundtrip_fidelity`,
`passport_credential_leakage` (must be 0). **Flag:** `MEMORY_PASSPORT_ENABLED`.

**Risks:** a passport that exports a credential or a secret is a security incident; assert an
explicit allowlist of exportable fields and a `/security-review` on the export path.

---

# PART 4 - Dependency Graph & Sequencing

All 10 lanes can **start in parallel** because the Coordinator publishes the shared contracts
on Day 0 and each lane is flag-gated. But merges happen in dependency order. Recommended waves:

**Wave 0 (Coordinator, Day 0):** ground-truth audit; create `mem-harden/integration`;
publish the schema/column registry (6.1), metric registry (6.2), flag registry (6.3), and the
interface-extension protocol. Confirm or correct the "current state" findings in 0.4.

**Wave 1 (foundations - publish contracts Day 1):**
- Worker 6 - ranking contract (RRF/BM25/cosine row shape).
- Worker 3 - provenance columns.
- Worker 9 - episode store + `memory_class` schema.
- Worker 10 - pre-change eval baseline.

**Wave 2 (build on foundations):**
- Worker 1 - fused retrieval + business_context + ordering (needs 6, 3).
- Worker 7 - write gate + admission (needs 6, 3, 9; calls 2).
- Worker 2 - reconciliation (cooperates with 7; needs 3).
- Worker 4 - scopes + credential-aware (needs 3, 9; composes into 1).
- Worker 5 - corrections + forget (needs 3, 1, 9).

**Wave 3 (consolidation + gate):**
- Worker 8 - decay + consolidation job (calls 6, 7, 2, 3; honours 4).
- Worker 10 - re-run harness after each merge; publish deltas.
- Coordinator - merge integration -> main behind flags, then flip flags per metric evidence.

ASCII dependency sketch (arrow = "depends on / consumes"):

```
        3 (provenance) ---------------------+--> 7 (write gate) --> 8 (consolidation)
            |                                |        ^                    ^
            v                                |        |                    |
   6 (ranking) --> 1 (retrieval) <-- 4 (scopes)       2 (reconcile) ------+
            ^            ^                    ^        ^
            |            |                    |        |
   9 (typed split) -----+--------------------+--------+
            |
            v
   5 (corrections + forget)         10 (eval + passport) measures all
```

---

# PART 5 - Coordinator Playbook (Worker 11, this session)

The Coordinator does not build a lane. It de-risks and merges.

## 5.1 Day 0 ground-truth audit (do before anyone builds)

The research assumes a broken vector lane and thousands of duplicates. The code shows partial
implementations. Verify against the live Supabase instance and the code before lanes commit
effort:

1. Is the vector lane actually dead, or shadowed by the keyword-first short-circuit? (See
   0.4.) Confirm embeddings are being written and queried at matching model/dimension.
2. Where do the duplicates come from? Count near-identical rows; check whether they predate
   the `shouldSkipEmbedding` heartbeat skip-list or come from a non-embedding path.
3. Confirm which provenance, decay, supersession, and operational-split pieces already exist
   so lanes scope to "finish + harden", not "build from scratch".
4. Publish the corrected current-state note to the Boardroom and patch Part 0.4 if needed.

Use the Supabase MCP (`list_tables`, `execute_sql`, `get_advisors`, `get_logs`) read-only for
the audit. Do not mutate production data during the audit.

## 5.2 Publish shared contracts (Day 0/1)

Create `mem-harden/integration` from `origin/main`. Fill in and freeze the registries in
Part 6 (schema bands, metric names, flag names). Confirm Workers 3, 6, 9 publish their
Day 1 contracts before Wave 2 lanes hard-depend on them.

## 5.3 Merge discipline

- Merge in wave order (Part 4). Each lane merges into `mem-harden/integration` only when its
  Definition of Done (1.6) is green.
- After each merge, ask Worker 10 to re-run the harness; a merge that regresses a tracked
  metric without a flag-off escape is reverted, not patched in place.
- Resolve shared-seam conflicts using the anchored-block protocol (1.5). Because edits are
  additive and lane-tagged, conflicts should be mechanical.
- Keep everything flag-off in `main` until the harness shows the metric the lane promised.
  Flip flags one lane at a time, watching the scorecard.

## 5.4 Final gate

Single integration -> `main` PR. Required: full package suite green, harness scorecard at or
above baseline on every tracked metric, `scope_leakage` and `passport_credential_leakage`
at 0, `forget_compliance` at 1.0, security review on Workers 4 and 10's export/RLS paths.

---

# PART 6 - Shared Contracts Appendix (Coordinator owns, lanes consume)

## 6.1 Migration / schema registry (numeric bands, no cross-lane edits)

Each lane that needs schema changes claims a band and only writes files in its band. The
Coordinator finalises numbers on Day 0; the bands below are the default claim.

| Band | Lane | Likely columns / objects |
|---|---|---|
| 01xx | Worker 3 | `source_agent_id`, `source_ref`, `receipt_id`, provenance indexes |
| 02xx | Worker 9 | episode/`session_events` table, `memory_class` |
| 03xx | Worker 6 | `search_memory_hybrid` RPC fix, RRF function, BM25 normalisation |
| 04xx | Worker 4 | `visibility`, `boardroom_id`, `credential_scope`, RLS policies |
| 05xx | Worker 7 | write-gate support columns (cool-down, admission audit) |
| 06xx | Worker 2 | contradiction event/audit columns |
| 07xx | Worker 8 | decay/TTL/heat columns, `effective_score`, consolidation receipts |
| 08xx | Worker 5 | corrections, hard-forget tombstones |
| 09xx | Worker 10 | eval scorecard storage, passport audit |

Rule: shared columns that two lanes both need (for example `confidence` semantics shared by 3
and 7, or `visibility` shared by 4 and 9) are declared once by the **lower-numbered owning
lane** and consumed by the other. Post in the Boardroom if you need a column another lane owns.

## 6.2 Metric registry (emit these so Worker 10 can score)

| Metric | Owning lane | Meaning |
|---|---|---|
| `recall@5`, `identity_hit_rate` | 1 | fused retrieval and identity surfacing |
| `latest_value_accuracy`, `contradiction_precision` | 2 | reconciliation correctness |
| `provenance_coverage` | 3 | share of facts with usable provenance |
| `scope_leakage` | 4 | cross-agent/tenant leak count (must be 0) |
| `forget_compliance`, `correction_adherence` | 5 | forget + anti-sycophancy |
| `ndcg@10`, vector `recall@5` | 6 | ranking quality in isolation |
| `duplicate_rate`, `write_precision` | 7 | write-gate effectiveness |
| `hot_set_staleness`, `dedup_collapse_rate` | 8 | decay + consolidation |
| `fact_index_purity` | 9 | facts vs events separation |
| scorecard, `passport_roundtrip_fidelity`, `passport_credential_leakage` | 10 | eval + passport |

## 6.3 Flag registry (default off until Coordinator flips)

`MEMORY_FUSED_RETRIEVAL_ENABLED` (1), `MEMORY_RECONCILE_ENABLED` (2),
`MEMORY_PROVENANCE_ENABLED` (3), `MEMORY_SCOPES_ENABLED` (4),
`MEMORY_CORRECTIONS_ENABLED` + `MEMORY_HARD_FORGET_ENABLED` (5),
`MEMORY_RERANK_ENABLED` (6), `MEMORY_WRITE_GATE_ENABLED` (7),
`MEMORY_DECAY_V2_ENABLED` + `MEMORY_CONSOLIDATION_ENABLED` (8),
`MEMORY_TYPED_SPLIT_ENABLED` (9), `MEMORY_PASSPORT_ENABLED` (10).

Existing flags to respect, not duplicate: `MEMORY_OPENAI_EMBEDDINGS_ENABLED`,
`MEMORY_EMBEDDINGS_PROVIDER`, `MEMORY_LOCAL_EMBEDDINGS_ENABLED`.

## 6.4 MemoryBackend interface extension protocol

Add new methods at the end of the `MemoryBackend` interface in `types.ts`, in a lane-tagged
block, for example:

```ts
// --- lane-07: write-gate ---
admitWrite(candidate: FactInput): Promise<AdmissionDecision>;
// --- end lane-07 ---
```

Implement the method in both `supabase.ts` and `local.ts`. Wire dispatch in `handlers.ts` in
a matching lane-tagged block. Never change an existing method signature unilaterally.

## 6.5 Style + safety (from CLAUDE.md)

No em dashes anywhere in code or content. Do not add one-off MCP tool registrations; memory
operations flow through `handlers.ts` and the hidden meta-tools. No secrets in code, logs,
commits, or passport exports. Keep the local backend in parity with Supabase.

---

# PART 7 - Pointers (existing docs worth reading for your lane)

- `docs/path-a-eval-harness-spec.md`, `docs/eval-baseline.json`, `docs/eval-report.md` - Worker 10.
- `docs/memory/active_facts-contract-v1.md`, `docs/memory/active_facts-implementation-spec.md`
  - Workers 1, 7, 9 (the active-facts contract).
- `docs/path-a-ground-truth-audit.md`, `docs/path-a-always-on-inspection.md` - Coordinator audit.
- `FLEET_SYNC.md`, `docs/fleet-worker-roles.md` - fleet coordination and roles.
- `CLAUDE.md` - the binding house rules (style, parity, proof commands, Boardroom naming).
- The two research docs (`MemoryUpdate_1_2.md`, `MemoryUpdate_2_2.md`) - the why behind each lane.

---

*End of master plan. Workers: confirm your number with the user, post your lane claim in the
Boardroom, branch from `mem-harden/integration`, and open a draft PR early.*
