import { describe, it, expect } from "vitest";
import {
  sheetsPerHide, thicknessMm, preparationDays, limeSoakingDays,
  scrapingPasses, stretchingTensionKg, inkAbsorptionRating,
  durabilityYears, costPerSheet, vellumGrades,
} from "../vellum-calc.js";

describe("sheetsPerHide", () => {
  it("larger hide = more sheets", () => {
    expect(sheetsPerHide(10, 30, 40)).toBeGreaterThan(sheetsPerHide(5, 30, 40));
  });
  it("zero dimensions returns zero", () => {
    expect(sheetsPerHide(10, 0, 40)).toBe(0);
  });
});

describe("thicknessMm", () => {
  it("uterine thinnest", () => {
    expect(thicknessMm("uterine")).toBeLessThan(thicknessMm("split"));
  });
});

describe("preparationDays", () => {
  it("uterine takes longest", () => {
    expect(preparationDays("uterine")).toBeGreaterThan(preparationDays("split"));
  });
});

describe("limeSoakingDays", () => {
  it("calf soaks longest", () => {
    expect(limeSoakingDays("calf")).toBeGreaterThan(limeSoakingDays("split"));
  });
});

describe("scrapingPasses", () => {
  it("uterine needs most scraping", () => {
    expect(scrapingPasses("uterine")).toBeGreaterThan(scrapingPasses("split"));
  });
});

describe("stretchingTensionKg", () => {
  it("larger area = more tension", () => {
    expect(stretchingTensionKg(2)).toBeGreaterThan(stretchingTensionKg(1));
  });
});

describe("inkAbsorptionRating", () => {
  it("uterine absorbs best", () => {
    expect(inkAbsorptionRating("uterine")).toBeGreaterThan(inkAbsorptionRating("split"));
  });
});

describe("durabilityYears", () => {
  it("uterine lasts longest", () => {
    expect(durabilityYears("uterine")).toBeGreaterThan(durabilityYears("split"));
  });
});

describe("costPerSheet", () => {
  it("uterine most expensive", () => {
    expect(costPerSheet("uterine", 10)).toBeGreaterThan(costPerSheet("split", 10));
  });
});

describe("vellumGrades", () => {
  it("returns 5 grades", () => {
    expect(vellumGrades()).toHaveLength(5);
  });
});
