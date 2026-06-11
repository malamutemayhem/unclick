import { describe, it, expect } from "vitest";
import {
  torqueDensity, throughput, backlash, ratioRange,
  hdCost, zeroBacklash, forRobot, driveConfig,
  bestUse, harmonicDriveTypes,
} from "../harmonic-drive-calc.js";

describe("torqueDensity", () => {
  it("unit type best torque density", () => {
    expect(torqueDensity("unit_type_hd")).toBeGreaterThan(torqueDensity("pancake_hd"));
  });
});

describe("throughput", () => {
  it("cup type highest throughput", () => {
    expect(throughput("cup_type_hd")).toBeGreaterThan(throughput("pancake_hd"));
  });
});

describe("backlash", () => {
  it("cup type best backlash rating", () => {
    expect(backlash("cup_type_hd")).toBeGreaterThanOrEqual(backlash("hollow_shaft_hd"));
  });
});

describe("ratioRange", () => {
  it("unit type best ratio range", () => {
    expect(ratioRange("unit_type_hd")).toBeGreaterThan(ratioRange("pancake_hd"));
  });
});

describe("hdCost", () => {
  it("pancake most expensive", () => {
    expect(hdCost("pancake_hd")).toBeGreaterThan(hdCost("hat_type_hd"));
  });
});

describe("zeroBacklash", () => {
  it("cup type is zero backlash", () => {
    expect(zeroBacklash("cup_type_hd")).toBe(true);
  });
});

describe("forRobot", () => {
  it("cup type for robot", () => {
    expect(forRobot("cup_type_hd")).toBe(true);
  });
  it("pancake not for robot", () => {
    expect(forRobot("pancake_hd")).toBe(false);
  });
});

describe("driveConfig", () => {
  it("hollow shaft uses through bore cable route wrist", () => {
    expect(driveConfig("hollow_shaft_hd")).toBe("hollow_shaft_harmonic_drive_through_bore_cable_route_wrist");
  });
});

describe("bestUse", () => {
  it("unit type for servo axis integrated bearing direct", () => {
    expect(bestUse("unit_type_hd")).toBe("servo_axis_unit_type_harmonic_drive_integrated_bearing_direct");
  });
});

describe("harmonicDriveTypes", () => {
  it("returns 5 types", () => {
    expect(harmonicDriveTypes()).toHaveLength(5);
  });
});
