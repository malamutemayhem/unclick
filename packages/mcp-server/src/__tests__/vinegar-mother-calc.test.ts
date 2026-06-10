import { describe, it, expect } from "vitest";
import {
  fermentationWeeks, acidityPercent, flavorComplexity,
  motherViability, agingMonths, bestCulinaryUse,
  sugarContentNeeded, pasteurized, costPerLiter, vinegarBases,
} from "../vinegar-mother-calc.js";

describe("fermentationWeeks", () => {
  it("rice ferments longest", () => {
    expect(fermentationWeeks("rice")).toBeGreaterThan(
      fermentationWeeks("cider")
    );
  });
});

describe("acidityPercent", () => {
  it("wine has highest acidity", () => {
    expect(acidityPercent("wine")).toBeGreaterThan(
      acidityPercent("coconut")
    );
  });
});

describe("flavorComplexity", () => {
  it("wine is most complex", () => {
    expect(flavorComplexity("wine")).toBeGreaterThan(
      flavorComplexity("rice")
    );
  });
});

describe("motherViability", () => {
  it("cider mother is most viable", () => {
    expect(motherViability("cider")).toBeGreaterThan(
      motherViability("rice")
    );
  });
});

describe("agingMonths", () => {
  it("rice ages longest", () => {
    expect(agingMonths("rice")).toBeGreaterThan(
      agingMonths("coconut")
    );
  });
});

describe("bestCulinaryUse", () => {
  it("rice vinegar is best for sushi", () => {
    expect(bestCulinaryUse("rice")).toBe("sushi");
  });
});

describe("sugarContentNeeded", () => {
  it("rice needs extra sugar", () => {
    expect(sugarContentNeeded("rice")).toBe(true);
  });
  it("wine does not", () => {
    expect(sugarContentNeeded("wine")).toBe(false);
  });
});

describe("pasteurized", () => {
  it("malt is pasteurized", () => {
    expect(pasteurized("malt")).toBe(true);
  });
  it("wine is not", () => {
    expect(pasteurized("wine")).toBe(false);
  });
});

describe("costPerLiter", () => {
  it("wine costs most", () => {
    expect(costPerLiter("wine")).toBeGreaterThan(
      costPerLiter("malt")
    );
  });
});

describe("vinegarBases", () => {
  it("returns 5 bases", () => {
    expect(vinegarBases()).toHaveLength(5);
  });
});
