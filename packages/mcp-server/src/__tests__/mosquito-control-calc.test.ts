import { describe, it, expect } from "vitest";
import {
  populationReduction, durationOfEffect, areaOfCoverage, environmentalSafety,
  operatingCost, requiresLicense, chemicalFree, deliveryMethod,
  bestScenario, mosquitoControls,
} from "../mosquito-control-calc.js";

describe("populationReduction", () => {
  it("adulticide spray highest reduction", () => {
    expect(populationReduction("adulticide_spray")).toBeGreaterThan(populationReduction("mosquito_trap"));
  });
});

describe("durationOfEffect", () => {
  it("biological fish longest effect", () => {
    expect(durationOfEffect("biological_fish")).toBeGreaterThan(durationOfEffect("adulticide_spray"));
  });
});

describe("areaOfCoverage", () => {
  it("adulticide spray widest coverage", () => {
    expect(areaOfCoverage("adulticide_spray")).toBeGreaterThan(areaOfCoverage("mosquito_trap"));
  });
});

describe("environmentalSafety", () => {
  it("biological fish safest for environment", () => {
    expect(environmentalSafety("biological_fish")).toBeGreaterThan(environmentalSafety("adulticide_spray"));
  });
});

describe("operatingCost", () => {
  it("misting system highest operating cost", () => {
    expect(operatingCost("misting_system")).toBeGreaterThan(operatingCost("biological_fish"));
  });
});

describe("requiresLicense", () => {
  it("adulticide spray requires license", () => {
    expect(requiresLicense("adulticide_spray")).toBe(true);
  });
  it("mosquito trap does not", () => {
    expect(requiresLicense("mosquito_trap")).toBe(false);
  });
});

describe("chemicalFree", () => {
  it("mosquito trap is chemical free", () => {
    expect(chemicalFree("mosquito_trap")).toBe(true);
  });
  it("larvicide is not", () => {
    expect(chemicalFree("larvicide")).toBe(false);
  });
});

describe("deliveryMethod", () => {
  it("biological fish uses gambusia pond stocking", () => {
    expect(deliveryMethod("biological_fish")).toBe("gambusia_pond_stocking");
  });
});

describe("bestScenario", () => {
  it("larvicide for standing water breeding site", () => {
    expect(bestScenario("larvicide")).toBe("standing_water_breeding_site");
  });
});

describe("mosquitoControls", () => {
  it("returns 5 control types", () => {
    expect(mosquitoControls()).toHaveLength(5);
  });
});
