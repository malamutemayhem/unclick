import { describe, it, expect } from "vitest";
import {
  flow, pressure, viscosity, pulsation,
  gpCost, sealless, forViscous, drive,
  bestUse, gearPumpTypes,
} from "../gear-pump-calc.js";

describe("flow", () => {
  it("internal highest flow", () => {
    expect(flow("internal_crescent_seal")).toBeGreaterThan(flow("mag_drive_sealless"));
  });
});

describe("pressure", () => {
  it("high pressure highest", () => {
    expect(pressure("high_pressure_precision")).toBeGreaterThan(pressure("external_spur_gear"));
  });
});

describe("viscosity", () => {
  it("internal best viscosity", () => {
    expect(viscosity("internal_crescent_seal")).toBeGreaterThan(viscosity("mag_drive_sealless"));
  });
});

describe("pulsation", () => {
  it("helical lowest pulsation", () => {
    expect(pulsation("helical_low_pulsation")).toBeGreaterThan(pulsation("external_spur_gear"));
  });
});

describe("gpCost", () => {
  it("high pressure most expensive", () => {
    expect(gpCost("high_pressure_precision")).toBeGreaterThan(gpCost("external_spur_gear"));
  });
});

describe("sealless", () => {
  it("mag drive is sealless", () => {
    expect(sealless("mag_drive_sealless")).toBe(true);
  });
  it("external not sealless", () => {
    expect(sealless("external_spur_gear")).toBe(false);
  });
});

describe("forViscous", () => {
  it("internal for viscous", () => {
    expect(forViscous("internal_crescent_seal")).toBe(true);
  });
  it("mag drive not viscous", () => {
    expect(forViscous("mag_drive_sealless")).toBe(false);
  });
});

describe("drive", () => {
  it("mag drive uses magnetic coupling", () => {
    expect(drive("mag_drive_sealless")).toBe("magnetic_coupling_zero_leak");
  });
});

describe("bestUse", () => {
  it("internal for food grade", () => {
    expect(bestUse("internal_crescent_seal")).toBe("food_grade_chocolate_asphalt");
  });
});

describe("gearPumpTypes", () => {
  it("returns 5 types", () => {
    expect(gearPumpTypes()).toHaveLength(5);
  });
});
