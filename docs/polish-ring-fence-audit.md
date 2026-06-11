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
| /admin/checks | `AdminXPassHub.tsx` | **Fixed 2026-06-11.** Was fabricating report history (hard-coded dates, modular-arithmetic PASS/WARN rows) | Replaced with recorded evidence only: real dogfood status, proof labels, honest WAITING rows, explicit "nothing simulated" note. Recorded-runs panel covers TestPass and UXPass (round 6 added `GET ?action=list_runs` to `api/uxpass.ts`) | Done for the Passes that keep history; other Passes gain panels when their run APIs exist |
| /admin/xgate | `AdminXGate.tsx` | Live (fetches `/api/xgate-check`) | Page shipped (Part 10) but gates (Parts 1-9) sit in draft PRs #1233-#1241 since Jun 2, so decisions list stays empty | Integrate XGate parts in the documented order: #1233 first, then 2-8, then 9. Operator decision needed to start the merge train |
| /admin/boardroom | `Fishbowl.tsx` | Live, audited 2026-06-11 | Clean: user-facing copy says Boardroom everywhere, all fishbowl strings are internal plumbing, plain-English explainer, lanes + thread grouping + mute prefs all real-data driven | Re-audit message density after #1291 lands |
| /admin/jobs | `AdminJobs.tsx` | Live, sophisticated | Has plain-language simplifiers, stage strips, sync signals. Largest engine page (1.7k lines) | Re-audit after #1291; candidates: split helpers into a lib file, verify "needs proof after done" path matches truth-ladder rules |
| /admin/orchestrator | `AdminOrchestrator.tsx` | Live | OWNED by PRs #1434 and #1345 (navy glass + type scale). Do not touch | Wait for merges, then re-audit |
| /admin/pinballwake | `AdminPinballWake.tsx` | Live | Internal reliability surface; admin-gated, fine | Done 2026-06-11: subtitle now says it is Autopilot's reliability layer and marks PinballWake as the internal name |
| /admin/controltower | `AdminControlTower.tsx` | Live | Structure audited 2026-06-11: fetches real todos, posts real comments, stat tiles derive from live rows. No truth issues found | Deeper UX audit in phase 2 |
| /admin/ledger | `AdminEcosystemPages.tsx` (AdminLedger) | Static stub | Tiles for Approvals/Receipts/Workers/Rollback link nowhere | Wire Activity + Audit links (done), leave the rest visibly "not built yet" rather than implying depth |
| /admin/workers | `AdminEcosystemPages.tsx` (AdminWorkers) | Static, honest | 14 worker roles listed; research says collapse to 4 lanes (Build, Review, Verify, Product/Ops) plus skills | Ask-once decision: simplify the public worker list to the 4 lanes with roles as skills underneath |
| /admin/projects | `AdminEcosystemPages.tsx` (AdminProjects) | Static stub | Two inert tiles | Leave until Projects has a backend; label as preview |
| /admin/billing | `AdminEcosystemPages.tsx` (AdminBilling) | Static stub | Three inert tiles | Leave until billing backend; label as preview |

### Engine truth debt (cross-page)

- "Coming soon" stubs: `/admin/system-health` and `/admin/audit-log` now
  point to today's real surfaces (done 2026-06-11). `/admin/users` and
  `/admin/moderation` stay honest stubs until their backends exist.
- `AdminBenchmarks` shows "Sample data" label: acceptable, keep the label.
- `src/pages/MemoryAdmin.tsx`: deleted 2026-06-11 (zero importers).
- `/admin/dashboard`: "What needs you" wired to live queue counts
  (done 2026-06-11).

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

- **2026-06-11 (round 19, post-merge):** Memory setup wizard reads like
  English. Copy-only changes on /memory/setup: Supabase is introduced as
  "a database service with a free plan" before being asked for; the
  service_role instruction names it "the secret key called service_role"
  and warns plainly that the shorter key on the same page will not work;
  "Drop this into your MCP config" reads "Add UnClick to your AI app"
  with the settings-file explanation; the trust footer drops crypto
  jargon. CopyPass receipt PASS 100 (run 6ca6b288) after the detector
  caught one AI-tell word ("unlock") in the first draft. Logic, steps,
  and handlers untouched.


- **2026-06-11 (rounds 15-17):** last deferred chips + a CI truth lesson.
  - Passport header: Export and Audit moved into a labelled More menu with
    one-line descriptions, closing the last round-7 structure finding.
  - Reveal expiry and clipboard wipe extracted as injectable helpers with
    deterministic tests (a second reveal never resets the first one's
    timer; a copied secret dies at the same 60s TTL as the on-screen one).
  - Jobs copy/search helpers characterized in tests (dependency-bump
    rewriting, casing, search matching, status labels) instead of a late
    structural lib-split; the split stays a candidate for after #1291.
  - CI lesson recorded: round 16 failed the brainmap stale guard because a
    verify chain used grep -c (exit 1 on zero matches) before
    brainmap:generate, silently skipping it. Verify brainmap standalone,
    never behind a grep in an && chain.
- **2026-06-11 (round 14, audit close):** SmartHome and DeveloperDocs
  audited clean (honest "sample of" labelling; developer-appropriate
  language on the docs page). With this, every public page and every
  unowned admin surface has at least a structure-level audit recorded in
  this file, and all safe fixes from those audits are applied. Remaining
  work requires the operator (stats, XGate train, #1177, #1445), a
  browser (UIPass screenshots), another lane (#1432 memory backend), or
  review of PR #1447 itself.
- **2026-06-11 (round 13):** Connect page copy audit.
  - Connect (the OAuth surface) audited copy-only; logic untouched. Three
    jargon strings humanized: "Exchanging tokens..." reads "Finishing the
    secure sign-in...", "Failed to initialize OAuth." reads "Could not
    start the sign-in. Please try again.", and "Mint a fresh key" reads
    "Make a new key". Everything else already plain English.
  - CI note: TestPass smoke failures during rapid pushes are the
    superseded-preview race (Vercel cancels outdated preview builds and
    TestPass fails closed against them); the run against the surviving
    head goes green on its own.
- **2026-06-11 (round 12):** memory setup flow audit + dead admin chain.
  - MemorySetup audited: already a clean 3-step wizard, no simplification
    needed. MemoryConnect audited: distinct job (Claude Code one-command
    wiring), not overlap. Stale `/memory/admin` links in MemorySetup and
    MemorySetupGuide now point straight at `/admin/memory`.
  - Deleted a 700-line dead-code chain with zero importers: the unrouted
    `src/pages/AdminSettings.tsx` (526 lines) plus both stray
    `src/components/AdminShell.tsx` and `src/components/admin/AdminShell.tsx`
    (the live shell is `src/pages/admin/AdminShell.tsx`).
- **2026-06-11 (round 11):** Seats API deduped onto keychainHelpers.
  - AdminSeatsApi carried byte-identical copies of credentialHealth, the
    day-math helpers, thresholds, and a divergent star-mask maskValue. All
    now import from the tested keychainHelpers module; masked keys render
    identically on Passport and Seats.
  - Remaining unblocked-from-here work: judgment-level page simplification
    (Connect, MemorySetup) is ask-once territory; UIPass screenshots need a
    browser; Memory backend gaps sit in Builder A's assigned lane.
- **2026-06-11 (round 10):** phase-5 mechanical sweep is green.
  - Repo-wide public-surface sweep found zero em dashes, zero retired names
    (Fishbowl/QualityPass/EnterprisePass/ApplyPass), and zero OS framing in
    `src/pages/*.tsx`, `src/components`, and `src/data`. Brochure copy
    already encodes the style rules in its header.
  - What remains for phase 5 is judgment-level simplification only (pages
    with too much happening), not mechanical cleanup. Candidates by size:
    Connect (800 lines), MemorySetup/MemoryConnect (~500 each).
  - Dogfood receipt: SEOPass on the live homepage, PASS, score 100,
    verdict ready, 9/9 checks (run seopass-a5193fa0). robots.txt, a
    40-URL sitemap, and llms.txt all verified live.
- **2026-06-11 (round 9):** rotate flow for humans, honest seat defaults.
  - RotateValuesModal no longer demands hand-written JSON. It pre-fills the
    connector's known fields (password inputs for secrets), supports extra
    custom fields, and skips empty values. Same API contract.
  - The four default seats no longer claim green "Ready" with nothing
    verifying it; they start as "Standby" until someone sets them, since
    seat status is a manual planning field.
- **2026-06-11 (round 8):** Keychain helpers extracted and tested.
  - The health, masking, day-math, and export-password-strength rules that
    drive Passport's user-visible badges now live in
    `src/pages/admin/keychainHelpers.ts` with 13 unit tests (priority order,
    thresholds at the documented boundaries, masking leak checks).
  - A sixth drifting timeAgo copy (inside AdminKeychain) migrated to the
    shared relativeTime util.
- **2026-06-11 (round 7):** ecosystem truth pass (Keychain + Seats + Crews),
  from two deep reviews.
  - Keychain: test-connection button now disabled when no automated probe
    exists (was firing fake test signals); copied secrets are cleared from
    the clipboard after 60s to match the on-screen auto-hide promise; the
    Advanced system inventory now states its statuses are a name-only audit,
    not live checks; server errors scrub the internal "backstagepass" name;
    the page subtitle explains what Passport is in one breath.
  - Seats landing strip no longer shows compile-time zeros ("0 active
    providers", "No spend tracked") as live state; cards now describe each
    tier's purpose and say "Open to inspect". Subscription plan status is
    honest and actionable ("Check your Claude Code account for plan
    details"); the connected count states it covers the selected platform
    only. Three more timeAgo/formatRelative duplicates migrated to the
    shared relativeTime util (also fixes a null-unsafe variant that could
    throw on missing model timestamps). Heartbeat page and live check-ins
    panel each gained a one-sentence explainer.
  - Crews: renamed `src/data/mockCrewTemplates.ts` to `crewTemplates.ts`;
    the content is the real template catalog, only the filename implied mock.
  - Deferred to next chips (logged): RotateValuesModal should reuse the
    key-value form instead of raw JSON; AdminKeychain needs a test file
    (auto-clear timer, masking, health priority, export password strength);
    AdminSeatsApi credentialHealth needs unit tests; seat table "Ready"
    defaults need a "manual planning guide" label or live check-in binding;
    Keychain Export/Audit buttons should move to a secondary menu.
- **2026-06-11 (rounds 5-6):** dedupe and UXPass run history.
  - One shared `src/lib/relativeTime.ts` (tested) replaces five drifting
    per-page copies in AdminJobs, AdminAgents, Boardroom, SignalsCatalog,
    and Boardroom Comments.
  - `api/uxpass.ts` gains `GET ?action=list_runs` (caller-scoped, clamped
    limit, fails closed with 502 instead of inventing an empty history).
  - The XPass hub recorded-runs panel is now config-driven and covers both
    TestPass and UXPass; UXPass rows show target URL and real score.
- **2026-06-11 (round 4):** Jobs room truth bugs, Boardroom audit, PinballWake naming.
  - Jobs room (deep review): fixed two truth bugs. (1) A done job the backend
    had already cleared (`proof_state` live or close_eligible) showed an amber
    "Proof missing" alert whenever its text had no extractable link; it now
    shows "Proof saved" with the backend reason. (2) The needs-proof fallback
    treated ANY alert as a proof hold, so an unrelated deploy failure could
    silently drag a completed job back into the active section; proof holds
    now require an explicit proofHold flag set only by proof-related alerts.
  - Estimated progress numbers in the stage strip now render with a tilde
    (~55%) so status-based estimates are visibly different from recorded
    pipeline progress.
  - Jobs copy: "(talk to owning AI seat)" replaced with "Message the assigned
    worker"; "Active + proof holds" reads "Active and proof holds"; folded
    comments hint rewritten in plain English. Dead cappedJobs alias removed.
  - Boardroom UI audited clean (user-facing copy says Boardroom; fishbowl
    strings are internal only). PinballWake subtitle now says it is
    Autopilot's reliability layer with PinballWake as the internal name.
  - Homepage Stats section flagged: hard-coded "2.4M+ API calls last month",
    "38ms avg response", "99.98% uptime SLA". Public quantitative claims are
    operator-gated; needs Chris to confirm real numbers or approve removal.
- **2026-06-11 (round 3):** Real run history and Control Tower audit.
  - `/admin/checks/testpass` now lists real recorded TestPass runs (from
    `list_testpass_runs`) with links into the full run log; honest empty
    state when an account has no runs. UXPass cannot get the same panel yet
    because `api/uxpass.ts` has no list action; logged as the next step.
  - Control Tower structure audited: live data end to end, no truth issues.
  - Public `/xpass` page confirmed to read from the same real dogfood data
    as the admin hub; no fabrication found.
- **2026-06-11 (round 2):** Engine truth, dashboard and stubs.
  - `/admin/dashboard`: the "What needs you" panel was static advice dressed
    as a live queue. It now shows real Jobs queue counts (via the new shared
    `useJobsQueueMetrics` hook) and falls back to a clearly labelled
    "Standing habits" list when no live data is available.
  - `/admin/ledger`: Receipts now links to TestPass (where real receipts
    live), Workers links to the worker roles page, and Approvals plus
    Rollback are visibly marked "Not built yet" instead of implying depth.
  - `/admin/audit-log` and `/admin/system-health` stubs now point to where
    the same answers live today (Activity + Orchestrator log; Signals +
    TestPass).
  - Deleted `src/pages/MemoryAdmin.tsx`: a 465-line placeholder with zero
    importers since `/memory/admin` started redirecting into the admin shell.
  - Dogfood receipts recorded: UXPass on `/xpass` (run adeca3da) and `/why`
    (run 7d02d877), both fetch-only score 100 with the standing note that
    browser screenshots are still needed for visual claims.

- **2026-06-11:** XPass hub (`/admin/checks`) rewritten to show recorded
  evidence only. Removed the fabricated "Recent reports" list (9 synthetic
  reports with hard-coded dates) and the modular-arithmetic row statuses.
  Checklist rows now render their catalog-authored status, defaulting to
  WAITING. Product cards show the real dogfood status badge. Tests updated to
  assert no invented history renders. UXPass dogfood run on the live homepage
  recorded: fetch-only score 100 (16 PASS, 16 N/A), receipt notes browser
  screenshots are still needed for visual proof.
