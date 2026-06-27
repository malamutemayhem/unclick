import { describe, it, expect } from "vitest";
import {
  pointCount, degreesPerPoint, bearingToDeg, magneticDeclinationCorrection,
  roseDiameterCm, engravingHours, fleurDeLisHeightCm, lubberLineWidthMm,
  gimbalRingCount, materialCost, compassPoints,
} from "../compass-rose-calc.js";

describe("pointCount", () => {
  it("tertiary has 32 points", () => {
    expect(pointCount("tertiary")).toBe(32);
  });
  it("cardinal has 4 points", () => {
    expect(pointCount("cardinal")).toBe(4);
  });
});

describe("degreesPerPoint", () => {
  it("cardinal = 90 degrees", () => {
    expect(degreesPerPoint("cardinal")).toBe(90);
  });
  it("tertiary = 11.25 degrees", () => {
    expect(degreesPerPoint("tertiary")).toBe(11.25);
  });
});

describe("bearingToDeg", () => {
  it("north is 0", () => {
    expect(bearingToDeg("N")).toBe(0);
  });
  it("east is 90", () => {
    expect(bearingToDeg("E")).toBe(90);
  });
});

describe("magneticDeclinationCorrection", () => {
  it("adds positive declination", () => {
    expect(magneticDeclinationCorrection(350, 15)).toBe(5);
  });
  it("handles negative declination", () => {
    expect(magneticDeclinationCorrection(10, -15)).toBe(355);
  });
});

describe("roseDiameterCm", () => {
  it("more points = larger rose", () => {
    expect(roseDiameterCm(32)).toBeGreaterThan(roseDiameterCm(4));
  });
});

describe("engravingHours", () => {
  it("ornate takes longer", () => {
    expect(engravingHours(16, "ornate")).toBeGreaterThan(engravingHours(16, "simple"));
  });
});

describe("fleurDeLisHeightCm", () => {
  it("proportional to diameter", () => {
    expect(fleurDeLisHeightCm(20)).toBeGreaterThan(fleurDeLisHeightCm(10));
  });
});

describe("lubberLineWidthMm", () => {
  it("positive width", () => {
    expect(lubberLineWidthMm(15)).toBeGreaterThan(0);
  });
});

describe("gimbalRingCount", () => {
  it("marine grade has 2 rings", () => {
    expect(gimbalRingCount(true)).toBe(2);
  });
  it("non-marine has 0", () => {
    expect(gimbalRingCount(false)).toBe(0);
  });
});

describe("materialCost", () => {
  it("bronze most expensive", () => {
    expect(materialCost("bronze", 100)).toBeGreaterThan(materialCost("wood", 100));
  });
});

describe("compassPoints", () => {
  it("returns 4 types", () => {
    expect(compassPoints()).toHaveLength(4);
  });
});
