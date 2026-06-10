import { describe, it, expect } from "vitest";
import {
  energyDensityWhPerKg, cycleLife, chargingSpeed,
  safetyRating, costPerKwh, recyclable,
  liquidElectrolyte, bestApplication, selfDischargePerMonth, batteryTypes,
} from "../battery-type-calc.js";

describe("energyDensityWhPerKg", () => {
  it("solid state has highest density", () => {
    expect(energyDensityWhPerKg("solid_state")).toBeGreaterThan(
      energyDensityWhPerKg("lead_acid")
    );
  });
});

describe("cycleLife", () => {
  it("flow has longest cycle life", () => {
    expect(cycleLife("flow")).toBeGreaterThan(
      cycleLife("lead_acid")
    );
  });
});

describe("chargingSpeed", () => {
  it("solid state charges fastest", () => {
    expect(chargingSpeed("solid_state")).toBeGreaterThan(
      chargingSpeed("lead_acid")
    );
  });
});

describe("safetyRating", () => {
  it("solid state is safest", () => {
    expect(safetyRating("solid_state")).toBeGreaterThan(
      safetyRating("lithium_ion")
    );
  });
});

describe("costPerKwh", () => {
  it("lead acid costs least", () => {
    expect(costPerKwh("lead_acid")).toBeLessThan(
      costPerKwh("solid_state")
    );
  });
});

describe("recyclable", () => {
  it("all are recyclable", () => {
    expect(recyclable("lithium_ion")).toBe(true);
    expect(recyclable("lead_acid")).toBe(true);
  });
});

describe("liquidElectrolyte", () => {
  it("lithium ion has liquid electrolyte", () => {
    expect(liquidElectrolyte("lithium_ion")).toBe(true);
  });
  it("solid state does not", () => {
    expect(liquidElectrolyte("solid_state")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("flow for grid storage", () => {
    expect(bestApplication("flow")).toBe("grid_storage");
  });
});

describe("selfDischargePerMonth", () => {
  it("flow has no self discharge", () => {
    expect(selfDischargePerMonth("flow")).toBe(0);
  });
});

describe("batteryTypes", () => {
  it("returns 5 types", () => {
    expect(batteryTypes()).toHaveLength(5);
  });
});
