import { describe, it, expect } from "vitest";
import {
  rainfallMmPerYear, grassHeightMeters, biodiversityScore,
  soilFertility, fireFrequencyYears, hasScatteredTrees,
  agriculturalConversion, iconicAnimal, continentLocation, grasslandTypes,
} from "../grassland-type-calc.js";

describe("rainfallMmPerYear", () => {
  it("pampas gets most rain", () => {
    expect(rainfallMmPerYear("pampas")).toBeGreaterThan(
      rainfallMmPerYear("steppe")
    );
  });
});

describe("grassHeightMeters", () => {
  it("savanna has tallest grass", () => {
    expect(grassHeightMeters("savanna")).toBeGreaterThan(
      grassHeightMeters("steppe")
    );
  });
});

describe("biodiversityScore", () => {
  it("savanna has highest biodiversity", () => {
    expect(biodiversityScore("savanna")).toBeGreaterThan(
      biodiversityScore("steppe")
    );
  });
});

describe("soilFertility", () => {
  it("prairie has most fertile soil", () => {
    expect(soilFertility("prairie")).toBeGreaterThan(
      soilFertility("savanna")
    );
  });
});

describe("fireFrequencyYears", () => {
  it("savanna burns most frequently", () => {
    expect(fireFrequencyYears("savanna")).toBeLessThan(
      fireFrequencyYears("pampas")
    );
  });
});

describe("hasScatteredTrees", () => {
  it("savanna has scattered trees", () => {
    expect(hasScatteredTrees("savanna")).toBe(true);
  });
  it("prairie does not", () => {
    expect(hasScatteredTrees("prairie")).toBe(false);
  });
});

describe("agriculturalConversion", () => {
  it("prairie is converted to agriculture", () => {
    expect(agriculturalConversion("prairie")).toBe(true);
  });
  it("savanna is not", () => {
    expect(agriculturalConversion("savanna")).toBe(false);
  });
});

describe("iconicAnimal", () => {
  it("prairie has bison", () => {
    expect(iconicAnimal("prairie")).toBe("bison");
  });
});

describe("continentLocation", () => {
  it("savanna in africa", () => {
    expect(continentLocation("savanna")).toBe("africa");
  });
});

describe("grasslandTypes", () => {
  it("returns 5 types", () => {
    expect(grasslandTypes()).toHaveLength(5);
  });
});
