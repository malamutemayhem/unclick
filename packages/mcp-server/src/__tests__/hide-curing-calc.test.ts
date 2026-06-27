import { describe, it, expect } from "vitest";
import {
  processingDays, flexibilityResult, waterResistance,
  durabilityRating, odorLevel, chemicalFree,
  washable, bestHideType, costPerHide, hideCuringMethods,
} from "../hide-curing-calc.js";

describe("processingDays", () => {
  it("salt cure takes longest", () => {
    expect(processingDays("salt_cure")).toBeGreaterThan(
      processingDays("smoke_cure")
    );
  });
});

describe("flexibilityResult", () => {
  it("brain tan is most flexible", () => {
    expect(flexibilityResult("brain_tan")).toBeGreaterThan(
      flexibilityResult("air_dry")
    );
  });
});

describe("waterResistance", () => {
  it("smoke cure is most water resistant", () => {
    expect(waterResistance("smoke_cure")).toBeGreaterThan(
      waterResistance("air_dry")
    );
  });
});

describe("durabilityRating", () => {
  it("alum taw is most durable", () => {
    expect(durabilityRating("alum_taw")).toBeGreaterThan(
      durabilityRating("air_dry")
    );
  });
});

describe("odorLevel", () => {
  it("brain tan is smelliest", () => {
    expect(odorLevel("brain_tan")).toBeGreaterThan(
      odorLevel("alum_taw")
    );
  });
});

describe("chemicalFree", () => {
  it("brain tan is chemical free", () => {
    expect(chemicalFree("brain_tan")).toBe(true);
  });
  it("alum taw is not", () => {
    expect(chemicalFree("alum_taw")).toBe(false);
  });
});

describe("washable", () => {
  it("smoke cure is washable", () => {
    expect(washable("smoke_cure")).toBe(true);
  });
  it("salt cure is not", () => {
    expect(washable("salt_cure")).toBe(false);
  });
});

describe("bestHideType", () => {
  it("brain tan best for buckskin", () => {
    expect(bestHideType("brain_tan")).toBe("buckskin");
  });
});

describe("costPerHide", () => {
  it("alum taw costs most", () => {
    expect(costPerHide("alum_taw")).toBeGreaterThan(
      costPerHide("air_dry")
    );
  });
});

describe("hideCuringMethods", () => {
  it("returns 5 methods", () => {
    expect(hideCuringMethods()).toHaveLength(5);
  });
});
