import { describe, it, expect } from "vitest";
import {
  coatingThickness, hardness, corrosionResistance, dyeAbsorption,
  anCost, colorable, forAerospace, electrolyte,
  bestUse, anodizingTypes,
} from "../anodizing-calc.js";

describe("coatingThickness", () => {
  it("hard coat type iii thickest coating", () => {
    expect(coatingThickness("hard_coat_type_iii")).toBeGreaterThan(coatingThickness("phosphoric_acid"));
  });
});

describe("hardness", () => {
  it("hard coat type iii hardest", () => {
    expect(hardness("hard_coat_type_iii")).toBeGreaterThan(hardness("sulfuric_type_ii"));
  });
});

describe("corrosionResistance", () => {
  it("hard coat type iii best corrosion resistance", () => {
    expect(corrosionResistance("hard_coat_type_iii")).toBeGreaterThan(corrosionResistance("phosphoric_acid"));
  });
});

describe("dyeAbsorption", () => {
  it("sulfuric type ii best dye absorption", () => {
    expect(dyeAbsorption("sulfuric_type_ii")).toBeGreaterThan(dyeAbsorption("hard_coat_type_iii"));
  });
});

describe("anCost", () => {
  it("hard coat type iii most expensive", () => {
    expect(anCost("hard_coat_type_iii")).toBeGreaterThan(anCost("sulfuric_type_ii"));
  });
});

describe("colorable", () => {
  it("sulfuric type ii is colorable", () => {
    expect(colorable("sulfuric_type_ii")).toBe(true);
  });
  it("hard coat type iii not colorable", () => {
    expect(colorable("hard_coat_type_iii")).toBe(false);
  });
});

describe("forAerospace", () => {
  it("chromic type i for aerospace", () => {
    expect(forAerospace("chromic_type_i")).toBe(true);
  });
  it("sulfuric type ii not for aerospace", () => {
    expect(forAerospace("sulfuric_type_ii")).toBe(false);
  });
});

describe("electrolyte", () => {
  it("tartaric sulfuric uses tartaric acid mix", () => {
    expect(electrolyte("tartaric_sulfuric")).toBe("tartaric_sulfuric_acid_mix_chrome_free_replacement_rohs");
  });
});

describe("bestUse", () => {
  it("phosphoric acid for structural adhesive bond prep", () => {
    expect(bestUse("phosphoric_acid")).toBe("structural_adhesive_bond_prep_aircraft_skin_panel_splice");
  });
});

describe("anodizingTypes", () => {
  it("returns 5 types", () => {
    expect(anodizingTypes()).toHaveLength(5);
  });
});
