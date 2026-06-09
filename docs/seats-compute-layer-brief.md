# Seats Compute Layer - Product Brief

## Summary

Restructure the Seats admin surface (`/admin/agents`) from a flat seat list
into a three-tier compute hub. Each tier represents a different relationship
between the user and the AI runtime:

| Tier | Label | Description |
|------|-------|-------------|
| `api` | API | Cloud endpoints billed per token (Claude API, OpenAI, Groq, etc.) |
| `local` | Local | Models running on the user's own hardware (Ollama, llama.cpp, LM Studio) |
| `subscription` | Subscription | Chat products with a monthly plan (ChatGPT Plus, Claude Pro, Cursor, Windsurf) |

The existing flat `AISeat[]` model gains a `computeTier` discriminator.
Routing, performance scoring, and heartbeat logic stay the same but are
now filterable by tier. The admin UI shows a tabbed layout (API / Local /
Subscription) so each tier can grow its own controls without crowding the
others.

## Motivation

Seats currently live in a single undifferentiated list. As users add API
keys, local models, and subscription-based tools to the same account, the
admin page becomes noisy and the routing logic cannot distinguish a
token-metered API seat from a flat-rate subscription seat. Splitting into
three tiers lets the UI surface tier-specific details (token usage for API,
GPU utilization for Local, plan limits for Subscription) and gives the
routing engine better cost/capacity signals.

## Architecture

### Type layer (`src/pages/admin/seats/computeTypes.ts`)

Shared constants, the `ComputeTier` union, tier metadata, provider
interfaces, a classification helper, and per-tier filter/count utilities.
All downstream WPs import from this file.

### Seat model extension (`AdminAgentsSeatUtils.ts`)

`AISeat` gains an optional `computeTier?: ComputeTier` field. Existing seats
default to `"subscription"` (the most common case today). The classifier in
`computeTypes.ts` infers the tier from provider/device strings when no
explicit tier is set.

### Admin UI scaffold (`seats/ComputeTabShell.tsx`)

The page header gains a tab bar (API, Local, Subscription). Each tab shows
its own tier panel. Tab badges show the seat count for that tier. The tab
state is stored via URL search params for shareability.

### Tier panels (`seats/{Api,Local,Subscription}TierPanel.tsx`)

Each tier has its own panel component. Local is the default view and
contains the full seat management grid (moved from the original flat list).
API and Subscription are placeholder panels ready for downstream WPs to fill.

---

## Work packages for 10 builders

### WP-1 - Scaffold (no dependencies)

**Scope:** Create the shared type system, extend `AISeat`, add the tabbed
layout to the admin page, and write this brief.

**Files:**
- `docs/seats-compute-layer-brief.md` (this file)
- `src/pages/admin/seats/computeTypes.ts` (new)
- `src/pages/admin/seats/computeTypes.test.ts` (new)
- `src/pages/admin/seats/ComputeTabShell.tsx` (new)
- `src/pages/admin/seats/LocalTierPanel.tsx` (new)
- `src/pages/admin/seats/ApiTierPanel.tsx` (new)
- `src/pages/admin/seats/SubscriptionTierPanel.tsx` (new)
- `src/pages/admin/AdminAgentsSeatUtils.ts` (modify - add `computeTier`)
- `src/pages/admin/AdminAgents.tsx` (modify - use ComputeTabShell)

**Acceptance criteria:**
- [x] `ComputeTier` type exported from `computeTypes.ts`
- [x] `TIER_META` metadata with label and description per tier
- [x] `classifyComputeTier()` infers tier from provider/device strings
- [x] `filterSeatsByTier()` returns seats matching a tier (or all)
- [x] `countSeatsByTier()` returns per-tier counts
- [x] `AISeat.computeTier` field added (optional, backward-compatible)
- [x] Admin Seats page shows three tabs: API, Local, Subscription
- [x] Clicking a tab switches the displayed tier panel
- [x] Tab badges show per-tier seat counts
- [x] Existing tests still pass
- [x] No em dashes in code or content

---

### WP-2 - API Tier Detail Panel (depends on WP-1)

**Scope:** Build the expanded detail view for API-tier seats showing token
usage estimates, rate-limit status, and cost-per-call indicators.

**Files:**
- `src/pages/admin/seats/ApiTierPanel.tsx` (expand stub)

**Acceptance criteria:**
- [ ] API-tier seats render a collapsible detail row
- [ ] Detail row shows provider, model, estimated token cost, rate-limit tier
- [ ] "Test connection" button pings the configured endpoint
- [ ] Panel only renders for seats where `computeTier === "api"`

---

### WP-3 - Local Tier Detail Panel (depends on WP-1)

**Scope:** Extend the local tier panel with device-specific detail views
showing hardware info, GPU utilization placeholder, and model file path.

**Files:**
- `src/pages/admin/seats/LocalTierPanel.tsx` (extend)

**Acceptance criteria:**
- [ ] Local-tier seats render a collapsible detail row
- [ ] Detail row shows device, model path, memory usage placeholder
- [ ] "Check health" button calls a local endpoint probe

---

### WP-4 - Local Tier Configuration (depends on WP-3)

**Scope:** Add configuration UI for local model endpoints (base URL, model
name, context window).

**Files:**
- `src/pages/admin/seats/LocalTierConfig.tsx` (new)
- `src/pages/admin/AdminAgentsSeatUtils.ts` (local config storage helpers)

**Acceptance criteria:**
- [ ] Edit form for base URL, model name, context window size
- [ ] Values persist to localStorage
- [ ] Validation: URL format, positive integer for context window

---

### WP-5 - Local Tier Health Monitor (depends on WP-3)

**Scope:** Health monitoring specific to local compute: GPU temp, VRAM
usage, inference speed.

**Files:**
- `src/pages/admin/seats/LocalTierHealth.tsx` (new)
- `src/pages/admin/seats/computeTypes.ts` (add `LocalHealthSnapshot` type)

**Acceptance criteria:**
- [ ] Health card shows placeholder metrics (GPU temp, VRAM, tokens/sec)
- [ ] Status badge (healthy/degraded/offline) based on last probe
- [ ] Refresh button re-probes the local endpoint

---

### WP-6 - Subscription Tier Detail Panel (depends on WP-1)

**Scope:** Build the expanded detail view for Subscription-tier seats
showing plan name, renewal date, and usage limits.

**Files:**
- `src/pages/admin/seats/SubscriptionTierPanel.tsx` (expand stub)

**Acceptance criteria:**
- [ ] Subscription-tier seats render a collapsible detail row
- [ ] Detail row shows plan name, renewal date, usage bar
- [ ] Panel only renders for seats where `computeTier === "subscription"`

---

### WP-7 - Subscription Tier Billing Integration (depends on WP-6)

**Scope:** Display billing summary and link to provider dashboards for
subscription seats.

**Files:**
- `src/pages/admin/seats/SubscriptionBilling.tsx` (new)

**Acceptance criteria:**
- [ ] Billing summary card with monthly cost and provider breakdown
- [ ] External links to provider billing dashboards
- [ ] Cost data persisted to localStorage as user-entered values

---

### WP-8 - Subscription Tier Usage Tracking (depends on WP-6)

**Scope:** Track and display usage patterns for subscription seats
(messages sent, sessions, active hours).

**Files:**
- `src/pages/admin/seats/SubscriptionUsage.tsx` (new)
- `src/pages/admin/seats/computeTypes.ts` (add `SubscriptionUsageSnapshot` type)

**Acceptance criteria:**
- [ ] Usage card shows messages, sessions, active hours (placeholder data)
- [ ] Usage bar shows percentage of plan limit consumed
- [ ] Reset button clears the current period

---

### WP-9 - Cross-Tier Routing Engine (depends on WP-1)

**Scope:** Extend `rankSeatsForRouting` with tier-aware cost and capacity
signals so the routing engine can prefer cheaper tiers for simple tasks.

**Files:**
- `src/pages/admin/AdminAgentsSeatUtils.ts` (extend routing)
- `src/pages/admin/seats/computeTypes.ts` (add `TierRoutingPreference` type)

**Acceptance criteria:**
- [ ] `rankSeatsForRouting` accepts an optional `tierPreference` parameter
- [ ] Tier preference adjusts routing score (e.g., prefer local for drafts)
- [ ] Existing routing behavior unchanged when no preference is set
- [ ] Unit tests for tier-aware routing

---

### WP-10 - Unified Compute Dashboard (depends on WP-4, WP-9)

**Scope:** Top-level dashboard summarizing all three tiers: total seats,
health status, cost estimate, and routing distribution.

**Files:**
- `src/pages/admin/seats/ComputeDashboard.tsx` (new)
- `src/pages/admin/AdminAgents.tsx` (add dashboard above tabs)

**Acceptance criteria:**
- [ ] Summary cards for each tier (seat count, health, cost indicator)
- [ ] Combined routing distribution chart (placeholder)
- [ ] Dashboard renders above the tier tabs
- [ ] Responsive layout (stacks on mobile, grid on desktop)
