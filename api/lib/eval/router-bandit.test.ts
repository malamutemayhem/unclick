import { describe, it, expect } from "vitest";
import {
  emptyArm,
  emptyArmTable,
  updateArm,
  meanReward,
  selectArm,
  recordArmOutcome,
  armLeaderboard,
  type ArmStats,
} from "./router-bandit.js";
import type { RunScore } from "../score-trace.js";

const verified: RunScore = { reward: 1, outcome: "verified_completion", reason: "", signals: [] };
const falseGreen: RunScore = { reward: -1, outcome: "false_green", reason: "", signals: [] };
const neutral: RunScore = { reward: 0, outcome: "honest_blocker", reason: "", signals: [] };

describe("arm stats", () => {
  it("updates pulls, reward sum, and verified count", () => {
    let arm = emptyArm("opus");
    arm = updateArm(arm, verified);
    arm = updateArm(arm, falseGreen);
    arm = updateArm(arm, verified);
    expect(arm.pulls).toBe(3);
    expect(arm.rewardSum).toBe(1); // +1 -1 +1
    expect(arm.verified).toBe(2);
    expect(meanReward(arm)).toBeCloseTo(1 / 3, 5);
  });

  it("mean reward of an unpulled arm is neutral zero", () => {
    expect(meanReward(emptyArm("x"))).toBe(0);
  });
});

describe("selectArm: epsilon-greedy", () => {
  const arms: ArmStats[] = [
    { arm: "good", pulls: 10, rewardSum: 8, verified: 9 },
    { arm: "bad", pulls: 10, rewardSum: -6, verified: 1 },
  ];

  it("exploits the higher-mean arm when not exploring", () => {
    const sel = selectArm(arms, { strategy: "epsilon-greedy", epsilon: 0.1, random: () => 0.9 });
    expect(sel.arm).toBe("good");
    expect(sel.explored).toBe(false);
  });

  it("explores when the roll is below epsilon", () => {
    // first random() < epsilon triggers explore; second picks index 0
    const seq = [0.05, 0.0];
    let i = 0;
    const sel = selectArm(arms, { strategy: "epsilon-greedy", epsilon: 0.1, random: () => seq[i++] });
    expect(sel.explored).toBe(true);
  });
});

describe("selectArm: ucb", () => {
  it("prefers an unpulled arm first (infinite bound)", () => {
    const arms: ArmStats[] = [
      { arm: "known", pulls: 5, rewardSum: 5, verified: 5 },
      { arm: "new", pulls: 0, rewardSum: 0, verified: 0 },
    ];
    const sel = selectArm(arms, { strategy: "ucb" });
    expect(sel.arm).toBe("new");
  });
});

describe("selectArm: thompson", () => {
  it("is deterministic under an injected RNG and favors the stronger arm", () => {
    const arms: ArmStats[] = [
      { arm: "strong", pulls: 50, rewardSum: 40, verified: 45 },
      { arm: "weak", pulls: 50, rewardSum: -40, verified: 5 },
    ];
    // A fixed RNG makes the sample reproducible.
    const sel = selectArm(arms, { strategy: "thompson", random: () => 0.5 });
    expect(sel.arm).toBe("strong");
  });
});

describe("arm table + leaderboard", () => {
  it("records outcomes and ranks arms by mean proof-reward", () => {
    let table = emptyArmTable();
    table = recordArmOutcome(table, "opus", verified);
    table = recordArmOutcome(table, "opus", verified);
    table = recordArmOutcome(table, "haiku", neutral);
    table = recordArmOutcome(table, "haiku", falseGreen);

    const board = armLeaderboard(table);
    expect(board[0].arm).toBe("opus");
    expect(board[0].successRate).toBe(1);
    expect(board[1].arm).toBe("haiku");
    expect(board[1].meanReward).toBeLessThan(board[0].meanReward);
  });

  it("throws if asked to select among zero arms", () => {
    expect(() => selectArm([])).toThrow();
  });
});
