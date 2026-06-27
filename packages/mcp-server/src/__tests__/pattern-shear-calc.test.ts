import { describe, it, expect } from "vitest";
import {
  cutAccuracy, edgeClean, comfortGrip, materialRange,
  shearCost, springLoaded, forThick, bladeLength,
  bestUse, patternShears,
} from "../pattern-shear-calc.js";

describe("cutAccuracy", () => {
  it("curved blade detail most accurate cut", () => {
    expect(cutAccuracy("curved_blade_detail")).toBeGreaterThan(cutAccuracy("heavy_duty_thick"));
  });
});

describe("edgeClean", () => {
  it("curved blade detail cleanest edge", () => {
    expect(edgeClean("curved_blade_detail")).toBeGreaterThan(edgeClean("heavy_duty_thick"));
  });
});

describe("comfortGrip", () => {
  it("spring loaded easy most comfortable grip", () => {
    expect(comfortGrip("spring_loaded_easy")).toBeGreaterThan(comfortGrip("heavy_duty_thick"));
  });
});

describe("materialRange", () => {
  it("heavy duty thick widest material range", () => {
    expect(materialRange("heavy_duty_thick")).toBeGreaterThan(materialRange("curved_blade_detail"));
  });
});

describe("shearCost", () => {
  it("heavy duty thick most expensive", () => {
    expect(shearCost("heavy_duty_thick")).toBeGreaterThan(shearCost("straight_blade_standard"));
  });
});

describe("springLoaded", () => {
  it("spring loaded easy is spring loaded", () => {
    expect(springLoaded("spring_loaded_easy")).toBe(true);
  });
  it("straight blade standard not spring loaded", () => {
    expect(springLoaded("straight_blade_standard")).toBe(false);
  });
});

describe("forThick", () => {
  it("heavy duty thick is for thick", () => {
    expect(forThick("heavy_duty_thick")).toBe(true);
  });
  it("straight blade standard not for thick", () => {
    expect(forThick("straight_blade_standard")).toBe(false);
  });
});

describe("bladeLength", () => {
  it("curved blade detail uses four inch curved", () => {
    expect(bladeLength("curved_blade_detail")).toBe("four_inch_curved");
  });
});

describe("bestUse", () => {
  it("straight blade standard best for general pattern cut", () => {
    expect(bestUse("straight_blade_standard")).toBe("general_pattern_cut");
  });
});

describe("patternShears", () => {
  it("returns 5 types", () => {
    expect(patternShears()).toHaveLength(5);
  });
});
