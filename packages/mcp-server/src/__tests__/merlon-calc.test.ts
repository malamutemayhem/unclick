import { describe, it, expect } from "vitest";
import {
  merlonWidth, merlonHeight, crenelWidth, totalCount,
  stoneBlocks, coverPercent, swallowtailAngle, arrowLoopFit,
  weatheringRate, merlonShapes,
} from "../merlon-calc.js";

describe("merlonWidth", () => {
  it("60% of wall thickness", () => {
    expect(merlonWidth(100)).toBe(60);
  });
});

describe("merlonHeight", () => {
  it("15% of wall height", () => {
    expect(merlonHeight(800)).toBeCloseTo(120, 0);
  });
});

describe("crenelWidth", () => {
  it("80% of merlon", () => {
    expect(crenelWidth(60)).toBe(48);
  });
});

describe("totalCount", () => {
  it("positive count", () => {
    expect(totalCount(100, 60, 48)).toBeGreaterThan(0);
  });
});

describe("stoneBlocks", () => {
  it("positive blocks", () => {
    expect(stoneBlocks(60, 120, 30)).toBeGreaterThan(0);
  });
  it("zero block = 0", () => {
    expect(stoneBlocks(60, 120, 0)).toBe(0);
  });
});

describe("coverPercent", () => {
  it("between 0 and 100", () => {
    const pct = coverPercent(60, 48);
    expect(pct).toBeGreaterThan(0);
    expect(pct).toBeLessThan(100);
  });
});

describe("swallowtailAngle", () => {
  it("positive angle", () => {
    expect(swallowtailAngle(60, 20)).toBeGreaterThan(0);
  });
  it("zero width = 0", () => {
    expect(swallowtailAngle(0, 20)).toBe(0);
  });
});

describe("arrowLoopFit", () => {
  it("wide crenel fits", () => {
    expect(arrowLoopFit(50, 10)).toBe(true);
  });
  it("narrow crenel no fit", () => {
    expect(arrowLoopFit(15, 10)).toBe(false);
  });
});

describe("weatheringRate", () => {
  it("coastal worst", () => {
    expect(weatheringRate("rectangular", "coastal")).toBeGreaterThan(weatheringRate("rectangular", "sheltered"));
  });
});

describe("merlonShapes", () => {
  it("returns 5 shapes", () => {
    expect(merlonShapes()).toHaveLength(5);
  });
});
