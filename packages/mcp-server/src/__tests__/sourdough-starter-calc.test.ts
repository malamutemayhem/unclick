import { describe, it, expect } from "vitest";
import {
  hydrationPercent, riseTimeHours, flavorIntensity,
  sourness, feedFrequencyDays, glutenFree,
  bestBreadType, maturityDays, costPerMonth, starterTypes,
} from "../sourdough-starter-calc.js";

describe("hydrationPercent", () => {
  it("rice starter has highest hydration", () => {
    expect(hydrationPercent("rice")).toBeGreaterThan(
      hydrationPercent("rye")
    );
  });
});

describe("riseTimeHours", () => {
  it("rice takes longest to rise", () => {
    expect(riseTimeHours("rice")).toBeGreaterThan(
      riseTimeHours("rye")
    );
  });
});

describe("flavorIntensity", () => {
  it("rye has most intense flavor", () => {
    expect(flavorIntensity("rye")).toBeGreaterThan(
      flavorIntensity("rice")
    );
  });
});

describe("sourness", () => {
  it("rye is sourest", () => {
    expect(sourness("rye")).toBeGreaterThan(
      sourness("rice")
    );
  });
});

describe("feedFrequencyDays", () => {
  it("white flour needs least frequent feeding", () => {
    expect(feedFrequencyDays("white_flour")).toBeGreaterThan(
      feedFrequencyDays("rye")
    );
  });
});

describe("glutenFree", () => {
  it("rice is gluten free", () => {
    expect(glutenFree("rice")).toBe(true);
  });
  it("white flour is not", () => {
    expect(glutenFree("white_flour")).toBe(false);
  });
});

describe("bestBreadType", () => {
  it("rye best for pumpernickel", () => {
    expect(bestBreadType("rye")).toBe("pumpernickel");
  });
});

describe("maturityDays", () => {
  it("rice takes longest to mature", () => {
    expect(maturityDays("rice")).toBeGreaterThan(
      maturityDays("rye")
    );
  });
});

describe("costPerMonth", () => {
  it("spelt costs most per month", () => {
    expect(costPerMonth("spelt")).toBeGreaterThan(
      costPerMonth("white_flour")
    );
  });
});

describe("starterTypes", () => {
  it("returns 5 types", () => {
    expect(starterTypes()).toHaveLength(5);
  });
});
