import { describe, it, expect } from "vitest";
import {
  forceCapacity, accuracy, speedRange, versatility,
  ttCost, fatigueTesting, forMetals, drive,
  bestUse, tensileTesterTypes,
} from "../tensile-tester-calc.js";

describe("forceCapacity", () => {
  it("servohydraulic fatigue highest force capacity", () => {
    expect(forceCapacity("servohydraulic_fatigue")).toBeGreaterThan(forceCapacity("micro_tensile_thin_film"));
  });
});

describe("accuracy", () => {
  it("micro tensile thin film best accuracy", () => {
    expect(accuracy("micro_tensile_thin_film")).toBeGreaterThan(accuracy("horizontal_wire_cable"));
  });
});

describe("speedRange", () => {
  it("servohydraulic fatigue widest speed range", () => {
    expect(speedRange("servohydraulic_fatigue")).toBeGreaterThan(speedRange("micro_tensile_thin_film"));
  });
});

describe("versatility", () => {
  it("universal dual column most versatile", () => {
    expect(versatility("universal_dual_column")).toBeGreaterThan(versatility("micro_tensile_thin_film"));
  });
});

describe("ttCost", () => {
  it("servohydraulic fatigue most expensive", () => {
    expect(ttCost("servohydraulic_fatigue")).toBeGreaterThan(ttCost("horizontal_wire_cable"));
  });
});

describe("fatigueTesting", () => {
  it("servohydraulic fatigue has fatigue testing", () => {
    expect(fatigueTesting("servohydraulic_fatigue")).toBe(true);
  });
  it("electromechanical screw no fatigue testing", () => {
    expect(fatigueTesting("electromechanical_screw")).toBe(false);
  });
});

describe("forMetals", () => {
  it("universal dual column for metals", () => {
    expect(forMetals("universal_dual_column")).toBe(true);
  });
  it("micro tensile thin film not for metals", () => {
    expect(forMetals("micro_tensile_thin_film")).toBe(false);
  });
});

describe("drive", () => {
  it("servohydraulic uses hydraulic actuator", () => {
    expect(drive("servohydraulic_fatigue")).toBe("hydraulic_actuator_servo_valve_dynamic_cycling");
  });
});

describe("bestUse", () => {
  it("universal dual column for qc lab general", () => {
    expect(bestUse("universal_dual_column")).toBe("qc_lab_general_tension_compression_bend_shear_test");
  });
});

describe("tensileTesterTypes", () => {
  it("returns 5 types", () => {
    expect(tensileTesterTypes()).toHaveLength(5);
  });
});
