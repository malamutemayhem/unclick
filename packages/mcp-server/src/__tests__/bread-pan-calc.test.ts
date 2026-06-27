import { describe, it, expect } from "vitest";
import {
  crustFormation, shapeConsistency, steamRetention, airCirculation,
  panCost, ovenSafe, lidIncluded, panMaterial,
  bestBread, breadPans,
} from "../bread-pan-calc.js";

describe("crustFormation", () => {
  it("dutch oven cast best crust formation", () => {
    expect(crustFormation("dutch_oven_cast")).toBeGreaterThan(crustFormation("pullman_lidded"));
  });
});

describe("shapeConsistency", () => {
  it("pullman lidded most consistent shape", () => {
    expect(shapeConsistency("pullman_lidded")).toBeGreaterThan(shapeConsistency("dutch_oven_cast"));
  });
});

describe("steamRetention", () => {
  it("dutch oven cast best steam retention", () => {
    expect(steamRetention("dutch_oven_cast")).toBeGreaterThan(steamRetention("baguette_perforated"));
  });
});

describe("airCirculation", () => {
  it("baguette perforated best air circulation", () => {
    expect(airCirculation("baguette_perforated")).toBeGreaterThan(airCirculation("pullman_lidded"));
  });
});

describe("panCost", () => {
  it("dutch oven cast most expensive", () => {
    expect(panCost("dutch_oven_cast")).toBeGreaterThan(panCost("loaf_tin_standard"));
  });
});

describe("ovenSafe", () => {
  it("loaf tin standard is oven safe", () => {
    expect(ovenSafe("loaf_tin_standard")).toBe(true);
  });
  it("banneton proofing is not", () => {
    expect(ovenSafe("banneton_proofing")).toBe(false);
  });
});

describe("lidIncluded", () => {
  it("pullman lidded has lid included", () => {
    expect(lidIncluded("pullman_lidded")).toBe(true);
  });
  it("loaf tin standard does not", () => {
    expect(lidIncluded("loaf_tin_standard")).toBe(false);
  });
});

describe("panMaterial", () => {
  it("banneton proofing uses natural rattan cane", () => {
    expect(panMaterial("banneton_proofing")).toBe("natural_rattan_cane");
  });
});

describe("bestBread", () => {
  it("dutch oven cast for sourdough artisan boule", () => {
    expect(bestBread("dutch_oven_cast")).toBe("sourdough_artisan_boule");
  });
});

describe("breadPans", () => {
  it("returns 5 types", () => {
    expect(breadPans()).toHaveLength(5);
  });
});
