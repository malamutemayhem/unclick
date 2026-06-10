import { describe, it, expect } from "vitest";
import {
  heightRange, surfaceGrip, shinSafety, stability,
  boxCost, multiHeight, shockAbsorb, coreMaterial,
  bestUser, plyoBoxes,
} from "../plyo-box-calc.js";

describe("heightRange", () => {
  it("steel adjustable widest height range", () => {
    expect(heightRange("steel_adjustable")).toBeGreaterThan(heightRange("inflatable_air"));
  });
});

describe("surfaceGrip", () => {
  it("foam soft 3 in 1 best surface grip", () => {
    expect(surfaceGrip("foam_soft_3_in_1")).toBeGreaterThan(surfaceGrip("inflatable_air"));
  });
});

describe("shinSafety", () => {
  it("foam soft 3 in 1 safest for shins", () => {
    expect(shinSafety("foam_soft_3_in_1")).toBeGreaterThan(shinSafety("wood_solid_single"));
  });
});

describe("stability", () => {
  it("wood solid single most stable", () => {
    expect(stability("wood_solid_single")).toBeGreaterThan(stability("inflatable_air"));
  });
});

describe("boxCost", () => {
  it("steel adjustable most expensive", () => {
    expect(boxCost("steel_adjustable")).toBeGreaterThan(boxCost("inflatable_air"));
  });
});

describe("multiHeight", () => {
  it("foam soft 3 in 1 is multi height", () => {
    expect(multiHeight("foam_soft_3_in_1")).toBe(true);
  });
  it("wood solid single is not", () => {
    expect(multiHeight("wood_solid_single")).toBe(false);
  });
});

describe("shockAbsorb", () => {
  it("foam soft 3 in 1 has shock absorb", () => {
    expect(shockAbsorb("foam_soft_3_in_1")).toBe(true);
  });
  it("wood solid single does not", () => {
    expect(shockAbsorb("wood_solid_single")).toBe(false);
  });
});

describe("coreMaterial", () => {
  it("wood solid single uses birch plywood box", () => {
    expect(coreMaterial("wood_solid_single")).toBe("birch_plywood_box");
  });
});

describe("bestUser", () => {
  it("foam soft 3 in 1 best for crossfit beginner safe", () => {
    expect(bestUser("foam_soft_3_in_1")).toBe("crossfit_beginner_safe");
  });
});

describe("plyoBoxes", () => {
  it("returns 5 types", () => {
    expect(plyoBoxes()).toHaveLength(5);
  });
});
