import { describe, it, expect } from "vitest";
import {
  durabilityYears, smoothness, inkAbsorption,
  erasability, foldability, animalDerived,
  transparencyPossible, bestScript, costPerSheet, parchmentTypes,
} from "../parchment-type-calc.js";

describe("durabilityYears", () => {
  it("vellum lasts longest", () => {
    expect(durabilityYears("vellum")).toBeGreaterThan(
      durabilityYears("rice_paper")
    );
  });
});

describe("smoothness", () => {
  it("vellum is smoothest", () => {
    expect(smoothness("vellum")).toBeGreaterThan(
      smoothness("papyrus")
    );
  });
});

describe("inkAbsorption", () => {
  it("rice paper absorbs most ink", () => {
    expect(inkAbsorption("rice_paper")).toBeGreaterThan(
      inkAbsorption("vellum")
    );
  });
});

describe("erasability", () => {
  it("vellum is most erasable", () => {
    expect(erasability("vellum")).toBeGreaterThan(
      erasability("rice_paper")
    );
  });
});

describe("foldability", () => {
  it("rice paper folds best", () => {
    expect(foldability("rice_paper")).toBeGreaterThan(
      foldability("papyrus")
    );
  });
});

describe("animalDerived", () => {
  it("vellum is animal derived", () => {
    expect(animalDerived("vellum")).toBe(true);
  });
  it("papyrus is not", () => {
    expect(animalDerived("papyrus")).toBe(false);
  });
});

describe("transparencyPossible", () => {
  it("vellum can be transparent", () => {
    expect(transparencyPossible("vellum")).toBe(true);
  });
  it("goatskin cannot", () => {
    expect(transparencyPossible("goatskin")).toBe(false);
  });
});

describe("bestScript", () => {
  it("papyrus best for hieroglyphics", () => {
    expect(bestScript("papyrus")).toBe("hieroglyphics");
  });
});

describe("costPerSheet", () => {
  it("vellum costs most", () => {
    expect(costPerSheet("vellum")).toBeGreaterThan(
      costPerSheet("rice_paper")
    );
  });
});

describe("parchmentTypes", () => {
  it("returns 5 types", () => {
    expect(parchmentTypes()).toHaveLength(5);
  });
});
