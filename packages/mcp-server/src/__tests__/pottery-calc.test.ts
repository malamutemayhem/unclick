import { describe, it, expect } from "vitest";
import {
  cylinderVolume, innerVolume, clayWeight, shrinkage, firedSize,
  greenSizeNeeded, bisqueTemp, glazeTemp, coneFromTemp, glazeAmount,
  surfaceArea, dryingTime, firingDuration, calculatePottery,
  wedgingTime, clayTypes,
} from "../pottery-calc.js";

describe("cylinderVolume", () => {
  it("computes volume", () => {
    expect(cylinderVolume(10, 15)).toBeCloseTo(1178, -1);
  });
});

describe("innerVolume", () => {
  it("smaller than outer", () => {
    expect(innerVolume(10, 15, 0.5)).toBeLessThan(cylinderVolume(10, 15));
  });

  it("zero if walls too thick", () => {
    expect(innerVolume(4, 10, 3)).toBe(0);
  });
});

describe("clayWeight", () => {
  it("positive for valid dimensions", () => {
    expect(clayWeight(10, 15, 0.5, "stoneware")).toBeGreaterThan(0);
  });
});

describe("shrinkage", () => {
  it("porcelain shrinks most", () => {
    expect(shrinkage("porcelain")).toBeGreaterThan(shrinkage("earthenware"));
  });
});

describe("firedSize / greenSizeNeeded", () => {
  it("fired size smaller", () => {
    expect(firedSize(10, "stoneware")).toBeLessThan(10);
  });

  it("round trips", () => {
    const green = greenSizeNeeded(10, "stoneware");
    expect(firedSize(green, "stoneware")).toBeCloseTo(10, 0);
  });
});

describe("bisqueTemp / glazeTemp", () => {
  it("glaze temp > bisque temp", () => {
    expect(glazeTemp("stoneware")).toBeGreaterThan(bisqueTemp("stoneware"));
  });
});

describe("coneFromTemp", () => {
  it("1260C = cone 8", () => {
    expect(coneFromTemp(1260)).toBe("8");
  });
});

describe("glazeAmount", () => {
  it("positive for surface area", () => {
    expect(glazeAmount(500, 2)).toBeGreaterThan(0);
  });
});

describe("surfaceArea", () => {
  it("positive for valid dims", () => {
    expect(surfaceArea(10, 15)).toBeGreaterThan(0);
  });
});

describe("dryingTime", () => {
  it("longer in high humidity", () => {
    expect(dryingTime(1, 80)).toBeGreaterThan(dryingTime(1, 30));
  });
});

describe("firingDuration", () => {
  it("longer for high temp", () => {
    expect(firingDuration(10, 1300)).toBeGreaterThan(firingDuration(10, 900));
  });
});

describe("calculatePottery", () => {
  it("returns complete spec", () => {
    const spec = calculatePottery(10, 15, 0.5, "stoneware");
    expect(spec.volumeMl).toBeGreaterThan(0);
    expect(spec.clayWeightG).toBeGreaterThan(0);
    expect(spec.shrinkagePercent).toBe(12);
  });
});

describe("wedgingTime", () => {
  it("scales with weight", () => {
    expect(wedgingTime(2)).toBeGreaterThan(wedgingTime(1));
  });
});

describe("clayTypes", () => {
  it("has 5 types", () => {
    expect(clayTypes().length).toBe(5);
  });
});
