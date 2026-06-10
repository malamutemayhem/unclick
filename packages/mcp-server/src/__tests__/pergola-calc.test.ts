import { describe, it, expect } from "vitest";
import {
  postCount, rafterCount, beamSize, shadePercent,
  vineCoverage, footingDepthCm, concreteLiters,
  lifespanYears, snowLoad, postMaterials,
} from "../pergola-calc.js";

describe("postCount", () => {
  it("positive count", () => {
    expect(postCount(6, 3, 2)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(postCount(6, 3, 0)).toBe(0);
  });
});

describe("rafterCount", () => {
  it("positive count", () => {
    expect(rafterCount(6, 40)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(rafterCount(6, 0)).toBe(0);
  });
});

describe("beamSize", () => {
  it("positive cm", () => {
    expect(beamSize(4, 50)).toBeGreaterThan(0);
  });
});

describe("shadePercent", () => {
  it("positive percent", () => {
    expect(shadePercent(10, 40)).toBeGreaterThan(0);
  });
  it("zero spacing = 100", () => {
    expect(shadePercent(10, 0)).toBe(100);
  });
});

describe("vineCoverage", () => {
  it("capped at 100", () => {
    expect(vineCoverage(10, "fast")).toBe(100);
  });
  it("grows over time", () => {
    expect(vineCoverage(3, "slow")).toBeGreaterThan(vineCoverage(1, "slow"));
  });
});

describe("footingDepthCm", () => {
  it("below frost line", () => {
    expect(footingDepthCm(1)).toBeGreaterThan(100);
  });
});

describe("concreteLiters", () => {
  it("positive liters", () => {
    expect(concreteLiters(4, 30, 60)).toBeGreaterThan(0);
  });
});

describe("lifespanYears", () => {
  it("aluminum longest", () => {
    expect(lifespanYears("aluminum")).toBeGreaterThan(lifespanYears("cedar"));
  });
});

describe("snowLoad", () => {
  it("positive kg", () => {
    expect(snowLoad(20, 30)).toBeGreaterThan(0);
  });
});

describe("postMaterials", () => {
  it("returns 5 materials", () => {
    expect(postMaterials()).toHaveLength(5);
  });
});
