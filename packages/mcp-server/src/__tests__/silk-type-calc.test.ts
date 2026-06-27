import { describe, it, expect } from "vitest";
import {
  fiberDenierRange, tensileStrengthMpa, luster,
  drapeability, dyeAbsorption, commerciallyFarmed,
  naturalColor, bestApplication, costPerKg, silkTypes,
} from "../silk-type-calc.js";

describe("fiberDenierRange", () => {
  it("spider silk is finest", () => {
    expect(fiberDenierRange("spider")).toBeLessThan(
      fiberDenierRange("mulberry")
    );
  });
});

describe("tensileStrengthMpa", () => {
  it("spider silk is strongest", () => {
    expect(tensileStrengthMpa("spider")).toBeGreaterThan(
      tensileStrengthMpa("mulberry")
    );
  });
});

describe("luster", () => {
  it("mulberry has most luster", () => {
    expect(luster("mulberry")).toBeGreaterThan(
      luster("eri")
    );
  });
});

describe("drapeability", () => {
  it("mulberry drapes best", () => {
    expect(drapeability("mulberry")).toBeGreaterThan(
      drapeability("eri")
    );
  });
});

describe("dyeAbsorption", () => {
  it("mulberry absorbs dye best", () => {
    expect(dyeAbsorption("mulberry")).toBeGreaterThan(
      dyeAbsorption("spider")
    );
  });
});

describe("commerciallyFarmed", () => {
  it("mulberry is farmed", () => {
    expect(commerciallyFarmed("mulberry")).toBe(true);
  });
  it("spider silk is not farmed", () => {
    expect(commerciallyFarmed("spider")).toBe(false);
  });
});

describe("naturalColor", () => {
  it("muga silk is golden", () => {
    expect(naturalColor("muga")).toBe("golden");
  });
});

describe("bestApplication", () => {
  it("spider silk for biomedical", () => {
    expect(bestApplication("spider")).toBe("biomedical");
  });
});

describe("costPerKg", () => {
  it("spider silk costs most", () => {
    expect(costPerKg("spider")).toBeGreaterThan(
      costPerKg("mulberry")
    );
  });
});

describe("silkTypes", () => {
  it("returns 5 types", () => {
    expect(silkTypes()).toHaveLength(5);
  });
});
