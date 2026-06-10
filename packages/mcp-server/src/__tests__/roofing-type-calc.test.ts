import { describe, it, expect } from "vitest";
import {
  lifespanYears, windResistanceMph, insulationValue,
  maintenanceFrequency, weightPerSqFtLbs, fireResistant,
  sustainable, bestClimate, costPerSqFt, roofingTypes,
} from "../roofing-type-calc.js";

describe("lifespanYears", () => {
  it("slate lasts longest", () => {
    expect(lifespanYears("slate")).toBeGreaterThan(
      lifespanYears("asphalt_shingle")
    );
  });
});

describe("windResistanceMph", () => {
  it("metal standing seam resists most wind", () => {
    expect(windResistanceMph("metal_standing_seam")).toBeGreaterThan(
      windResistanceMph("green_roof")
    );
  });
});

describe("insulationValue", () => {
  it("green roof insulates best", () => {
    expect(insulationValue("green_roof")).toBeGreaterThan(
      insulationValue("metal_standing_seam")
    );
  });
});

describe("maintenanceFrequency", () => {
  it("green roof needs most maintenance", () => {
    expect(maintenanceFrequency("green_roof")).toBeGreaterThan(
      maintenanceFrequency("slate")
    );
  });
});

describe("weightPerSqFtLbs", () => {
  it("green roof is heaviest", () => {
    expect(weightPerSqFtLbs("green_roof")).toBeGreaterThan(
      weightPerSqFtLbs("metal_standing_seam")
    );
  });
});

describe("fireResistant", () => {
  it("slate is fire resistant", () => {
    expect(fireResistant("slate")).toBe(true);
  });
  it("green roof is not", () => {
    expect(fireResistant("green_roof")).toBe(false);
  });
});

describe("sustainable", () => {
  it("green roof is sustainable", () => {
    expect(sustainable("green_roof")).toBe(true);
  });
  it("asphalt shingle is not", () => {
    expect(sustainable("asphalt_shingle")).toBe(false);
  });
});

describe("bestClimate", () => {
  it("clay tile for mediterranean", () => {
    expect(bestClimate("clay_tile")).toBe("mediterranean");
  });
});

describe("costPerSqFt", () => {
  it("green roof costs most", () => {
    expect(costPerSqFt("green_roof")).toBeGreaterThan(
      costPerSqFt("asphalt_shingle")
    );
  });
});

describe("roofingTypes", () => {
  it("returns 5 types", () => {
    expect(roofingTypes()).toHaveLength(5);
  });
});
