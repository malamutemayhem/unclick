# Workspace Simple Laws

Status: operator-approved direction, 2026-06-12. Binding on every workspace surface (Jobs, Calendar, Inbox, Chat, Circle, Dashboard Today strip).
Companion: `docs/prd/workspace-team-layer-plan.md` (the staged build plan and scope contract).

## Why this document exists

The operator's words: the goal is to be "super simple to use, easy english". He tried ClickUp once, was extremely confused, and did not enjoy it. Review mining across Asana, monday, and ClickUp shows the same top complaints everywhere: too many features, notification spam, steep learning curve. Bloat is how incumbents raise prices per tier, which means they cannot simplify without breaking their pricing ladder. UnClick can start simple and stay simple. Simplicity is a moat, alongside verified work.

So this is not a style guide. It is a release gate. A workspace screen that breaks these laws does not ship.

## The laws

1. **One obvious view per surface.** Jobs opens to Today. Calendar opens to Day. Inbox opens to the queue. No view-picker carousel.
2. **Easy English everywhere.** Banned words in workspace UI copy: sprint, portfolio, workload, capacity, custom field, automation builder, orchestration. Preferred words: job, today, done, proof, who, when.
3. **Every toggle gets one sentence of consequence.** The Circle pattern ("Alex will be able to read your memory. You can stop this any time.") is the template for all surfaces.
4. **Zero setup before value.** No templates to pick, no workspace wizard, no column configuration. Defaults work; the first screen is already useful.
5. **Power hides behind "More".** Progressive disclosure: filters, bulk actions, and advanced options exist but the default screen never shows them.
6. **The zero-doc test.** A brand-new person must complete the core loop (capture, assign, done) with no tour, no tooltip trail, no docs. If a screen needs a tour, the screen failed and goes back.
7. **Three actions max on any row.** Example: an Inbox thread offers Assign, Make a Job, Archive. Nothing else on the row.

## Enforcement (machinery that already exists)

- **CopyPass simplicity pack:** every new workspace screen's copy runs through CopyPass with the banned-word list and a plain-reading-level target. Fail blocks the ship, like any other receipt.
- **UXPass zero-doc journey pack:** the core loop of each surface is a UXPass journey run by a fresh-context agent with zero instructions. If the agent cannot complete it from the screen alone, a new human cannot either.
- **Dogfood gate:** each build stage needs a full week of the internal team running the surface with no fallback tool, plus a zero-doc pass, before any public claim.

No new XPass product is created for this. Simplicity packs ride on CopyPass and UXPass.

## Scope discipline reminder

The feature boundary lives in the plan document's feature matrix. The deliberately-refused list (Gantt, time tracking, whiteboards, custom fields, dashboards, bundled AI assistant, hosted email) is part of the product, not a gap. When real use pulls a refused feature, the pull gets recorded and decided by the operator; it does not slide in through a side door.
