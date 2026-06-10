import { describe, it, expect } from "vitest";
import {
  decompositionWeeks, nutrientDensity, effortRequired,
  spaceRequired, odorLevel, indoorSuitable,
  killsPathogens, bestInput, soilImprovementScore, compostTypes,
} from "../compost-type-calc.js";

describe("decompositionWeeks", () => {
  it("bokashi decomposes fastest", () => {
    expect(decompositionWeeks("bokashi")).toBeLessThan(
      decompositionWeeks("leaf_mold")
    );
  });
});

describe("nutrientDensity", () => {
  it("vermicompost is most nutrient dense", () => {
    expect(nutrientDensity("vermicompost")).toBeGreaterThan(
      nutrientDensity("leaf_mold")
    );
  });
});

describe("effortRequired", () => {
  it("hot composting needs most effort", () => {
    expect(effortRequired("hot")).toBeGreaterThan(
      effortRequired("leaf_mold")
    );
  });
});

describe("spaceRequired", () => {
  it("hot composting needs most space", () => {
    expect(spaceRequired("hot")).toBeGreaterThan(
      spaceRequired("bokashi")
    );
  });
});

describe("odorLevel", () => {
  it("bokashi has most odor", () => {
    expect(odorLevel("bokashi")).toBeGreaterThan(
      odorLevel("leaf_mold")
    );
  });
});

describe("indoorSuitable", () => {
  it("vermicompost is indoor suitable", () => {
    expect(indoorSuitable("vermicompost")).toBe(true);
  });
  it("hot is not", () => {
    expect(indoorSuitable("hot")).toBe(false);
  });
});

describe("killsPathogens", () => {
  it("hot kills pathogens", () => {
    expect(killsPathogens("hot")).toBe(true);
  });
  it("cold does not", () => {
    expect(killsPathogens("cold")).toBe(false);
  });
});

describe("bestInput", () => {
  it("vermicompost best for kitchen scraps", () => {
    expect(bestInput("vermicompost")).toBe("kitchen_scraps");
  });
});

describe("soilImprovementScore", () => {
  it("vermicompost best for soil", () => {
    expect(soilImprovementScore("vermicompost")).toBeGreaterThan(
      soilImprovementScore("bokashi")
    );
  });
});

describe("compostTypes", () => {
  it("returns 5 types", () => {
    expect(compostTypes()).toHaveLength(5);
  });
});
