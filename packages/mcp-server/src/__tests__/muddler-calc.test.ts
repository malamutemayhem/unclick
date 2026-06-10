import { describe, it, expect } from "vitest";
import {
  crushPower, gentleExtract, glassProtect, cleanEase,
  muddlerCost, dishwasherSafe, absorbsFlavor, tipMaterial,
  bestDrink, muddlers,
} from "../muddler-calc.js";

describe("crushPower", () => {
  it("mortar pestle granite most crush power", () => {
    expect(crushPower("mortar_pestle_granite")).toBeGreaterThan(crushPower("plastic_nylon"));
  });
});

describe("gentleExtract", () => {
  it("bamboo natural gentlest extract", () => {
    expect(gentleExtract("bamboo_natural")).toBeGreaterThan(gentleExtract("stainless_toothed"));
  });
});

describe("glassProtect", () => {
  it("plastic nylon best glass protection", () => {
    expect(glassProtect("plastic_nylon")).toBeGreaterThan(glassProtect("mortar_pestle_granite"));
  });
});

describe("cleanEase", () => {
  it("plastic nylon easiest to clean", () => {
    expect(cleanEase("plastic_nylon")).toBeGreaterThan(cleanEase("wooden_flat_head"));
  });
});

describe("muddlerCost", () => {
  it("mortar pestle granite most expensive", () => {
    expect(muddlerCost("mortar_pestle_granite")).toBeGreaterThan(muddlerCost("plastic_nylon"));
  });
});

describe("dishwasherSafe", () => {
  it("stainless toothed is dishwasher safe", () => {
    expect(dishwasherSafe("stainless_toothed")).toBe(true);
  });
  it("wooden flat head is not", () => {
    expect(dishwasherSafe("wooden_flat_head")).toBe(false);
  });
});

describe("absorbsFlavor", () => {
  it("wooden flat head absorbs flavor", () => {
    expect(absorbsFlavor("wooden_flat_head")).toBe(true);
  });
  it("stainless toothed does not", () => {
    expect(absorbsFlavor("stainless_toothed")).toBe(false);
  });
});

describe("tipMaterial", () => {
  it("bamboo natural uses rounded bamboo knob", () => {
    expect(tipMaterial("bamboo_natural")).toBe("rounded_bamboo_knob");
  });
});

describe("bestDrink", () => {
  it("wooden flat head for mojito old fashioned", () => {
    expect(bestDrink("wooden_flat_head")).toBe("mojito_old_fashioned");
  });
});

describe("muddlers", () => {
  it("returns 5 types", () => {
    expect(muddlers()).toHaveLength(5);
  });
});
