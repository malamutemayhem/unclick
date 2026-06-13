# UnClick: Detailed Context & Tower View

**Date:** 2026-05-29
**Author:** Claude Code (cloud merge-coordination + ring-fence pass)
**Purpose:** A single, plain-English place to understand what UnClick is, how it is built, where it is right now, and exactly which directories to open when you want the real answer to something.

---

## 1. What UnClick is (the one-paragraph version)

UnClick is an **operating system for AI agents**. One `npm install` of `@unclick/mcp-server` gives any AI agent two things at once:

1. **A toolbelt**: 450+ callable endpoints across 60+ integrations (email, Slack, Stripe, Shopify, GitHub, weather, sports, AI models, and on and on), all reachable over the **MCP protocol**.
2. **A memory**: persistent, cross-session memory so an agent remembers facts, decisions, and context between sessions, tools, and devices, instead of forgetting everything each time.

Native model memory is volatile. UnClick is the durable, authoritative store that sits underneath it.

---

## 2. Tower view (the big picture in one diagram)

```
                         ┌─────────────────────────────────────────────┐
                         │            AI AGENT (any model)               │
                         │   talks MCP  ─────────────────────────────►   │
                         └───────────────┬───────────────────────────────┘
                                         │  MCP protocol
                         ┌───────────────▼───────────────────────────────┐
                         │     @unclick/mcp-server  (the npm package)     │
                         │  packages/mcp-server/src/server.ts             │
                         │                                                │
                         │  Visible first-party tools:                    │
                         │   load_memory / save_session / save_fact /     │
                         │   search_memory / save_identity /              │
                         │   check_signals + Boardroom (Fishbowl) tools   │
                         │                                                │
                         │  Hidden meta-tools (the 450+ catalog):         │
                         │   unclick_search / unclick_browse /            │
                         │   unclick_tool_info / unclick_call             │
                         └───────┬───────────────────────────┬───────────┘
                                 │                           │
                ┌────────────────▼─────────┐     ┌───────────▼───────────────────┐
                │  Memory module (6-layer)  │     │  Tool wiring → REST endpoints  │
                │  packages/mcp-server/     │     │  packages/mcp-server/src/      │
                │  src/memory/*             │     │  tool-wiring.ts                │
                │  (local JSON or Supabase) │     │        │                       │
                └───────────────────────────┘     │        ▼                       │
                                                   │  api/*-tool.ts (Vercel funcs)  │
                                                   └────────────────────────────────┘

   Public website (marketing + admin)            Automation / fleet
   src/  (React + Vite + TypeScript)             .github/workflows/*  (cron + CI)
   src/pages/Tools.tsx = the tool grid           scripts/pinballwake-*  (the runner)
                                                  Boardroom = the coordination layer
```

**Three big moving parts to hold in your head:**

- **The package** (`packages/mcp-server`): this is THE product that ships to npm. Everything an agent can do flows through here.
- **The website** (`src/`): the public face (unclick.world) plus the admin surfaces. Marketing pages, Connect/OAuth, keychain, dogfood report.
- **The fleet/automation** (`.github/workflows/` + `scripts/` + the Boardroom): the always-on system of scheduled workers that pick up jobs, build, and report, coordinated through the Boardroom (the thing previously called "Fishbowl").

---

## 3. Repository map (where everything lives)

| Directory | What's in it | Open this when you want… |
|---|---|---|
| `packages/mcp-server/` | The published npm package `@unclick/mcp-server` | …to change what agents can do, or how the server behaves |
| `packages/mcp-server/src/server.ts` | MCP entrypoint; registers visible tools + hidden meta-tools | …to see/alter the tool surface agents get by default |
| `packages/mcp-server/src/tool-wiring.ts` | Maps tool names → API calls (the 450+ catalog) | …to add or re-point an integration tool |
| `packages/mcp-server/src/memory/` | The 6-layer memory module | …anything about how memory is stored/recalled |
| `packages/mcp-server/src/memory/handlers.ts` | Canonical memory operation dispatcher | …to see every memory operation in one place |
| `packages/mcp-server/src/memory/db.ts` | Backend factory (local JSON vs Supabase) | …to understand where memory physically lives |
| `packages/mcp-server/src/heartbeat-protocol.ts` | The wake-time policy every fleet seat reads | …to change how workers behave on each wake |
| `packages/channel-plugin/` | Channel/orchestrator tether (turns, RPC handlers) | …how live chat turns get saved to continuity |
| `api/` | Vercel serverless functions (REST endpoints) | …the actual server-side logic behind a tool |
| `api/lib/orchestrator-context.ts` | The orchestrator's "current state" brain | …how the system decides what work is happening |
| `src/` | The React website (Vite + TypeScript) | …anything visible to the public or in admin |
| `src/pages/Tools.tsx` | The tools grid (one tile per integration) | …to add/adjust a public tool tile |
| `src/pages/admin/` | Admin surfaces (keychain, express build, seat heartbeat) | …internal/superuser screens |
| `src/lib/design-system.ts` | The locked Apple-style design system (NEW) | …colors, spacing, the "one accent/one halo" rules |
| `docs/` | Product context, brainmap, design docs, this file | …written context and the auto-generated brainmap |
| `docs/UnClick-brainmap.generated.{json,md}` | Auto-generated map of tracked source files | …a machine view of the codebase (regenerated by script) |
| `docs/unclick-context-boot-packet.md` | Canonical product-map definitions | …the authoritative meaning of UnClick/Autopilot/XPass/etc. |
| `apps/jobsmith/` | JobSmith: the CV/résumé platform | …anything CV-checking / anti-AI-slop related |
| `scripts/` | The runner, brainmap generator, pass tooling | …the autonomous runner and proof/QC tooling |
| `scripts/UnClick-brainmap.mjs` | Brainmap generator (`npm run brainmap:generate`) | …to regenerate the brainmap after touching tracked files |
| `scripts/pinballwake-*` | The PinballWake autonomous runner + planning | …how unattended workers claim and run jobs |
| `supabase/migrations/` | Database schema changes | …the production database structure |
| `.github/workflows/` | CI + all scheduled fleet automation | …cron schedules, required checks, auto-merge rails |

**Coordination & process docs (read these to understand "how the fleet works"):**
- `CLAUDE.md`: project instructions, architecture summary, style rules, "before you touch code" ritual.
- `FLEET_SYNC.md`: source-of-truth order, live worker lanes, Boardroom coordination, no-stomp rules.
- `docs/fleet-worker-roles.md`: the emoji role map and routing guide (which worker owns what).
- `docs/unclick-context-boot-packet.md`: load before making product-map claims.

---

## 4. Key concepts in plain English

- **MCP (Model Context Protocol):** the standard "plug" an AI agent uses to talk to tools and memory. UnClick speaks it.
- **Memory layers:** facts (preferences/decisions), identity (standing rules loaded every session), sessions (summaries), plus code/library/conversation stores. Entry points: `load_memory` (start of session), `save_fact`, `save_identity`, `search_memory`, `save_session`.
- **The Boardroom** (formerly "Fishbowl"): the shared coordination space where workers post messages, claim to-dos, vote on ideas. Always say "Boardroom," never "Fishbowl," in anything user-facing.
- **The fleet / PinballWake runner:** scheduled GitHub Actions wake up worker "seats," which hunt the job board (Boardroom to-dos), claim work, and run it, some free (OpenHands/CodeRoom), some smart (subscription LLM seats).
- **The "XPass" family:** a set of quality gates/passes (SlopPass = anti-AI-slop, TestPass, CompliancePass, SecurityPass, LegalPass, SEOPass, CopyPass, CommonSensePass, etc.). They check generated work before it ships.
- **BookEndsBuild:** the loop where a smart seat builds first while the chat is warm (front bookend), free workers keep things moving in the middle, and a smart QC pass closes the loop on the next wake (back bookend).
- **Ring-fence / go-live:** making the public site clean and focused (hiding internal-only surfaces) so UnClick can run live on its own production domain.

---

## 5. Current state as of 2026-05-29

### 5a. Live / shipped to `main` this session
- **Public ring-fence + Apple design system** (PR #1153, merged → deploying to production). The public site now uses one calm design system; internal-only surfaces (BuildDesk, BackstagePass) are hidden from visitors; `/build` redirects to home. Connect/OAuth logic preserved unchanged.
  - Where: `src/lib/design-system.ts`, `src/components/PageShell.tsx`, `src/pages/*`, `docs/design-system.md`.
- **CI / workflow hygiene** (PR #1174, merged). Finished GitHub Actions version bumps and **switched OFF the unattended auto-merge "execute" flag** + removed the dead Cursor Bugbot hook.
  - Where: `.github/workflows/*` (esp. `tier2-auto-merge-queue-check.yml`).
- **Orchestrator drift detection** (PR #1111, merged). The orchestrator can now flag when it claims "all quiet" while jobs are actually queued.
  - Where: `api/lib/orchestrator-context.ts` (`truth_reconciliation`).

### 5b. Landing automatically (queued / in flight)
- **#1114 Situation Brain**: a per-worker current-state summary. Additive and safe; lands right after the workspace settles.
- **#939 / #1043**: docs-only PRs (AGENTS.md notes; BookEndsBuild concept doc), set to auto-merge on green CI.
- **#1123**: already merged (a docs proof line that closed an urgent canary to-do).

### 5c. Parked on purpose (need a decision or careful handling)
- **#996: log-read gate.** Changes live fleet wake behavior; risk of locking out live workers if merged carelessly. **Recommendation: leave parked.**
- **AutopilotIQ Phase 0 (#1144 / #1145 / #1146).** Groundwork for measuring how well Autopilot does (outcome ledger, honesty probes, circuit-breakers/kill-switches). Written but not yet wired to anything. **#1144 adds a new database table** (`supabase/migrations/…autopilotiq_outcome_ledger.sql`): needs a yes before touching the live database.
- **#1042: build-while-warm rule.** The front half of BookEndsBuild; copy/text + a heartbeat revision across ~16 files. Landable on its own once the orchestrator pair is done.
- **JobSmith second wave (#937 / #938 / #958 / #959).** Two competing rule-engines for CV/anti-slop checking (#959 big/corpus-driven vs #938 small). Left untouched, nothing closed. Simple call when ready: keep #959, retire #938. #951 already closed as a subset of #959.

### 5d. Closed/cleaned this session
- #951 (subset of #959), #1018 (folded into #1174). Dependabot #960/#961/#1048 auto-close via #1174.

---

## 6. The required-checks reality (why merges go one at a time)

This repo's `main` requires every PR to (a) be **up to date with main** and (b) pass **2 required CI checks** (`Website (root package)` and `MCP server package`) before merging. Because each merge moves `main`, every other open PR falls behind and must re-sync + re-pass CI. Practical consequence: **PRs land serially**, and a generated file (`docs/UnClick-brainmap.generated.*`) often needs regenerating between merges. The fix for the long term would be to stop committing the generated brainmap (generate it in CI instead), which would remove most merge friction.

- Where the rules live: `.github/workflows/ci.yml` (the 2 required jobs) and branch protection settings.
- The stale-guard that bites: `ci.yml` → "Brainmap stale guard" → `npm run brainmap:check`. Fix is always `npm run brainmap:generate` then commit.

---

## 7. "If you dig here, you'll get the real answer": quick-reference pointers

| Question you might have | Open this |
|---|---|
| What can an agent actually call? | `packages/mcp-server/src/tool-wiring.ts` + `src/pages/Tools.tsx` |
| How does memory really work / where is it stored? | `packages/mcp-server/src/memory/handlers.ts` + `memory/db.ts` |
| What do workers do when they wake up? | `packages/mcp-server/src/heartbeat-protocol.ts` + `scripts/pinballwake-autonomous-runner.mjs` |
| How does the system know what work is "active"? | `api/lib/orchestrator-context.ts` |
| What runs on a schedule / what's the CI? | `.github/workflows/` (esp. `autonomous-runner.yml`, `ci.yml`, `tier2-auto-merge-queue-check.yml`) |
| What does the public site look like / its rules? | `src/`, `src/lib/design-system.ts`, `docs/design-system.md` |
| What is JobSmith and how does it check CVs? | `apps/jobsmith/` (rules in `apps/jobsmith/rules/` and `apps/jobsmith/src/lib/`) |
| What's the authoritative product map? | `docs/unclick-context-boot-packet.md` |
| How do workers coordinate / who owns what? | `FLEET_SYNC.md` + `docs/fleet-worker-roles.md` |
| The database schema | `supabase/migrations/` |
| The quality gates (SlopPass, TestPass, etc.) | search `scripts/` and the `*pass*` tools in `tool-wiring.ts` |

---

## 8. Open decisions waiting on the operator

1. **#996 log-read gate:** park it (recommended) or enforce it later with babysat live wakes.
2. **AutopilotIQ database table:** OK to add the new `mc_autopilot_outcomes` table to the live Supabase project? (Merging the code file is separate from applying the migration to production.)
3. **JobSmith engine:** keep #959 (big, corpus-driven) and retire #938 (small). When JobSmith is next on deck. No rush.

---

## 9. How to verify "is it live?"

- The public site auto-deploys from `main` via Vercel (`vercel.json` defines the build + security headers: HSTS preload, `X-Frame-Options: DENY`, nosniff, Referrer-Policy, Permissions-Policy).
- To confirm a specific deployment: Vercel project dashboard, or the Vercel deployment listing for the `unclick` project / the `unclick-agent-native-endpoints` project for the API.
- The npm package ships via `.github/workflows/publish-mcp-package.yml`.

---

*This document is a snapshot for 2026-05-29. The living sources of truth remain `CLAUDE.md`, `FLEET_SYNC.md`, `docs/unclick-context-boot-packet.md`, and the auto-generated `docs/UnClick-brainmap.generated.md`.*
