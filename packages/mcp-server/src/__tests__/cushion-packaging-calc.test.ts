import { describe, it, expect } from "vitest";
import {
  shockAbsorption, conformability, storageEfficiency, sustainability,
  materialCost, biodegradable, requiresInflation, cushionMaterial,
  bestProduct, cushionPackagings,
} from "../cushion-packaging-calc.js";

describe("shockAbsorption", () => {
  it("molded pulp best shock absorption", () => {
    expect(shockAbsorption("molded_pulp")).toBeGreaterThan(shockAbsorption("corrugated_insert"));
  });
});

describe("conformability", () => {
  it("bubble wrap most conformable", () => {
    expect(conformability("bubble_wrap")).toBeGreaterThan(conformability("molded_pulp"));
  });
});

describe("storageEfficiency", () => {
  it("air pillow best storage efficiency", () => {
    expect(storageEfficiency("air_pillow")).toBeGreaterThan(storageEfficiency("foam_sheet"));
  });
});

describe("sustainability", () => {
  it("molded pulp most sustainable", () => {
    expect(sustainability("molded_pulp")).toBeGreaterThan(sustainability("bubble_wrap"));
  });
});

describe("materialCost", () => {
  it("molded pulp most expensive material", () => {
    expect(materialCost("molded_pulp")).toBeGreaterThan(materialCost("air_pillow"));
  });
});

describe("biodegradable", () => {
  it("molded pulp is biodegradable", () => {
    expect(biodegradable("molded_pulp")).toBe(true);
  });
  it("bubble wrap is not", () => {
    expect(biodegradable("bubble_wrap")).toBe(false);
  });
});

describe("requiresInflation", () => {
  it("air pillow requires inflation", () => {
    expect(requiresInflation("air_pillow")).toBe(true);
  });
  it("foam sheet does not", () => {
    expect(requiresInflation("foam_sheet")).toBe(false);
  });
});

describe("cushionMaterial", () => {
  it("molded pulp uses recycled fiber molded", () => {
    expect(cushionMaterial("molded_pulp")).toBe("recycled_fiber_molded");
  });
});

describe("bestProduct", () => {
  it("air pillow for void fill ecommerce", () => {
    expect(bestProduct("air_pillow")).toBe("void_fill_ecommerce");
  });
});

describe("cushionPackagings", () => {
  it("returns 5 types", () => {
    expect(cushionPackagings()).toHaveLength(5);
  });
});
