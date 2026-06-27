import { describe, it, expect } from "vitest";
import {
  hardness, corrosionResist, thickness, dyeAbsorb,
  apCost, milSpec, forWear, electrolyte,
  bestUse, anodizeProcessTypes,
} from "../anodize-process-calc.js";

describe("hardness", () => {
  it("hard type iii hardest", () => {
    expect(hardness("hard_type_iii")).toBeGreaterThan(hardness("sulfuric_type_ii"));
  });
});

describe("corrosionResist", () => {
  it("hard type iii best corrosion", () => {
    expect(corrosionResist("hard_type_iii")).toBeGreaterThan(corrosionResist("phosphoric_bond_primer"));
  });
});

describe("thickness", () => {
  it("hard type iii thickest", () => {
    expect(thickness("hard_type_iii")).toBeGreaterThan(thickness("chromic_type_i"));
  });
});

describe("dyeAbsorb", () => {
  it("sulfuric type ii best dye absorption", () => {
    expect(dyeAbsorb("sulfuric_type_ii")).toBeGreaterThan(dyeAbsorb("hard_type_iii"));
  });
});

describe("apCost", () => {
  it("chromic most expensive", () => {
    expect(apCost("chromic_type_i")).toBeGreaterThan(apCost("sulfuric_type_ii"));
  });
});

describe("milSpec", () => {
  it("hard type iii is mil spec", () => {
    expect(milSpec("hard_type_iii")).toBe(true);
  });
  it("phosphoric not mil spec", () => {
    expect(milSpec("phosphoric_bond_primer")).toBe(false);
  });
});

describe("forWear", () => {
  it("hard type iii for wear", () => {
    expect(forWear("hard_type_iii")).toBe(true);
  });
  it("sulfuric not for wear", () => {
    expect(forWear("sulfuric_type_ii")).toBe(false);
  });
});

describe("electrolyte", () => {
  it("tsa uses tartaric sulfuric mix", () => {
    expect(electrolyte("tartaric_sulfuric_tsa")).toBe("tartaric_sulfuric_acid_mix");
  });
});

describe("bestUse", () => {
  it("hard type iii for piston cylinder", () => {
    expect(bestUse("hard_type_iii")).toBe("piston_cylinder_firearm_receiver");
  });
});

describe("anodizeProcessTypes", () => {
  it("returns 5 types", () => {
    expect(anodizeProcessTypes()).toHaveLength(5);
  });
});
