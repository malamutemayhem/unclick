import { describe, it, expect } from "vitest";
import {
  force, speed, precision, stroke,
  laCost, directDrive, forCleanroom, mechanism,
  bestUse, linearActuatorTypes,
} from "../linear-actuator-calc.js";

describe("force", () => {
  it("rack pinion highest force", () => {
    expect(force("rack_pinion_heavy")).toBeGreaterThan(force("piezo_nano_position"));
  });
});

describe("speed", () => {
  it("belt drive and linear motor fastest", () => {
    expect(speed("belt_drive_long_travel")).toBeGreaterThan(speed("ball_screw_servo"));
  });
});

describe("precision", () => {
  it("linear motor and piezo most precise", () => {
    expect(precision("linear_motor_direct")).toBeGreaterThan(precision("belt_drive_long_travel"));
  });
});

describe("stroke", () => {
  it("belt drive longest stroke", () => {
    expect(stroke("belt_drive_long_travel")).toBeGreaterThan(stroke("piezo_nano_position"));
  });
});

describe("laCost", () => {
  it("linear motor most expensive", () => {
    expect(laCost("linear_motor_direct")).toBeGreaterThan(laCost("belt_drive_long_travel"));
  });
});

describe("directDrive", () => {
  it("linear motor is direct drive", () => {
    expect(directDrive("linear_motor_direct")).toBe(true);
  });
  it("ball screw not direct drive", () => {
    expect(directDrive("ball_screw_servo")).toBe(false);
  });
});

describe("forCleanroom", () => {
  it("piezo for cleanroom", () => {
    expect(forCleanroom("piezo_nano_position")).toBe(true);
  });
  it("rack pinion not for cleanroom", () => {
    expect(forCleanroom("rack_pinion_heavy")).toBe(false);
  });
});

describe("mechanism", () => {
  it("belt drive uses timing belt guide", () => {
    expect(mechanism("belt_drive_long_travel")).toBe("timing_belt_profile_rail_guide");
  });
});

describe("bestUse", () => {
  it("piezo for optics nano align", () => {
    expect(bestUse("piezo_nano_position")).toBe("optics_microscopy_nano_align");
  });
});

describe("linearActuatorTypes", () => {
  it("returns 5 types", () => {
    expect(linearActuatorTypes()).toHaveLength(5);
  });
});
