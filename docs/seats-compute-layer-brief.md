# Seats Compute Layer Brief

Restructure the Seats admin surface from a flat list of AI seats into a
three-tier compute hub. Each seat belongs to exactly one compute tier:

| Tier | Description | Cost model | Examples |
|------|-------------|------------|----------|
| **API** | Cloud endpoints billed per call/token | Pay-per-use | Claude API, OpenAI API, Groq, Replicate |
| **Local** | On-device or self-hosted compute | Owned (no marginal cost) | Ollama, local GPU, PC-tether agents |
| **Subscription** | SaaS platform seats with fixed billing | Monthly/annual | Claude Pro, Codex, Windsurf, GitHub Actions |

## Goals

1. Every seat declares its compute tier so routing, cost, and health logic
   can treat tiers differently.
2. The admin UI shows seats grouped by tier with tier-specific health and
   cost summaries.
3. The routing engine can prefer cheaper tiers when capability is equal.
4. Backward-compatible: existing seats default to the Subscription tier
   (the most common case today).

## Architecture changes

### New shared module

`src/lib/seats/compute-tiers.ts` - canonical types, constants, and pure
utility functions used by both the frontend admin UI and the API routing
layer.

### Extended types

The existing `AISeat` interface gains a `computeTier` field. The API-side
`SeatLoadPolicyInput` gains a matching field. A new
`ComputeTierSummary` type aggregates per-tier stats for the dashboard.

### New UI panels

The admin page gets a tabbed or sectioned layout, one section per tier,
each with tier-specific health badges and cost indicators.

### Routing extension

`buildSeatLoadRoutingPlan` gains an optional `preferredTier` input so
callers can bias toward a tier.

## Work packages for 10 builders

### WP-1 - Scaffold (no dependencies)

Core types, constants, and shared utility functions for the three-tier
model.

**Scope:** Create the shared module that every other WP imports.

**Files:**
- `src/lib/seats/compute-tiers.ts` - types + constants + pure helpers
- `src/lib/seats/compute-tiers.test.ts` - unit tests
- `src/lib/seats/index.ts` - barrel export

**Details:**
- Define `ComputeTier` union type: `"api" | "local" | "subscription"`
- Define `ComputeTierMeta` with label, description, icon name, cost model
  string, and default routing weight
- Export `COMPUTE_TIER_META` record keyed by tier
- Export `DEFAULT_COMPUTE_TIER` constant (`"subscription"`)
- Define `ComputeTierSummary` interface: tier, seat count, eligible count,
  total weight, avg health score, estimated cost (number or null)
- Export `classifySeatTier(seat)` pure function that infers tier from
  provider/device/userAgentHint strings
- Export `buildTierSummaries(seats, scores)` that groups seats by tier
  and aggregates
- All functions must be pure (no side effects, no DOM, no fetch)

**Acceptance criteria:**
- `npm run test --workspace=@unclick/mcp-server` still passes (no
  regressions)
- `npx vitest run src/lib/seats/compute-tiers.test.ts` passes
- `classifySeatTier` correctly classifies at least: "claude api" -> api,
  "ollama" -> local, "codex" -> subscription, unknown -> subscription
- `buildTierSummaries` returns one entry per tier with correct counts
- No runtime imports from React or browser APIs

---

### WP-2 - Extend AISeat type (depends on WP-1)

Add `computeTier` to the core seat interfaces on both frontend and API
side.

**Scope:** Wire the new field into existing types without breaking
current behavior.

**Files:**
- `src/pages/admin/AdminAgentsSeatUtils.ts` - add `computeTier?` to `AISeat`
- `api/lib/seat-load-overrides.ts` - add `computeTier?` to `SeatLoadPolicyInput`
- `src/pages/admin/AdminAgents.tsx` - default each seat in `AI_SEATS` to
  `"subscription"`

**Details:**
- Field is optional so old data keeps working
- `loadSeatOverridesFromStorage` preserves and restores the field
- `buildSeatOverrideStoragePayload` serializes it

**Acceptance criteria:**
- Existing tests still pass
- TypeScript compiles with no new errors
- Default seats render the same as before (visual no-op)

---

### WP-3 - Tier-aware routing (depends on WP-1)

Extend `buildSeatLoadRoutingPlan` to accept a preferred tier and bias
weights accordingly.

**Scope:** Backend routing changes only.

**Files:**
- `api/lib/seat-load-overrides.ts` - add `preferredTier?` to input,
  apply tier weight bias
- `api/seat-load-overrides.test.ts` - new test cases

**Details:**
- When `preferredTier` is set, multiply raw weights of matching seats by
  1.5 and non-matching by 0.75
- When unset, behavior is identical to today
- Add tier to each `SeatLoadRoutingWeight` in the output

**Acceptance criteria:**
- Existing routing tests still pass
- New test: with preferred tier "local", local seats get higher weight
- No behavior change when `preferredTier` is omitted

---

### WP-4 - Tier classification integration (depends on WP-3)

Use `classifySeatTier` inside the routing plan builder so every weight
row carries its tier.

**Scope:** Wire classification into the routing pipeline.

**Files:**
- `api/lib/seat-load-overrides.ts` - call `classifySeatTier` during plan
  build
- `api/seat-load-overrides.test.ts` - verify tier appears in output

**Acceptance criteria:**
- Each `SeatLoadRoutingWeight` now includes a `tier` field
- Classification matches the seat's explicit `computeTier` when set,
  falls back to inference

---

### WP-5 - Tier cost model (depends on WP-3)

Add per-tier cost estimation to the routing plan output.

**Scope:** Cost math only, no UI.

**Files:**
- `src/lib/seats/compute-tiers.ts` - add `estimateTierCost(tier, tokens)`
  pure function
- `api/lib/seat-load-overrides.ts` - add optional cost fields to plan
  output
- Tests for both

**Acceptance criteria:**
- API tier returns a token-based estimate
- Local tier returns 0
- Subscription tier returns null (fixed cost, not per-call)
- Existing tests still pass

---

### WP-6 - Tier health scoring (depends on WP-1)

Extend seat performance scoring to include tier-level health.

**Scope:** Scoring utilities only.

**Files:**
- `src/pages/admin/AdminAgentsSeatUtils.ts` - new
  `buildTierHealthScores(seats, profiles)` function
- `src/lib/seats/compute-tiers.test.ts` - additional test cases

**Details:**
- Aggregates per-tier: average score, worst status, count of stale seats
- Uses existing `buildSeatPerformanceScores` internally

**Acceptance criteria:**
- Returns one health record per tier
- Tiers with no seats are omitted
- Pure function, no side effects

---

### WP-7 - Tier tab UI shell (depends on WP-6)

Replace the flat seat list with a tabbed layout grouped by tier.

**Scope:** UI restructuring.

**Files:**
- `src/pages/admin/AdminAgents.tsx` - refactor `AISeatsPanel` into
  `ComputeHubPanel` with three tab sections
- New `src/pages/admin/TierTab.tsx` component

**Details:**
- Each tab shows the tier label, seat count badge, and health indicator
- Seat cards within a tab are the same as today
- Default tab is Subscription (most seats)

**Acceptance criteria:**
- Three tabs render: API, Local, Subscription
- Seats appear under their correct tier
- Existing seat editing still works

---

### WP-8 - Tier summary cards (depends on WP-7)

Add a summary card at the top of each tier tab showing aggregated stats.

**Scope:** UI components.

**Files:**
- New `src/pages/admin/TierSummaryCard.tsx`
- Wire into `TierTab.tsx`

**Details:**
- Shows: seat count, eligible count, average health score, cost indicator
- Uses `buildTierSummaries` from WP-1

**Acceptance criteria:**
- Card renders correct numbers for each tier
- Cost shows "per-use" / "owned" / "fixed" labels matching tier

---

### WP-9 - Relay tier awareness (depends on WP-1)

Extend seat relay to consider tier when choosing reassignment candidates.

**Scope:** Relay logic only.

**Files:**
- `src/lib/seatRelay.ts` - add tier preference to `RelayCandidate`
- `src/lib/seatRelay.test.ts` - new test cases (create if needed)

**Details:**
- Prefer same-tier reassignment
- Fall back to any eligible seat if no same-tier candidate
- No behavior change for items without tier info

**Acceptance criteria:**
- Same-tier candidates are preferred
- Cross-tier fallback still works
- Existing relay tests pass

---

### WP-10 - Integration smoke test (depends on WP-4, WP-9)

End-to-end test that builds a routing plan with mixed-tier seats and
verifies the full pipeline.

**Scope:** Test-only package.

**Files:**
- `src/lib/seats/integration.test.ts`

**Details:**
- Constructs seats across all three tiers
- Builds a routing plan with preferred tier
- Verifies tier summaries, cost estimates, and routing weights
- Verifies relay prefers same-tier

**Acceptance criteria:**
- Single test file, all assertions pass
- Exercises WP-1 through WP-9 code paths
