import { describe, it, expect } from "vitest";
import {
  adhesion, stainBlock, dryTime, coverage,
  prCost, waterBased, forMetal, vehicle,
  bestUse, primerTypes,
} from "../primer-type-calc.js";

describe("adhesion", () => {
  it("etch primer strongest adhesion", () => {
    expect(adhesion("etch_primer_metal_acid")).toBeGreaterThan(adhesion("latex_pva_drywall"));
  });
});

describe("stainBlock", () => {
  it("shellac best stain block", () => {
    expect(stainBlock("shellac_stain_block")).toBeGreaterThan(stainBlock("etch_primer_metal_acid"));
  });
});

describe("dryTime", () => {
  it("shellac dries fastest", () => {
    expect(dryTime("shellac_stain_block")).toBeGreaterThan(dryTime("alkyd_oil_adhesion"));
  });
});

describe("coverage", () => {
  it("latex best coverage", () => {
    expect(coverage("latex_pva_drywall")).toBeGreaterThan(coverage("etch_primer_metal_acid"));
  });
});

describe("prCost", () => {
  it("epoxy most expensive", () => {
    expect(prCost("epoxy_primer_heavy_duty")).toBeGreaterThan(prCost("latex_pva_drywall"));
  });
});

describe("waterBased", () => {
  it("latex is water based", () => {
    expect(waterBased("latex_pva_drywall")).toBe(true);
  });
  it("shellac not water based", () => {
    expect(waterBased("shellac_stain_block")).toBe(false);
  });
});

describe("forMetal", () => {
  it("etch primer for metal", () => {
    expect(forMetal("etch_primer_metal_acid")).toBe(true);
  });
  it("latex not for metal", () => {
    expect(forMetal("latex_pva_drywall")).toBe(false);
  });
});

describe("vehicle", () => {
  it("shellac uses shellac resin", () => {
    expect(vehicle("shellac_stain_block")).toBe("shellac_resin_denatured_alcohol");
  });
});

describe("bestUse", () => {
  it("latex for new drywall", () => {
    expect(bestUse("latex_pva_drywall")).toBe("new_drywall_plaster_seal_porosity");
  });
});

describe("primerTypes", () => {
  it("returns 5 types", () => {
    expect(primerTypes()).toHaveLength(5);
  });
});
