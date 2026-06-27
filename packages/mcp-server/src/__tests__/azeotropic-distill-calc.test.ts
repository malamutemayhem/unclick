import { describe, it, expect } from "vitest";
import {
  separation, energyUse, solventLoad, flexibility,
  adCost, solventFree, forWaterRemoval, method,
  bestUse, azeotropicDistillTypes,
} from "../azeotropic-distill-calc.js";

describe("separation", () => {
  it("heterogeneous decanter best separation", () => {
    expect(separation("heterogeneous_decanter")).toBeGreaterThanOrEqual(separation("membrane_assisted_hybrid"));
  });
});

describe("energyUse", () => {
  it("membrane assisted best energy use", () => {
    expect(energyUse("membrane_assisted_hybrid")).toBeGreaterThan(energyUse("homogeneous_entrainer"));
  });
});

describe("solventLoad", () => {
  it("pressure swing no solvent load", () => {
    expect(solventLoad("pressure_swing_binary")).toBeGreaterThan(solventLoad("homogeneous_entrainer"));
  });
});

describe("flexibility", () => {
  it("membrane assisted most flexible", () => {
    expect(flexibility("membrane_assisted_hybrid")).toBeGreaterThan(flexibility("reactive_azeotropic"));
  });
});

describe("adCost", () => {
  it("membrane assisted most expensive", () => {
    expect(adCost("membrane_assisted_hybrid")).toBeGreaterThan(adCost("homogeneous_entrainer"));
  });
});

describe("solventFree", () => {
  it("pressure swing is solvent free", () => {
    expect(solventFree("pressure_swing_binary")).toBe(true);
  });
  it("heterogeneous not solvent free", () => {
    expect(solventFree("heterogeneous_decanter")).toBe(false);
  });
});

describe("forWaterRemoval", () => {
  it("heterogeneous for water removal", () => {
    expect(forWaterRemoval("heterogeneous_decanter")).toBe(true);
  });
  it("homogeneous not for water removal", () => {
    expect(forWaterRemoval("homogeneous_entrainer")).toBe(false);
  });
});

describe("method", () => {
  it("pressure swing uses two columns", () => {
    expect(method("pressure_swing_binary")).toBe("two_columns_different_pressure_azeotrope_shift");
  });
});

describe("bestUse", () => {
  it("membrane assisted for bioethanol", () => {
    expect(bestUse("membrane_assisted_hybrid")).toBe("bioethanol_dehydration_energy_efficient_hybrid");
  });
});

describe("azeotropicDistillTypes", () => {
  it("returns 5 types", () => {
    expect(azeotropicDistillTypes()).toHaveLength(5);
  });
});
