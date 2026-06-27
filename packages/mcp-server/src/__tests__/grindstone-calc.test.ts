import { describe, it, expect } from "vitest";
import {
  wheelDiameterCm, surfaceSpeedMps, gritSize, wearRateMmPerHour,
  waterFlowLpm, dressingInterval, sparkAngle, lifespanHours,
  troughVolumeLiters, pedalForceN, abrasiveGrits,
} from "../grindstone-calc.js";

describe("wheelDiameterCm", () => {
  it("grinding largest", () => {
    expect(wheelDiameterCm("grinding")).toBeGreaterThan(wheelDiameterCm("polishing"));
  });
});

describe("surfaceSpeedMps", () => {
  it("positive speed", () => {
    expect(surfaceSpeedMps(30, 1000)).toBeGreaterThan(0);
  });
});

describe("gritSize", () => {
  it("polishing finest", () => {
    expect(gritSize("polishing")).toBeGreaterThan(gritSize("coarse"));
  });
});

describe("wearRateMmPerHour", () => {
  it("coarse wears fastest", () => {
    expect(wearRateMmPerHour("coarse", 1)).toBeGreaterThan(wearRateMmPerHour("polishing", 1));
  });
});

describe("waterFlowLpm", () => {
  it("positive flow", () => {
    expect(waterFlowLpm(30)).toBeGreaterThan(0);
  });
});

describe("dressingInterval", () => {
  it("positive interval", () => {
    expect(dressingInterval(2, "fine")).toBeGreaterThan(0);
  });
});

describe("sparkAngle", () => {
  it("capped at 90", () => {
    expect(sparkAngle(100)).toBeLessThanOrEqual(90);
  });
});

describe("lifespanHours", () => {
  it("positive hours", () => {
    expect(lifespanHours(30, 0.3)).toBeGreaterThan(0);
  });
  it("zero wear = 0", () => {
    expect(lifespanHours(30, 0)).toBe(0);
  });
});

describe("troughVolumeLiters", () => {
  it("positive liters", () => {
    expect(troughVolumeLiters(30)).toBeGreaterThan(0);
  });
});

describe("pedalForceN", () => {
  it("positive N", () => {
    expect(pedalForceN(20)).toBeGreaterThan(10);
  });
});

describe("abrasiveGrits", () => {
  it("returns 5 grits", () => {
    expect(abrasiveGrits()).toHaveLength(5);
  });
});
