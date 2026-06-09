import { describe, it, expect } from "vitest";
import {
  scaleDenominator, groundDistanceM, mapDistanceCm, contourInterval,
  areaOnMapCm2, degreesToDms, dmsToDegrees, utmZone,
  gridSquareSize, distortionFactor, mapScales,
} from "../cartography-calc.js";

describe("scaleDenominator", () => {
  it("1:25000 = 25000", () => {
    expect(scaleDenominator("1:25000")).toBe(25000);
  });
});

describe("groundDistanceM", () => {
  it("1cm at 1:25000 = 250m", () => {
    expect(groundDistanceM(1, "1:25000")).toBe(250);
  });
});

describe("mapDistanceCm", () => {
  it("250m at 1:25000 = 1cm", () => {
    expect(mapDistanceCm(250, "1:25000")).toBe(1);
  });
});

describe("contourInterval", () => {
  it("1:25000 = 10m", () => {
    expect(contourInterval("1:25000")).toBe(10);
  });
  it("1:100000 = 50m", () => {
    expect(contourInterval("1:100000")).toBe(50);
  });
});

describe("areaOnMapCm2", () => {
  it("positive area", () => {
    expect(areaOnMapCm2(10000, "1:25000")).toBeGreaterThan(0);
  });
});

describe("degreesToDms", () => {
  it("converts 40.5 correctly", () => {
    const d = degreesToDms(40.5);
    expect(d.degrees).toBe(40);
    expect(d.minutes).toBe(30);
    expect(d.seconds).toBe(0);
  });
});

describe("dmsToDegrees", () => {
  it("converts back", () => {
    expect(dmsToDegrees(40, 30, 0)).toBe(40.5);
  });
});

describe("utmZone", () => {
  it("London = zone 30", () => {
    expect(utmZone(-0.1)).toBe(30);
  });
});

describe("gridSquareSize", () => {
  it("1:25000 = 1000m", () => {
    expect(gridSquareSize("1:25000")).toBe(1000);
  });
});

describe("distortionFactor", () => {
  it("mercator increases at high lat", () => {
    expect(distortionFactor(60, "mercator")).toBeGreaterThan(1);
  });
  it("equirectangular always 1", () => {
    expect(distortionFactor(60, "equirectangular")).toBe(1);
  });
});

describe("mapScales", () => {
  it("returns 6 scales", () => {
    expect(mapScales()).toHaveLength(6);
  });
});
