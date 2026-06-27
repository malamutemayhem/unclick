import { describe, it, expect } from "vitest";
import {
  removal, compactness, resilience, operability,
  mrCost, membraneRequired, forNutrientRemoval, media,
  bestUse, mbbrReactorTypes,
} from "../mbbr-reactor-calc.js";

describe("removal", () => {
  it("MBR best removal", () => {
    expect(removal("mbr_membrane_bioreactor")).toBeGreaterThan(removal("anaerobic_mbbr_biogas"));
  });
});

describe("compactness", () => {
  it("MBR most compact", () => {
    expect(compactness("mbr_membrane_bioreactor")).toBeGreaterThan(compactness("ifas_integrated_fixed"));
  });
});

describe("resilience", () => {
  it("pure MBBR most resilient", () => {
    expect(resilience("pure_mbbr_aerobic")).toBeGreaterThan(resilience("mbr_membrane_bioreactor"));
  });
});

describe("operability", () => {
  it("pure MBBR easiest to operate", () => {
    expect(operability("pure_mbbr_aerobic")).toBeGreaterThan(operability("mbr_membrane_bioreactor"));
  });
});

describe("mrCost", () => {
  it("MBR most expensive", () => {
    expect(mrCost("mbr_membrane_bioreactor")).toBeGreaterThan(mrCost("pure_mbbr_aerobic"));
  });
});

describe("membraneRequired", () => {
  it("MBR requires membrane", () => {
    expect(membraneRequired("mbr_membrane_bioreactor")).toBe(true);
  });
  it("pure MBBR no membrane", () => {
    expect(membraneRequired("pure_mbbr_aerobic")).toBe(false);
  });
});

describe("forNutrientRemoval", () => {
  it("IFAS for nutrient removal", () => {
    expect(forNutrientRemoval("ifas_integrated_fixed")).toBe(true);
  });
  it("pure MBBR not for nutrient removal", () => {
    expect(forNutrientRemoval("pure_mbbr_aerobic")).toBe(false);
  });
});

describe("media", () => {
  it("anaerobic uses granular biofilm", () => {
    expect(media("anaerobic_mbbr_biogas")).toBe("anaerobic_carrier_granular_biofilm");
  });
});

describe("bestUse", () => {
  it("MBR for reuse quality effluent", () => {
    expect(bestUse("mbr_membrane_bioreactor")).toBe("reuse_quality_effluent_compact");
  });
});

describe("mbbrReactorTypes", () => {
  it("returns 5 types", () => {
    expect(mbbrReactorTypes()).toHaveLength(5);
  });
});
