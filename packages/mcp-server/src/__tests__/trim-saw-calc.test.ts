import { describe, it, expect } from "vitest";
import {
  cutSpeed, cutPrecision, materialWaste, bladeLife,
  sawCost, needsCoolant, curveCut, bladeType,
  bestUse, trimSaws,
} from "../trim-saw-calc.js";

describe("cutSpeed", () => {
  it("band saw continuous fastest cut", () => {
    expect(cutSpeed("band_saw_continuous")).toBeGreaterThan(cutSpeed("wire_blade_scroll"));
  });
});

describe("cutPrecision", () => {
  it("wire blade scroll most precise cut", () => {
    expect(cutPrecision("wire_blade_scroll")).toBeGreaterThan(cutPrecision("band_saw_continuous"));
  });
});

describe("materialWaste", () => {
  it("wire blade scroll least material waste", () => {
    expect(materialWaste("wire_blade_scroll")).toBeGreaterThan(materialWaste("band_saw_continuous"));
  });
});

describe("bladeLife", () => {
  it("sintered rim wet longest blade life", () => {
    expect(bladeLife("sintered_rim_wet")).toBeGreaterThan(bladeLife("wire_blade_scroll"));
  });
});

describe("sawCost", () => {
  it("sintered rim wet most expensive", () => {
    expect(sawCost("sintered_rim_wet")).toBeGreaterThan(sawCost("notched_rim_dry"));
  });
});

describe("needsCoolant", () => {
  it("diamond blade thin needs coolant", () => {
    expect(needsCoolant("diamond_blade_thin")).toBe(true);
  });
  it("notched rim dry no coolant needed", () => {
    expect(needsCoolant("notched_rim_dry")).toBe(false);
  });
});

describe("curveCut", () => {
  it("wire blade scroll can curve cut", () => {
    expect(curveCut("wire_blade_scroll")).toBe(true);
  });
  it("diamond blade thin cannot curve cut", () => {
    expect(curveCut("diamond_blade_thin")).toBe(false);
  });
});

describe("bladeType", () => {
  it("diamond blade thin uses electroplated diamond", () => {
    expect(bladeType("diamond_blade_thin")).toBe("electroplated_diamond");
  });
});

describe("bestUse", () => {
  it("wire blade scroll best for intricate shape cut", () => {
    expect(bestUse("wire_blade_scroll")).toBe("intricate_shape_cut");
  });
});

describe("trimSaws", () => {
  it("returns 5 types", () => {
    expect(trimSaws()).toHaveLength(5);
  });
});
