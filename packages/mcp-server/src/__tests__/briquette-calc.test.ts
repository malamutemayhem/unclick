import { describe, it, expect } from "vitest";
import {
  density, throughput, pressure, versatility,
  brCost, binderFree, forBiomass, die,
  bestUse, briquetteTypes,
} from "../briquette-calc.js";

describe("density", () => {
  it("hydraulic press highest density", () => {
    expect(density("hydraulic_press_high")).toBeGreaterThan(density("screw_press_biomass"));
  });
});

describe("throughput", () => {
  it("roller press highest throughput", () => {
    expect(throughput("roller_press_pillow")).toBeGreaterThan(throughput("hydraulic_press_high"));
  });
});

describe("pressure", () => {
  it("hydraulic press highest pressure", () => {
    expect(pressure("hydraulic_press_high")).toBeGreaterThan(pressure("extrusion_log_biomass"));
  });
});

describe("versatility", () => {
  it("hydraulic press most versatile", () => {
    expect(versatility("hydraulic_press_high")).toBeGreaterThan(versatility("extrusion_log_biomass"));
  });
});

describe("brCost", () => {
  it("hydraulic press most expensive", () => {
    expect(brCost("hydraulic_press_high")).toBeGreaterThan(brCost("extrusion_log_biomass"));
  });
});

describe("binderFree", () => {
  it("hydraulic press is binder free", () => {
    expect(binderFree("hydraulic_press_high")).toBe(true);
  });
  it("roller press needs binder", () => {
    expect(binderFree("roller_press_pillow")).toBe(false);
  });
});

describe("forBiomass", () => {
  it("screw press for biomass", () => {
    expect(forBiomass("screw_press_biomass")).toBe(true);
  });
  it("hydraulic press not for biomass", () => {
    expect(forBiomass("hydraulic_press_high")).toBe(false);
  });
});

describe("die", () => {
  it("screw press uses heated screw die", () => {
    expect(die("screw_press_biomass")).toBe("heated_screw_die_lignin_bind");
  });
});

describe("bestUse", () => {
  it("roller press for metal chip ore fine", () => {
    expect(bestUse("roller_press_pillow")).toBe("metal_chip_ore_fine_flux_compact");
  });
});

describe("briquetteTypes", () => {
  it("returns 5 types", () => {
    expect(briquetteTypes()).toHaveLength(5);
  });
});
