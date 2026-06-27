import { describe, it, expect } from "vitest";
import {
  pushForce, alignment, punchVariety, portability,
  stakingCost, hasStump, forJewels, baseType,
  bestUse, stakingTools,
} from "../staking-tool-calc.js";

describe("pushForce", () => {
  it("hand press canon strongest push", () => {
    expect(pushForce("hand_press_canon")).toBeGreaterThan(pushForce("flat_stake_punch"));
  });
});

describe("alignment", () => {
  it("universal stump kit best alignment", () => {
    expect(alignment("universal_stump_kit")).toBeGreaterThan(alignment("flat_stake_punch"));
  });
});

describe("punchVariety", () => {
  it("universal stump kit most variety", () => {
    expect(punchVariety("universal_stump_kit")).toBeGreaterThan(punchVariety("flat_stake_punch"));
  });
});

describe("portability", () => {
  it("flat stake punch most portable", () => {
    expect(portability("flat_stake_punch")).toBeGreaterThan(portability("universal_stump_kit"));
  });
});

describe("stakingCost", () => {
  it("universal stump kit most expensive", () => {
    expect(stakingCost("universal_stump_kit")).toBeGreaterThan(stakingCost("flat_stake_punch"));
  });
});

describe("hasStump", () => {
  it("riveting stake set has stump", () => {
    expect(hasStump("riveting_stake_set")).toBe(true);
  });
  it("flat stake punch no stump", () => {
    expect(hasStump("flat_stake_punch")).toBe(false);
  });
});

describe("forJewels", () => {
  it("jewel push fit is for jewels", () => {
    expect(forJewels("jewel_push_fit")).toBe(true);
  });
  it("riveting stake set not for jewels", () => {
    expect(forJewels("riveting_stake_set")).toBe(false);
  });
});

describe("baseType", () => {
  it("universal stump kit uses multi hole stump", () => {
    expect(baseType("universal_stump_kit")).toBe("multi_hole_stump");
  });
});

describe("bestUse", () => {
  it("jewel push fit best for jewel setting press", () => {
    expect(bestUse("jewel_push_fit")).toBe("jewel_setting_press");
  });
});

describe("stakingTools", () => {
  it("returns 5 types", () => {
    expect(stakingTools()).toHaveLength(5);
  });
});
