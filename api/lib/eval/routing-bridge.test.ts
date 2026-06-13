import { describe, it, expect } from "vitest";
import { bridgeRouteDecision, eligibleArmsFromSelection } from "./routing-bridge.js";
import { armTableFromRows, rowsFromArmTable } from "./routing-store.js";
import { buildArmTable } from "./learned-router.js";
import type { ArmOutcomeEvent } from "./learned-router.js";
import type { RunScore } from "../score-trace.js";
import type {
  WriterLaneSelection,
  WriterLaneBackendProfile,
} from "../../writerlane/writerlane-router.js";

const verified: RunScore = { reward: 1, outcome: "verified_completion", reason: "", signals: [] };
const falseGreen: RunScore = { reward: -1, outcome: "false_green", reason: "", signals: [] };

function profile(kind: string): WriterLaneBackendProfile {
  return { kind, cost: "free", status: "available", strengths: [], supportsAutonomyProof: true };
}

function selection(eligible: string[], selectedKind: string): WriterLaneSelection {
  return {
    ok: true,
    selected: profile(selectedKind),
    taskKind: "backend",
    candidates: eligible.map((k) => ({ kind: k, score: 1, eligible: true, reasons: [] })),
  };
}

function manyVerified(arm: string, n: number): ArmOutcomeEvent[] {
  return Array.from({ length: n }, () => ({ arm, score: verified }));
}

describe("routing bridge", () => {
  it("returns null when writerlane found no eligible backend", () => {
    const fail: WriterLaneSelection = { ok: false, reason: "none", taskKind: "backend", candidates: [] };
    expect(bridgeRouteDecision(fail, { arms: {} })).toBeNull();
  });

  it("falls back to writerlane when only one arm is eligible", () => {
    const sel = selection(["solo"], "solo");
    const d = bridgeRouteDecision(sel, { arms: {} })!;
    expect(d.source).toBe("writerlane");
    expect(d.arm).toBe("solo");
  });

  it("falls back to writerlane on a cold start (learned table not promoted)", () => {
    const sel = selection(["a", "b"], "a");
    const d = bridgeRouteDecision(sel, { arms: {} }, { minPullsPerArm: 20 })!;
    expect(d.source).toBe("writerlane");
    expect(d.arm).toBe("a");
  });

  it("uses learned routing once an eligible arm has earned promotion", () => {
    const table = buildArmTable(manyVerified("b", 25));
    const sel = selection(["a", "b"], "a"); // writerlane would pick "a"
    const d = bridgeRouteDecision(sel, table, {
      minPullsPerArm: 20,
      minMeanReward: 0,
      strategy: "epsilon-greedy",
      random: () => 0.99, // exploit
    })!;
    expect(d.source).toBe("learned");
    expect(d.arm).toBe("b"); // learned preference overrides the static pick
  });

  it("never routes outside the eligible set even if a stronger arm exists", () => {
    // "paid" is the strongest learned arm, but it is NOT eligible here.
    const table = buildArmTable([...manyVerified("paid", 50), ...manyVerified("free-a", 25)]);
    const sel = selection(["free-a", "free-b"], "free-a");
    const d = bridgeRouteDecision(sel, table, { minPullsPerArm: 20, minMeanReward: 0, random: () => 0.99 })!;
    expect(["free-a", "free-b"]).toContain(d.arm);
    expect(d.arm).not.toBe("paid");
  });

  it("does not promote when the eligible leader is net-negative", () => {
    const table = buildArmTable([
      ...Array.from({ length: 25 }, () => ({ arm: "a", score: falseGreen })),
      ...Array.from({ length: 25 }, () => ({ arm: "b", score: falseGreen })),
    ]);
    const sel = selection(["a", "b"], "a");
    const d = bridgeRouteDecision(sel, table, { minPullsPerArm: 20, minMeanReward: 0 })!;
    expect(d.source).toBe("writerlane");
  });

  it("eligibleArmsFromSelection lists only eligible candidate kinds", () => {
    const sel: WriterLaneSelection = {
      ok: true,
      selected: profile("a"),
      taskKind: "backend",
      candidates: [
        { kind: "a", score: 1, eligible: true, reasons: [] },
        { kind: "b", score: -Infinity, eligible: false, reasons: ["status:disabled"] },
      ],
    };
    expect(eligibleArmsFromSelection(sel)).toEqual(["a"]);
  });
});

describe("routing store mapping", () => {
  it("round-trips an arm table through rows", () => {
    const table = buildArmTable([...manyVerified("opus", 3), { arm: "haiku", score: falseGreen }]);
    const rows = rowsFromArmTable(table);
    const rebuilt = armTableFromRows(
      rows.map((r) => ({ arm: r.arm, pulls: r.pulls, reward_sum: r.reward_sum, verified: r.verified })),
    );
    expect(rebuilt.arms.opus.pulls).toBe(3);
    expect(rebuilt.arms.opus.verified).toBe(3);
    expect(rebuilt.arms.haiku.rewardSum).toBe(-1);
  });

  it("tolerates null columns from fresh rows", () => {
    const table = armTableFromRows([{ arm: "x", pulls: null, reward_sum: null, verified: null }]);
    expect(table.arms.x).toEqual({ arm: "x", pulls: 0, rewardSum: 0, verified: 0 });
  });
});
