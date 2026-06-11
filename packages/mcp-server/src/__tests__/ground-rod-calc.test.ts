import { describe, it, expect } from "vitest";
import {
  conductivity, corrosionResist, longevity, installEase,
  grCost, lowResistance, forCorrosive, material,
  bestUse, groundRodTypes,
} from "../ground-rod-calc.js";

describe("conductivity", () => {
  it("solid copper best conductivity", () => {
    expect(conductivity("solid_copper_rod")).toBeGreaterThan(conductivity("galvanized_steel_plain"));
  });
});

describe("corrosionResist", () => {
  it("stainless best corrosion resistance", () => {
    expect(corrosionResist("stainless_steel_rod")).toBeGreaterThan(corrosionResist("galvanized_steel_plain"));
  });
});

describe("longevity", () => {
  it("solid copper longest lasting", () => {
    expect(longevity("solid_copper_rod")).toBeGreaterThan(longevity("galvanized_steel_plain"));
  });
});

describe("installEase", () => {
  it("copper bonded easy install", () => {
    expect(installEase("copper_bonded_steel")).toBeGreaterThan(installEase("chemical_ground_electrode"));
  });
});

describe("grCost", () => {
  it("chemical most expensive", () => {
    expect(grCost("chemical_ground_electrode")).toBeGreaterThan(grCost("galvanized_steel_plain"));
  });
});

describe("lowResistance", () => {
  it("solid copper low resistance", () => {
    expect(lowResistance("solid_copper_rod")).toBe(true);
  });
  it("galvanized not low resistance", () => {
    expect(lowResistance("galvanized_steel_plain")).toBe(false);
  });
});

describe("forCorrosive", () => {
  it("stainless for corrosive", () => {
    expect(forCorrosive("stainless_steel_rod")).toBe(true);
  });
  it("copper bonded not corrosive", () => {
    expect(forCorrosive("copper_bonded_steel")).toBe(false);
  });
});

describe("material", () => {
  it("chemical uses conductive backfill", () => {
    expect(material("chemical_ground_electrode")).toBe("conductive_backfill_electrode");
  });
});

describe("bestUse", () => {
  it("stainless for coastal", () => {
    expect(bestUse("stainless_steel_rod")).toBe("coastal_chemical_corrosive_soil");
  });
});

describe("groundRodTypes", () => {
  it("returns 5 types", () => {
    expect(groundRodTypes()).toHaveLength(5);
  });
});
