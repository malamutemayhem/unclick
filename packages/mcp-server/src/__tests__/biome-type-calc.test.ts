import { describe, it, expect } from "vitest";
import {
  annualRainfallMm, avgTempCelsius, speciesRichness,
  canopyHeight, soilFertility, fireAdapted,
  seasonalDormancy, dominantVegetation, carbonStorageTonPerHa, biomeTypes,
} from "../biome-type-calc.js";

describe("annualRainfallMm", () => {
  it("rainforest has most rainfall", () => {
    expect(annualRainfallMm("rainforest")).toBeGreaterThan(
      annualRainfallMm("tundra")
    );
  });
});

describe("avgTempCelsius", () => {
  it("rainforest is warmest", () => {
    expect(avgTempCelsius("rainforest")).toBeGreaterThan(
      avgTempCelsius("tundra")
    );
  });
});

describe("speciesRichness", () => {
  it("rainforest has most species", () => {
    expect(speciesRichness("rainforest")).toBeGreaterThan(
      speciesRichness("tundra")
    );
  });
});

describe("canopyHeight", () => {
  it("rainforest has tallest canopy", () => {
    expect(canopyHeight("rainforest")).toBeGreaterThan(
      canopyHeight("tundra")
    );
  });
});

describe("soilFertility", () => {
  it("savanna has more fertile soil than rainforest", () => {
    expect(soilFertility("savanna")).toBeGreaterThan(
      soilFertility("rainforest")
    );
  });
});

describe("fireAdapted", () => {
  it("chaparral is fire adapted", () => {
    expect(fireAdapted("chaparral")).toBe(true);
  });
  it("rainforest is not", () => {
    expect(fireAdapted("rainforest")).toBe(false);
  });
});

describe("seasonalDormancy", () => {
  it("tundra has seasonal dormancy", () => {
    expect(seasonalDormancy("tundra")).toBe(true);
  });
  it("rainforest does not", () => {
    expect(seasonalDormancy("rainforest")).toBe(false);
  });
});

describe("dominantVegetation", () => {
  it("taiga is coniferous", () => {
    expect(dominantVegetation("taiga")).toBe("coniferous_trees");
  });
});

describe("carbonStorageTonPerHa", () => {
  it("rainforest stores most carbon", () => {
    expect(carbonStorageTonPerHa("rainforest")).toBeGreaterThan(
      carbonStorageTonPerHa("chaparral")
    );
  });
});

describe("biomeTypes", () => {
  it("returns 5 types", () => {
    expect(biomeTypes()).toHaveLength(5);
  });
});
