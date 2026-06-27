import { describe, it, expect } from "vitest";
import {
  particleRemoval, flowRate, dirtHolding, chemCompat,
  cfCost, surfaceFilter, forPotable, construction,
  bestUse, cartridgeFilterTypes,
} from "../cartridge-filter-calc.js";

describe("particleRemoval", () => {
  it("pleated synthetic best particle removal", () => {
    expect(particleRemoval("pleated_synthetic")).toBeGreaterThan(particleRemoval("depth_wound_string"));
  });
});

describe("flowRate", () => {
  it("pleated synthetic highest flow rate", () => {
    expect(flowRate("pleated_synthetic")).toBeGreaterThan(flowRate("activated_carbon_block"));
  });
});

describe("dirtHolding", () => {
  it("pleated synthetic best dirt holding", () => {
    expect(dirtHolding("pleated_synthetic")).toBeGreaterThan(dirtHolding("activated_carbon_block"));
  });
});

describe("chemCompat", () => {
  it("pleated synthetic best chem compat", () => {
    expect(chemCompat("pleated_synthetic")).toBeGreaterThan(chemCompat("pleated_cellulose"));
  });
});

describe("cfCost", () => {
  it("pleated synthetic most expensive", () => {
    expect(cfCost("pleated_synthetic")).toBeGreaterThan(cfCost("depth_wound_string"));
  });
});

describe("surfaceFilter", () => {
  it("pleated cellulose is surface filter", () => {
    expect(surfaceFilter("pleated_cellulose")).toBe(true);
  });
  it("depth wound string not surface filter", () => {
    expect(surfaceFilter("depth_wound_string")).toBe(false);
  });
});

describe("forPotable", () => {
  it("pleated synthetic for potable", () => {
    expect(forPotable("pleated_synthetic")).toBe(true);
  });
  it("pleated cellulose not for potable", () => {
    expect(forPotable("pleated_cellulose")).toBe(false);
  });
});

describe("construction", () => {
  it("melt blown uses graded density", () => {
    expect(construction("melt_blown_graded")).toBe("melt_blown_polypropylene_graded_density_core");
  });
});

describe("bestUse", () => {
  it("activated carbon for drinking water", () => {
    expect(bestUse("activated_carbon_block")).toBe("drinking_water_chlorine_voc_taste_odor_removal");
  });
});

describe("cartridgeFilterTypes", () => {
  it("returns 5 types", () => {
    expect(cartridgeFilterTypes()).toHaveLength(5);
  });
});
