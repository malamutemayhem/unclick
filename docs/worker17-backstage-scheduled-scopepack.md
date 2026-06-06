# Worker 17 ScopePack: Backstage and scheduled jobs

Date: 2026-06-02 (Australia/Sydney)
Branch: `claude/sleepy-lamport-MBCE6`
Lane: Legacy Backstage, backup, and scheduled surfaces.

This pack resolves the five Worker 17 jobs from the 2026-06-02 job board. Every
claim cites a real file and line so the next reader can verify without a live
fetch. Two jobs ship a tested code slice in this pass; the other three are
research or human-gated and are left with a clear recommendation plus the exact
next chip. Nothing here touches secrets, billing, DNS, production data, or any
live dispatch path.

## Summary table

| Job | Title | Outcome this pass | Owner of next step |
|---|---|---|---|
| 5c4aadc8 | Delete or formally retire BackstagePass code | Decision: keep the API (it is the live Keychain backend); the public page is orphaned and can be retired | Chris (approve page retire) |
| be55cb76 | Implement Cowork scheduled-task wake route | Shipped dry-run receipt slice (code + tests) | Worker 17 (wire receipt into a heartbeat) |
| c762a353 | Events bot - auto-post events to Boardroom | Scoped: toggle was removed by design; GitHub events already auto-posted; recommend connector-neutral fixture renderer next | Worker 17 / next builder |
| 06479889 | Admin UI surface for scheduled tasks | Shipped read-only data layer (catalog + cron prose, code + tests); IA still pinned for Chris | Chris (pick IA), then render |
| e9a4841f | UnClick Backup tool - admin settings + module backup | Scoped: read-only settings surface is the safe first slice | Worker 17 / next builder |

---

## 5c4aadc8 - Delete or formally retire BackstagePass code

Status: **decision recorded, no destructive change made.**

Findings (proof):

- `api/backstagepass.ts` is **not dead code**. It is the live backend for the
  `/admin/keychain` (Keychain) surface. `src/pages/admin/AdminKeychain.tsx`
  calls it at least eleven times: `?action=list` (line 390), `add` (432),
  `reveal` (488), `testConnection` (533), `audit` (587), `bulk_export` (612),
  `update` (1519, 1599), `delete` (1670). The PRD confirms it is shipped and
  live (`docs/prd/backstagepass.md` line 3).
- The name `backstagepass` is a **load-bearing legacy internal name**, the same
  pattern as Fishbowl backing the Boardroom. The `backstagepass_audit` table is
  still written by `api/memory-admin.ts` (lines 4866-4868) for backward
  compatibility, and the AI provider inventory references stable probe ids
  `backstagepass.openai.connection-test` and `backstagepass.anthropic.connection-test`
  (`api/lib/ai-provider-inventory.ts` lines 57-58, 161-180).
- The **public** React page `src/pages/BackstagePass.tsx` (568 lines) is
  **orphaned**. The route `/backstagepass` already redirects to
  `/admin/keychain` (`src/App.tsx` line 146), the page is hidden from the navbar
  (`src/components/Navbar.tsx` line 13), and nothing imports it except a
  name-lock test that reads its raw source (`src/__tests__/passport-public-name-lock.test.ts`
  lines 6 and 26-31).

Decision:

1. **Do not delete `api/backstagepass.ts`.** Deleting it breaks Keychain. Keep
   it as the live backend under its legacy internal name (Boardroom/Fishbowl
   precedent). This part of the job is **NO_CODE_NEEDED**.
2. The orphaned public page `src/pages/BackstagePass.tsx` is a safe retire
   candidate: removing it plus its entry in the name-lock `PUBLIC_COPY_FILES`
   list is a clean, reversible two-file change. It is **left for Chris to
   approve** because a prior standing note keeps BackstagePass as a legacy
   reference, and this is a deletion touching a name-lock guard. Not done
   unilaterally from a worker lane.

Next chip (gated): on Chris approval, delete `src/pages/BackstagePass.tsx`,
remove `"../pages/BackstagePass.tsx"` from `PUBLIC_COPY_FILES`, and confirm the
name-lock suite stays green.

---

## be55cb76 - Implement Cowork scheduled-task wake route

Status: **first safe slice shipped (code + tests).**

The 2026-05-10 scoping comment requires the first slice to be a **dry-run
receipt path only**: validate due tasks in UTC, record which schedule would
wake, and post a non-mutating proof, with no real work, no workflow dispatch,
and no credential access.

Shipped this pass:

- `src/pages/admin/coworkWakeDryRun.ts` - `computeCoworkWakeDryRun(now, tasks)`
  returns a receipt with `mutating: false`, the evaluated UTC minute, the
  checked count, and the list of due tasks. `formatCoworkWakeDryRunProof`
  renders a short proof line. The module does no I/O and dispatches nothing.
- `src/pages/admin/coworkWakeDryRun.test.ts` - six tests covering the
  non-mutating flag, minute truncation, due filtering, and proof wording.

Context: the wake function is largely **superseded** by existing infrastructure
(`.github/workflows/event-wake-router.yml`, the PinballWake clock routes in
`src/pages/admin/pinballwakeClockRoutes.ts`, and the cron workflows now
cataloged in `scheduledTasksCatalog.ts`). This dry run gives the Cowork lane a
traceable, non-mutating "what would wake now" view on top of that, rather than a
new mutating path.

Next chip: wire `computeCoworkWakeDryRun` into a heartbeat that posts the
formatted proof line as a Boardroom comment on a cadence, still non-mutating,
for a few cycles of review before anything is allowed to trigger real work.

---

## c762a353 - Events bot: auto-post GitHub/Vercel/Supabase events to Boardroom

Status: **scoped; recommend connector-neutral read-only slice or close.**

Findings (proof):

- The events bot toggle was **deliberately removed**, not lost. The Boardroom
  settings panel notes that controls the viewer could not influence, including
  "an unbuilt events bot", were removed (`src/pages/admin/fishbowl/Settings.tsx`
  lines 8-9). Old saved payloads carried an `eventsBot` field that is now
  ignored (`src/pages/admin/fishbowl/prefs.ts` lines 28-30).
- GitHub events are **already auto-routed** to the Boardroom by the Event Wake
  Router (`.github/workflows/event-wake-router.yml` and
  `scripts/event-wake-router.mjs`), covering `workflow_run`, pull request,
  issue, and issue comment events. Vercel and Supabase events have **no**
  ingest path today (only `api/webhook.ts` exists, for a different purpose).

Recommendation: the GitHub half of this job is already served. The remaining
value is Vercel and Supabase events. The 2026-05-10 scoping comment is the right
shape for that: a **connector-neutral, read-only** typed event-receipt model
plus a local fixture renderer that turns sample GitHub, Vercel, and Supabase
events into Boardroom draft text, gated behind redaction tests, with no provider
API calls and no token storage. Either build that as the next chip or close this
job as superseded-for-GitHub with the Vercel/Supabase renderer tracked
separately. Not built in this pass to keep the PR focused and avoid a dead
module ahead of a clear product decision.

---

## 06479889 - Admin UI surface for scheduled tasks (cron / description / drift)

Status: **read-only data layer shipped (code + tests); IA pinned for Chris.**

The 2026-04-26 Designer/Skeptic thread on this todo reached two conclusions:

1. The page IA is **pinned for Chris**: standalone page vs a section under the
   Boardroom admin vs a single `/admin/system` page with stacked bands (Drafts,
   Scheduled tasks, Wake routes) sharing one agent-row primitive.
2. The v1 detector should be a **read-only table** that renders the cron and a
   derived human cadence side by side. The visual mismatch is the drift signal.
   No regex and no arbitrary threshold. A real cadence metadata field and an
   automated three-way detector are deferred to v1.5 and v2.

Shipped this pass (the safe data layer that does not pre-empt the IA choice):

- `src/pages/admin/scheduledTasksCatalog.ts` - a typed `SCHEDULED_TASKS`
  catalog mirroring the eight real cron workflows in `.github/workflows`, plus
  `describeCron` (derives cadence prose from a cron), `cronMatchesUtc`,
  `expandCronField`, and `summarizeScheduledTasks`. The catalog stores only the
  raw `cron` and a human `description`, so a future table can show cron, derived
  prose, and description side by side exactly as the Skeptic comment asked.
- `src/pages/admin/scheduledTasksCatalog.test.ts` - eleven tests covering field
  expansion, cadence prose for every catalog pattern, and UTC matching.

Next chip (gated on the IA pick): render `SCHEDULED_TASKS` with
`describeCron` in whichever surface Chris chooses, capture a screenshot, and
only then consider the v2 drift chip once a cadence metadata field exists.

---

## e9a4841f - UnClick Backup tool: admin-linked settings + module backup

Status: **scoped; read-only settings surface is the safe first slice.**

Findings (proof):

- "Backup" already exists as a **bolt-on rail concept** across product briefs
  (for example `docs/securitypass-product-brief.md` line 61 lists Backup as the
  "snapshot before destructive checks" rail; `docs/uxpass-product-brief.md`
  line 171 references the upcoming Backup bolt-on).
- A narrow backup capability is already live for one module: Keychain can
  download an encrypted backup of secrets with a user-set password
  (`src/pages/admin/AdminKeychain.tsx` lines 1185-1189).

Recommendation (matches the 2026-05-10 scoping comment): the first slice is a
**read-only admin settings surface** that lists available backup modules, shows
last-successful-backup metadata, and keeps controls disabled by default. No
export job and no secret material rendered. Proof must be a UI smoke plus a unit
test asserting credentials and raw keys are never rendered. This is low priority
and product-shaped, so it is scoped, not built, in this pass.

---

## Safety notes

- No secrets, tokens, billing, DNS, or production data were touched.
- No force-push, hard reset, or destructive cleanup.
- The two shipped modules are pure (no I/O, no dispatch) and fully reversible.
- User-facing wording uses "Boardroom"; "Fishbowl" appears only where it is the
  load-bearing internal code name.
