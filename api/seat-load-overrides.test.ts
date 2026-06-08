import { describe, expect, it } from "vitest";

import {
  buildSeatLoadRoutingPlan,
  type SeatLoadPolicyInput,
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

  it("gives virtual fallback seats lower default weight than physical seats", () => {
    const plan = buildSeatLoadRoutingPlan({
      now,
      allowVirtualFallback: true,
      seats: [
        seat({ id: "physical-a" }),
        seat({ id: "physical-b" }),
        seat({ id: "virtual-c", profileKind: "virtual" }),
      ],
    });

    const physicalA = plan.weights.find((row) => row.id === "physical-a")!;
    const virtualC = plan.weights.find((row) => row.id === "virtual-c")!;
    expect(virtualC.weight).toBeLessThan(physicalA.weight);
    expect(virtualC.reasons).toContain("virtual_fallback_enabled");
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
