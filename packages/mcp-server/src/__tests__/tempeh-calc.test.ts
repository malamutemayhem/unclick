import { describe, it, expect } from "vitest";
import {
  soakingHours, cookingMinutes, fermentationTempCelsius,
  fermentationHours, proteinPercentDry, myceliumCoverage,
  textureRating, dehullingRequired, costPerKg, tempehBeans,
} from "../tempeh-calc.js";

describe("soakingHours", () => {
  it("chickpea soaks longest", () => {
    expect(soakingHours("chickpea")).toBeGreaterThan(
      soakingHours("lentil")
    );
  });
});

describe("cookingMinutes", () => {
  it("chickpea cooks longest", () => {
    expect(cookingMinutes("chickpea")).toBeGreaterThan(
      cookingMinutes("lentil")
    );
  });
});

describe("fermentationTempCelsius", () => {
  it("chickpea ferments warmest", () => {
    expect(fermentationTempCelsius("chickpea")).toBeGreaterThanOrEqual(
      fermentationTempCelsius("black_bean")
    );
  });
});

describe("fermentationHours", () => {
  it("chickpea ferments longest", () => {
    expect(fermentationHours("chickpea")).toBeGreaterThan(
      fermentationHours("lentil")
    );
  });
});

describe("proteinPercentDry", () => {
  it("soybean has most protein", () => {
    expect(proteinPercentDry("soybean")).toBeGreaterThan(
      proteinPercentDry("chickpea")
    );
  });
});

describe("myceliumCoverage", () => {
  it("soybean has best coverage", () => {
    expect(myceliumCoverage("soybean")).toBeGreaterThan(
      myceliumCoverage("chickpea")
    );
  });
});

describe("textureRating", () => {
  it("soybean has best texture", () => {
    expect(textureRating("soybean")).toBeGreaterThan(
      textureRating("lentil")
    );
  });
});

describe("dehullingRequired", () => {
  it("soybean needs dehulling", () => {
    expect(dehullingRequired("soybean")).toBe(true);
  });
  it("chickpea does not", () => {
    expect(dehullingRequired("chickpea")).toBe(false);
  });
});

describe("costPerKg", () => {
  it("peanut is most expensive", () => {
    expect(costPerKg("peanut")).toBeGreaterThan(costPerKg("soybean"));
  });
});

describe("tempehBeans", () => {
  it("returns 5 beans", () => {
    expect(tempehBeans()).toHaveLength(5);
  });
});
