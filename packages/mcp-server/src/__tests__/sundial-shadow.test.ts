import { describe, it, expect } from "vitest";
import {
  shadowLengthCm, sunElevation, solarAzimuth, hourAngleFromTime,
  solarDeclination, daylightHours, shadowDirection, analemmaOffset,
  shadowSpeed, shadowTypes,
} from "../sundial-shadow.js";

describe("shadowLengthCm", () => {
  it("positive at 45 deg", () => {
    expect(shadowLengthCm(10, 45)).toBeCloseTo(10, 0);
  });
  it("zero at 0 deg", () => {
    expect(shadowLengthCm(10, 0)).toBe(0);
  });
});

describe("sunElevation", () => {
  it("reasonable value", () => {
    const e = sunElevation(45, 23.4, 0);
    expect(e).toBeGreaterThan(0);
    expect(e).toBeLessThan(90);
  });
});

describe("solarAzimuth", () => {
  it("between 0 and 360", () => {
    const a = solarAzimuth(45, 23.4, -30);
    expect(a).toBeGreaterThanOrEqual(0);
    expect(a).toBeLessThanOrEqual(360);
  });
});

describe("hourAngleFromTime", () => {
  it("noon = 0", () => {
    expect(hourAngleFromTime(12)).toBe(0);
  });
  it("3pm = 45", () => {
    expect(hourAngleFromTime(15)).toBe(45);
  });
});

describe("solarDeclination", () => {
  it("summer solstice positive", () => {
    expect(solarDeclination(172)).toBeGreaterThan(20);
  });
  it("winter solstice negative", () => {
    expect(solarDeclination(355)).toBeLessThan(-20);
  });
});

describe("daylightHours", () => {
  it("equinox near 12h", () => {
    expect(daylightHours(45, 0)).toBeCloseTo(12, 0);
  });
});

describe("shadowDirection", () => {
  it("opposite to azimuth", () => {
    expect(shadowDirection(90)).toBe(270);
  });
});

describe("analemmaOffset", () => {
  it("returns finite value", () => {
    expect(Number.isFinite(analemmaOffset(100))).toBe(true);
  });
});

describe("shadowSpeed", () => {
  it("positive cm/min", () => {
    expect(shadowSpeed(100)).toBeGreaterThan(0);
  });
});

describe("shadowTypes", () => {
  it("returns 4 types", () => {
    expect(shadowTypes()).toHaveLength(4);
  });
});
