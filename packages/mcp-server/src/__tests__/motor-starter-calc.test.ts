import { describe, it, expect } from "vitest";
import {
  startingTorque, inrushCurrent, smoothness, controlRange,
  msCost, electronic, forLargeMotor, method,
  bestUse, motorStarterTypes,
} from "../motor-starter-calc.js";

describe("startingTorque", () => {
  it("dol highest starting torque", () => {
    expect(startingTorque("dol_direct_online")).toBeGreaterThanOrEqual(startingTorque("rotor_resistance_slip"));
  });
});

describe("inrushCurrent", () => {
  it("soft starter best inrush current control", () => {
    expect(inrushCurrent("soft_starter_thyristor")).toBeGreaterThan(inrushCurrent("dol_direct_online"));
  });
});

describe("smoothness", () => {
  it("soft starter smoothest", () => {
    expect(smoothness("soft_starter_thyristor")).toBeGreaterThan(smoothness("dol_direct_online"));
  });
});

describe("controlRange", () => {
  it("soft starter widest control range", () => {
    expect(controlRange("soft_starter_thyristor")).toBeGreaterThan(controlRange("star_delta_reduced"));
  });
});

describe("msCost", () => {
  it("soft starter most expensive", () => {
    expect(msCost("soft_starter_thyristor")).toBeGreaterThan(msCost("dol_direct_online"));
  });
});

describe("electronic", () => {
  it("soft starter is electronic", () => {
    expect(electronic("soft_starter_thyristor")).toBe(true);
  });
  it("star delta not electronic", () => {
    expect(electronic("star_delta_reduced")).toBe(false);
  });
});

describe("forLargeMotor", () => {
  it("star delta for large motor", () => {
    expect(forLargeMotor("star_delta_reduced")).toBe(true);
  });
  it("dol not for large motor", () => {
    expect(forLargeMotor("dol_direct_online")).toBe(false);
  });
});

describe("method", () => {
  it("rotor resistance uses wound rotor slip ring", () => {
    expect(method("rotor_resistance_slip")).toBe("wound_rotor_external_resistance_slip_ring");
  });
});

describe("bestUse", () => {
  it("dol for small motor simple start", () => {
    expect(bestUse("dol_direct_online")).toBe("small_motor_pump_fan_below_7kw_simple_start");
  });
});

describe("motorStarterTypes", () => {
  it("returns 5 types", () => {
    expect(motorStarterTypes()).toHaveLength(5);
  });
});
