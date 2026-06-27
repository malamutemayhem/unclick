import { describe, it, expect } from "vitest";
import {
  force, precision, speed, efficiency,
  eaCost, modulating, forValve, drive,
  bestUse, electricActuatorTypes,
} from "../electric-actuator-calc.js";

describe("force", () => {
  it("multi turn highest force", () => {
    expect(force("multi_turn_modulating")).toBeGreaterThan(force("linear_lead_screw"));
  });
});

describe("precision", () => {
  it("linear ball screw most precise", () => {
    expect(precision("linear_ball_screw")).toBeGreaterThan(precision("linear_lead_screw"));
  });
});

describe("speed", () => {
  it("rotary servo fastest", () => {
    expect(speed("rotary_servo_quarter")).toBeGreaterThan(speed("multi_turn_modulating"));
  });
});

describe("efficiency", () => {
  it("linear ball screw most efficient", () => {
    expect(efficiency("linear_ball_screw")).toBeGreaterThan(efficiency("linear_lead_screw"));
  });
});

describe("eaCost", () => {
  it("servo hydraulic replacement most expensive among mid", () => {
    expect(eaCost("rotary_servo_quarter")).toBeGreaterThan(eaCost("linear_lead_screw"));
  });
});

describe("modulating", () => {
  it("linear ball screw is modulating", () => {
    expect(modulating("linear_ball_screw")).toBe(true);
  });
  it("electric cylinder rod not modulating", () => {
    expect(modulating("electric_cylinder_rod")).toBe(false);
  });
});

describe("forValve", () => {
  it("multi turn for valve", () => {
    expect(forValve("multi_turn_modulating")).toBe(true);
  });
  it("linear ball screw not for valve", () => {
    expect(forValve("linear_ball_screw")).toBe(false);
  });
});

describe("drive", () => {
  it("rotary servo uses brushless harmonic", () => {
    expect(drive("rotary_servo_quarter")).toBe("brushless_servo_harmonic_gear");
  });
});

describe("bestUse", () => {
  it("lead screw for gate damper", () => {
    expect(bestUse("linear_lead_screw")).toBe("gate_damper_simple_linear_travel");
  });
});

describe("electricActuatorTypes", () => {
  it("returns 5 types", () => {
    expect(electricActuatorTypes()).toHaveLength(5);
  });
});
