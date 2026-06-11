import { describe, it, expect } from "vitest";
import {
  holdForce, alignAccuracy, speedSet, sizeRange,
  clampCost, powered, forLarge, jawStyle,
  bestUse, felloeClamps,
} from "../felloe-clamp-calc.js";

describe("holdForce", () => {
  it("hydraulic clamp power strongest hold", () => {
    expect(holdForce("hydraulic_clamp_power")).toBeGreaterThan(holdForce("wedge_clamp_fast"));
  });
});

describe("alignAccuracy", () => {
  it("bar clamp adjustable best alignment", () => {
    expect(alignAccuracy("bar_clamp_adjustable")).toBeGreaterThan(alignAccuracy("chain_clamp_large"));
  });
});

describe("speedSet", () => {
  it("wedge clamp fast fastest set", () => {
    expect(speedSet("wedge_clamp_fast")).toBeGreaterThan(speedSet("screw_clamp_standard"));
  });
});

describe("sizeRange", () => {
  it("chain clamp large best size range", () => {
    expect(sizeRange("chain_clamp_large")).toBeGreaterThan(sizeRange("wedge_clamp_fast"));
  });
});

describe("clampCost", () => {
  it("hydraulic clamp power most expensive", () => {
    expect(clampCost("hydraulic_clamp_power")).toBeGreaterThan(clampCost("wedge_clamp_fast"));
  });
});

describe("powered", () => {
  it("hydraulic clamp power is powered", () => {
    expect(powered("hydraulic_clamp_power")).toBe(true);
  });
  it("screw clamp standard not powered", () => {
    expect(powered("screw_clamp_standard")).toBe(false);
  });
});

describe("forLarge", () => {
  it("chain clamp large is for large", () => {
    expect(forLarge("chain_clamp_large")).toBe(true);
  });
  it("screw clamp standard not for large", () => {
    expect(forLarge("screw_clamp_standard")).toBe(false);
  });
});

describe("jawStyle", () => {
  it("bar clamp adjustable uses sliding bar jaw", () => {
    expect(jawStyle("bar_clamp_adjustable")).toBe("sliding_bar_jaw");
  });
});

describe("bestUse", () => {
  it("screw clamp standard best for general felloe glue", () => {
    expect(bestUse("screw_clamp_standard")).toBe("general_felloe_glue");
  });
});

describe("felloeClamps", () => {
  it("returns 5 types", () => {
    expect(felloeClamps()).toHaveLength(5);
  });
});
