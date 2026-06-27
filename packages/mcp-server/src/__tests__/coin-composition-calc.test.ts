import { describe, it, expect } from "vitest";
import {
  intrinsicValue, corrosionResistance, strikeQuality, tonePotential,
  productionCost, preciousMetal, magneticProperty, historicalUsage,
  colorAppearance, coinCompositions,
} from "../coin-composition-calc.js";

describe("intrinsicValue", () => {
  it("gold highest intrinsic value", () => {
    expect(intrinsicValue("gold")).toBeGreaterThan(intrinsicValue("clad"));
  });
});

describe("corrosionResistance", () => {
  it("gold best corrosion resistance", () => {
    expect(corrosionResistance("gold")).toBeGreaterThan(corrosionResistance("copper"));
  });
});

describe("strikeQuality", () => {
  it("gold best strike quality", () => {
    expect(strikeQuality("gold")).toBeGreaterThan(strikeQuality("clad"));
  });
});

describe("tonePotential", () => {
  it("copper best tone potential", () => {
    expect(tonePotential("copper")).toBeGreaterThan(tonePotential("gold"));
  });
});

describe("productionCost", () => {
  it("gold most expensive to produce", () => {
    expect(productionCost("gold")).toBeGreaterThan(productionCost("clad"));
  });
});

describe("preciousMetal", () => {
  it("gold is precious", () => {
    expect(preciousMetal("gold")).toBe(true);
  });
  it("clad is not precious", () => {
    expect(preciousMetal("clad")).toBe(false);
  });
});

describe("magneticProperty", () => {
  it("nickel is magnetic", () => {
    expect(magneticProperty("nickel")).toBe(true);
  });
  it("copper is not", () => {
    expect(magneticProperty("copper")).toBe(false);
  });
});

describe("historicalUsage", () => {
  it("gold for eagles and sovereigns", () => {
    expect(historicalUsage("gold")).toBe("eagles_sovereigns");
  });
});

describe("colorAppearance", () => {
  it("copper is reddish brown", () => {
    expect(colorAppearance("copper")).toBe("reddish_brown");
  });
});

describe("coinCompositions", () => {
  it("returns 5 compositions", () => {
    expect(coinCompositions()).toHaveLength(5);
  });
});
