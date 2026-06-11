import { describe, it, expect } from "vitest";
import {
  bandwidth, extinctionRatio, insertionLoss, chirp,
  mdCost, polarizationIndep, forCoherent, mechanism,
  bestUse, modulators,
} from "../modulator-calc.js";

describe("bandwidth", () => {
  it("eam highest bandwidth", () => {
    expect(bandwidth("eam_electro_absorb")).toBeGreaterThan(bandwidth("ring_resonator_si"));
  });
});

describe("extinctionRatio", () => {
  it("eo lithium niobate best extinction ratio", () => {
    expect(extinctionRatio("eo_lithium_niobate")).toBeGreaterThan(extinctionRatio("mzi_silicon_pn"));
  });
});

describe("insertionLoss", () => {
  it("eo lithium niobate lowest insertion loss", () => {
    expect(insertionLoss("eo_lithium_niobate")).toBeGreaterThan(insertionLoss("eam_electro_absorb"));
  });
});

describe("chirp", () => {
  it("eo lithium niobate best chirp control", () => {
    expect(chirp("eo_lithium_niobate")).toBeGreaterThan(chirp("eam_electro_absorb"));
  });
});

describe("mdCost", () => {
  it("iq nested most expensive", () => {
    expect(mdCost("iq_nested_coherent")).toBeGreaterThan(mdCost("ring_resonator_si"));
  });
});

describe("polarizationIndep", () => {
  it("eo lithium niobate is polarization independent", () => {
    expect(polarizationIndep("eo_lithium_niobate")).toBe(true);
  });
  it("mzi silicon not polarization independent", () => {
    expect(polarizationIndep("mzi_silicon_pn")).toBe(false);
  });
});

describe("forCoherent", () => {
  it("iq nested for coherent", () => {
    expect(forCoherent("iq_nested_coherent")).toBe(true);
  });
  it("ring resonator not for coherent", () => {
    expect(forCoherent("ring_resonator_si")).toBe(false);
  });
});

describe("mechanism", () => {
  it("eam uses qcse exciton absorption", () => {
    expect(mechanism("eam_electro_absorb")).toBe("qcse_exciton_absorption");
  });
});

describe("bestUse", () => {
  it("eo lithium niobate best for 400g long haul", () => {
    expect(bestUse("eo_lithium_niobate")).toBe("400g_dp_16qam_long_haul");
  });
});

describe("modulators", () => {
  it("returns 5 types", () => {
    expect(modulators()).toHaveLength(5);
  });
});
