# PRD: Crews

**Status**: Shipped through Phase C with MCP-sampling Council execution. XPass council layer documented.
**Last updated**: 2026-05-27.

## Problem statement

One agent is not enough for real work. A blog post benefits from a researcher, a writer, and a critic. A product launch benefits from an organiser, a marketer, and a developer. Today a user who wants multi-agent collaboration has to wire it themselves: manage prompts, pass context between turns, handle token budgets, record outputs. The engineering cost of "use three agents instead of one" is the reason most users run a single agent despite the obvious gains from teamwork.

Crews removes the wiring. Users compose a crew from pre-built personas, hit run, and get coordinated output. Agents stay specialised; the engine does the plumbing.

## Target user

- **Creative professionals running multi-step projects.** The blogger, the product marketer, the consultant, the researcher. Anyone who mentally splits a project into roles.
- **Business operators managing recurring workflows.** Weekly brief, monthly review, quarterly plan. Crews captured once; run on demand.
- **Developers prototyping agent orchestration.** Hand-written loops are slow to iterate. Crews is a known-good baseline that can be extended.

## Core capabilities

1. **Composable agent personas.** Pre-built roles (developer, researcher, writer, organiser) with tuned seed prompts. Users clone a system persona, adjust the seed, and add it to a crew.
2. **Crew templates.** Ready-to-run crews (Council, Writer-Researcher, Launch Team) that drop in with one click. Starter data in `src/data/starterCrews.ts`.
3. **Phase C execution engine.** The Council engine and MCP tool run a multi-turn orchestration with token budgets, per-agent output capture, and structured completion. `mc_crew_runs` records input, output, token spend, run snapshot, and provenance per run.
4. **Per-run audit trail.** Every run writes `mc_crew_runs` plus `mc_run_messages` entries for advisor opinions, peer reviews, and Chairman synthesis. Users can replay, fork, or export any run.
5. **Tenant isolation.** Crews, agents, and runs all scope to `api_key_hash`. System personas (marked `is_system`) are shared in read-only form; user clones live inside their own tenant.
6. **Admin UI.** Crew Composer, crew list, run detail, settings. Card-based, idiot-proof. Non-coders assemble a crew in under five minutes.

## Success metrics

- **Active crews per tenant.** A tenant with at least one running crew has adopted the product.
- **Runs per active crew per week.** Recurrence is the retention signal.
- **Template adoption vs custom.** Ratio shows whether our starter set covers the common jobs.
- **Run success rate.** Percentage of runs that complete without error or timeout. Target above 95 percent.
- **Average agents per crew.** Above 2 means users are genuinely using teamwork; at 1 the product is a fancy single-agent wrapper.

## Out-of-scope

- **We do not host the model.** Crew runs use the user's configured AI provider. UnClick orchestrates; the user's subscription supplies the tokens. See [ADR-0002](../adr/0002-subscription-only-billing.md).
- **We do not run arbitrary code inside a crew step.** Tool calls go through the standard UnClick MCP surface. Crews is orchestration, not a sandboxed runtime.
- **We do not support real-time streaming crews in v1.** Runs are turn-based; output appears when each agent finishes. Streaming is a future enhancement.
- **We do not permit cross-tenant persona sharing at runtime.** Clones are the supported sharing model; direct runtime reference would couple tenants.

## Key decisions and why

- **System persona clone model over live reference.** If a tenant edits a cloned persona, only their crew changes. System personas are versioned; a propagation path is deliberate rather than implicit. Blast radius is self-contained.
- **`is_system` flag over a separate table.** One `mc_agents` table with a boolean keeps the query path simple and lets admin UIs list system and user agents side-by-side.
- **MCP sampling for live Council runs.** User-facing LLM turns flow through the connected MCP client. The admin API prepares and persists the run, but it does not call a model directly.
- **Token budget enforced per run.** `mc_crew_runs.token_budget` caps runaway crew cost. The user's provider still bills them; the cap prevents a misconfigured crew from draining their subscription.
- **Per-turn audit trail.** `mc_run_messages` records each advisor opinion, peer review, and Chairman synthesis. The crew run record is the summary; the message rows are the forensic detail.

## Crews and XPass

Crews is not the umbrella that replaces each XPass product. Each XPass product still owns its specific check, evidence shape, and pass/fail contract. Crews is the judgment layer that can sit on top when the product needs multiple declared hats before a decision is trusted.

Recommended use:

- **XPass owns proof.** TestPass proves tests, UXPass proves experience issues, SlopPass spots lazy output, SecurityPass inspects security risk, and so on.
- **Crews owns judgment.** A Council run can add named reviewers, competing opinions, peer review, a Chairman synthesis, and dissents that did not make the final verdict.
- **Hats are explicit.** A worker can review related work only when the run declares a different role, seat, or hat. This preserves the same-agent closure guard while still letting subscription LLMs do useful review work.
- **Council decisions are auditable.** A completed run stores the resolved roster, template key, config hash, opinion messages, peer-review messages, final synthesis, token estimate, and any failure artifact.
- **XPass can call Crews selectively.** Not every pass needs a Council. Use Crews for ambiguous product judgment, launch decisions, tradeoffs, taste, risk, conflicting evidence, or "is this good enough?" calls.

The practical mental model: XPass is the checklist and evidence ledger; Crews is the council table where specialists argue over what that evidence means.

## Auto-trigger contract

Crews should not run on every conversation and should not run on every XPass receipt. It should be surfaced when there is a real judgement call.

The XPass gate may recommend a Crews Council when any of these are true:

- the request asks for a decision, launch call, go/no-go, tradeoff, opinion, taste call, or risk acceptance
- four or more XPass checks are selected for one target
- legal, security, credential, or common-sense checks overlap with public copy, UX, SEO, pricing, enterprise, or compliance work
- Pass evidence is mixed, such as one check passing while another blocks
- a multi-pass target skipped a relevant check and needs a recorded accepted exclusion
- Crews or Council itself changed and should dogfood its own judgement layer

This trigger is a recommendation, not a token-spending autopilot. The receipt should say whether a Council is `not_needed`, `consider`, or `recommended`, include a trigger score, and point to `start_crew_run` only when a Council would add useful judgement.

Do not create a separate `CouncilPass` product. "Pass" means proof/check. Council is a Crews template/mode that XPass can call when proof needs interpretation.

## Council Lite

Crews should also provide a low-friction anti-rubber-stamp layer. This is not a full multi-agent run and should not spend tokens by default.

Council Lite asks four questions on material work:

- what would make this answer or change wrong?
- what evidence is missing, stale, or too weak?
- who would object: user, maintainer, reviewer, legal, security, or operator?
- what is the smallest proof needed before saying ready?

If Council Lite exposes real uncertainty, Launchpad or XPass should escalate to a full Crews Council. If it does not, the work can proceed through the normal proof gates without bloating every run.

## Platform philosophy alignment

- **Idiot-proof UX.** The Crew Composer uses plain-language role names (Writer, Researcher, Critic) and a card-based builder. No YAML, no prompt templates, no orchestration glossary.
- **Subscription-based (no LLM billing).** Crew runs burn the user's own token allowance at their AI provider. UnClick bills for the platform tier and seats. Token cost never routes through UnClick's bill.
- **MCP-first.** Crew runs are startable via `unclick_call` with the crews endpoint. An agent can kick off a crew from inside its own conversation, read the result, and act on it. The admin UI is a human-friendly layer over the same API.
