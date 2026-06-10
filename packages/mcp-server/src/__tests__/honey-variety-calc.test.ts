import { describe, it, expect } from "vitest";
import {
  flavorIntensity, medicinalValue, marketPrice, crystallizationSpeed,
  antioxidantLevel, lightColored, singleOrigin, flavorProfile,
  primaryRegion, honeyVarieties,
} from "../honey-variety-calc.js";

describe("flavorIntensity", () => {
  it("buckwheat most intense", () => {
    expect(flavorIntensity("buckwheat")).toBeGreaterThan(flavorIntensity("acacia"));
  });
});

describe("medicinalValue", () => {
  it("manuka highest medicinal value", () => {
    expect(medicinalValue("manuka")).toBeGreaterThan(medicinalValue("clover"));
  });
});

describe("marketPrice", () => {
  it("manuka most expensive", () => {
    expect(marketPrice("manuka")).toBeGreaterThan(marketPrice("clover"));
  });
});

describe("crystallizationSpeed", () => {
  it("clover crystallizes fastest", () => {
    expect(crystallizationSpeed("clover")).toBeGreaterThan(crystallizationSpeed("acacia"));
  });
});

describe("antioxidantLevel", () => {
  it("buckwheat highest antioxidant", () => {
    expect(antioxidantLevel("buckwheat")).toBeGreaterThan(antioxidantLevel("clover"));
  });
});

describe("lightColored", () => {
  it("acacia is light colored", () => {
    expect(lightColored("acacia")).toBe(true);
  });
  it("buckwheat is not", () => {
    expect(lightColored("buckwheat")).toBe(false);
  });
});

describe("singleOrigin", () => {
  it("manuka is single origin", () => {
    expect(singleOrigin("manuka")).toBe(true);
  });
  it("wildflower is not", () => {
    expect(singleOrigin("wildflower")).toBe(false);
  });
});

describe("flavorProfile", () => {
  it("buckwheat is dark molasses malty", () => {
    expect(flavorProfile("buckwheat")).toBe("dark_molasses_malty");
  });
});

describe("primaryRegion", () => {
  it("manuka from new zealand australia", () => {
    expect(primaryRegion("manuka")).toBe("new_zealand_australia");
  });
});

describe("honeyVarieties", () => {
  it("returns 5 varieties", () => {
    expect(honeyVarieties()).toHaveLength(5);
  });
});
