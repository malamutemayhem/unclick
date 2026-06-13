import { describe, it, expect } from "vitest";
import {
  buildArmTable,
  routeAmong,
  evaluateRoutingPromotion,
  type ArmOutcomeEvent,
} from "./learned-router.js";
import { emptyArmTable } from "./router-bandit.js";
import type { RunScore } from "../score-trace.js";

const verified: RunScore = { reward: 1, outcome: "verified_completion", reason: "", signals: [] };
const falseGreen: RunScore = { reward: -1, outcome: "false_green", reason: "", signals: [] };

function manyVerified(arm: string, n: number): ArmOutcomeEvent[] {
  return Array.from({ length: n }, () => ({ arm, score: verified }));
}

describe("buildArmTable + routeAmong", () => {
  it("learns to prefer the arm with higher proof-reward among eligible arms", () => {
    const table = buildArmTable([
      ...manyVerified("opus", 8),
      { arm: "haiku", score: falseGreen },
      { arm: "haiku", score: falseGreen },
    ]);
    const decision = routeAmong(["opus", "haiku"], table, { strategy: "epsilon-greedy", random: () => 0.99 });
    expect(decision.arm).toBe("opus");
    expect(decision.coldStart).toBe(false);
  });

  it("never routes to an arm outside the eligible set (eligibility wins)", () => {
    const table = buildArmTable(manyVerified("paid-model", 50));
    // paid-model is the best learned arm, but it is not eligible here.
    const decision = routeAmong(["free-a", "free-b"], table, { strategy: "epsilon-greedy", random: () => 0.99 });
    expect(["free-a", "free-b"]).toContain(decision.arm);
    expect(decision.arm).not.toBe("paid-model");
  });

  it("handles a cold start deterministically", () => {
    const decision = routeAmong(["a", "b"], emptyArmTable(), { strategy: "epsilon-greedy", random: () => 0.99 });
    expect(decision.coldStart).toBe(true);
    expect(["a", "b"]).toContain(decision.arm);
  });

  it("throws with no eligible arms", () => {
    expect(() => routeAmong([], emptyArmTable())).toThrow();
  });
});

describe("evaluateRoutingPromotion (must earn the wheel)", () => {
  it("refuses promotion before an arm has enough evidence", () => {
    const table = buildArmTable(manyVerified("opus", 3));
    const promo = evaluateRoutingPromotion(table, { minPullsPerArm: 20 });
    expect(promo.promote).toBe(false);
    expect(promo.reasons[0]).toContain("pulls");
  });

  it("refuses promotion when the leader's mean reward is negative", () => {
    const table = buildArmTable(
      Array.from({ length: 25 }, () => ({ arm: "bad", score: falseGreen })),
    );
    const promo = evaluateRoutingPromotion(table, { minPullsPerArm: 20, minMeanReward: 0 });
    expect(promo.promote).toBe(false);
    expect(promo.reasons.some((r) => r.includes("mean proof-reward"))).toBe(true);
  });

  it("promotes once the leader has enough pulls and positive reward", () => {
    const table = buildArmTable(manyVerified("opus", 25));
    const promo = evaluateRoutingPromotion(table, { minPullsPerArm: 20, minMeanReward: 0 });
    expect(promo.promote).toBe(true);
    expect(promo.leaderboard[0].arm).toBe("opus");
  });
});
