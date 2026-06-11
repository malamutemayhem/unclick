import { describe, it, expect } from "vitest";
import {
  bandwidth, sensitivity, noiseFloor, shockSurvival,
  sensorCost, dcResponse, forVibration, sensingMethod,
  bestUse, accelSensors,
} from "../accel-sensor-calc.js";

describe("bandwidth", () => {
  it("piezoelectric charge widest bandwidth", () => {
    expect(bandwidth("piezoelectric_charge")).toBeGreaterThan(bandwidth("servo_force_balance"));
  });
});

describe("sensitivity", () => {
  it("servo force balance best sensitivity", () => {
    expect(sensitivity("servo_force_balance")).toBeGreaterThan(sensitivity("mems_capacitive"));
  });
});

describe("noiseFloor", () => {
  it("servo force balance lowest noise floor", () => {
    expect(noiseFloor("servo_force_balance")).toBeGreaterThan(noiseFloor("piezoresistive_dc"));
  });
});

describe("shockSurvival", () => {
  it("piezoresistive dc best shock survival", () => {
    expect(shockSurvival("piezoresistive_dc")).toBeGreaterThan(shockSurvival("servo_force_balance"));
  });
});

describe("sensorCost", () => {
  it("servo force balance most expensive", () => {
    expect(sensorCost("servo_force_balance")).toBeGreaterThan(sensorCost("mems_capacitive"));
  });
});

describe("dcResponse", () => {
  it("mems capacitive has dc response", () => {
    expect(dcResponse("mems_capacitive")).toBe(true);
  });
  it("piezoelectric charge no dc response", () => {
    expect(dcResponse("piezoelectric_charge")).toBe(false);
  });
});

describe("forVibration", () => {
  it("piezoelectric charge is for vibration", () => {
    expect(forVibration("piezoelectric_charge")).toBe(true);
  });
  it("mems capacitive not for vibration", () => {
    expect(forVibration("mems_capacitive")).toBe(false);
  });
});

describe("sensingMethod", () => {
  it("servo force balance uses servo feedback coil", () => {
    expect(sensingMethod("servo_force_balance")).toBe("servo_feedback_coil");
  });
});

describe("bestUse", () => {
  it("mems capacitive best for consumer motion detect", () => {
    expect(bestUse("mems_capacitive")).toBe("consumer_motion_detect");
  });
});

describe("accelSensors", () => {
  it("returns 5 types", () => {
    expect(accelSensors()).toHaveLength(5);
  });
});
