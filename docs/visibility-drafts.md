# Visibility drafts annex

**Status:** drafts prepared 2026-07-02 by the marketing/visibility lane (remote seat)
**Owner:** Chris posts, agents draft (operating principle 2 in `docs/visibility-playbook.md`)
**Relationship to the playbook:** the playbook is the strategy spine and holds Appendices A-E. That file is owned by open PR #1701 at the time of writing, so new drafts land here instead of stacking edits on an unmerged lane. Fold these into playbook appendices in a later pass if preferred.

Non-overlap: new file, not fenced by any open lane (checked 2026-07-02 against #1701, #1696, #1423, #1453, #1439).

Pre-post checklist for every draft below:

1. Refresh counts at publish time from `src/config/site-stats.ts`. PR #1696 proposes moving public claims to the audited catalog numbers; whatever lands there is the number to use. Drafts below use the current canonical 450+/60+ wording.
2. Keep the canonical one-liner and the naming rules: universal remote framing, never operating-system framing, say "XPass products", compare against the generic category "self-hosted agents" rather than named products.
3. Keep public drafts pricing-neutral until #1453 lands its direction.
4. Trim anything that reads as marketing. These are builder notes, not ads.

---

## Draft 1: pinned GitHub Discussions welcome thread

Covers Operator quick action #4 (Discussions is already enabled; this is the paste). Suggested category: Announcements (pinned).

**Title:** Welcome to UnClick: start here

> G'day, I'm Chris, the solo builder of UnClick, posting from Melbourne.
>
> **What this is:** UnClick is the universal remote for AI: one MCP install that gives any compatible agent 450+ callable endpoints across 60+ integrations, plus persistent cross-session memory. The same store follows you between Claude, ChatGPT, Cursor, and any MCP client.
>
> **Get started:** the [README](https://github.com/malamutemayhem/unclick#readme) has the install snippet for Claude Desktop, Claude Code, and other MCP clients. If you get stuck, open a Q&A thread here with your client name and any error text. I read everything.
>
> **What to expect:**
> - It is early. Some connectors are deeper than others, and there is a public depth ladder that grades each one honestly rather than pretending everything is equally hardened.
> - Bugs and reproducible problems belong in Issues. Questions, ideas, setup help, and show-and-tell belong here in Discussions.
> - I ship several times a week. Release notes are the changelog of record.
>
> **What I would genuinely value from you:** tell me what you tried to do and where the product fought you. Feedback on two areas is especially useful right now: the meta-tool discovery pattern (your tool list stays at a handful of tools; the agent searches and calls the rest of the catalog at runtime) and the memory model (identity, durable facts, session summaries, recall across clients).
>
> Thanks for being early.

---

## Draft 2: memory architecture deep dive (Phase 3 asset)

Intended home: a post on unclick.world (or a plain gist first), shareable to HN as a technical read. Educational first, product second. This is NOT the Show HN launch post; Appendix A of the playbook covers that, and this piece should come after it.

**Working title:** Six layers and a write gate: building cross-session memory for AI agents

> Every agent session starts with amnesia. The context window is working memory, not memory: close the tab and the preferences, decisions, and corrections you spent an hour establishing are gone. I have been building UnClick's memory module for months, substantially with AI worker agents using the memory they were building. Here is the architecture that survived, including the parts that only work because earlier versions failed.
>
> **Why one big vector store was not enough.** The naive design is a single embeddings table: save everything, retrieve top-k by similarity. It fails in slow motion. Standing rules ("always write tests first") get buried under chatty facts because retrieval ranks by similarity, not by importance. There is no difference between "true about the user permanently" and "true during one debugging session". And deletion is terrifying, because you cannot tell what a row's absence will break.
>
> **The six layers.** UnClick memory separates business context (identity and standing rules), facts (atomic durable statements with category and confidence), sessions (structured summaries with decisions and open loops), library (reference docs), conversations (turn logs), and code (snippets and fixes). Each layer has its own admission rules, retention behaviour, and load behaviour. The rule of thumb: the further down the list, the bigger and colder the layer. Identity is tiny and always loaded; conversation logs are large and only ever searched.
>
> **Load order is scope precedence, not term frequency.** Retrieval fuses a keyword lane and a vector lane with reciprocal rank fusion, then applies scope weights so a standing rule outranks an equally matching fact. The startup context an agent loads must stay small, so the read path is opinionated about what deserves those tokens.
>
> **The write gate.** Every fact passes an admission decision before it is stored: deduplication, a same-subject check against existing rows, and value-change supersede. When your timezone changes, the new fact supersedes the old row instead of coexisting with it, and the old row keeps its validity window instead of being destroyed. Corrections are first-class: when a user corrects the agent, that correction becomes a "do not repeat" line surfaced at load time, because the most expensive memory failure is confidently repeating a mistake the user already fixed.
>
> **Time is bi-temporal.** Facts carry a validity interval (valid_from, valid_to) alongside the record timestamp, so point-in-time recall ("what did we believe on June 1") is a query, not an archaeology project. Supersede never deletes. Actual forgetting is a separate, explicit path (a recycle bin plus a hard-forget operation for compliance), not an overloaded delete.
>
> **Decay that earns its keep.** Facts sit in hot, warm, or cold tiers. A recall that genuinely surfaces a fact bumps its heat, fire-and-forget so retrieval latency is unaffected. A nightly decay job cools whatever nobody uses. Consolidation clusters repeated episodes and can promote a pattern into a durable fact. The point of all of it: startup context stays small and current even as the store grows without bound.
>
> **One retrieval policy, two backends.** The same retrieval module drives both the local JSON backend and the hosted Postgres/pgvector backend, so behaviour parity between "trying it locally" and "running it hosted" holds by construction rather than by test suite.
>
> **Changes ship behind kill switches.** Every retrieval behaviour change lands behind a flag, default off, and flips on only after an eval harness scores it at or above a frozen baseline. Fused retrieval itself shipped dark and defaulted on only after it met the baseline on every metric. Memory regressions are the worst kind of bug: silent, cumulative, and discovered by the user, so "the eval decides, not vibes" is the operating rule.
>
> **Honest limitations.** The default is a managed cloud store, with a bring-your-own-database escape hatch (encrypted service-role keys). If your requirement is that nothing leaves your own hardware, a self-hosted agent stack with local-only memory is the better fit, and I would rather say that here than have you discover it annoyed. Several subsystems (consolidation, pattern promotion) are still flag-gated while the eval evidence accumulates.
>
> **Where it lives.** The memory module ships inside the UnClick MCP server, next to a 450+ endpoint tool catalog behind four discovery meta-tools. One install, and the memory is shared by every MCP client you point at it. Repo: https://github.com/malamutemayhem/unclick. Site: https://unclick.world.

Pre-publish extras: link the depth ladder and `SECURITY.md` in the footer, and re-verify the flag-default claims against `packages/mcp-server/src/memory/` at publish time (fused retrieval default on; consolidation and pattern promotion flag-gated as of 2026-07-02).

---

## Draft 3: directory listing blurbs (Phase 0 directory pass)

For mcp.so (accepts submissions), mcpservers.org (takes PRs to its repo), Stork.AI, and any directory claim/correct flow. Submission itself is outward-facing, so Chris submits (or explicitly delegates). Log where and when each was submitted in the playbook session findings.

**Name:** UnClick
**Package:** `@unclick/mcp-server` (npm)
**Categories:** tool catalogs / aggregators, memory / knowledge
**Links:** https://unclick.world, https://github.com/malamutemayhem/unclick, https://unclick.world/llms.txt

**One-liner (canonical):**

> UnClick is the universal remote for AI: one MCP install that gives any compatible agent 450+ callable endpoints across 60+ integrations, plus persistent cross-session memory.

**Short blurb (about 50 words):**

> One MCP server instead of dozens. UnClick exposes 450+ callable endpoints across 60+ integrations through four discovery meta-tools, so the agent's tool list stays small while the whole catalog stays callable. Persistent cross-session memory (identity, facts, session summaries, search) is built in and shared across MCP clients.

**Long blurb (about 110 words):**

> UnClick bundles the two things most agent setups bolt on separately: tools and memory. One install exposes 450+ callable endpoints across 60+ integrations (messaging, dev tools, e-commerce, finance, security lookups, Australian services, and a long tail). Instead of flooding the client with hundreds of tool definitions, four meta-tools let the agent search, inspect, and call the catalog at runtime. Built-in memory persists identity, durable facts, and session summaries across sessions and across clients, so the same context follows the user from Claude to ChatGPT to Cursor. A public depth ladder grades how hardened each connector is. Install via the README at https://github.com/malamutemayhem/unclick; security posture is documented in SECURITY.md.
