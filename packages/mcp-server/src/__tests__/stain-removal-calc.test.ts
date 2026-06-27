import { describe, it, expect } from "vitest";
import {
  proteinStainEfficacy, colorSafety, fabricRange, speedOfAction,
  environmentalImpact, requiresPreSoak, safeForDelicates, activeIngredient,
  bestStainType, stainRemovals,
} from "../stain-removal-calc.js";

describe("proteinStainEfficacy", () => {
  it("enzymatic best for protein stains", () => {
    expect(proteinStainEfficacy("enzymatic")).toBeGreaterThan(proteinStainEfficacy("oxidizing"));
  });
});

describe("colorSafety", () => {
  it("surfactant safest for colors", () => {
    expect(colorSafety("surfactant")).toBeGreaterThan(colorSafety("oxidizing"));
  });
});

describe("fabricRange", () => {
  it("surfactant widest fabric range", () => {
    expect(fabricRange("surfactant")).toBeGreaterThan(fabricRange("acid"));
  });
});

describe("speedOfAction", () => {
  it("solvent based fastest acting", () => {
    expect(speedOfAction("solvent_based")).toBeGreaterThan(speedOfAction("enzymatic"));
  });
});

describe("environmentalImpact", () => {
  it("solvent based highest impact", () => {
    expect(environmentalImpact("solvent_based")).toBeGreaterThan(environmentalImpact("enzymatic"));
  });
});

describe("requiresPreSoak", () => {
  it("enzymatic requires pre soak", () => {
    expect(requiresPreSoak("enzymatic")).toBe(true);
  });
  it("oxidizing does not", () => {
    expect(requiresPreSoak("oxidizing")).toBe(false);
  });
});

describe("safeForDelicates", () => {
  it("surfactant safe for delicates", () => {
    expect(safeForDelicates("surfactant")).toBe(true);
  });
  it("enzymatic is not", () => {
    expect(safeForDelicates("enzymatic")).toBe(false);
  });
});

describe("activeIngredient", () => {
  it("enzymatic uses protease lipase amylase", () => {
    expect(activeIngredient("enzymatic")).toBe("protease_lipase_amylase");
  });
});

describe("bestStainType", () => {
  it("solvent based for grease oil ink", () => {
    expect(bestStainType("solvent_based")).toBe("grease_oil_ink");
  });
});

describe("stainRemovals", () => {
  it("returns 5 methods", () => {
    expect(stainRemovals()).toHaveLength(5);
  });
});
