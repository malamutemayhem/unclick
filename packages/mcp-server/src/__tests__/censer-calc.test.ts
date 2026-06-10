import { describe, it, expect } from "vitest";
import {
  bowlVolumeMl, charcoalWeightG, burnTimeMin, chainLength,
  ventHoleCount, smokeOutputLph, swingPeriodS, metalWeightKg,
  fragranceRadiusM, censerMetals,
} from "../censer-calc.js";

describe("bowlVolumeMl", () => {
  it("positive volume", () => {
    expect(bowlVolumeMl(10, 5)).toBeGreaterThan(0);
  });
});

describe("charcoalWeightG", () => {
  it("positive grams", () => {
    expect(charcoalWeightG(200)).toBeGreaterThan(0);
  });
});

describe("burnTimeMin", () => {
  it("resin extends time", () => {
    expect(burnTimeMin(10, 5)).toBeGreaterThan(burnTimeMin(10, 0));
  });
});

describe("chainLength", () => {
  it("difference of heights", () => {
    expect(chainLength(300, 100)).toBe(200);
  });
});

describe("ventHoleCount", () => {
  it("positive count", () => {
    expect(ventHoleCount(15, 2)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(ventHoleCount(15, 0)).toBe(0);
  });
});

describe("smokeOutputLph", () => {
  it("positive output", () => {
    expect(smokeOutputLph(5, 10)).toBeGreaterThan(0);
  });
});

describe("swingPeriodS", () => {
  it("positive seconds", () => {
    expect(swingPeriodS(150)).toBeGreaterThan(0);
  });
  it("zero length = 0", () => {
    expect(swingPeriodS(0)).toBe(0);
  });
});

describe("metalWeightKg", () => {
  it("gold heaviest", () => {
    expect(metalWeightKg(10, 2, "gold")).toBeGreaterThan(metalWeightKg(10, 2, "iron"));
  });
});

describe("fragranceRadiusM", () => {
  it("positive meters", () => {
    expect(fragranceRadiusM(3, "moderate")).toBeGreaterThan(0);
  });
});

describe("censerMetals", () => {
  it("returns 5 metals", () => {
    expect(censerMetals()).toHaveLength(5);
  });
});
