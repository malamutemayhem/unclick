import { describe, it, expect } from "vitest";
import {
  flexibility, heatRemoval, mixing, containment,
  brCost, pressurized, forMultiProduct, vessel,
  bestUse, batchReactorTypes,
} from "../batch-reactor-calc.js";

describe("flexibility", () => {
  it("calorimeter most flexible", () => {
    expect(flexibility("calorimeter_reaction")).toBeGreaterThan(flexibility("high_pressure_autoclave"));
  });
});

describe("heatRemoval", () => {
  it("calorimeter best heat removal", () => {
    expect(heatRemoval("calorimeter_reaction")).toBeGreaterThan(heatRemoval("glass_lined_pharma"));
  });
});

describe("mixing", () => {
  it("fermentation best mixing", () => {
    expect(mixing("fermentation_bioreact")).toBeGreaterThan(mixing("glass_lined_pharma"));
  });
});

describe("containment", () => {
  it("autoclave best containment", () => {
    expect(containment("high_pressure_autoclave")).toBeGreaterThan(containment("jacketed_stirred_std"));
  });
});

describe("brCost", () => {
  it("calorimeter most expensive", () => {
    expect(brCost("calorimeter_reaction")).toBeGreaterThan(brCost("jacketed_stirred_std"));
  });
});

describe("pressurized", () => {
  it("autoclave is pressurized", () => {
    expect(pressurized("high_pressure_autoclave")).toBe(true);
  });
  it("jacketed stirred not pressurized", () => {
    expect(pressurized("jacketed_stirred_std")).toBe(false);
  });
});

describe("forMultiProduct", () => {
  it("jacketed stirred for multi product", () => {
    expect(forMultiProduct("jacketed_stirred_std")).toBe(true);
  });
  it("fermentation not for multi product", () => {
    expect(forMultiProduct("fermentation_bioreact")).toBe(false);
  });
});

describe("vessel", () => {
  it("glass lined uses corrosion resistant", () => {
    expect(vessel("glass_lined_pharma")).toBe("glass_lined_steel_vessel_corrosion_resistant");
  });
});

describe("bestUse", () => {
  it("fermentation for biotech", () => {
    expect(bestUse("fermentation_bioreact")).toBe("biotech_fermentation_cell_culture_enzyme_prod");
  });
});

describe("batchReactorTypes", () => {
  it("returns 5 types", () => {
    expect(batchReactorTypes()).toHaveLength(5);
  });
});
