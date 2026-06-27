import { describe, it, expect } from "vitest";
import {
  avgTempCelsius, annualRainfallMm, biodiversityIndex,
  seasonalVariation, agriculturalPotential, permafrostPresent,
  yearRoundGrowing, koeppenPrefix, populationDensity, climateZones,
} from "../climate-zone-calc.js";

describe("avgTempCelsius", () => {
  it("arid is hottest", () => {
    expect(avgTempCelsius("arid")).toBeGreaterThan(
      avgTempCelsius("polar")
    );
  });
});

describe("annualRainfallMm", () => {
  it("tropical has most rainfall", () => {
    expect(annualRainfallMm("tropical")).toBeGreaterThan(
      annualRainfallMm("polar")
    );
  });
});

describe("biodiversityIndex", () => {
  it("tropical has highest biodiversity", () => {
    expect(biodiversityIndex("tropical")).toBeGreaterThan(
      biodiversityIndex("polar")
    );
  });
});

describe("seasonalVariation", () => {
  it("continental has most seasonal variation", () => {
    expect(seasonalVariation("continental")).toBeGreaterThan(
      seasonalVariation("tropical")
    );
  });
});

describe("agriculturalPotential", () => {
  it("temperate has highest agricultural potential", () => {
    expect(agriculturalPotential("temperate")).toBeGreaterThan(
      agriculturalPotential("polar")
    );
  });
});

describe("permafrostPresent", () => {
  it("polar has permafrost", () => {
    expect(permafrostPresent("polar")).toBe(true);
  });
  it("tropical does not", () => {
    expect(permafrostPresent("tropical")).toBe(false);
  });
});

describe("yearRoundGrowing", () => {
  it("tropical has year round growing", () => {
    expect(yearRoundGrowing("tropical")).toBe(true);
  });
  it("continental does not", () => {
    expect(yearRoundGrowing("continental")).toBe(false);
  });
});

describe("koeppenPrefix", () => {
  it("tropical is A", () => {
    expect(koeppenPrefix("tropical")).toBe("A");
  });
});

describe("populationDensity", () => {
  it("temperate has highest population density", () => {
    expect(populationDensity("temperate")).toBeGreaterThan(
      populationDensity("polar")
    );
  });
});

describe("climateZones", () => {
  it("returns 5 zones", () => {
    expect(climateZones()).toHaveLength(5);
  });
});
