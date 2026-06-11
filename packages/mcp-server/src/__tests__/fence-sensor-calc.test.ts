import { describe, it, expect } from "vitest";
import {
  sensitivity, falseAlarm, coverage, durability,
  fsCost, covert, forHighSecurity, sensing,
  bestUse, fenceSensorTypes,
} from "../fence-sensor-calc.js";

describe("sensitivity", () => {
  it("taut wire most sensitive", () => {
    expect(sensitivity("taut_wire_tension")).toBeGreaterThan(sensitivity("vibration_accelerometer"));
  });
});

describe("falseAlarm", () => {
  it("taut wire fewest false alarms", () => {
    expect(falseAlarm("taut_wire_tension")).toBeGreaterThan(falseAlarm("vibration_accelerometer"));
  });
});

describe("coverage", () => {
  it("fiber optic widest coverage", () => {
    expect(coverage("fiber_optic_distributed")).toBeGreaterThan(coverage("vibration_accelerometer"));
  });
});

describe("durability", () => {
  it("taut wire most durable", () => {
    expect(durability("taut_wire_tension")).toBeGreaterThan(durability("electric_field_capacitive"));
  });
});

describe("fsCost", () => {
  it("fiber optic most expensive", () => {
    expect(fsCost("fiber_optic_distributed")).toBeGreaterThan(fsCost("vibration_accelerometer"));
  });
});

describe("covert", () => {
  it("vibration is covert", () => {
    expect(covert("vibration_accelerometer")).toBe(true);
  });
  it("taut wire not covert", () => {
    expect(covert("taut_wire_tension")).toBe(false);
  });
});

describe("forHighSecurity", () => {
  it("taut wire for high security", () => {
    expect(forHighSecurity("taut_wire_tension")).toBe(true);
  });
  it("vibration not high security", () => {
    expect(forHighSecurity("vibration_accelerometer")).toBe(false);
  });
});

describe("sensing", () => {
  it("fiber optic uses distributed acoustic", () => {
    expect(sensing("fiber_optic_distributed")).toBe("distributed_acoustic_fiber");
  });
});

describe("bestUse", () => {
  it("taut wire for prison military", () => {
    expect(bestUse("taut_wire_tension")).toBe("prison_military_high_security");
  });
});

describe("fenceSensorTypes", () => {
  it("returns 5 types", () => {
    expect(fenceSensorTypes()).toHaveLength(5);
  });
});
