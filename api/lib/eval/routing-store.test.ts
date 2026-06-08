import { describe, it, expect } from "vitest";
import { armTableFromRows, rowsFromArmTable, type RoutingArmRow } from "./routing-store.js";
import { meanReward, ucbBound } from "./router-bandit.js";

describe("armTableFromRows", () => {
  it("builds an ArmTable from valid rows", () => {
    const rows: RoutingArmRow[] = [
      { arm: "a", pulls: 10, reward_sum: 5, verified: 3 },
      { arm: "b", pulls: 4, reward_sum: -2, verified: 0 },
    ];
    const table = armTableFromRows(rows);
    expect(table.arms["a"]).toEqual({ arm: "a", pulls: 10, rewardSum: 5, verified: 3 });
    expect(table.arms["b"]).toEqual({ arm: "b", pulls: 4, rewardSum: -2, verified: 0 });
  });

  it("skips rows with falsy arm", () => {
    const rows: RoutingArmRow[] = [
      { arm: "", pulls: 1, reward_sum: 1, verified: 1 },
      { arm: "ok", pulls: 1, reward_sum: 1, verified: 1 },
    ];
    const table = armTableFromRows(rows);
    expect(Object.keys(table.arms)).toEqual(["ok"]);
  });

  it("sanitizes NaN fields to zero so bandit math stays finite", () => {
    const rows: RoutingArmRow[] = [
      { arm: "bad", pulls: NaN as unknown as number, reward_sum: 5, verified: 2 },
    ];
    const table = armTableFromRows(rows);
    const stats = table.arms["bad"];
    expect(stats.pulls).toBe(0);
    expect(stats.rewardSum).toBe(0);
    expect(stats.verified).toBe(0);
    expect(Number.isFinite(meanReward(stats))).toBe(true);
  });

  it("sanitizes Infinity fields to zero", () => {
    const rows: RoutingArmRow[] = [
      { arm: "inf", pulls: Infinity as unknown as number, reward_sum: Infinity as unknown as number, verified: 1 },
    ];
    const table = armTableFromRows(rows);
    const stats = table.arms["inf"];
    expect(stats.pulls).toBe(0);
    expect(stats.rewardSum).toBe(0);
  });

  it("sanitizes negative pulls to zero", () => {
    const rows: RoutingArmRow[] = [
      { arm: "neg", pulls: -5, reward_sum: 3, verified: -1 },
    ];
    const table = armTableFromRows(rows);
    const stats = table.arms["neg"];
    expect(stats.pulls).toBe(0);
    expect(stats.rewardSum).toBe(0);
    expect(stats.verified).toBe(0);
  });

  it("produces finite UCB bounds after sanitizing corrupted rows", () => {
    const rows: RoutingArmRow[] = [
      { arm: "ok", pulls: 5, reward_sum: 3, verified: 2 },
      { arm: "corrupt", pulls: NaN as unknown as number, reward_sum: NaN as unknown as number, verified: NaN as unknown as number },
    ];
    const table = armTableFromRows(rows);
    for (const stats of Object.values(table.arms)) {
      expect(Number.isFinite(meanReward(stats))).toBe(true);
    }
  });
});

describe("rowsFromArmTable", () => {
  it("round-trips valid data", () => {
    const rows: RoutingArmRow[] = [
      { arm: "a", pulls: 10, reward_sum: 5, verified: 3 },
    ];
    const table = armTableFromRows(rows);
    const out = rowsFromArmTable(table);
    expect(out).toEqual([{ arm: "a", pulls: 10, reward_sum: 5, verified: 3 }]);
  });
});
