import { describe, it, expect } from "vitest";
import {
  weightKg, faceAreaCm2, heightCm, reboundPercent,
  hardieHoleSizeMm, pritchelHoleSizeMm, standHeightCm,
  noiseDecibels, lifespanYears, costEstimate, anvilStyles,
} from "../anvil-calc.js";

describe("weightKg", () => {
  it("double horn heaviest", () => {
    expect(weightKg("double_horn")).toBeGreaterThan(weightKg("stake"));
  });
});

describe("faceAreaCm2", () => {
  it("double horn largest", () => {
    expect(faceAreaCm2("double_horn")).toBeGreaterThan(faceAreaCm2("stake"));
  });
});

describe("heightCm", () => {
  it("positive height", () => {
    expect(heightCm(120)).toBeGreaterThan(0);
  });
});

describe("reboundPercent", () => {
  it("tool steel best rebound", () => {
    expect(reboundPercent("tool_steel")).toBeGreaterThan(reboundPercent("cast_iron"));
  });
});

describe("hardieHoleSizeMm", () => {
  it("small anvil = 19mm", () => {
    expect(hardieHoleSizeMm(30)).toBe(19);
  });
  it("large anvil = 32mm", () => {
    expect(hardieHoleSizeMm(120)).toBe(32);
  });
});

describe("pritchelHoleSizeMm", () => {
  it("60% of hardie hole", () => {
    expect(pritchelHoleSizeMm(25)).toBe(15);
  });
});

describe("standHeightCm", () => {
  it("45% of smith height", () => {
    expect(standHeightCm(180)).toBe(81);
  });
});

describe("noiseDecibels", () => {
  it("heavier = louder", () => {
    expect(noiseDecibels(150)).toBeGreaterThan(noiseDecibels(50));
  });
});

describe("lifespanYears", () => {
  it("tool steel longest", () => {
    expect(lifespanYears("tool_steel")).toBeGreaterThan(lifespanYears("cast_iron"));
  });
});

describe("costEstimate", () => {
  it("double horn most expensive", () => {
    expect(costEstimate("double_horn", 10)).toBeGreaterThan(costEstimate("stake", 10));
  });
});

describe("anvilStyles", () => {
  it("returns 5 styles", () => {
    expect(anvilStyles()).toHaveLength(5);
  });
});
