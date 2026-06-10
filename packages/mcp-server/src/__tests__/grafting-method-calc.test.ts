import { describe, it, expect } from "vitest";
import {
  successRatePercent, healingWeeks, skillRequired,
  bestSeason, sizeMismatchTolerance, repairGraft,
  dormantWoodRequired, bestTreeType, toolCost, graftingMethods,
} from "../grafting-method-calc.js";

describe("successRatePercent", () => {
  it("whip tongue has highest success rate", () => {
    expect(successRatePercent("whip_tongue")).toBeGreaterThan(
      successRatePercent("bridge_graft")
    );
  });
});

describe("healingWeeks", () => {
  it("bridge graft heals slowest", () => {
    expect(healingWeeks("bridge_graft")).toBeGreaterThan(
      healingWeeks("bud_graft")
    );
  });
});

describe("skillRequired", () => {
  it("bridge graft needs most skill", () => {
    expect(skillRequired("bridge_graft")).toBeGreaterThan(
      skillRequired("bark_graft")
    );
  });
});

describe("bestSeason", () => {
  it("bud graft best in summer", () => {
    expect(bestSeason("bud_graft")).toBe("summer");
  });
});

describe("sizeMismatchTolerance", () => {
  it("bark graft tolerates most size mismatch", () => {
    expect(sizeMismatchTolerance("bark_graft")).toBeGreaterThan(
      sizeMismatchTolerance("whip_tongue")
    );
  });
});

describe("repairGraft", () => {
  it("bridge graft is a repair graft", () => {
    expect(repairGraft("bridge_graft")).toBe(true);
  });
  it("whip tongue is not", () => {
    expect(repairGraft("whip_tongue")).toBe(false);
  });
});

describe("dormantWoodRequired", () => {
  it("whip tongue needs dormant wood", () => {
    expect(dormantWoodRequired("whip_tongue")).toBe(true);
  });
  it("bud graft does not", () => {
    expect(dormantWoodRequired("bud_graft")).toBe(false);
  });
});

describe("bestTreeType", () => {
  it("whip tongue best for apple", () => {
    expect(bestTreeType("whip_tongue")).toBe("apple");
  });
});

describe("toolCost", () => {
  it("whip tongue tools cost most", () => {
    expect(toolCost("whip_tongue")).toBeGreaterThan(
      toolCost("bud_graft")
    );
  });
});

describe("graftingMethods", () => {
  it("returns 5 methods", () => {
    expect(graftingMethods()).toHaveLength(5);
  });
});
