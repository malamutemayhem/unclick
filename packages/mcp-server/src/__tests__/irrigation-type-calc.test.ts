import { describe, it, expect } from "vitest";
import {
  waterEfficiencyPercent, setupCostPerHectare, maintenanceLevel,
  uniformity, evaporationLoss, pressureRequired,
  slopeCompatible, bestCropType, lifespanYears, irrigationTypes,
} from "../irrigation-type-calc.js";

describe("waterEfficiencyPercent", () => {
  it("drip is most efficient", () => {
    expect(waterEfficiencyPercent("drip")).toBeGreaterThan(
      waterEfficiencyPercent("flood")
    );
  });
});

describe("setupCostPerHectare", () => {
  it("drip costs most to set up", () => {
    expect(setupCostPerHectare("drip")).toBeGreaterThan(
      setupCostPerHectare("furrow")
    );
  });
});

describe("maintenanceLevel", () => {
  it("drip needs most maintenance", () => {
    expect(maintenanceLevel("drip")).toBeGreaterThan(
      maintenanceLevel("olla")
    );
  });
});

describe("uniformity", () => {
  it("drip is most uniform", () => {
    expect(uniformity("drip")).toBeGreaterThan(
      uniformity("flood")
    );
  });
});

describe("evaporationLoss", () => {
  it("flood loses most to evaporation", () => {
    expect(evaporationLoss("flood")).toBeGreaterThan(
      evaporationLoss("drip")
    );
  });
});

describe("pressureRequired", () => {
  it("drip requires pressure", () => {
    expect(pressureRequired("drip")).toBe(true);
  });
  it("flood does not", () => {
    expect(pressureRequired("flood")).toBe(false);
  });
});

describe("slopeCompatible", () => {
  it("drip works on slopes", () => {
    expect(slopeCompatible("drip")).toBe(true);
  });
  it("flood does not", () => {
    expect(slopeCompatible("flood")).toBe(false);
  });
});

describe("bestCropType", () => {
  it("flood best for rice", () => {
    expect(bestCropType("flood")).toBe("rice");
  });
});

describe("lifespanYears", () => {
  it("flood lasts longest", () => {
    expect(lifespanYears("flood")).toBeGreaterThan(
      lifespanYears("drip")
    );
  });
});

describe("irrigationTypes", () => {
  it("returns 5 types", () => {
    expect(irrigationTypes()).toHaveLength(5);
  });
});
