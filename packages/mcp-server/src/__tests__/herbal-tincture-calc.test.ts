import { describe, it, expect } from "vitest";
import {
  extractionStrength, steepingWeeks, shelfLifeMonths,
  alcoholFree, tasteRating, childSafe,
  herbToSolventRatio, bestHerb, costPerLiter, tinctureSolvents,
} from "../herbal-tincture-calc.js";

describe("extractionStrength", () => {
  it("ethanol is strongest extractor", () => {
    expect(extractionStrength("ethanol")).toBeGreaterThan(
      extractionStrength("honey")
    );
  });
});

describe("steepingWeeks", () => {
  it("glycerin steeps longest", () => {
    expect(steepingWeeks("glycerin")).toBeGreaterThan(
      steepingWeeks("vinegar")
    );
  });
});

describe("shelfLifeMonths", () => {
  it("ethanol lasts longest", () => {
    expect(shelfLifeMonths("ethanol")).toBeGreaterThan(
      shelfLifeMonths("oil")
    );
  });
});

describe("alcoholFree", () => {
  it("glycerin is alcohol free", () => {
    expect(alcoholFree("glycerin")).toBe(true);
  });
  it("ethanol is not", () => {
    expect(alcoholFree("ethanol")).toBe(false);
  });
});

describe("tasteRating", () => {
  it("honey tastes best", () => {
    expect(tasteRating("honey")).toBeGreaterThan(
      tasteRating("ethanol")
    );
  });
});

describe("childSafe", () => {
  it("glycerin is child safe", () => {
    expect(childSafe("glycerin")).toBe(true);
  });
  it("ethanol is not", () => {
    expect(childSafe("ethanol")).toBe(false);
  });
});

describe("herbToSolventRatio", () => {
  it("ethanol uses 1:5 ratio", () => {
    expect(herbToSolventRatio("ethanol")).toBe("1:5");
  });
});

describe("bestHerb", () => {
  it("calendula is best in oil", () => {
    expect(bestHerb("oil")).toBe("calendula");
  });
});

describe("costPerLiter", () => {
  it("honey costs most", () => {
    expect(costPerLiter("honey")).toBeGreaterThan(
      costPerLiter("vinegar")
    );
  });
});

describe("tinctureSolvents", () => {
  it("returns 5 solvents", () => {
    expect(tinctureSolvents()).toHaveLength(5);
  });
});
