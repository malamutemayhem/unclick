import { describe, it, expect } from "vitest";
import {
  viscosityRange, wallScraping, heatTransfer, blending,
  amCost, closeClearance, forPaste, design,
  bestUse, anchorMixerTypes,
} from "../anchor-mixer-calc.js";

describe("viscosityRange", () => {
  it("double helical ribbon widest viscosity range", () => {
    expect(viscosityRange("double_helical_ribbon")).toBeGreaterThan(viscosityRange("gate_impeller_wide"));
  });
});

describe("wallScraping", () => {
  it("double helical ribbon best wall scraping", () => {
    expect(wallScraping("double_helical_ribbon")).toBeGreaterThan(wallScraping("sigma_blade_kneader"));
  });
});

describe("heatTransfer", () => {
  it("double helical ribbon best heat transfer", () => {
    expect(heatTransfer("double_helical_ribbon")).toBeGreaterThan(heatTransfer("sigma_blade_kneader"));
  });
});

describe("blending", () => {
  it("sigma blade best blending", () => {
    expect(blending("sigma_blade_kneader")).toBeGreaterThan(blending("simple_anchor_standard"));
  });
});

describe("amCost", () => {
  it("sigma blade most expensive", () => {
    expect(amCost("sigma_blade_kneader")).toBeGreaterThan(amCost("simple_anchor_standard"));
  });
});

describe("closeClearance", () => {
  it("simple anchor is close clearance", () => {
    expect(closeClearance("simple_anchor_standard")).toBe(true);
  });
  it("sigma blade not close clearance", () => {
    expect(closeClearance("sigma_blade_kneader")).toBe(false);
  });
});

describe("forPaste", () => {
  it("helical ribbon for paste", () => {
    expect(forPaste("helical_ribbon_high")).toBe(true);
  });
  it("simple anchor not for paste", () => {
    expect(forPaste("simple_anchor_standard")).toBe(false);
  });
});

describe("design", () => {
  it("sigma blade uses twin z blade", () => {
    expect(design("sigma_blade_kneader")).toBe("twin_sigma_z_blade_kneading_trough_intensive");
  });
});

describe("bestUse", () => {
  it("double helical ribbon for extreme viscosity", () => {
    expect(bestUse("double_helical_ribbon")).toBe("extreme_viscosity_silicone_sealant_putty");
  });
});

describe("anchorMixerTypes", () => {
  it("returns 5 types", () => {
    expect(anchorMixerTypes()).toHaveLength(5);
  });
});
