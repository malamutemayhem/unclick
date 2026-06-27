import { describe, it, expect } from "vitest";
import {
  cutPrecision, curveFollow, bladeLife, controlGrip,
  knifeCost, swivel, forCurve, bladeType,
  bestUse, marquetryKnives,
} from "../marquetry-knife-calc.js";

describe("cutPrecision", () => {
  it("scalpel blade fine most precise cut", () => {
    expect(cutPrecision("scalpel_blade_fine")).toBeGreaterThan(cutPrecision("hook_blade_pull"));
  });
});

describe("curveFollow", () => {
  it("swivel blade curve best curve follow", () => {
    expect(curveFollow("swivel_blade_curve")).toBeGreaterThan(curveFollow("straight_blade_cut"));
  });
});

describe("bladeLife", () => {
  it("heated blade melt longest blade life", () => {
    expect(bladeLife("heated_blade_melt")).toBeGreaterThan(bladeLife("scalpel_blade_fine"));
  });
});

describe("controlGrip", () => {
  it("straight blade cut best control grip", () => {
    expect(controlGrip("straight_blade_cut")).toBeGreaterThan(controlGrip("swivel_blade_curve"));
  });
});

describe("knifeCost", () => {
  it("heated blade melt most expensive", () => {
    expect(knifeCost("heated_blade_melt")).toBeGreaterThan(knifeCost("scalpel_blade_fine"));
  });
});

describe("swivel", () => {
  it("swivel blade curve has swivel", () => {
    expect(swivel("swivel_blade_curve")).toBe(true);
  });
  it("straight blade cut no swivel", () => {
    expect(swivel("straight_blade_cut")).toBe(false);
  });
});

describe("forCurve", () => {
  it("swivel blade curve is for curve", () => {
    expect(forCurve("swivel_blade_curve")).toBe(true);
  });
  it("scalpel blade fine not for curve", () => {
    expect(forCurve("scalpel_blade_fine")).toBe(false);
  });
});

describe("bladeType", () => {
  it("hook blade pull uses hook pull edge", () => {
    expect(bladeType("hook_blade_pull")).toBe("hook_pull_edge");
  });
});

describe("bestUse", () => {
  it("swivel blade curve best for tight curve follow", () => {
    expect(bestUse("swivel_blade_curve")).toBe("tight_curve_follow");
  });
});

describe("marquetryKnives", () => {
  it("returns 5 types", () => {
    expect(marquetryKnives()).toHaveLength(5);
  });
});
