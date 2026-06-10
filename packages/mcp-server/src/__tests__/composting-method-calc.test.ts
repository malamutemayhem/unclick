import { describe, it, expect } from "vitest";
import {
  decompositionWeeks, nutrientDensity, laborRequired,
  odorLevel, spaceRequired, killsPathogens,
  indoorSuitable, bestInput, carbonFootprint, compostingMethods,
} from "../composting-method-calc.js";

describe("decompositionWeeks", () => {
  it("bokashi is fastest", () => {
    expect(decompositionWeeks("bokashi")).toBeLessThan(
      decompositionWeeks("cold")
    );
  });
});

describe("nutrientDensity", () => {
  it("vermicompost is most nutrient dense", () => {
    expect(nutrientDensity("vermicompost")).toBeGreaterThan(
      nutrientDensity("cold")
    );
  });
});

describe("laborRequired", () => {
  it("cold requires least labor", () => {
    expect(laborRequired("cold")).toBeLessThan(
      laborRequired("hot")
    );
  });
});

describe("odorLevel", () => {
  it("hot has most odor", () => {
    expect(odorLevel("hot")).toBeGreaterThan(
      odorLevel("bokashi")
    );
  });
});

describe("spaceRequired", () => {
  it("bokashi needs least space", () => {
    expect(spaceRequired("bokashi")).toBeLessThan(
      spaceRequired("trench")
    );
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

describe("indoorSuitable", () => {
  it("vermicompost is indoor suitable", () => {
    expect(indoorSuitable("vermicompost")).toBe(true);
  });
  it("hot is not", () => {
    expect(indoorSuitable("hot")).toBe(false);
  });
});

describe("bestInput", () => {
  it("bokashi handles all food waste", () => {
    expect(bestInput("bokashi")).toBe("all_food_waste");
  });
});

describe("carbonFootprint", () => {
  it("bokashi has lowest carbon footprint", () => {
    expect(carbonFootprint("bokashi")).toBeLessThan(
      carbonFootprint("cold")
    );
  });
});

describe("compostingMethods", () => {
  it("returns 5 types", () => {
    expect(compostingMethods()).toHaveLength(5);
  });
});
