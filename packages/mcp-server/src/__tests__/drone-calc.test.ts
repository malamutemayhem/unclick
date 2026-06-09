import { describe, it, expect } from "vitest";
import {
  thrustToWeight, allUpWeight, flightTime, batteryEnergy,
  propPitch, maxSpeed, motorKv, escRating, pidLoopTime,
  videoBitrate, storagePerMinute, recordingTime, rangeKm,
  fresnelZone, windResistance, costEstimate, droneTypes,
} from "../drone-calc.js";

describe("thrustToWeight", () => {
  it("above 2 is good", () => {
    expect(thrustToWeight(2000, 800)).toBeGreaterThan(2);
  });
});

describe("allUpWeight", () => {
  it("sums all components", () => {
    expect(allUpWeight(100, 200, 300, 50, 30)).toBe(680);
  });
});

describe("flightTime", () => {
  it("positive minutes", () => {
    expect(flightTime(1500, 25)).toBeGreaterThan(0);
  });
});

describe("batteryEnergy", () => {
  it("cells x voltage x capacity", () => {
    expect(batteryEnergy(4, 3.7, 1500)).toBeCloseTo(22.2, 0);
  });
});

describe("propPitch", () => {
  it("positive speed", () => {
    expect(propPitch(4.5, 30000)).toBeGreaterThan(0);
  });
});

describe("maxSpeed", () => {
  it("less than theoretical", () => {
    const theoretical = propPitch(5, 40000);
    expect(maxSpeed(5, 40000, 0.7)).toBeLessThan(theoretical);
  });
});

describe("motorKv", () => {
  it("rpm / voltage", () => {
    expect(motorKv(14.8, 37000)).toBe(2500);
  });
});

describe("escRating", () => {
  it("above max current", () => {
    expect(escRating(30)).toBeGreaterThan(30);
  });
});

describe("pidLoopTime", () => {
  it("1ms for 1kHz", () => {
    expect(pidLoopTime(1000)).toBe(1);
  });
});

describe("videoBitrate", () => {
  it("positive Mbps", () => {
    expect(videoBitrate(3840, 2160, 30)).toBeGreaterThan(0);
  });
});

describe("storagePerMinute", () => {
  it("positive MB", () => {
    expect(storagePerMinute(50)).toBeGreaterThan(0);
  });
});

describe("recordingTime", () => {
  it("positive minutes", () => {
    expect(recordingTime(64, 50)).toBeGreaterThan(0);
  });
});

describe("rangeKm", () => {
  it("positive distance", () => {
    expect(rangeKm(600, 5800)).toBeGreaterThan(0);
  });
});

describe("fresnelZone", () => {
  it("positive radius", () => {
    expect(fresnelZone(1000, 5800)).toBeGreaterThan(0);
  });
});

describe("windResistance", () => {
  it("positive ratio", () => {
    expect(windResistance(800, 50)).toBeGreaterThan(0);
  });
});

describe("costEstimate", () => {
  it("industrial most expensive", () => {
    expect(costEstimate("industrial")).toBeGreaterThan(costEstimate("micro"));
  });
});

describe("droneTypes", () => {
  it("returns 6 types", () => {
    expect(droneTypes()).toHaveLength(6);
  });
});
