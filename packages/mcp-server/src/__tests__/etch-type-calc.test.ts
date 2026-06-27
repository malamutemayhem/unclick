import { describe, it, expect } from "vitest";
import {
  anisotropy, selectivity, uniformity, damageLevel,
  etCost, isotropic, forMems, chemistry,
  bestUse, etchTypes,
} from "../etch-type-calc.js";

describe("anisotropy", () => {
  it("drie bosch most anisotropic", () => {
    expect(anisotropy("drie_bosch_process")).toBeGreaterThan(anisotropy("wet_isotropic_acid"));
  });
});

describe("selectivity", () => {
  it("ale atomic layer best selectivity", () => {
    expect(selectivity("ale_atomic_layer")).toBeGreaterThan(selectivity("ibe_ion_beam"));
  });
});

describe("uniformity", () => {
  it("ale atomic layer best uniformity", () => {
    expect(uniformity("ale_atomic_layer")).toBeGreaterThan(uniformity("wet_isotropic_acid"));
  });
});

describe("damageLevel", () => {
  it("wet isotropic least damage", () => {
    expect(damageLevel("wet_isotropic_acid")).toBeGreaterThan(damageLevel("ibe_ion_beam"));
  });
});

describe("etCost", () => {
  it("ale atomic layer most expensive", () => {
    expect(etCost("ale_atomic_layer")).toBeGreaterThan(etCost("wet_isotropic_acid"));
  });
});

describe("isotropic", () => {
  it("wet isotropic is isotropic", () => {
    expect(isotropic("wet_isotropic_acid")).toBe(true);
  });
  it("rie not isotropic", () => {
    expect(isotropic("rie_reactive_ion")).toBe(false);
  });
});

describe("forMems", () => {
  it("drie bosch for mems", () => {
    expect(forMems("drie_bosch_process")).toBe(true);
  });
  it("ibe not for mems", () => {
    expect(forMems("ibe_ion_beam")).toBe(false);
  });
});

describe("chemistry", () => {
  it("drie uses sf6 c4f8 cyclic", () => {
    expect(chemistry("drie_bosch_process")).toBe("sf6_c4f8_cyclic_passivate");
  });
});

describe("bestUse", () => {
  it("ale best for sub 5nm gate spacer", () => {
    expect(bestUse("ale_atomic_layer")).toBe("sub_5nm_gate_spacer_recess");
  });
});

describe("etchTypes", () => {
  it("returns 5 types", () => {
    expect(etchTypes()).toHaveLength(5);
  });
});
