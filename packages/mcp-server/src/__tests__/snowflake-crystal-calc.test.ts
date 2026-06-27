import { describe, it, expect } from "vitest";
import {
  complexityScore, fallSpeed, packingDensity, lightReflection,
  formationTemperature, classicSymmetry, rimedSurface, growthHabit,
  temperatureRange, snowflakeCrystals,
} from "../snowflake-crystal-calc.js";

describe("complexityScore", () => {
  it("dendrite most complex", () => {
    expect(complexityScore("dendrite")).toBeGreaterThan(complexityScore("graupel"));
  });
});

describe("fallSpeed", () => {
  it("graupel fastest fall", () => {
    expect(fallSpeed("graupel")).toBeGreaterThan(fallSpeed("dendrite"));
  });
});

describe("packingDensity", () => {
  it("graupel densest packing", () => {
    expect(packingDensity("graupel")).toBeGreaterThan(packingDensity("dendrite"));
  });
});

describe("lightReflection", () => {
  it("dendrite most reflective", () => {
    expect(lightReflection("dendrite")).toBeGreaterThan(lightReflection("graupel"));
  });
});

describe("formationTemperature", () => {
  it("needle highest formation temperature score", () => {
    expect(formationTemperature("needle")).toBeGreaterThan(formationTemperature("graupel"));
  });
});

describe("classicSymmetry", () => {
  it("dendrite has classic symmetry", () => {
    expect(classicSymmetry("dendrite")).toBe(true);
  });
  it("graupel does not", () => {
    expect(classicSymmetry("graupel")).toBe(false);
  });
});

describe("rimedSurface", () => {
  it("graupel has rimed surface", () => {
    expect(rimedSurface("graupel")).toBe(true);
  });
  it("dendrite does not", () => {
    expect(rimedSurface("dendrite")).toBe(false);
  });
});

describe("growthHabit", () => {
  it("dendrite is branching hexagonal", () => {
    expect(growthHabit("dendrite")).toBe("branching_hexagonal");
  });
});

describe("temperatureRange", () => {
  it("graupel is varied supercooled droplet", () => {
    expect(temperatureRange("graupel")).toBe("varied_supercooled_droplet");
  });
});

describe("snowflakeCrystals", () => {
  it("returns 5 crystals", () => {
    expect(snowflakeCrystals()).toHaveLength(5);
  });
});
