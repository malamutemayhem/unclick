import { describe, it, expect } from "vitest";
import {
  upperSlope, lowerSlope, loftArea, rafterLength,
  totalRoofArea, trussCount, kneeWallHeight, coveringWeight,
  ventilationArea, snowLoad, roofCoverings,
} from "../gambrel-calc.js";

describe("upperSlope", () => {
  it("positive degrees", () => {
    expect(upperSlope(3, 0.5)).toBeGreaterThan(0);
  });
});

describe("lowerSlope", () => {
  it("steeper than upper", () => {
    expect(lowerSlope(3, 2)).toBeGreaterThan(upperSlope(3, 0.5));
  });
});

describe("loftArea", () => {
  it("positive area", () => {
    expect(loftArea(8, 12, 70)).toBeGreaterThan(0);
  });
});

describe("rafterLength", () => {
  it("pythagorean", () => {
    expect(rafterLength(3, 4)).toBe(5);
  });
});

describe("totalRoofArea", () => {
  it("positive area", () => {
    expect(totalRoofArea(8, 12, 1.3)).toBeGreaterThan(0);
  });
});

describe("trussCount", () => {
  it("positive count", () => {
    expect(trussCount(12, 60)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(trussCount(12, 0)).toBe(0);
  });
});

describe("kneeWallHeight", () => {
  it("positive height", () => {
    expect(kneeWallHeight(3, 60)).toBeGreaterThan(0);
  });
});

describe("coveringWeight", () => {
  it("slate heaviest", () => {
    expect(coveringWeight(10000, "slate")).toBeGreaterThan(coveringWeight(10000, "metal"));
  });
});

describe("ventilationArea", () => {
  it("positive area", () => {
    expect(ventilationArea(60)).toBeGreaterThan(0);
  });
});

describe("snowLoad", () => {
  it("positive load", () => {
    expect(snowLoad(10000, 30)).toBeGreaterThan(0);
  });
});

describe("roofCoverings", () => {
  it("returns 5 coverings", () => {
    expect(roofCoverings()).toHaveLength(5);
  });
});
