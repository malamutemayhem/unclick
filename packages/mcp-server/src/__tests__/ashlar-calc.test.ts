import { describe, it, expect } from "vitest";
import {
  compressiveStrengthMpa, densityKgPerM3, waterAbsorptionPercent, bedJointMm,
  coursHeightCm, blocksPerM2, cuttingTimeMinPerBlock, weatheringResistance,
  costPerM3, stoneTypes,
} from "../ashlar-calc.js";

describe("compressiveStrengthMpa", () => {
  it("granite is strongest", () => {
    expect(compressiveStrengthMpa("granite")).toBeGreaterThan(
      compressiveStrengthMpa("sandstone")
    );
  });
});

describe("densityKgPerM3", () => {
  it("slate is densest", () => {
    expect(densityKgPerM3("slate")).toBeGreaterThanOrEqual(
      densityKgPerM3("granite")
    );
  });
});

describe("waterAbsorptionPercent", () => {
  it("slate absorbs least water", () => {
    expect(waterAbsorptionPercent("slate")).toBeLessThan(
      waterAbsorptionPercent("sandstone")
    );
  });
});

describe("bedJointMm", () => {
  it("returns 10", () => {
    expect(bedJointMm()).toBe(10);
  });
});

describe("coursHeightCm", () => {
  it("adds joint to block height", () => {
    expect(coursHeightCm(20, 10)).toBe(21);
  });
});

describe("blocksPerM2", () => {
  it("smaller blocks = more per m2", () => {
    expect(blocksPerM2(20, 10)).toBeGreaterThan(blocksPerM2(40, 20));
  });
  it("zero dimensions returns 0", () => {
    expect(blocksPerM2(0, 10)).toBe(0);
  });
});

describe("cuttingTimeMinPerBlock", () => {
  it("granite takes longest", () => {
    expect(cuttingTimeMinPerBlock("granite")).toBeGreaterThan(
      cuttingTimeMinPerBlock("sandstone")
    );
  });
});

describe("weatheringResistance", () => {
  it("granite has best resistance", () => {
    expect(weatheringResistance("granite")).toBeGreaterThan(
      weatheringResistance("limestone")
    );
  });
});

describe("costPerM3", () => {
  it("marble is most expensive", () => {
    expect(costPerM3("marble")).toBeGreaterThan(costPerM3("sandstone"));
  });
});

describe("stoneTypes", () => {
  it("returns 5 types", () => {
    expect(stoneTypes()).toHaveLength(5);
  });
});
