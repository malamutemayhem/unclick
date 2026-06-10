import { describe, it, expect } from "vitest";
import {
  stickLengthCm, weightGrams, hairCount, camberDepthMm, balancePointCm,
  rehairIntervalMonths, stiffnessRating, responseRating, costEstimate, bowWoods,
} from "../violin-bow-calc.js";

describe("stickLengthCm", () => {
  it("pernambuco is standard length", () => {
    expect(stickLengthCm("pernambuco")).toBe(74.5);
  });
});

describe("weightGrams", () => {
  it("carbon fiber is lightest", () => {
    expect(weightGrams("carbon_fiber")).toBeLessThan(weightGrams("snakewood"));
  });
});

describe("hairCount", () => {
  it("returns 180", () => {
    expect(hairCount()).toBe(180);
  });
});

describe("camberDepthMm", () => {
  it("pernambuco has deepest camber", () => {
    expect(camberDepthMm("pernambuco")).toBeGreaterThanOrEqual(
      camberDepthMm("snakewood")
    );
  });
});

describe("balancePointCm", () => {
  it("carbon fiber balance closest to tip", () => {
    expect(balancePointCm("carbon_fiber")).toBeGreaterThan(
      balancePointCm("snakewood")
    );
  });
});

describe("rehairIntervalMonths", () => {
  it("returns 6", () => {
    expect(rehairIntervalMonths()).toBe(6);
  });
});

describe("stiffnessRating", () => {
  it("pernambuco is stiffest", () => {
    expect(stiffnessRating("pernambuco")).toBeGreaterThan(
      stiffnessRating("brazilwood")
    );
  });
});

describe("responseRating", () => {
  it("pernambuco has best response", () => {
    expect(responseRating("pernambuco")).toBeGreaterThan(
      responseRating("brazilwood")
    );
  });
});

describe("costEstimate", () => {
  it("pernambuco is most expensive", () => {
    expect(costEstimate("pernambuco")).toBeGreaterThan(
      costEstimate("brazilwood")
    );
  });
});

describe("bowWoods", () => {
  it("returns 5 woods", () => {
    expect(bowWoods()).toHaveLength(5);
  });
});
