# UnClick polish and ring-fence audit

**Date:** 2026-06-11
**Author:** Claude Code (deep-dive + engine polish seat)
**Status:** living audit. Update the page tables as chips land.

## What this is

A systematic page-by-page review of UnClick, built after a full deep dive:
the Drive Context folder (Mar-May 2026 handovers), the Drive Deep Research
folder (Apr-Jun 2026 research), the repo docs (`CLAUDE.md`, `FLEET_SYNC.md`,
`AUTOPILOT.md`, `docs/unclick-context-boot-packet.md`), live GitHub state, and
live Boardroom state. It is the working plan for turning UnClick into a
polished product, engine first, then ecosystem, then the public front end.

## The one rule that anchors every polish chip

**Status must be earned.** UnClick's whole story is receipts over assertions:
DONE is derived from evidence, never set by a flag, and a surface that shows a
green row without a recorded run is lying. The May 2026 proof-integrity audit
found roughly 60% of "completed" jobs had no real proof. Polish therefore has
three jobs, in order:

1. **Truth.** No fabricated history, no cosmetic receipts, no fake green.
   WAITING is an honest and acceptable state.
2. **Plain English.** Anyone's first visit should explain itself. Sentence
   case, short sentences, no jargon, no internal codenames in user-facing text
   (say Boardroom, never Fishbowl; SlopPass, never QualityPass; CompliancePass,
   never EnterprisePass). Never frame UnClick as an OS or kernel.
3. **One calm design.** The locked design system (`src/lib/design-system.ts`):
   one teal accent, one halo per page, one CTA per section, discreet motion,
   no em dashes anywhere.

## Engine surfaces (phase 1, the building blocks)

| Route | Page | Truth state | Findings | Action |
|---|---|---|---|---|
| /admin/autopilot | `AdminEcosystemPages.tsx` (AdminAutopilot) | Static hub, honest but inert | Tile grid that routes to the rooms; no live signal of what the engine is doing right now | Add a small live strip (open jobs, in-progress, blockers) fed by the existing orchestrator context API. Keep it one row, no new dashboard |
| /admin/checks | `AdminXPassHub.tsx` | **Fixed 2026-06-11.** Was fabricating report history (hard-coded dates, modular-arithmetic PASS/WARN rows) | Replaced with recorded evidence only: real dogfood status, proof labels, honest WAITING rows, explicit "nothing simulated" note | Next: wire real run history for TestPass/UXPass from `api/testpass.ts` / `api/uxpass.ts` when runs land |
| /admin/xgate | `AdminXGate.tsx` | Live (fetches `/api/xgate-check`) | Page shipped (Part 10) but gates (Parts 1-9) sit in draft PRs #1233-#1241 since Jun 2, so decisions list stays empty | Integrate XGate parts in the documented order: #1233 first, then 2-8, then 9. Operator decision needed to start the merge train |
| /admin/boardroom | `Fishbowl.tsx` | Live | Solid explainer panel; busy but functional. Signal-noise cleanup is owned by PR #1291 (api side) | Hold UI changes until #1291 lands; then re-audit message density |
| /admin/jobs | `AdminJobs.tsx` | Live, sophisticated | Has plain-language simplifiers, stage strips, sync signals. Largest engine page (1.7k lines) | Re-audit after #1291; candidates: split helpers into a lib file, verify "needs proof after done" path matches truth-ladder rules |
| /admin/orchestrator | `AdminOrchestrator.tsx` | Live | OWNED by PRs #1434 and #1345 (navy glass + type scale). Do not touch | Wait for merges, then re-audit |
| /admin/pinballwake | `AdminPinballWake.tsx` | Live | Internal reliability surface; admin-gated, fine | Low priority; rename check only (user-facing copy should say Autopilot reliability) |
| /admin/controltower | `AdminControlTower.tsx` | Live | Not yet audited in depth | Audit next session |
| /admin/ledger | `AdminEcosystemPages.tsx` (AdminLedger) | Static stub | Tiles for Approvals/Receipts/Workers/Rollback link nowhere | Wire Activity + Audit links (done), leave the rest visibly "not built yet" rather than implying depth |
| /admin/workers | `AdminEcosystemPages.tsx` (AdminWorkers) | Static, honest | 14 worker roles listed; research says collapse to 4 lanes (Build, Review, Verify, Product/Ops) plus skills | Ask-once decision: simplify the public worker list to the 4 lanes with roles as skills underneath |
| /admin/projects | `AdminEcosystemPages.tsx` (AdminProjects) | Static stub | Two inert tiles | Leave until Projects has a backend; label as preview |
| /admin/billing | `AdminEcosystemPages.tsx` (AdminBilling) | Static stub | Three inert tiles | Leave until billing backend; label as preview |

### Engine truth debt (cross-page)

- "Coming soon" stubs: `/admin/system-health`, `/admin/audit-log`,
  `/admin/users`, `/admin/moderation`. Honest but empty; each needs either a
  real minimal view or removal from nav until built.
- `AdminBenchmarks` shows "Sample data" label: acceptable, keep the label.
- `src/pages/MemoryAdmin.tsx` is a placeholder page whose route now redirects
  into the admin shell; candidate for deletion after confirming nothing links
  to it.

## Open PR lanes that ring-fence files (no-stomp map, 2026-06-11)

| Files | Owner PR | State |
|---|---|---|
| `AdminOrchestrator.tsx`, `AdminShell.tsx` | #1434, #1345 | draft/ready, UI polish |
| `api/lib/orchestrator-context.ts`, boardroom signal polish | #1291 | draft |
| `api/lib/xgate/**` | #1233-#1241 | draft, awaiting integration order |
| MCP advertised tool surface (`server.ts`, `tool-wiring.ts`) | #1218 | blocked, human-only decision |
| Memory lite-mode stubs | #1432 | draft, stale, assigned to Builder A |
| Connector timeout guards | #1429 | draft, stale, assigned to Builder B |

## Ecosystem surfaces (phase 2)

Audited at structure level; deep audit per page comes after the engine.

- **Memory** (`/admin/memory`, `/memory*` public pages): core moat; June work
  hardened NaN guards and secret redaction. Known research gaps: keyword search
  short-circuits the vector lane, no decay schedule. Backend work, not UI.
- **Keychain/Passport** (`/admin/keychain`, 1.8k lines): large; needs a
  simplicity pass (it is the permission story for non-technical users).
- **Crews** (`/admin/crews*` + public `/crews`): functional catalog + composer.
- **Apps/Tools** (`/admin/apps`, `/apps`, `/tools`): generated catalog, healthy
  pipeline (icon-mapping fix in flight as #1433).
- **Seats/Agents** (`/admin/agents*`): five sub-pages; audit for plain English.
- **JobSmith** (`/jobsmith`, `/admin/jobsmith`): separate product; two
  competing rule engines still parked as #938 vs #959 (keep #959 per the
  May 29 note, retire #938 when next touched).
- **Skills, Signals, Activity, Analytics, TruthRate, Benchmarks, Brainmap,
  ExpressBuild (DraftRoom), AppTesting, Codebase:** later-phase audits.

## Public front end (phase 3, Apple-simple)

The ring-fence + design system already landed (PR #1153). What remains is a
copy and comprehension pass, page by page, in this order:

1. `/` Index: hero says "Universal remote for AI"; verify every section earns
   its place, one CTA per section.
2. `/why`: moat page (PR #1348 decisions apply: comparison framing chosen by
   the operator).
3. `/memory`, `/apps`, `/xpass`, `/pricing`, `/docs`, `/new-to-ai`, `/faq`:
   each must pass the "explain it to a first-time visitor in one screen" test.
4. Brochure pages (`/autopilot`, `/xgate`, `/jobs`, `/control-tower`,
   `/ledger`, `/workers`, `/orchestrator`, `/passport`, `/seats`, `/skills`):
   confirm copy matches the canonical product map (boot packet wording).
5. `/dogfood`: keep as the public proof page; it must always match the same
   evidence the admin XPass hub shows.

Hidden-by-design (do not resurrect without an operator yes): Arena routes,
`/build` (BuildDesk), the developer marketplace chapter.

## Phased plan

- **Phase 1 (now): engine truth.** XPass hub honesty (done), XGate integration
  train (operator gate), Autopilot hub live strip, ledger link wiring,
  Coming-soon cleanup decision.
- **Phase 2: ecosystem clarity.** Keychain simplicity pass, Memory backend
  gaps, Seats plain-English pass, JobSmith engine decision.
- **Phase 3: public simplicity.** Page-by-page copy pass with CopyPass +
  UXPass receipts attached to each change.
- **Phase 4: final tweaks.** UIPass screenshot evidence on key pages, mobile
  pass, full TestPass sweep, then a fresh dogfood report regeneration.

## Session findings log

- **2026-06-11:** XPass hub (`/admin/checks`) rewritten to show recorded
  evidence only. Removed the fabricated "Recent reports" list (9 synthetic
  reports with hard-coded dates) and the modular-arithmetic row statuses.
  Checklist rows now render their catalog-authored status, defaulting to
  WAITING. Product cards show the real dogfood status badge. Tests updated to
  assert no invented history renders. UXPass dogfood run on the live homepage
  recorded: fetch-only score 100 (16 PASS, 16 N/A), receipt notes browser
  screenshots are still needed for visual proof.
