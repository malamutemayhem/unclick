import { describe, it, expect } from "vitest";
import {
  trueBearing, magneticBearing, backBearing, bearingBetween,
  distanceKm, distanceNm, etaMinutes, waypointProgress,
  crossTrackError, compassRose, degreesToDms, compassTypes,
} from "../compass-nav.js";

describe("trueBearing", () => {
  it("adds declination", () => {
    expect(trueBearing(90, 10)).toBe(100);
  });
  it("wraps around 360", () => {
    expect(trueBearing(350, 20)).toBe(10);
  });
});

describe("magneticBearing", () => {
  it("subtracts declination", () => {
    expect(magneticBearing(100, 10)).toBe(90);
  });
});

describe("backBearing", () => {
  it("180 degrees opposite", () => {
    expect(backBearing(90)).toBe(270);
  });
  it("wraps correctly", () => {
    expect(backBearing(350)).toBe(170);
  });
});

describe("bearingBetween", () => {
  it("north to south is ~180", () => {
    const b = bearingBetween(1, 0, -1, 0);
    expect(b).toBeGreaterThan(170);
    expect(b).toBeLessThan(190);
  });
});

describe("distanceKm", () => {
  it("same point = 0", () => {
    expect(distanceKm(0, 0, 0, 0)).toBe(0);
  });
  it("positive for different points", () => {
    expect(distanceKm(0, 0, 1, 1)).toBeGreaterThan(0);
  });
});

describe("distanceNm", () => {
  it("converts km to nautical miles", () => {
    expect(distanceNm(1.852)).toBeCloseTo(1, 1);
  });
});

describe("etaMinutes", () => {
  it("100km at 60kmh = 100min", () => {
    expect(etaMinutes(100, 60)).toBe(100);
  });
  it("zero speed = infinity", () => {
    expect(etaMinutes(100, 0)).toBe(Infinity);
  });
});

describe("waypointProgress", () => {
  it("50% at halfway", () => {
    expect(waypointProgress(50, 100)).toBe(50);
  });
  it("caps at 100", () => {
    expect(waypointProgress(150, 100)).toBe(100);
  });
});

describe("crossTrackError", () => {
  it("zero at zero error", () => {
    expect(crossTrackError(10, 0)).toBe(0);
  });
  it("positive for positive error", () => {
    expect(crossTrackError(10, 5)).toBeGreaterThan(0);
  });
});

describe("compassRose", () => {
  it("returns 8 directions", () => {
    expect(compassRose()).toHaveLength(8);
  });
});

describe("degreesToDms", () => {
  it("contains degrees and minutes", () => {
    expect(degreesToDms(45.5)).toContain("d");
    expect(degreesToDms(45.5)).toContain("'");
  });
});

describe("compassTypes", () => {
  it("returns 5 types", () => {
    expect(compassTypes()).toHaveLength(5);
  });
});
