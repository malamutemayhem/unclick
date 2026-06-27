import { describe, it, expect } from "vitest";
import {
  coolingEfficiency, globalWarmingPotential, operatingPressure, systemCost,
  chargeRequired, flammable, naturalRefrigerant, chemicalClass,
  primaryApplication, refrigerantTypes,
} from "../refrigerant-type-calc.js";

describe("coolingEfficiency", () => {
  it("r32 most efficient", () => {
    expect(coolingEfficiency("r32")).toBeGreaterThan(coolingEfficiency("r744"));
  });
});

describe("globalWarmingPotential", () => {
  it("r410a highest gwp", () => {
    expect(globalWarmingPotential("r410a")).toBeGreaterThan(globalWarmingPotential("r290"));
  });
});

describe("operatingPressure", () => {
  it("r744 highest pressure", () => {
    expect(operatingPressure("r744")).toBeGreaterThan(operatingPressure("r134a"));
  });
});

describe("systemCost", () => {
  it("r744 most expensive system", () => {
    expect(systemCost("r744")).toBeGreaterThan(systemCost("r134a"));
  });
});

describe("chargeRequired", () => {
  it("r744 largest charge", () => {
    expect(chargeRequired("r744")).toBeGreaterThan(chargeRequired("r290"));
  });
});

describe("flammable", () => {
  it("r290 is flammable", () => {
    expect(flammable("r290")).toBe(true);
  });
  it("r410a is not", () => {
    expect(flammable("r410a")).toBe(false);
  });
});

describe("naturalRefrigerant", () => {
  it("r744 is natural", () => {
    expect(naturalRefrigerant("r744")).toBe(true);
  });
  it("r410a is not", () => {
    expect(naturalRefrigerant("r410a")).toBe(false);
  });
});

describe("chemicalClass", () => {
  it("r290 is hydrocarbon propane", () => {
    expect(chemicalClass("r290")).toBe("hydrocarbon_propane");
  });
});

describe("primaryApplication", () => {
  it("r134a for automotive ac", () => {
    expect(primaryApplication("r134a")).toBe("automotive_ac");
  });
});

describe("refrigerantTypes", () => {
  it("returns 5 types", () => {
    expect(refrigerantTypes()).toHaveLength(5);
  });
});
