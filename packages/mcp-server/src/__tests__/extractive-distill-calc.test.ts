import { describe, it, expect } from "vitest";
import {
  selectivity, solventRecovery, energyUse, envFriendly,
  edCost, greenSolvent, forAzeotrope, entrainer,
  bestUse, extractiveDistillTypes,
} from "../extractive-distill-calc.js";

describe("selectivity", () => {
  it("ionic liquid highest selectivity", () => {
    expect(selectivity("ionic_liquid_green")).toBeGreaterThanOrEqual(selectivity("salt_effect_electrolyte"));
  });
});

describe("solventRecovery", () => {
  it("hyperbranched polymer best recovery", () => {
    expect(solventRecovery("hyperbranched_polymer")).toBeGreaterThan(solventRecovery("salt_effect_electrolyte"));
  });
});

describe("energyUse", () => {
  it("ionic liquid better energy use", () => {
    expect(energyUse("ionic_liquid_green")).toBeGreaterThan(energyUse("solvent_based_standard"));
  });
});

describe("envFriendly", () => {
  it("deep eutectic most environmentally friendly", () => {
    expect(envFriendly("deep_eutectic_solvent")).toBeGreaterThan(envFriendly("solvent_based_standard"));
  });
});

describe("edCost", () => {
  it("ionic liquid most expensive", () => {
    expect(edCost("ionic_liquid_green")).toBeGreaterThan(edCost("salt_effect_electrolyte"));
  });
});

describe("greenSolvent", () => {
  it("ionic liquid is green", () => {
    expect(greenSolvent("ionic_liquid_green")).toBe(true);
  });
  it("solvent based not green", () => {
    expect(greenSolvent("solvent_based_standard")).toBe(false);
  });
});

describe("forAzeotrope", () => {
  it("all types for azeotrope breaking", () => {
    expect(forAzeotrope("solvent_based_standard")).toBe(true);
  });
});

describe("entrainer", () => {
  it("deep eutectic uses choline chloride", () => {
    expect(entrainer("deep_eutectic_solvent")).toBe("choline_chloride_urea_deep_eutectic_natural");
  });
});

describe("bestUse", () => {
  it("salt effect for ethanol water", () => {
    expect(bestUse("salt_effect_electrolyte")).toBe("ethanol_water_azeotrope_breaking_salt_effect");
  });
});

describe("extractiveDistillTypes", () => {
  it("returns 5 types", () => {
    expect(extractiveDistillTypes()).toHaveLength(5);
  });
});
