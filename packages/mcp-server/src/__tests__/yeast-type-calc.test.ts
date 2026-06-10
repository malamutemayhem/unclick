import { describe, it, expect } from "vitest";
import {
  optimalTempC, fermentationSpeed, flavorComplexity,
  alcoholTolerance, flocculationRate, topFermenting,
  requiresStarter, primaryProduct, speciesName, yeastTypes,
} from "../yeast-type-calc.js";

describe("optimalTempC", () => {
  it("bread yeast highest temp", () => {
    expect(optimalTempC("bread")).toBeGreaterThan(
      optimalTempC("lager")
    );
  });
});

describe("fermentationSpeed", () => {
  it("bread fastest fermentation", () => {
    expect(fermentationSpeed("bread")).toBeGreaterThan(
      fermentationSpeed("wild")
    );
  });
});

describe("flavorComplexity", () => {
  it("wild most complex flavor", () => {
    expect(flavorComplexity("wild")).toBeGreaterThan(
      flavorComplexity("lager")
    );
  });
});

describe("alcoholTolerance", () => {
  it("wine yeast highest tolerance", () => {
    expect(alcoholTolerance("wine")).toBeGreaterThan(
      alcoholTolerance("bread")
    );
  });
});

describe("flocculationRate", () => {
  it("lager best flocculation", () => {
    expect(flocculationRate("lager")).toBeGreaterThan(
      flocculationRate("wild")
    );
  });
});

describe("topFermenting", () => {
  it("ale is top fermenting", () => {
    expect(topFermenting("ale")).toBe(true);
  });
  it("lager is not", () => {
    expect(topFermenting("lager")).toBe(false);
  });
});

describe("requiresStarter", () => {
  it("lager requires starter", () => {
    expect(requiresStarter("lager")).toBe(true);
  });
  it("ale does not", () => {
    expect(requiresStarter("ale")).toBe(false);
  });
});

describe("primaryProduct", () => {
  it("wild for sours", () => {
    expect(primaryProduct("wild")).toBe("sours_lambics");
  });
});

describe("speciesName", () => {
  it("lager is pastorianus", () => {
    expect(speciesName("lager")).toBe("saccharomyces_pastorianus");
  });
});

describe("yeastTypes", () => {
  it("returns 5 types", () => {
    expect(yeastTypes()).toHaveLength(5);
  });
});
