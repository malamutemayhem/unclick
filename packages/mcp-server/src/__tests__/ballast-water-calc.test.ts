import { describe, it, expect } from "vitest";
import {
  flowRate, effectiveness, maintenance, powerConsumption,
  bwCost, chemical, forLargeVessel, treatment,
  bestUse, ballastWaterTypes,
} from "../ballast-water-calc.js";

describe("flowRate", () => {
  it("chemical injection highest flow rate", () => {
    expect(flowRate("chemical_injection")).toBeGreaterThan(flowRate("filtration_uv"));
  });
});

describe("effectiveness", () => {
  it("electrolysis advanced most effective", () => {
    expect(effectiveness("electrolysis_advanced")).toBeGreaterThan(effectiveness("uv_treatment"));
  });
});

describe("maintenance", () => {
  it("uv treatment lowest maintenance", () => {
    expect(maintenance("uv_treatment")).toBeGreaterThan(maintenance("electrolysis_advanced"));
  });
});

describe("powerConsumption", () => {
  it("chemical injection best power consumption", () => {
    expect(powerConsumption("chemical_injection")).toBeGreaterThan(powerConsumption("electrolysis_advanced"));
  });
});

describe("bwCost", () => {
  it("electrolysis advanced most expensive", () => {
    expect(bwCost("electrolysis_advanced")).toBeGreaterThan(bwCost("chemical_injection"));
  });
});

describe("chemical", () => {
  it("electrochlorination uses chemicals", () => {
    expect(chemical("electrochlorination")).toBe(true);
  });
  it("uv treatment no chemicals", () => {
    expect(chemical("uv_treatment")).toBe(false);
  });
});

describe("forLargeVessel", () => {
  it("electrochlorination for large vessel", () => {
    expect(forLargeVessel("electrochlorination")).toBe(true);
  });
  it("filtration uv not for large vessel", () => {
    expect(forLargeVessel("filtration_uv")).toBe(false);
  });
});

describe("treatment", () => {
  it("electrolysis advanced uses advanced oxidation", () => {
    expect(treatment("electrolysis_advanced")).toBe("advanced_oxidation_electrolysis_hydroxyl_radical_generation");
  });
});

describe("bestUse", () => {
  it("chemical injection for retrofit", () => {
    expect(bestUse("chemical_injection")).toBe("retrofit_existing_vessel_simple_install_chemical_supply");
  });
});

describe("ballastWaterTypes", () => {
  it("returns 5 types", () => {
    expect(ballastWaterTypes()).toHaveLength(5);
  });
});
