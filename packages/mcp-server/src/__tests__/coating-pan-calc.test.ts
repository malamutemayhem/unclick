import { describe, it, expect } from "vitest";
import {
  coatUniformity, throughput, dryingEfficiency, coatThickness,
  cpCost, continuous, forEnteric, panConfig,
  bestUse, coatingPanTypes,
} from "../coating-pan-calc.js";

describe("coatUniformity", () => {
  it("fluid bed coat best uniformity", () => {
    expect(coatUniformity("fluid_bed_coat")).toBeGreaterThan(coatUniformity("standard_pan"));
  });
});

describe("throughput", () => {
  it("continuous coater highest throughput", () => {
    expect(throughput("continuous_coater")).toBeGreaterThan(throughput("fluid_bed_coat"));
  });
});

describe("dryingEfficiency", () => {
  it("fluid bed coat best drying efficiency", () => {
    expect(dryingEfficiency("fluid_bed_coat")).toBeGreaterThan(dryingEfficiency("standard_pan"));
  });
});

describe("coatThickness", () => {
  it("fluid bed coat best thickness control", () => {
    expect(coatThickness("fluid_bed_coat")).toBeGreaterThan(coatThickness("continuous_coater"));
  });
});

describe("cpCost", () => {
  it("continuous coater most expensive", () => {
    expect(cpCost("continuous_coater")).toBeGreaterThan(cpCost("standard_pan"));
  });
});

describe("continuous", () => {
  it("continuous coater is continuous", () => {
    expect(continuous("continuous_coater")).toBe(true);
  });
  it("perforated pan not continuous", () => {
    expect(continuous("perforated_pan")).toBe(false);
  });
});

describe("forEnteric", () => {
  it("perforated pan for enteric", () => {
    expect(forEnteric("perforated_pan")).toBe(true);
  });
  it("standard pan not for enteric", () => {
    expect(forEnteric("standard_pan")).toBe(false);
  });
});

describe("panConfig", () => {
  it("electrostatic coat uses charge powder attract tablet surface even", () => {
    expect(panConfig("electrostatic_coat")).toBe("electrostatic_coat_charge_powder_attract_tablet_surface_even");
  });
});

describe("bestUse", () => {
  it("standard pan for traditional pharma sugar coating confectionery", () => {
    expect(bestUse("standard_pan")).toBe("traditional_pharma_standard_pan_sugar_coating_confectionery");
  });
});

describe("coatingPanTypes", () => {
  it("returns 5 types", () => {
    expect(coatingPanTypes()).toHaveLength(5);
  });
});
