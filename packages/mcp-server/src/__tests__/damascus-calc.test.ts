import { describe, it, expect } from "vitest";
import {
  layerCount, billetWeight, forgingTempC, weldingTempC,
  heatsRequired, fluxType, etchTime, contrastRating,
  patternComplexity, grindingGrit, hardeningTempC, patternTypes,
} from "../damascus-calc.js";

describe("layerCount", () => {
  it("8 folds = 256 layers", () => {
    expect(layerCount(8)).toBe(256);
  });
});

describe("billetWeight", () => {
  it("less than input", () => {
    expect(billetWeight(2, 256)).toBeLessThan(2);
  });
});

describe("forgingTempC", () => {
  it("positive temp", () => {
    expect(forgingTempC("1095")).toBeGreaterThan(900);
  });
});

describe("weldingTempC", () => {
  it("is 1200", () => {
    expect(weldingTempC()).toBe(1200);
  });
});

describe("heatsRequired", () => {
  it("folds + 2", () => {
    expect(heatsRequired(8)).toBe(10);
  });
});

describe("fluxType", () => {
  it("is borax", () => {
    expect(fluxType()).toBe("borax");
  });
});

describe("etchTime", () => {
  it("ferric_chloride = 15 min", () => {
    expect(etchTime("ferric_chloride")).toBe(15);
  });
});

describe("contrastRating", () => {
  it("1095 vs 15n20 highest contrast", () => {
    expect(contrastRating("1095", "15n20")).toBeGreaterThan(contrastRating("1095", "O1"));
  });
});

describe("patternComplexity", () => {
  it("mosaic = 10", () => {
    expect(patternComplexity("mosaic")).toBe(10);
  });
});

describe("grindingGrit", () => {
  it("mirror = 2000", () => {
    expect(grindingGrit("mirror")).toBe(2000);
  });
});

describe("hardeningTempC", () => {
  it("positive temp", () => {
    expect(hardeningTempC("1095")).toBeGreaterThan(700);
  });
});

describe("patternTypes", () => {
  it("returns 6 types", () => {
    expect(patternTypes()).toHaveLength(6);
  });
});
