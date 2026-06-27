import { describe, it, expect } from "vitest";
import {
  scaleFactor, scaleSpeed, realEquivalentSpeed, gearRatio,
  motorKv, topSpeedKmh, batteryRuntime, batteryEnergy,
  cellCount, tireCircumference, rolloutMm, weightDistribution,
  suspensionTravel, turnRadiusMm, lapTime, rcScales,
} from "../rc-car-calc.js";

describe("scaleFactor", () => {
  it("1:10 is 10", () => {
    expect(scaleFactor("1:10")).toBe(10);
  });
});

describe("scaleSpeed", () => {
  it("divides by factor", () => {
    expect(scaleSpeed(100, "1:10")).toBe(10);
  });
});

describe("realEquivalentSpeed", () => {
  it("multiplies by factor", () => {
    expect(realEquivalentSpeed(10, "1:10")).toBe(100);
  });
});

describe("gearRatio", () => {
  it("spur / pinion", () => {
    expect(gearRatio(80, 20)).toBe(4);
  });
});

describe("motorKv", () => {
  it("rpm / voltage", () => {
    expect(motorKv(7.4, 37000)).toBe(5000);
  });
});

describe("topSpeedKmh", () => {
  it("positive speed", () => {
    expect(topSpeedKmh(3000, 7.4, 3.5, 200)).toBeGreaterThan(0);
  });
});

describe("batteryRuntime", () => {
  it("positive minutes", () => {
    expect(batteryRuntime(5000, 20)).toBeGreaterThan(0);
  });
});

describe("batteryEnergy", () => {
  it("voltage x capacity", () => {
    expect(batteryEnergy(7.4, 5000)).toBe(37);
  });
});

describe("cellCount", () => {
  it("2S lipo from 7.4V", () => {
    expect(cellCount(7.4, "lipo")).toBe(2);
  });

  it("6 cell nimh from 7.2V", () => {
    expect(cellCount(7.2, "nimh")).toBe(6);
  });
});

describe("tireCircumference", () => {
  it("pi x diameter", () => {
    expect(tireCircumference(100)).toBeCloseTo(314.2, 0);
  });
});

describe("rolloutMm", () => {
  it("circumference / gear ratio", () => {
    const circ = Math.PI * 100;
    expect(rolloutMm(100, 4)).toBeCloseTo(circ / 4, 0);
  });
});

describe("weightDistribution", () => {
  it("totals to 100%", () => {
    const wd = weightDistribution(1000, 1500);
    expect(wd.front + wd.rear).toBeCloseTo(100, 0);
  });
});

describe("suspensionTravel", () => {
  it("shock x lever", () => {
    expect(suspensionTravel(50, 1.2)).toBe(60);
  });
});

describe("turnRadiusMm", () => {
  it("positive radius", () => {
    expect(turnRadiusMm(260, 25)).toBeGreaterThan(0);
  });
});

describe("lapTime", () => {
  it("positive seconds", () => {
    expect(lapTime(200, 30)).toBeGreaterThan(0);
  });
});

describe("rcScales", () => {
  it("returns 8 scales", () => {
    expect(rcScales()).toHaveLength(8);
  });
});
