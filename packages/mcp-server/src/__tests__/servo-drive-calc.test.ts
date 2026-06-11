import { describe, it, expect } from "vitest";
import {
  torqueDensity, speed, precision, bandwidth,
  sdCost, brushless, forHighDynamic, motor,
  bestUse, servoDriveTypes,
} from "../servo-drive-calc.js";

describe("torqueDensity", () => {
  it("direct drive torque highest torque density", () => {
    expect(torqueDensity("direct_drive_torque")).toBeGreaterThan(torqueDensity("dc_brush_servo"));
  });
});

describe("speed", () => {
  it("linear motor iron fastest", () => {
    expect(speed("linear_motor_iron")).toBeGreaterThan(speed("piezo_ultrasonic"));
  });
});

describe("precision", () => {
  it("direct drive torque and linear motor best precision", () => {
    expect(precision("direct_drive_torque")).toBeGreaterThan(precision("dc_brush_servo"));
  });
});

describe("bandwidth", () => {
  it("linear motor iron highest bandwidth", () => {
    expect(bandwidth("linear_motor_iron")).toBeGreaterThan(bandwidth("dc_brush_servo"));
  });
});

describe("sdCost", () => {
  it("direct drive torque most expensive", () => {
    expect(sdCost("direct_drive_torque")).toBeGreaterThan(sdCost("dc_brush_servo"));
  });
});

describe("brushless", () => {
  it("ac rotary brushless is brushless", () => {
    expect(brushless("ac_rotary_brushless")).toBe(true);
  });
  it("dc brush servo not brushless", () => {
    expect(brushless("dc_brush_servo")).toBe(false);
  });
});

describe("forHighDynamic", () => {
  it("linear motor for high dynamic", () => {
    expect(forHighDynamic("linear_motor_iron")).toBe(true);
  });
  it("dc brush servo not for high dynamic", () => {
    expect(forHighDynamic("dc_brush_servo")).toBe(false);
  });
});

describe("motor", () => {
  it("piezo uses piezo ceramic stick slip", () => {
    expect(motor("piezo_ultrasonic")).toBe("piezo_ceramic_stick_slip_or_ultrasonic_nanometer");
  });
});

describe("bestUse", () => {
  it("ac rotary for cnc axis", () => {
    expect(bestUse("ac_rotary_brushless")).toBe("cnc_axis_robot_joint_packaging_machine_general");
  });
});

describe("servoDriveTypes", () => {
  it("returns 5 types", () => {
    expect(servoDriveTypes()).toHaveLength(5);
  });
});
