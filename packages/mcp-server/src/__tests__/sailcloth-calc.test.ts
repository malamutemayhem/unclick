import { describe, it, expect } from "vitest";
import {
  weightOzPerYd2, breakingStrengthKn, uvResistanceYears, stretchPercent,
  sailAreaM2, clothNeededM2, seamAllowanceCm, stitchesPerCm,
  costPerM2, sailclothTypes,
} from "../sailcloth-calc.js";

describe("weightOzPerYd2", () => {
  it("flax is heaviest", () => {
    expect(weightOzPerYd2("flax")).toBeGreaterThan(weightOzPerYd2("nylon"));
  });
});

describe("breakingStrengthKn", () => {
  it("kevlar is strongest", () => {
    expect(breakingStrengthKn("kevlar")).toBeGreaterThan(breakingStrengthKn("dacron"));
  });
});

describe("uvResistanceYears", () => {
  it("dacron lasts longest in sun", () => {
    expect(uvResistanceYears("dacron")).toBeGreaterThan(uvResistanceYears("cotton"));
  });
});

describe("stretchPercent", () => {
  it("kevlar stretches least", () => {
    expect(stretchPercent("kevlar")).toBeLessThan(stretchPercent("nylon"));
  });
});

describe("sailAreaM2", () => {
  it("calculates triangle area", () => {
    expect(sailAreaM2(10, 4)).toBe(20);
  });
});

describe("clothNeededM2", () => {
  it("adds waste percentage", () => {
    expect(clothNeededM2(20, 10)).toBeGreaterThan(20);
  });
});

describe("seamAllowanceCm", () => {
  it("flax needs widest seam allowance", () => {
    expect(seamAllowanceCm("flax")).toBeGreaterThan(seamAllowanceCm("dacron"));
  });
});

describe("stitchesPerCm", () => {
  it("dacron uses most stitches", () => {
    expect(stitchesPerCm("dacron")).toBeGreaterThanOrEqual(stitchesPerCm("flax"));
  });
});

describe("costPerM2", () => {
  it("kevlar is most expensive", () => {
    expect(costPerM2("kevlar")).toBeGreaterThan(costPerM2("cotton"));
  });
});

describe("sailclothTypes", () => {
  it("returns 5 types", () => {
    expect(sailclothTypes()).toHaveLength(5);
  });
});
