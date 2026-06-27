import { describe, it, expect } from "vitest";
import {
  contourIntervalM, scaleDenominator, groundDistanceM, mapDistanceMm,
  slopePercent, indexContourInterval, sheetCoverageKm2,
  spotHeightDensityPerKm2, gridSquareSizeMm, mapScales,
} from "../contour-map-calc.js";

describe("contourIntervalM", () => {
  it("larger scale = wider contour interval", () => {
    expect(contourIntervalM("1:50000")).toBeGreaterThan(contourIntervalM("1:1000"));
  });
});

describe("scaleDenominator", () => {
  it("1:50000 has largest denominator", () => {
    expect(scaleDenominator("1:50000")).toBe(50000);
  });
});

describe("groundDistanceM", () => {
  it("calculates correctly", () => {
    expect(groundDistanceM(10, 25000)).toBe(250);
  });
});

describe("mapDistanceMm", () => {
  it("calculates correctly", () => {
    expect(mapDistanceMm(250, 25000)).toBe(10);
  });
  it("zero scale returns zero", () => {
    expect(mapDistanceMm(250, 0)).toBe(0);
  });
});

describe("slopePercent", () => {
  it("steeper terrain = higher percent", () => {
    expect(slopePercent(50, 100)).toBeGreaterThan(slopePercent(25, 100));
  });
  it("zero distance returns zero", () => {
    expect(slopePercent(50, 0)).toBe(0);
  });
});

describe("indexContourInterval", () => {
  it("5x regular interval", () => {
    expect(indexContourInterval(10)).toBe(50);
  });
});

describe("sheetCoverageKm2", () => {
  it("larger scale covers more area", () => {
    expect(sheetCoverageKm2("1:50000")).toBeGreaterThan(sheetCoverageKm2("1:1000"));
  });
});

describe("spotHeightDensityPerKm2", () => {
  it("smaller scale = more spot heights", () => {
    expect(spotHeightDensityPerKm2("1:1000")).toBeGreaterThan(
      spotHeightDensityPerKm2("1:50000")
    );
  });
});

describe("gridSquareSizeMm", () => {
  it("positive size for all scales", () => {
    expect(gridSquareSizeMm("1:25000")).toBeGreaterThan(0);
  });
});

describe("mapScales", () => {
  it("returns 5 scales", () => {
    expect(mapScales()).toHaveLength(5);
  });
});
