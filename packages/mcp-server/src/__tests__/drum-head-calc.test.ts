import { describe, it, expect } from "vitest";
import {
  thicknessMm, tensionKgPerCm, stretchPercent, weatherSensitivity,
  tuckingDepthMm, soakTimeMinutes, toneWarmthRating, durabilityRating,
  costPerHead, headMaterials,
} from "../drum-head-calc.js";

describe("thicknessMm", () => {
  it("calfskin is thickest", () => {
    expect(thicknessMm("calfskin")).toBeGreaterThan(thicknessMm("synthetic"));
  });
});

describe("tensionKgPerCm", () => {
  it("synthetic holds most tension", () => {
    expect(tensionKgPerCm("synthetic")).toBeGreaterThan(
      tensionKgPerCm("deerskin")
    );
  });
});

describe("stretchPercent", () => {
  it("deerskin stretches most", () => {
    expect(stretchPercent("deerskin")).toBeGreaterThan(
      stretchPercent("synthetic")
    );
  });
});

describe("weatherSensitivity", () => {
  it("synthetic is least sensitive", () => {
    expect(weatherSensitivity("synthetic")).toBeLessThan(
      weatherSensitivity("calfskin")
    );
  });
});

describe("tuckingDepthMm", () => {
  it("larger diameter = deeper tuck", () => {
    expect(tuckingDepthMm(40)).toBeGreaterThan(tuckingDepthMm(20));
  });
});

describe("soakTimeMinutes", () => {
  it("synthetic needs no soaking", () => {
    expect(soakTimeMinutes("synthetic")).toBe(0);
  });
  it("calfskin needs longest soak", () => {
    expect(soakTimeMinutes("calfskin")).toBeGreaterThan(
      soakTimeMinutes("kangaroo")
    );
  });
});

describe("toneWarmthRating", () => {
  it("calfskin is warmest", () => {
    expect(toneWarmthRating("calfskin")).toBeGreaterThan(
      toneWarmthRating("synthetic")
    );
  });
});

describe("durabilityRating", () => {
  it("synthetic is most durable", () => {
    expect(durabilityRating("synthetic")).toBeGreaterThan(
      durabilityRating("deerskin")
    );
  });
});

describe("costPerHead", () => {
  it("kangaroo is most expensive", () => {
    expect(costPerHead("kangaroo")).toBeGreaterThan(costPerHead("synthetic"));
  });
});

describe("headMaterials", () => {
  it("returns 5 materials", () => {
    expect(headMaterials()).toHaveLength(5);
  });
});
