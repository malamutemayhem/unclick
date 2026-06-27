import { describe, it, expect } from "vitest";
import {
  processingDays, colorRange, waterResistance,
  flexibility, environmentalImpact, historicalOrigin,
  bestApplication, durabilityYears, costPerHide, tanningMethods,
} from "../leather-tanning-calc.js";

describe("processingDays", () => {
  it("vegetable takes longest", () => {
    expect(processingDays("vegetable")).toBeGreaterThan(
      processingDays("chrome")
    );
  });
});

describe("colorRange", () => {
  it("chrome has widest color range", () => {
    expect(colorRange("chrome")).toBeGreaterThan(
      colorRange("brain")
    );
  });
});

describe("waterResistance", () => {
  it("brain tan is most water resistant", () => {
    expect(waterResistance("brain")).toBeGreaterThan(
      waterResistance("alum")
    );
  });
});

describe("flexibility", () => {
  it("brain tan is most flexible", () => {
    expect(flexibility("brain")).toBeGreaterThan(
      flexibility("vegetable")
    );
  });
});

describe("environmentalImpact", () => {
  it("chrome has highest environmental impact", () => {
    expect(environmentalImpact("chrome")).toBeGreaterThan(
      environmentalImpact("brain")
    );
  });
});

describe("historicalOrigin", () => {
  it("brain tanning is historical", () => {
    expect(historicalOrigin("brain")).toBe(true);
  });
  it("chrome is not", () => {
    expect(historicalOrigin("chrome")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("brain tanning is best for buckskin", () => {
    expect(bestApplication("brain")).toBe("buckskin");
  });
});

describe("durabilityYears", () => {
  it("vegetable tanned lasts longest", () => {
    expect(durabilityYears("vegetable")).toBeGreaterThan(
      durabilityYears("alum")
    );
  });
});

describe("costPerHide", () => {
  it("vegetable costs most", () => {
    expect(costPerHide("vegetable")).toBeGreaterThan(
      costPerHide("brain")
    );
  });
});

describe("tanningMethods", () => {
  it("returns 5 methods", () => {
    expect(tanningMethods()).toHaveLength(5);
  });
});
