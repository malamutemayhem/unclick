import { describe, it, expect } from "vitest";
import {
  boreDiameterMm, toneWarmth, projectionDistance,
  breathResistance, weightGrams, moistureSensitive,
  octaveRange, culturalOrigin, costEstimate, fluteMaterials,
} from "../flute-bore-calc.js";

describe("boreDiameterMm", () => {
  it("silver has largest bore", () => {
    expect(boreDiameterMm("silver")).toBeGreaterThan(
      boreDiameterMm("bone")
    );
  });
});

describe("toneWarmth", () => {
  it("wood is warmest", () => {
    expect(toneWarmth("wood")).toBeGreaterThan(
      toneWarmth("silver")
    );
  });
});

describe("projectionDistance", () => {
  it("silver projects furthest", () => {
    expect(projectionDistance("silver")).toBeGreaterThan(
      projectionDistance("clay")
    );
  });
});

describe("breathResistance", () => {
  it("bone has most resistance", () => {
    expect(breathResistance("bone")).toBeGreaterThan(
      breathResistance("silver")
    );
  });
});

describe("weightGrams", () => {
  it("silver is heaviest", () => {
    expect(weightGrams("silver")).toBeGreaterThan(
      weightGrams("bamboo")
    );
  });
});

describe("moistureSensitive", () => {
  it("bamboo is moisture sensitive", () => {
    expect(moistureSensitive("bamboo")).toBe(true);
  });
  it("silver is not", () => {
    expect(moistureSensitive("silver")).toBe(false);
  });
});

describe("octaveRange", () => {
  it("silver has widest range", () => {
    expect(octaveRange("silver")).toBeGreaterThan(
      octaveRange("bone")
    );
  });
});

describe("culturalOrigin", () => {
  it("bamboo is asian", () => {
    expect(culturalOrigin("bamboo")).toBe("asian");
  });
});

describe("costEstimate", () => {
  it("silver costs most", () => {
    expect(costEstimate("silver")).toBeGreaterThan(
      costEstimate("bamboo")
    );
  });
});

describe("fluteMaterials", () => {
  it("returns 5 materials", () => {
    expect(fluteMaterials()).toHaveLength(5);
  });
});
