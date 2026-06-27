import { describe, it, expect } from "vitest";
import {
  saltPercentByWeight, saltGrams, fermentationTempCelsius, fermentationDays,
  crunchRetention, flavorComplexity, jarSizeLiters, shelfLifeMonths,
  costPerKg, cabbageTypes,
} from "../sauerkraut-calc.js";

describe("saltPercentByWeight", () => {
  it("returns 2", () => {
    expect(saltPercentByWeight()).toBe(2);
  });
});

describe("saltGrams", () => {
  it("more cabbage = more salt", () => {
    expect(saltGrams(5)).toBeGreaterThan(saltGrams(2));
  });
});

describe("fermentationTempCelsius", () => {
  it("returns 20", () => {
    expect(fermentationTempCelsius()).toBe(20);
  });
});

describe("fermentationDays", () => {
  it("red takes longest", () => {
    expect(fermentationDays("red")).toBeGreaterThan(
      fermentationDays("napa")
    );
  });
});

describe("crunchRetention", () => {
  it("green retains crunch best", () => {
    expect(crunchRetention("green")).toBeGreaterThan(
      crunchRetention("savoy")
    );
  });
});

describe("flavorComplexity", () => {
  it("red has most complex flavor", () => {
    expect(flavorComplexity("red")).toBeGreaterThan(
      flavorComplexity("green")
    );
  });
});

describe("jarSizeLiters", () => {
  it("more cabbage = bigger jar", () => {
    expect(jarSizeLiters(5)).toBeGreaterThan(jarSizeLiters(2));
  });
});

describe("shelfLifeMonths", () => {
  it("returns 12", () => {
    expect(shelfLifeMonths()).toBe(12);
  });
});

describe("costPerKg", () => {
  it("napa is most expensive", () => {
    expect(costPerKg("napa")).toBeGreaterThan(costPerKg("green"));
  });
});

describe("cabbageTypes", () => {
  it("returns 5 types", () => {
    expect(cabbageTypes()).toHaveLength(5);
  });
});
