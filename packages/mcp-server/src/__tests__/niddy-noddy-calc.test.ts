import { describe, it, expect } from "vitest";
import {
  skeinLengthM, wrapsPerSkein, armLengthCm, circumferenceM,
  windingTimeMinutes, skeinWeightG, tyingPointsPerSkein, materialType,
  costEstimate, niddySizes,
} from "../niddy-noddy-calc.js";

describe("skeinLengthM", () => {
  it("longer arm = longer skein", () => {
    expect(skeinLengthM(60)).toBeGreaterThan(skeinLengthM(30));
  });
});

describe("wrapsPerSkein", () => {
  it("more yarn = more wraps", () => {
    expect(wrapsPerSkein(200, 1.8)).toBeGreaterThan(wrapsPerSkein(100, 1.8));
  });
  it("zero circumference returns 0", () => {
    expect(wrapsPerSkein(100, 0)).toBe(0);
  });
});

describe("armLengthCm", () => {
  it("jumbo is longest", () => {
    expect(armLengthCm("jumbo")).toBeGreaterThan(armLengthCm("mini"));
  });
});

describe("circumferenceM", () => {
  it("jumbo has largest circumference", () => {
    expect(circumferenceM("jumbo")).toBeGreaterThan(circumferenceM("mini"));
  });
});

describe("windingTimeMinutes", () => {
  it("more wraps = more time", () => {
    expect(windingTimeMinutes(200)).toBeGreaterThan(windingTimeMinutes(50));
  });
});

describe("skeinWeightG", () => {
  it("lower count = heavier", () => {
    expect(skeinWeightG(10, 100)).toBeGreaterThan(skeinWeightG(20, 100));
  });
  it("zero count returns 0", () => {
    expect(skeinWeightG(0, 100)).toBe(0);
  });
});

describe("tyingPointsPerSkein", () => {
  it("always 4", () => {
    expect(tyingPointsPerSkein()).toBe(4);
  });
});

describe("materialType", () => {
  it("standard uses birch", () => {
    expect(materialType("standard")).toBe("birch");
  });
});

describe("costEstimate", () => {
  it("adjustable is most expensive", () => {
    expect(costEstimate("adjustable")).toBeGreaterThan(costEstimate("mini"));
  });
});

describe("niddySizes", () => {
  it("returns 5 sizes", () => {
    expect(niddySizes()).toHaveLength(5);
  });
});
