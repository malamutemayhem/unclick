import { describe, it, expect } from "vitest";
import {
  brinePercentByWeight, fermentationTempCelsius, fermentationDays, phTarget,
  crunchRetention, probioticLevel, flavorComplexity, shelfLifeMonths,
  costPerKg, fermentVegetables,
} from "../lacto-ferment-calc.js";

describe("brinePercentByWeight", () => {
  it("cucumber uses most brine", () => {
    expect(brinePercentByWeight("cucumber")).toBeGreaterThan(
      brinePercentByWeight("cabbage")
    );
  });
});

describe("fermentationTempCelsius", () => {
  it("returns valid range", () => {
    const range = fermentationTempCelsius();
    expect(range.min).toBeLessThan(range.max);
  });
});

describe("fermentationDays", () => {
  it("cabbage takes longest", () => {
    expect(fermentationDays("cabbage")).toBeGreaterThan(
      fermentationDays("radish")
    );
  });
});

describe("phTarget", () => {
  it("returns 3.5", () => {
    expect(phTarget()).toBe(3.5);
  });
});

describe("crunchRetention", () => {
  it("carrot retains crunch best", () => {
    expect(crunchRetention("carrot")).toBeGreaterThan(
      crunchRetention("cabbage")
    );
  });
});

describe("probioticLevel", () => {
  it("cabbage has highest probiotic level", () => {
    expect(probioticLevel("cabbage")).toBeGreaterThan(
      probioticLevel("carrot")
    );
  });
});

describe("flavorComplexity", () => {
  it("cabbage has most complex flavor", () => {
    expect(flavorComplexity("cabbage")).toBeGreaterThan(
      flavorComplexity("cucumber")
    );
  });
});

describe("shelfLifeMonths", () => {
  it("returns 12", () => {
    expect(shelfLifeMonths()).toBe(12);
  });
});

describe("costPerKg", () => {
  it("pepper is most expensive", () => {
    expect(costPerKg("pepper")).toBeGreaterThan(costPerKg("cabbage"));
  });
});

describe("fermentVegetables", () => {
  it("returns 5 vegetables", () => {
    expect(fermentVegetables()).toHaveLength(5);
  });
});
