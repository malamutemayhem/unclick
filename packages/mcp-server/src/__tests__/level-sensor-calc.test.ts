import { describe, it, expect } from "vitest";
import {
  accuracy, range, reliability, versatility,
  lsCost, nonContact, forTank, principle,
  bestUse, levelSensorTypes,
} from "../level-sensor-calc.js";

describe("accuracy", () => {
  it("radar most accurate", () => {
    expect(accuracy("radar_guided_wave")).toBeGreaterThan(accuracy("float_switch_magnetic_reed"));
  });
});

describe("range", () => {
  it("radar longest range", () => {
    expect(range("radar_guided_wave")).toBeGreaterThan(range("float_switch_magnetic_reed"));
  });
});

describe("reliability", () => {
  it("radar most reliable", () => {
    expect(reliability("radar_guided_wave")).toBeGreaterThan(reliability("float_switch_magnetic_reed"));
  });
});

describe("versatility", () => {
  it("radar most versatile", () => {
    expect(versatility("radar_guided_wave")).toBeGreaterThan(versatility("float_switch_magnetic_reed"));
  });
});

describe("lsCost", () => {
  it("radar most expensive", () => {
    expect(lsCost("radar_guided_wave")).toBeGreaterThan(lsCost("float_switch_magnetic_reed"));
  });
});

describe("nonContact", () => {
  it("ultrasonic is non contact", () => {
    expect(nonContact("ultrasonic_non_contact")).toBe(true);
  });
  it("float switch is contact", () => {
    expect(nonContact("float_switch_magnetic_reed")).toBe(false);
  });
});

describe("forTank", () => {
  it("ultrasonic for tank", () => {
    expect(forTank("ultrasonic_non_contact")).toBe(true);
  });
});

describe("principle", () => {
  it("hydrostatic uses submersed diaphragm", () => {
    expect(principle("hydrostatic_pressure_submersible")).toBe("submersed_diaphragm_hydrostatic_head");
  });
});

describe("bestUse", () => {
  it("radar for process vessel", () => {
    expect(bestUse("radar_guided_wave")).toBe("process_vessel_interface_foam_agitate");
  });
});

describe("levelSensorTypes", () => {
  it("returns 5 types", () => {
    expect(levelSensorTypes()).toHaveLength(5);
  });
});
