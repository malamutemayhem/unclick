import { describe, it, expect } from "vitest";
import {
  drumCapacityM, pullForceKn, lineSpeedMps, brakeTorqueNm,
  gearRatio, ropeLayerCount, fairleadAngle, dutyCyclePercent,
  motorSizeKw, maintenanceIntervalHours, winchDrives,
} from "../winch-calc.js";

describe("drumCapacityM", () => {
  it("positive capacity", () => {
    expect(drumCapacityM(30, 20, 10)).toBeGreaterThan(0);
  });
  it("zero rope = 0", () => {
    expect(drumCapacityM(30, 20, 0)).toBe(0);
  });
});

describe("pullForceKn", () => {
  it("positive force", () => {
    expect(pullForceKn(5, 15, 60)).toBeGreaterThan(0);
  });
  it("zero rpm = 0", () => {
    expect(pullForceKn(5, 15, 0)).toBe(0);
  });
});

describe("lineSpeedMps", () => {
  it("positive speed", () => {
    expect(lineSpeedMps(30, 60)).toBeGreaterThan(0);
  });
});

describe("brakeTorqueNm", () => {
  it("positive torque", () => {
    expect(brakeTorqueNm(500, 15, 1.5)).toBeGreaterThan(0);
  });
});

describe("gearRatio", () => {
  it("positive ratio", () => {
    expect(gearRatio(1500, 30)).toBe(50);
  });
  it("zero output = 0", () => {
    expect(gearRatio(1500, 0)).toBe(0);
  });
});

describe("ropeLayerCount", () => {
  it("positive layers", () => {
    expect(ropeLayerCount(20, 10)).toBe(20);
  });
  it("zero rope = 0", () => {
    expect(ropeLayerCount(20, 0)).toBe(0);
  });
});

describe("fairleadAngle", () => {
  it("positive angle", () => {
    expect(fairleadAngle(1, 10)).toBeGreaterThan(0);
  });
  it("zero distance = 0", () => {
    expect(fairleadAngle(1, 0)).toBe(0);
  });
});

describe("dutyCyclePercent", () => {
  it("correct percent", () => {
    expect(dutyCyclePercent(3, 10)).toBe(30);
  });
  it("zero cycle = 0", () => {
    expect(dutyCyclePercent(3, 0)).toBe(0);
  });
});

describe("motorSizeKw", () => {
  it("positive kw", () => {
    expect(motorSizeKw(1000, 0.5, 0.85)).toBeGreaterThan(0);
  });
  it("zero efficiency = 0", () => {
    expect(motorSizeKw(1000, 0.5, 0)).toBe(0);
  });
});

describe("maintenanceIntervalHours", () => {
  it("manual longest", () => {
    expect(maintenanceIntervalHours("manual")).toBeGreaterThan(maintenanceIntervalHours("electric"));
  });
});

describe("winchDrives", () => {
  it("returns 5 drives", () => {
    expect(winchDrives()).toHaveLength(5);
  });
});
