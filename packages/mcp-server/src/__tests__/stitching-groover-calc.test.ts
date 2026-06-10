import { describe, it, expect } from "vitest";
import {
  grooveDepth, lineConsistency, versatility, easeOfUse,
  grooverCost, needsHeat, adjustableWidth, bladeProfile,
  bestUse, stitchingGroovers,
} from "../stitching-groover-calc.js";

describe("grooveDepth", () => {
  it("creasing iron heated deepest groove", () => {
    expect(grooveDepth("creasing_iron_heated")).toBeGreaterThan(grooveDepth("stitch_marking_wheel"));
  });
});

describe("lineConsistency", () => {
  it("adjustable fence guide most consistent line", () => {
    expect(lineConsistency("adjustable_fence_guide")).toBeGreaterThan(lineConsistency("v_groove_edge_tool"));
  });
});

describe("versatility", () => {
  it("adjustable fence guide most versatile", () => {
    expect(versatility("adjustable_fence_guide")).toBeGreaterThan(versatility("fixed_width_single"));
  });
});

describe("easeOfUse", () => {
  it("stitch marking wheel easiest to use", () => {
    expect(easeOfUse("stitch_marking_wheel")).toBeGreaterThan(easeOfUse("creasing_iron_heated"));
  });
});

describe("grooverCost", () => {
  it("creasing iron heated most expensive", () => {
    expect(grooverCost("creasing_iron_heated")).toBeGreaterThan(grooverCost("fixed_width_single"));
  });
});

describe("needsHeat", () => {
  it("creasing iron heated needs heat", () => {
    expect(needsHeat("creasing_iron_heated")).toBe(true);
  });
  it("adjustable fence guide needs no heat", () => {
    expect(needsHeat("adjustable_fence_guide")).toBe(false);
  });
});

describe("adjustableWidth", () => {
  it("adjustable fence guide has adjustable width", () => {
    expect(adjustableWidth("adjustable_fence_guide")).toBe(true);
  });
  it("fixed width single has no adjustable width", () => {
    expect(adjustableWidth("fixed_width_single")).toBe(false);
  });
});

describe("bladeProfile", () => {
  it("stitch marking wheel uses toothed wheel roll", () => {
    expect(bladeProfile("stitch_marking_wheel")).toBe("toothed_wheel_roll");
  });
});

describe("bestUse", () => {
  it("creasing iron heated best for luxury bag crease", () => {
    expect(bestUse("creasing_iron_heated")).toBe("luxury_bag_crease");
  });
});

describe("stitchingGroovers", () => {
  it("returns 5 types", () => {
    expect(stitchingGroovers()).toHaveLength(5);
  });
});
