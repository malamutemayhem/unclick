import { describe, it, expect } from "vitest";
import {
  eyeSizeMm, heddlesPerShaft, heddleLengthCm, weightPerHeddleG,
  totalHeddleWeightKg, threadingOrder, replacementIntervalYears,
  noiseRating, costPerHeddle, heddleTypes,
} from "../heddle-calc.js";

describe("eyeSizeMm", () => {
  it("scales with yarn diameter", () => {
    expect(eyeSizeMm(2)).toBeGreaterThan(eyeSizeMm(1));
  });
});

describe("heddlesPerShaft", () => {
  it("divides ends across shafts", () => {
    expect(heddlesPerShaft(400, 4)).toBe(100);
  });
});

describe("heddleLengthCm", () => {
  it("floor loom heddles are longer", () => {
    expect(heddleLengthCm("floor")).toBeGreaterThan(heddleLengthCm("table"));
  });
});

describe("weightPerHeddleG", () => {
  it("inserted eye is heaviest", () => {
    expect(weightPerHeddleG("inserted_eye")).toBeGreaterThan(weightPerHeddleG("wire"));
  });
});

describe("totalHeddleWeightKg", () => {
  it("more heddles = more weight", () => {
    expect(totalHeddleWeightKg(500, "wire")).toBeGreaterThan(totalHeddleWeightKg(100, "wire"));
  });
});

describe("threadingOrder", () => {
  it("returns sequence 1 to N", () => {
    expect(threadingOrder(4)).toEqual([1, 2, 3, 4]);
  });
});

describe("replacementIntervalYears", () => {
  it("inserted eye lasts longest", () => {
    expect(replacementIntervalYears("inserted_eye")).toBeGreaterThan(
      replacementIntervalYears("string")
    );
  });
});

describe("noiseRating", () => {
  it("flat steel is noisiest", () => {
    expect(noiseRating("flat_steel")).toBeGreaterThan(noiseRating("string"));
  });
});

describe("costPerHeddle", () => {
  it("string is cheapest", () => {
    expect(costPerHeddle("string")).toBeLessThan(costPerHeddle("wire"));
  });
});

describe("heddleTypes", () => {
  it("returns 5 types", () => {
    expect(heddleTypes()).toHaveLength(5);
  });
});
