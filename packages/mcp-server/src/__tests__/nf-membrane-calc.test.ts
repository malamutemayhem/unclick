import { describe, it, expect } from "vitest";
import {
  divalentReject, monovalentPass, flux, chemResist,
  nfCost, softening, forColor, membrane,
  bestUse, nfMembraneTypes,
} from "../nf-membrane-calc.js";

describe("divalentReject", () => {
  it("tight nf highest divalent rejection", () => {
    expect(divalentReject("tight_nf_near_ro")).toBeGreaterThan(divalentReject("loose_nf_divalent"));
  });
});

describe("monovalentPass", () => {
  it("loose nf best monovalent pass", () => {
    expect(monovalentPass("loose_nf_divalent")).toBeGreaterThan(monovalentPass("tight_nf_near_ro"));
  });
});

describe("flux", () => {
  it("loose nf highest flux", () => {
    expect(flux("loose_nf_divalent")).toBeGreaterThan(flux("tubular_ceramic_nf"));
  });
});

describe("chemResist", () => {
  it("organic solvent nf best chemical resistance", () => {
    expect(chemResist("organic_solvent_nf")).toBeGreaterThan(chemResist("spiral_wound_polyamide"));
  });
});

describe("nfCost", () => {
  it("organic solvent nf most expensive", () => {
    expect(nfCost("organic_solvent_nf")).toBeGreaterThan(nfCost("spiral_wound_polyamide"));
  });
});

describe("softening", () => {
  it("spiral wound polyamide for softening", () => {
    expect(softening("spiral_wound_polyamide")).toBe(true);
  });
  it("tubular ceramic not for softening", () => {
    expect(softening("tubular_ceramic_nf")).toBe(false);
  });
});

describe("forColor", () => {
  it("loose nf for color removal", () => {
    expect(forColor("loose_nf_divalent")).toBe(true);
  });
  it("organic solvent nf not for color", () => {
    expect(forColor("organic_solvent_nf")).toBe(false);
  });
});

describe("membrane", () => {
  it("organic solvent nf uses pdms crosslink", () => {
    expect(membrane("organic_solvent_nf")).toBe("pdms_crosslink_polymer_solvent_resist");
  });
});

describe("bestUse", () => {
  it("tight nf for pharma water", () => {
    expect(bestUse("tight_nf_near_ro")).toBe("pharma_water_low_tds_high_purity_prep");
  });
});

describe("nfMembraneTypes", () => {
  it("returns 5 types", () => {
    expect(nfMembraneTypes()).toHaveLength(5);
  });
});
