import { describe, it, expect } from "vitest";
import {
  mrr, finish_, accuracy, complexity,
  edCost, submerged, forMold, electrode,
  bestUse, edmTypes,
} from "../edm-type-calc.js";

describe("mrr", () => {
  it("hole drilling highest mrr", () => {
    expect(mrr("hole_drilling_fast_edm")).toBeGreaterThan(mrr("micro_edm_fine_feature"));
  });
});

describe("finish_", () => {
  it("micro edm best finish", () => {
    expect(finish_("micro_edm_fine_feature")).toBeGreaterThan(finish_("hole_drilling_fast_edm"));
  });
});

describe("accuracy", () => {
  it("wire edm most accurate", () => {
    expect(accuracy("wire_edm_cnc_contour")).toBeGreaterThan(accuracy("hole_drilling_fast_edm"));
  });
});

describe("complexity", () => {
  it("sinker handles most complexity", () => {
    expect(complexity("sinker_ram_die_cavity")).toBeGreaterThan(complexity("hole_drilling_fast_edm"));
  });
});

describe("edCost", () => {
  it("micro edm most expensive", () => {
    expect(edCost("micro_edm_fine_feature")).toBeGreaterThan(edCost("hole_drilling_fast_edm"));
  });
});

describe("submerged", () => {
  it("sinker is submerged", () => {
    expect(submerged("sinker_ram_die_cavity")).toBe(true);
  });
  it("hole drilling not submerged", () => {
    expect(submerged("hole_drilling_fast_edm")).toBe(false);
  });
});

describe("forMold", () => {
  it("sinker for mold", () => {
    expect(forMold("sinker_ram_die_cavity")).toBe(true);
  });
  it("wire edm not for mold", () => {
    expect(forMold("wire_edm_cnc_contour")).toBe(false);
  });
});

describe("electrode", () => {
  it("wire edm uses brass wire", () => {
    expect(electrode("wire_edm_cnc_contour")).toBe("brass_wire_continuous_spool");
  });
});

describe("bestUse", () => {
  it("sinker for mold cavity", () => {
    expect(bestUse("sinker_ram_die_cavity")).toBe("mold_cavity_die_complex_shape");
  });
});

describe("edmTypes", () => {
  it("returns 5 types", () => {
    expect(edmTypes()).toHaveLength(5);
  });
});
