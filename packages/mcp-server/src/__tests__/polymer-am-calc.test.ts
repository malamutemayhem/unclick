import { describe, it, expect } from "vitest";
import {
  precision, speed, strength, surfaceFinish,
  paCost, supportFree, forProduction, material,
  bestUse, polymerAmTypes,
} from "../polymer-am-calc.js";

describe("precision", () => {
  it("SLA most precise", () => {
    expect(precision("sla_stereolithography")).toBeGreaterThan(precision("fdm_fused_filament"));
  });
});

describe("speed", () => {
  it("MJF fastest", () => {
    expect(speed("mjf_multi_jet_fusion")).toBeGreaterThan(speed("sla_stereolithography"));
  });
});

describe("strength", () => {
  it("SLS strongest", () => {
    expect(strength("sls_laser_sinter")).toBeGreaterThan(strength("sla_stereolithography"));
  });
});

describe("surfaceFinish", () => {
  it("SLA best surface finish", () => {
    expect(surfaceFinish("sla_stereolithography")).toBeGreaterThan(surfaceFinish("fdm_fused_filament"));
  });
});

describe("paCost", () => {
  it("SLS more expensive than FDM", () => {
    expect(paCost("sls_laser_sinter")).toBeGreaterThan(paCost("fdm_fused_filament"));
  });
});

describe("supportFree", () => {
  it("SLS is support-free", () => {
    expect(supportFree("sls_laser_sinter")).toBe(true);
  });
  it("FDM not support-free", () => {
    expect(supportFree("fdm_fused_filament")).toBe(false);
  });
});

describe("forProduction", () => {
  it("MJF for production", () => {
    expect(forProduction("mjf_multi_jet_fusion")).toBe(true);
  });
  it("FDM not for production", () => {
    expect(forProduction("fdm_fused_filament")).toBe(false);
  });
});

describe("material", () => {
  it("SLA uses UV photopolymer resin", () => {
    expect(material("sla_stereolithography")).toBe("uv_photopolymer_liquid_resin");
  });
});

describe("bestUse", () => {
  it("MJF for series production end use", () => {
    expect(bestUse("mjf_multi_jet_fusion")).toBe("series_production_end_use_part");
  });
});

describe("polymerAmTypes", () => {
  it("returns 5 types", () => {
    expect(polymerAmTypes()).toHaveLength(5);
  });
});
