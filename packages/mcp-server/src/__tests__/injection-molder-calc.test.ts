import { describe, it, expect } from "vitest";
import {
  shotPrecision, clampForce, cycleSpeed, energyEfficiency,
  imCost, electric, forMedical, molderConfig,
  bestUse, injectionMolderTypes,
} from "../injection-molder-calc.js";

describe("shotPrecision", () => {
  it("electric servo best shot precision", () => {
    expect(shotPrecision("electric_servo")).toBeGreaterThan(shotPrecision("hydraulic_toggle"));
  });
});

describe("clampForce", () => {
  it("hydraulic direct best clamp force", () => {
    expect(clampForce("hydraulic_direct")).toBeGreaterThanOrEqual(clampForce("two_platen"));
  });
});

describe("cycleSpeed", () => {
  it("electric servo fastest cycle", () => {
    expect(cycleSpeed("electric_servo")).toBeGreaterThan(cycleSpeed("hydraulic_direct"));
  });
});

describe("energyEfficiency", () => {
  it("electric servo best energy efficiency", () => {
    expect(energyEfficiency("electric_servo")).toBeGreaterThan(energyEfficiency("hydraulic_toggle"));
  });
});

describe("imCost", () => {
  it("two platen most expensive", () => {
    expect(imCost("two_platen")).toBeGreaterThan(imCost("hydraulic_toggle"));
  });
});

describe("electric", () => {
  it("electric servo is electric", () => {
    expect(electric("electric_servo")).toBe(true);
  });
  it("hydraulic toggle not electric", () => {
    expect(electric("hydraulic_toggle")).toBe(false);
  });
});

describe("forMedical", () => {
  it("electric servo for medical", () => {
    expect(forMedical("electric_servo")).toBe(true);
  });
  it("hydraulic toggle not for medical", () => {
    expect(forMedical("hydraulic_toggle")).toBe(false);
  });
});

describe("molderConfig", () => {
  it("hybrid servo uses electric inject hydraulic clamp", () => {
    expect(molderConfig("hybrid_servo")).toBe("hybrid_servo_injection_molder_electric_inject_hydraulic_clamp");
  });
});

describe("bestUse", () => {
  it("two platen for large mold compact footprint", () => {
    expect(bestUse("two_platen")).toBe("large_mold_two_platen_molder_compact_footprint_automotive_crate");
  });
});

describe("injectionMolderTypes", () => {
  it("returns 5 types", () => {
    expect(injectionMolderTypes()).toHaveLength(5);
  });
});
