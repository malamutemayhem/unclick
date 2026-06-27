import { describe, it, expect } from "vitest";
import {
  cutClean, controlSteady, bladeSharp, leafRange,
  knifeCost, curved, doubleEdge, bladeProfile,
  bestUse, gilderKnifes,
} from "../gilder-knife-calc.js";

describe("cutClean", () => {
  it("precision blade thin cleanest cut", () => {
    expect(cutClean("precision_blade_thin")).toBeGreaterThan(cutClean("palette_knife_wide"));
  });
});

describe("controlSteady", () => {
  it("precision blade thin steadiest control", () => {
    expect(controlSteady("precision_blade_thin")).toBeGreaterThan(controlSteady("curved_blade_contour"));
  });
});

describe("bladeSharp", () => {
  it("precision blade thin sharpest blade", () => {
    expect(bladeSharp("precision_blade_thin")).toBeGreaterThan(bladeSharp("palette_knife_wide"));
  });
});

describe("leafRange", () => {
  it("palette knife wide widest leaf range", () => {
    expect(leafRange("palette_knife_wide")).toBeGreaterThan(leafRange("precision_blade_thin"));
  });
});

describe("knifeCost", () => {
  it("precision blade thin most expensive", () => {
    expect(knifeCost("precision_blade_thin")).toBeGreaterThan(knifeCost("palette_knife_wide"));
  });
});

describe("curved", () => {
  it("curved blade contour is curved", () => {
    expect(curved("curved_blade_contour")).toBe(true);
  });
  it("straight blade standard not curved", () => {
    expect(curved("straight_blade_standard")).toBe(false);
  });
});

describe("doubleEdge", () => {
  it("double edge versatile has double edge", () => {
    expect(doubleEdge("double_edge_versatile")).toBe(true);
  });
  it("straight blade standard not double edge", () => {
    expect(doubleEdge("straight_blade_standard")).toBe(false);
  });
});

describe("bladeProfile", () => {
  it("palette knife wide uses wide flat spatula", () => {
    expect(bladeProfile("palette_knife_wide")).toBe("wide_flat_spatula");
  });
});

describe("bestUse", () => {
  it("straight blade standard best for general leaf cut", () => {
    expect(bestUse("straight_blade_standard")).toBe("general_leaf_cut");
  });
});

describe("gilderKnifes", () => {
  it("returns 5 types", () => {
    expect(gilderKnifes()).toHaveLength(5);
  });
});
