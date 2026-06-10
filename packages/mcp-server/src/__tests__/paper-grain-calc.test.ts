import { describe, it, expect } from "vitest";
import {
  grainDirectionFactor, basisWeightGsm, foldEndurance, tearStrengthMn,
  absorbencySeconds, phLevel, archivalLifeYears, sheetsPerKg,
  costPerSheet, paperTypes,
} from "../paper-grain-calc.js";

describe("grainDirectionFactor", () => {
  it("with grain is 1.0", () => {
    expect(grainDirectionFactor(true)).toBe(1.0);
  });
  it("against grain is 0.6", () => {
    expect(grainDirectionFactor(false)).toBe(0.6);
  });
});

describe("basisWeightGsm", () => {
  it("cotton rag is heaviest", () => {
    expect(basisWeightGsm("cotton_rag")).toBeGreaterThan(basisWeightGsm("gampi"));
  });
});

describe("foldEndurance", () => {
  it("kozo has highest fold endurance", () => {
    expect(foldEndurance("kozo")).toBeGreaterThan(foldEndurance("cotton_rag"));
  });
});

describe("tearStrengthMn", () => {
  it("kozo has highest tear strength", () => {
    expect(tearStrengthMn("kozo")).toBeGreaterThan(tearStrengthMn("gampi"));
  });
});

describe("absorbencySeconds", () => {
  it("kozo absorbs fastest", () => {
    expect(absorbencySeconds("kozo")).toBeLessThan(absorbencySeconds("cotton_rag"));
  });
});

describe("phLevel", () => {
  it("all types are near neutral", () => {
    expect(phLevel("cotton_rag")).toBeGreaterThanOrEqual(6.5);
    expect(phLevel("cotton_rag")).toBeLessThanOrEqual(7.5);
  });
});

describe("archivalLifeYears", () => {
  it("kozo lasts longest", () => {
    expect(archivalLifeYears("kozo")).toBeGreaterThan(
      archivalLifeYears("cotton_rag")
    );
  });
});

describe("sheetsPerKg", () => {
  it("lighter papers yield more sheets", () => {
    expect(sheetsPerKg("gampi")).toBeGreaterThan(sheetsPerKg("cotton_rag"));
  });
});

describe("costPerSheet", () => {
  it("gampi is most expensive", () => {
    expect(costPerSheet("gampi")).toBeGreaterThan(costPerSheet("cotton_rag"));
  });
});

describe("paperTypes", () => {
  it("returns 5 types", () => {
    expect(paperTypes()).toHaveLength(5);
  });
});
