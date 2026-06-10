import { describe, it, expect } from "vitest";
import {
  compressiveStrengthMpa, densityKgPerM3, waterAbsorptionPercent,
  workability, frostResistance, polishable,
  bestApplication, lifespanYears, costPerM3, stoneTypes,
} from "../stone-masonry-calc.js";

describe("compressiveStrengthMpa", () => {
  it("granite is strongest", () => {
    expect(compressiveStrengthMpa("granite")).toBeGreaterThan(
      compressiveStrengthMpa("sandstone")
    );
  });
});

describe("densityKgPerM3", () => {
  it("slate is densest", () => {
    expect(densityKgPerM3("slate")).toBeGreaterThan(
      densityKgPerM3("sandstone")
    );
  });
});

describe("waterAbsorptionPercent", () => {
  it("sandstone absorbs most water", () => {
    expect(waterAbsorptionPercent("sandstone")).toBeGreaterThan(
      waterAbsorptionPercent("granite")
    );
  });
});

describe("workability", () => {
  it("sandstone is most workable", () => {
    expect(workability("sandstone")).toBeGreaterThan(
      workability("granite")
    );
  });
});

describe("frostResistance", () => {
  it("granite resists frost best", () => {
    expect(frostResistance("granite")).toBeGreaterThan(
      frostResistance("sandstone")
    );
  });
});

describe("polishable", () => {
  it("marble is polishable", () => {
    expect(polishable("marble")).toBe(true);
  });
  it("sandstone is not polishable", () => {
    expect(polishable("sandstone")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("slate best for roofing", () => {
    expect(bestApplication("slate")).toBe("roofing");
  });
});

describe("lifespanYears", () => {
  it("granite lasts longest", () => {
    expect(lifespanYears("granite")).toBeGreaterThan(
      lifespanYears("sandstone")
    );
  });
});

describe("costPerM3", () => {
  it("marble costs most", () => {
    expect(costPerM3("marble")).toBeGreaterThan(
      costPerM3("sandstone")
    );
  });
});

describe("stoneTypes", () => {
  it("returns 5 types", () => {
    expect(stoneTypes()).toHaveLength(5);
  });
});
