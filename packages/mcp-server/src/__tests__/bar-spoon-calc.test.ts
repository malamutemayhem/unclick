import { describe, it, expect } from "vitest";
import {
  stirControl, versatility, balance, layeringAbility,
  spoonCost, dualFunction, weightedEnd, stemFinish,
  bestDrink, barSpoons,
} from "../bar-spoon-calc.js";

describe("stirControl", () => {
  it("japanese teardrop weighted best stir control", () => {
    expect(stirControl("japanese_teardrop_weighted")).toBeGreaterThan(stirControl("flat_end_muddler"));
  });
});

describe("versatility", () => {
  it("trident fork garnish most versatile", () => {
    expect(versatility("trident_fork_garnish")).toBeGreaterThan(versatility("japanese_teardrop_weighted"));
  });
});

describe("balance", () => {
  it("japanese teardrop weighted best balance", () => {
    expect(balance("japanese_teardrop_weighted")).toBeGreaterThan(balance("flat_end_muddler"));
  });
});

describe("layeringAbility", () => {
  it("disk end layering best for layering", () => {
    expect(layeringAbility("disk_end_layering")).toBeGreaterThan(layeringAbility("flat_end_muddler"));
  });
});

describe("spoonCost", () => {
  it("japanese teardrop weighted most expensive", () => {
    expect(spoonCost("japanese_teardrop_weighted")).toBeGreaterThan(spoonCost("twisted_stem_classic"));
  });
});

describe("dualFunction", () => {
  it("flat end muddler has dual function", () => {
    expect(dualFunction("flat_end_muddler")).toBe(true);
  });
  it("twisted stem classic does not", () => {
    expect(dualFunction("twisted_stem_classic")).toBe(false);
  });
});

describe("weightedEnd", () => {
  it("japanese teardrop weighted has weighted end", () => {
    expect(weightedEnd("japanese_teardrop_weighted")).toBe(true);
  });
  it("twisted stem classic does not", () => {
    expect(weightedEnd("twisted_stem_classic")).toBe(false);
  });
});

describe("stemFinish", () => {
  it("japanese teardrop uses smooth teardrop counterweight", () => {
    expect(stemFinish("japanese_teardrop_weighted")).toBe("smooth_teardrop_counterweight");
  });
});

describe("bestDrink", () => {
  it("twisted stem classic best for martini manhattan stirred", () => {
    expect(bestDrink("twisted_stem_classic")).toBe("martini_manhattan_stirred");
  });
});

describe("barSpoons", () => {
  it("returns 5 types", () => {
    expect(barSpoons()).toHaveLength(5);
  });
});
