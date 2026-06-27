import { describe, it, expect } from "vitest";
import {
  canopyHeightMeters, speciesPerHectare, annualGrowthRate,
  carbonDensity, waterCycleImpact, deciduous,
  aquatic, keySpecies, threatLevel, forestTypes,
} from "../forest-type-calc.js";

describe("canopyHeightMeters", () => {
  it("kelp forest is tallest", () => {
    expect(canopyHeightMeters("kelp")).toBeGreaterThan(
      canopyHeightMeters("boreal")
    );
  });
});

describe("speciesPerHectare", () => {
  it("cloud forest has most species", () => {
    expect(speciesPerHectare("cloud")).toBeGreaterThan(
      speciesPerHectare("boreal")
    );
  });
});

describe("annualGrowthRate", () => {
  it("kelp grows fastest", () => {
    expect(annualGrowthRate("kelp")).toBeGreaterThan(
      annualGrowthRate("boreal")
    );
  });
});

describe("carbonDensity", () => {
  it("cloud forest has highest carbon density", () => {
    expect(carbonDensity("cloud")).toBeGreaterThan(
      carbonDensity("kelp")
    );
  });
});

describe("waterCycleImpact", () => {
  it("cloud forest impacts water cycle most", () => {
    expect(waterCycleImpact("cloud")).toBeGreaterThan(
      waterCycleImpact("kelp")
    );
  });
});

describe("deciduous", () => {
  it("temperate deciduous is deciduous", () => {
    expect(deciduous("temperate_deciduous")).toBe(true);
  });
  it("boreal is not", () => {
    expect(deciduous("boreal")).toBe(false);
  });
});

describe("aquatic", () => {
  it("kelp is aquatic", () => {
    expect(aquatic("kelp")).toBe(true);
  });
  it("boreal is not", () => {
    expect(aquatic("boreal")).toBe(false);
  });
});

describe("keySpecies", () => {
  it("boreal key species is spruce", () => {
    expect(keySpecies("boreal")).toBe("spruce");
  });
});

describe("threatLevel", () => {
  it("tropical dry is most threatened", () => {
    expect(threatLevel("tropical_dry")).toBeGreaterThan(
      threatLevel("temperate_deciduous")
    );
  });
});

describe("forestTypes", () => {
  it("returns 5 types", () => {
    expect(forestTypes()).toHaveLength(5);
  });
});
