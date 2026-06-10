import { describe, it, expect } from "vitest";
import {
  tensileStrength, moistureAbsorption, elasticity,
  wrinkleResistance, breathability, natural,
  animalDerived, bestSeason, costPerKg, fiberTypes,
} from "../fiber-type-calc.js";

describe("tensileStrength", () => {
  it("polyester is strongest", () => {
    expect(tensileStrength("polyester")).toBeGreaterThan(
      tensileStrength("wool")
    );
  });
});

describe("moistureAbsorption", () => {
  it("linen absorbs most", () => {
    expect(moistureAbsorption("linen")).toBeGreaterThan(
      moistureAbsorption("polyester")
    );
  });
});

describe("elasticity", () => {
  it("wool is most elastic", () => {
    expect(elasticity("wool")).toBeGreaterThan(elasticity("linen"));
  });
});

describe("wrinkleResistance", () => {
  it("polyester resists wrinkles best", () => {
    expect(wrinkleResistance("polyester")).toBeGreaterThan(
      wrinkleResistance("linen")
    );
  });
});

describe("breathability", () => {
  it("linen is most breathable", () => {
    expect(breathability("linen")).toBeGreaterThan(
      breathability("polyester")
    );
  });
});

describe("natural", () => {
  it("cotton is natural", () => {
    expect(natural("cotton")).toBe(true);
  });
  it("polyester is not natural", () => {
    expect(natural("polyester")).toBe(false);
  });
});

describe("animalDerived", () => {
  it("wool is animal derived", () => {
    expect(animalDerived("wool")).toBe(true);
  });
  it("cotton is not animal derived", () => {
    expect(animalDerived("cotton")).toBe(false);
  });
});

describe("bestSeason", () => {
  it("wool is best for winter", () => {
    expect(bestSeason("wool")).toBe("winter");
  });
});

describe("costPerKg", () => {
  it("silk costs most", () => {
    expect(costPerKg("silk")).toBeGreaterThan(costPerKg("polyester"));
  });
});

describe("fiberTypes", () => {
  it("returns 5 types", () => {
    expect(fiberTypes()).toHaveLength(5);
  });
});
