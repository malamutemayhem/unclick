import { describe, it, expect } from "vitest";
import {
  floorAreaM2, bedCount, cubicleWidthCm, partitionHeightCm,
  windowCount, nightStairWidthCm, ventilationOpenings,
  heatingRequired, stairCount, constructionCost, dorterAccessTypes,
} from "../dorter-calc.js";

describe("floorAreaM2", () => {
  it("positive area", () => {
    expect(floorAreaM2(30, 3)).toBe(90);
  });
});

describe("bedCount", () => {
  it("equals monk count", () => {
    expect(bedCount(30)).toBe(30);
  });
});

describe("cubicleWidthCm", () => {
  it("positive width", () => {
    expect(cubicleWidthCm(8, 30)).toBeGreaterThan(0);
  });
  it("zero beds = 0", () => {
    expect(cubicleWidthCm(8, 0)).toBe(0);
  });
});

describe("partitionHeightCm", () => {
  it("55% of ceiling", () => {
    expect(partitionHeightCm(4)).toBe(220);
  });
});

describe("windowCount", () => {
  it("at least 2", () => {
    expect(windowCount(3)).toBe(2);
  });
});

describe("nightStairWidthCm", () => {
  it("minimum 80cm", () => {
    expect(nightStairWidthCm(10)).toBeGreaterThanOrEqual(80);
  });
  it("maximum 150cm", () => {
    expect(nightStairWidthCm(100)).toBeLessThanOrEqual(150);
  });
});

describe("ventilationOpenings", () => {
  it("at least 2", () => {
    expect(ventilationOpenings(10)).toBe(2);
  });
});

describe("heatingRequired", () => {
  it("true above 45 degrees", () => {
    expect(heatingRequired(50)).toBe(true);
  });
  it("false below 45 degrees", () => {
    expect(heatingRequired(40)).toBe(false);
  });
});

describe("stairCount", () => {
  it("both has 2", () => {
    expect(stairCount("both")).toBe(2);
  });
  it("day stair has 1", () => {
    expect(stairCount("day_stair")).toBe(1);
  });
});

describe("constructionCost", () => {
  it("both access most expensive", () => {
    expect(constructionCost(90, "both", 500)).toBeGreaterThan(
      constructionCost(90, "external", 500)
    );
  });
});

describe("dorterAccessTypes", () => {
  it("returns 5 types", () => {
    expect(dorterAccessTypes()).toHaveLength(5);
  });
});
