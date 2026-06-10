import { describe, it, expect } from "vitest";
import {
  energyDensityWhKg, cycleLife, chargingSpeed,
  safetyRating, costPerKwh, flammable,
  recyclable, primaryApplication, keyElement, batteryChemistries,
} from "../battery-chemistry-calc.js";

describe("energyDensityWhKg", () => {
  it("solid state highest density", () => {
    expect(energyDensityWhKg("solid_state")).toBeGreaterThan(
      energyDensityWhKg("lead_acid")
    );
  });
});

describe("cycleLife", () => {
  it("solid state longest cycle life", () => {
    expect(cycleLife("solid_state")).toBeGreaterThan(
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
  it("solid state safest", () => {
    expect(safetyRating("solid_state")).toBeGreaterThan(
      safetyRating("lithium_ion")
    );
  });
});

describe("costPerKwh", () => {
  it("solid state most expensive", () => {
    expect(costPerKwh("solid_state")).toBeGreaterThan(
      costPerKwh("lead_acid")
    );
  });
});

describe("flammable", () => {
  it("lithium ion is flammable", () => {
    expect(flammable("lithium_ion")).toBe(true);
  });
  it("solid state is not", () => {
    expect(flammable("solid_state")).toBe(false);
  });
});

describe("recyclable", () => {
  it("lead acid is recyclable", () => {
    expect(recyclable("lead_acid")).toBe(true);
  });
});

describe("primaryApplication", () => {
  it("sodium ion for grid storage", () => {
    expect(primaryApplication("sodium_ion")).toBe("grid_storage");
  });
});

describe("keyElement", () => {
  it("lead acid uses lead", () => {
    expect(keyElement("lead_acid")).toBe("lead");
  });
});

describe("batteryChemistries", () => {
  it("returns 5 types", () => {
    expect(batteryChemistries()).toHaveLength(5);
  });
});
