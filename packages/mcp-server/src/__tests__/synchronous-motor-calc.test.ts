import { describe, it, expect } from "vitest";
import {
  efficiency, powerFactor, torqueDensity, speedAccuracy,
  smCost, brushless, forPrecision, excitation,
  bestUse, synchronousMotorTypes,
} from "../synchronous-motor-calc.js";

describe("efficiency", () => {
  it("permanent magnet most efficient", () => {
    expect(efficiency("permanent_magnet_pm")).toBeGreaterThan(efficiency("hysteresis_precision"));
  });
});

describe("powerFactor", () => {
  it("wound field best power factor", () => {
    expect(powerFactor("wound_field_large")).toBeGreaterThan(powerFactor("reluctance_sr"));
  });
});

describe("torqueDensity", () => {
  it("permanent magnet highest torque density", () => {
    expect(torqueDensity("permanent_magnet_pm")).toBeGreaterThan(torqueDensity("reluctance_sr"));
  });
});

describe("speedAccuracy", () => {
  it("permanent magnet best speed accuracy", () => {
    expect(speedAccuracy("permanent_magnet_pm")).toBeGreaterThanOrEqual(speedAccuracy("hysteresis_precision"));
  });
});

describe("smCost", () => {
  it("permanent magnet most expensive", () => {
    expect(smCost("permanent_magnet_pm")).toBeGreaterThan(smCost("reluctance_sr"));
  });
});

describe("brushless", () => {
  it("permanent magnet is brushless", () => {
    expect(brushless("permanent_magnet_pm")).toBe(true);
  });
  it("wound field not brushless", () => {
    expect(brushless("wound_field_large")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("hysteresis for precision", () => {
    expect(forPrecision("hysteresis_precision")).toBe(true);
  });
  it("reluctance not for precision", () => {
    expect(forPrecision("reluctance_sr")).toBe(false);
  });
});

describe("excitation", () => {
  it("reluctance uses salient pole", () => {
    expect(excitation("reluctance_sr")).toBe("salient_pole_reluctance_no_magnet_no_winding");
  });
});

describe("bestUse", () => {
  it("permanent magnet for ev drive", () => {
    expect(bestUse("permanent_magnet_pm")).toBe("ev_drive_robot_servo_high_efficiency_compact");
  });
});

describe("synchronousMotorTypes", () => {
  it("returns 5 types", () => {
    expect(synchronousMotorTypes()).toHaveLength(5);
  });
});
