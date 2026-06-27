import { describe, it, expect } from "vitest";
import {
  permanence, flowability, colorIntensity,
  preparationHours, acidContent, waterproof,
  naturalSource, bestSurface, costPerLiter, inkRecipes,
} from "../ink-recipe-calc.js";

describe("permanence", () => {
  it("carbon black is most permanent", () => {
    expect(permanence("carbon_black")).toBeGreaterThan(
      permanence("walnut")
    );
  });
});

describe("flowability", () => {
  it("walnut flows best", () => {
    expect(flowability("walnut")).toBeGreaterThan(
      flowability("carbon_black")
    );
  });
});

describe("colorIntensity", () => {
  it("carbon black is most intense", () => {
    expect(colorIntensity("carbon_black")).toBeGreaterThan(
      colorIntensity("walnut")
    );
  });
});

describe("preparationHours", () => {
  it("oak gall takes longest to prepare", () => {
    expect(preparationHours("oak_gall")).toBeGreaterThan(
      preparationHours("sepia")
    );
  });
});

describe("acidContent", () => {
  it("iron gall has most acid", () => {
    expect(acidContent("iron_gall")).toBeGreaterThan(
      acidContent("carbon_black")
    );
  });
});

describe("waterproof", () => {
  it("iron gall is waterproof", () => {
    expect(waterproof("iron_gall")).toBe(true);
  });
  it("walnut is not", () => {
    expect(waterproof("walnut")).toBe(false);
  });
});

describe("naturalSource", () => {
  it("all inks are natural", () => {
    expect(naturalSource("carbon_black")).toBe(true);
  });
});

describe("bestSurface", () => {
  it("iron gall best on parchment", () => {
    expect(bestSurface("iron_gall")).toBe("parchment");
  });
});

describe("costPerLiter", () => {
  it("sepia costs most", () => {
    expect(costPerLiter("sepia")).toBeGreaterThan(
      costPerLiter("walnut")
    );
  });
});

describe("inkRecipes", () => {
  it("returns 5 recipes", () => {
    expect(inkRecipes()).toHaveLength(5);
  });
});
