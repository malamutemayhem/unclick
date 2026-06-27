import { describe, it, expect } from "vitest";
import {
  horizontalAccuracyArcSec, verticalAccuracyArcSec, magnification,
  stationSetupMinutes, readingsPerStation, distanceByStadiaCm,
  angleFromBearingDeg, closureErrorMm, weightKg, costEstimate,
  theodoliteTypes,
} from "../theodolite-calc.js";

describe("horizontalAccuracyArcSec", () => {
  it("total station most accurate", () => {
    expect(horizontalAccuracyArcSec("total_station")).toBeLessThan(
      horizontalAccuracyArcSec("transit")
    );
  });
});

describe("verticalAccuracyArcSec", () => {
  it("total station most accurate", () => {
    expect(verticalAccuracyArcSec("total_station")).toBeLessThan(
      verticalAccuracyArcSec("transit")
    );
  });
});

describe("magnification", () => {
  it("direction type has high magnification", () => {
    expect(magnification("direction")).toBeGreaterThan(magnification("transit"));
  });
});

describe("stationSetupMinutes", () => {
  it("total station is fastest", () => {
    expect(stationSetupMinutes("total_station")).toBeLessThan(
      stationSetupMinutes("gyro")
    );
  });
});

describe("readingsPerStation", () => {
  it("repeating needs most readings", () => {
    expect(readingsPerStation("repeating")).toBeGreaterThan(
      readingsPerStation("total_station")
    );
  });
});

describe("distanceByStadiaCm", () => {
  it("positive for valid inputs", () => {
    expect(distanceByStadiaCm(150, 100, 100)).toBe(5000);
  });
});

describe("angleFromBearingDeg", () => {
  it("normalizes bearing", () => {
    expect(angleFromBearingDeg(370)).toBe(10);
  });
  it("handles negative bearing", () => {
    expect(angleFromBearingDeg(-10)).toBe(350);
  });
});

describe("closureErrorMm", () => {
  it("longer perimeter = larger error", () => {
    expect(closureErrorMm(1000, 30)).toBeGreaterThan(closureErrorMm(500, 30));
  });
});

describe("weightKg", () => {
  it("gyro is heaviest", () => {
    expect(weightKg("gyro")).toBeGreaterThan(weightKg("total_station"));
  });
});

describe("costEstimate", () => {
  it("gyro most expensive", () => {
    expect(costEstimate("gyro", 1000)).toBeGreaterThan(costEstimate("transit", 1000));
  });
});

describe("theodoliteTypes", () => {
  it("returns 5 types", () => {
    expect(theodoliteTypes()).toHaveLength(5);
  });
});
