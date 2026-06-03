import { describe, it, expect } from "vitest";
import { buildSessionInspection, DEFAULT_THRESHOLDS } from "./session-inspection.js";
import type { TruthRateSummary } from "../score-trace.js";

function summary(over: Partial<TruthRateSummary> = {}): TruthRateSummary {
  return {
    total: 10,
    verified: 8,
    falseGreen: 1,
    stale: 0,
    honestBlocker: 1,
    inProgress: 0,
    truthRate: 8 / 9,
    hallucinatedCompletionRate: 0.1,
    netReward: 7,
    ...over,
  };
}

describe("buildSessionInspection", () => {
  it("reports healthy when nothing crosses a threshold", () => {
    const r = buildSessionInspection({ truthSummary: summary(), falseGreenJobIds: [], staleJobIds: [] });
    expect(r.status).toBe("healthy");
    expect(r.improvementJob).toBeNull();
  });

  it("handles an empty window gracefully", () => {
    const r = buildSessionInspection({ truthSummary: null, falseGreenJobIds: [], staleJobIds: [] });
    expect(r.status).toBe("healthy");
    expect(r.headline).toContain("quiet");
  });

  it("flags needs_attention when fake-green rate is high", () => {
    const r = buildSessionInspection({
      truthSummary: summary({ hallucinatedCompletionRate: 0.5, falseGreen: 5, verified: 5, truthRate: 0.5 }),
      falseGreenJobIds: ["a", "b", "c"],
      staleJobIds: [],
    });
    expect(r.status).toBe("needs_attention");
    expect(r.nextActions.some((n) => n.includes("fake-green"))).toBe(true);
  });

  it("flags watch when stale jobs pile up", () => {
    const r = buildSessionInspection({
      truthSummary: summary(),
      falseGreenJobIds: [],
      staleJobIds: ["s1", "s2", "s3", "s4"],
    });
    expect(r.status).toBe("watch");
    expect(r.nextActions.some((n) => n.includes("Recover"))).toBe(true);
  });

  it("does NOT propose an improvement job on first occurrence of friction", () => {
    const r = buildSessionInspection({
      truthSummary: summary({ hallucinatedCompletionRate: 0.5, falseGreen: 5, truthRate: 0.5 }),
      falseGreenJobIds: ["a"],
      staleJobIds: [],
      recurringFrictionStreak: 0,
    });
    expect(r.improvementJob).toBeNull();
  });

  it("proposes a gated improvement job once friction recurs past the streak", () => {
    const r = buildSessionInspection({
      truthSummary: summary({ hallucinatedCompletionRate: 0.5, falseGreen: 5, truthRate: 0.5 }),
      falseGreenJobIds: ["a", "b"],
      staleJobIds: ["s1"],
      recurringFrictionStreak: 1, // +1 this inspection meets default threshold of 2
    });
    expect(r.improvementJob).not.toBeNull();
    expect(r.improvementJob?.lane).toBe("improver");
    expect(r.improvementJob?.evidence.some((e) => e.startsWith("recurring_streak="))).toBe(true);
  });

  it("escalates priority to urgent when fake-green is severe", () => {
    const r = buildSessionInspection({
      truthSummary: summary({ hallucinatedCompletionRate: 0.6, falseGreen: 6, truthRate: 0.4 }),
      falseGreenJobIds: ["a", "b", "c"],
      staleJobIds: [],
      recurringFrictionStreak: 2,
    });
    expect(r.improvementJob?.priority).toBe("urgent");
  });

  it("respects custom thresholds", () => {
    const r = buildSessionInspection({
      truthSummary: summary({ hallucinatedCompletionRate: 0.15 }),
      falseGreenJobIds: ["a"],
      staleJobIds: [],
      thresholds: { ...DEFAULT_THRESHOLDS, maxHallucinatedRate: 0.1 },
    });
    expect(r.status).toBe("needs_attention");
  });
});
