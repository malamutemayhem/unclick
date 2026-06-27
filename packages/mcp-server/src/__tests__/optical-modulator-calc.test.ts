import { describe, it, expect } from "vitest";
import {
  bandwidth, extinctionRatio, insertionLoss, chirp,
  modCost, integrated, forCoherent, platform,
  bestUse, opticalModulators,
} from "../optical-modulator-calc.js";

describe("bandwidth", () => {
  it("iq nested mzm highest bandwidth", () => {
    expect(bandwidth("iq_nested_mzm")).toBeGreaterThan(bandwidth("soa_gate_switch"));
  });
});

describe("extinctionRatio", () => {
  it("iq nested mzm best extinction ratio", () => {
    expect(extinctionRatio("iq_nested_mzm")).toBeGreaterThan(extinctionRatio("eam_electro_absorb"));
  });
});

describe("insertionLoss", () => {
  it("iq nested mzm highest insertion loss", () => {
    expect(insertionLoss("iq_nested_mzm")).toBeGreaterThan(insertionLoss("soa_gate_switch"));
  });
});

describe("chirp", () => {
  it("iq nested mzm best chirp control", () => {
    expect(chirp("iq_nested_mzm")).toBeGreaterThan(chirp("soa_gate_switch"));
  });
});

describe("modCost", () => {
  it("iq nested mzm most expensive", () => {
    expect(modCost("iq_nested_mzm")).toBeGreaterThan(modCost("ring_resonator"));
  });
});

describe("integrated", () => {
  it("ring resonator is integrated", () => {
    expect(integrated("ring_resonator")).toBe(true);
  });
  it("mzm mach zehnder not integrated", () => {
    expect(integrated("mzm_mach_zehnder")).toBe(false);
  });
});

describe("forCoherent", () => {
  it("iq nested mzm is for coherent", () => {
    expect(forCoherent("iq_nested_mzm")).toBe(true);
  });
  it("ring resonator not for coherent", () => {
    expect(forCoherent("ring_resonator")).toBe(false);
  });
});

describe("platform", () => {
  it("ring resonator uses silicon photonics soi", () => {
    expect(platform("ring_resonator")).toBe("silicon_photonics_soi");
  });
});

describe("bestUse", () => {
  it("iq nested mzm best for coherent dp qpsk 16qam", () => {
    expect(bestUse("iq_nested_mzm")).toBe("coherent_dp_qpsk_16qam");
  });
});

describe("opticalModulators", () => {
  it("returns 5 types", () => {
    expect(opticalModulators()).toHaveLength(5);
  });
});
