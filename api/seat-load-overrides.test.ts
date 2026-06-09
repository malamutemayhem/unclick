import { describe, expect, it } from "vitest";

import {
  buildSeatLoadRoutingPlan,
  type SeatLoadPolicyInput,
  type SeatLoadRoutingWeight,
} from "./lib/seat-load-overrides";

const now = new Date("2026-06-02T05:00:00.000Z");

function seat(patch: Partial<SeatLoadPolicyInput>): SeatLoadPolicyInput {
  return {
    id: "seat-a",
    label: "Seat A",
    profileKind: "physical",
    lastSeenAt: "2026-06-02T04:55:00.000Z",
    routingPolicy: "auto",
    ...patch,
  };
}

describe("seat load override routing policy", () => {
  it("normalizes manual load overrides into routing weights that total 100", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "seat-a", label: "Seat A", manualLoadOverride: 80 }),
        seat({ id: "seat-b", label: "Seat B", manualLoadOverride: 20 }),
      ],
    });

    expect(plan.total_weight).toBe(100);
    expect(plan.weights.map((row) => [row.id, row.weight])).toEqual([
      ["seat-a", 80],
      ["seat-b", 20],
    ]);
    expect(plan.weights[0].reasons).toContain("manual_override");
  });

  it("uses default even split only when no manual override exists", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "manual", manualLoadOverride: 75 }),
        seat({ id: "default-a" }),
        seat({ id: "default-b" }),
      ],
    });

    expect(plan.weights.map((row) => [row.id, row.weight])).toEqual([
      ["manual", 98],
      ["default-a", 1],
      ["default-b", 1],
    ]);
    expect(plan.weights.find((row) => row.id === "default-a")?.reasons).toContain("default_even_split");
  });

  it("falls back to an even split across fresh physical seats", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "seat-a" }),
        seat({ id: "seat-b" }),
      ],
    });

    expect(plan.total_weight).toBe(100);
    expect(plan.weights.map((row) => [row.id, row.weight])).toEqual([
      ["seat-a", 50],
      ["seat-b", 50],
    ]);
  });

  it("excludes stale seats and PC tethers from brain-work routing", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "fresh-physical", lastSeenAt: "2026-06-02T04:55:00.000Z" }),
        seat({ id: "stale-physical", lastSeenAt: "2026-06-02T03:00:00.000Z" }),
        seat({
          id: "pc-tether",
          profileKind: "pc_tether",
          userAgentHint: "admin-ui",
          lastSeenAt: "2026-06-02T04:59:00.000Z",
        }),
      ],
    });

    expect(plan.weights.map((row) => [row.id, row.eligible, row.weight])).toEqual([
      ["fresh-physical", true, 100],
      ["stale-physical", false, 0],
      ["pc-tether", false, 0],
    ]);
    expect(plan.weights.find((row) => row.id === "stale-physical")?.reasons).toContain("stale_check_in");
    expect(plan.weights.find((row) => row.id === "pc-tether")?.reasons).toContain("pc_tether_excluded");
  });

  it("keeps virtual fallback capacity reserved while physical seats are eligible", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "physical", manualLoadOverride: 60 }),
        seat({ id: "virtual-review", profileKind: "virtual", manualLoadOverride: 40 }),
      ],
    });

    expect(plan.weights.map((row) => [row.id, row.eligible, row.weight])).toEqual([
      ["physical", true, 100],
      ["virtual-review", false, 0],
    ]);
    expect(plan.weights.find((row) => row.id === "virtual-review")?.reasons).toContain(
      "virtual_fallback_reserved",
    );
  });

  it("routes virtual fallback capacity when no physical seat is eligible", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "stale-physical", lastSeenAt: "2026-06-02T03:00:00.000Z" }),
        seat({ id: "virtual-review", profileKind: "virtual" }),
      ],
    });

    expect(plan.weights.map((row) => [row.id, row.eligible, row.weight])).toEqual([
      ["stale-physical", false, 0],
      ["virtual-review", true, 100],
    ]);
    expect(plan.weights.find((row) => row.id === "virtual-review")?.reasons).toContain(
      "virtual_fallback_no_physical_capacity",
    );
  });

  it("can explicitly include virtual review capacity without mutating assignments", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      workKind: "review",
      allowVirtualFallback: true,
      seats: [
        seat({ id: "physical", manualLoadOverride: 60 }),
        seat({ id: "virtual-review", profileKind: "virtual", manualLoadOverride: 40 }),
      ],
    });

    expect(plan.total_weight).toBe(100);
    expect(plan.weights.map((row) => [row.id, row.eligible, row.weight])).toEqual([
      ["physical", true, 60],
      ["virtual-review", true, 40],
    ]);
  });
});

describe("tier classification integration", () => {
  it("every weight row includes a tier field", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "seat-a" }),
        seat({ id: "seat-b" }),
      ],
    });

    for (const row of plan.weights) {
      expect(row).toHaveProperty("tier");
      expect(["api", "local", "subscription"]).toContain(row.tier);
    }
  });

  it("classifies seat with explicit computeTier", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "api-seat", computeTier: "api" }),
        seat({ id: "local-seat", computeTier: "local" }),
        seat({ id: "sub-seat", computeTier: "subscription" }),
      ],
    });

    expect(plan.weights.find((r) => r.id === "api-seat")?.tier).toBe("api");
    expect(plan.weights.find((r) => r.id === "local-seat")?.tier).toBe("local");
    expect(plan.weights.find((r) => r.id === "sub-seat")?.tier).toBe("subscription");
  });

  it("infers tier from provider when computeTier is not set", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "ollama-seat", provider: "Ollama" }),
        seat({ id: "openai-seat", provider: "OpenAI" }),
        seat({ id: "codex-seat", provider: "Codex" }),
      ],
    });

    expect(plan.weights.find((r) => r.id === "ollama-seat")?.tier).toBe("local");
    expect(plan.weights.find((r) => r.id === "openai-seat")?.tier).toBe("api");
    expect(plan.weights.find((r) => r.id === "codex-seat")?.tier).toBe("subscription");
  });

  it("infers tier from userAgentHint", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "local-agent", userAgentHint: "ollama/0.3" }),
        seat({ id: "api-agent", userAgentHint: "anthropic-sdk/1.0" }),
      ],
    });

    expect(plan.weights.find((r) => r.id === "local-agent")?.tier).toBe("local");
    expect(plan.weights.find((r) => r.id === "api-agent")?.tier).toBe("api");
  });

  it("infers tier from device field", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "gpu-seat", device: "local GPU node" }),
      ],
    });

    expect(plan.weights.find((r) => r.id === "gpu-seat")?.tier).toBe("local");
  });

  it("defaults unknown seats to subscription tier", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "mystery-seat" }),
      ],
    });

    expect(plan.weights.find((r) => r.id === "mystery-seat")?.tier).toBe("subscription");
  });

  it("explicit computeTier overrides provider inference", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "overridden", computeTier: "api", provider: "Ollama" }),
      ],
    });

    expect(plan.weights.find((r) => r.id === "overridden")?.tier).toBe("api");
  });

  it("virtual seats also get tier classification", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "stale", lastSeenAt: "2026-06-02T03:00:00.000Z" }),
        seat({ id: "virtual-api", profileKind: "virtual", computeTier: "api" }),
      ],
    });

    const virtual = plan.weights.find((r) => r.id === "virtual-api");
    expect(virtual?.tier).toBe("api");
  });
});

describe("preferred tier routing bias", () => {
  it("boosts weight for seats matching preferredTier", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "local-a", computeTier: "local", manualLoadOverride: 50 }),
        seat({ id: "sub-a", computeTier: "subscription", manualLoadOverride: 50 }),
      ],
      preferredTier: "local",
    });

    const local = plan.weights.find((r) => r.id === "local-a")!;
    const sub = plan.weights.find((r) => r.id === "sub-a")!;
    expect(local.weight).toBeGreaterThan(sub.weight);
    expect(local.reasons).toContain("preferred_tier");
    expect(sub.reasons).toContain("non_preferred_tier");
  });

  it("does not change behavior when preferredTier is omitted", () => {
    const seatsInput = [
      seat({ id: "seat-a", manualLoadOverride: 50 }),
      seat({ id: "seat-b", manualLoadOverride: 50 }),
    ];

    const withoutPref = buildSeatLoadRoutingPlan({ now, seats: seatsInput });
    const withNullPref = buildSeatLoadRoutingPlan({ now, seats: seatsInput, preferredTier: null });

    expect(withoutPref.weights.map((r) => [r.id, r.weight])).toEqual(
      withNullPref.weights.map((r) => [r.id, r.weight]),
    );
    expect(withoutPref.weights[0].reasons).not.toContain("preferred_tier");
    expect(withoutPref.weights[0].reasons).not.toContain("non_preferred_tier");
  });

  it("applies 1.5x bias for matching tier and 0.75x for non-matching", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "match", computeTier: "api", manualLoadOverride: 40 }),
        seat({ id: "no-match", computeTier: "subscription", manualLoadOverride: 40 }),
      ],
      preferredTier: "api",
    });

    const match = plan.weights.find((r) => r.id === "match")!;
    const noMatch = plan.weights.find((r) => r.id === "no-match")!;
    expect(match.weight).toBeGreaterThan(noMatch.weight);
    expect(match.raw_weight).toBeCloseTo(40 * 1.5, 1);
    expect(noMatch.raw_weight).toBeCloseTo(40 * 0.75, 1);
  });

  it("preserves total weight at 100", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      seats: [
        seat({ id: "a", computeTier: "local" }),
        seat({ id: "b", computeTier: "api" }),
        seat({ id: "c", computeTier: "subscription" }),
      ],
      preferredTier: "local",
    });

    expect(plan.total_weight).toBe(100);
  });
});
