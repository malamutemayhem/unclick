import { describe, it, expect } from "vitest";
import {
  vacuum, flow, reliability, cleanness,
  vpCost, oilFree, forLab, mechanism,
  bestUse, vacuumPumpTypes,
} from "../vacuum-pump-type-calc.js";

describe("vacuum", () => {
  it("turbomolecular deepest vacuum", () => {
    expect(vacuum("turbomolecular_high_vacuum")).toBeGreaterThan(vacuum("diaphragm_dry_chemical"));
  });
});

describe("flow", () => {
  it("liquid ring highest flow", () => {
    expect(flow("liquid_ring_water_sealed")).toBeGreaterThan(flow("turbomolecular_high_vacuum"));
  });
});

describe("reliability", () => {
  it("rotary vane most reliable", () => {
    expect(reliability("rotary_vane_oil_sealed")).toBeGreaterThan(reliability("turbomolecular_high_vacuum"));
  });
});

describe("cleanness", () => {
  it("diaphragm cleanest", () => {
    expect(cleanness("diaphragm_dry_chemical")).toBeGreaterThan(cleanness("rotary_vane_oil_sealed"));
  });
});

describe("vpCost", () => {
  it("turbomolecular most expensive", () => {
    expect(vpCost("turbomolecular_high_vacuum")).toBeGreaterThan(vpCost("diaphragm_dry_chemical"));
  });
});

describe("oilFree", () => {
  it("scroll is oil free", () => {
    expect(oilFree("scroll_dry_oil_free")).toBe(true);
  });
  it("rotary vane not oil free", () => {
    expect(oilFree("rotary_vane_oil_sealed")).toBe(false);
  });
});

describe("forLab", () => {
  it("scroll for lab", () => {
    expect(forLab("scroll_dry_oil_free")).toBe(true);
  });
  it("rotary vane not for lab", () => {
    expect(forLab("rotary_vane_oil_sealed")).toBe(false);
  });
});

describe("mechanism", () => {
  it("liquid ring uses impeller water ring", () => {
    expect(mechanism("liquid_ring_water_sealed")).toBe("impeller_water_ring_seal_compress");
  });
});

describe("bestUse", () => {
  it("turbomolecular for uhv semiconductor", () => {
    expect(bestUse("turbomolecular_high_vacuum")).toBe("uhv_semiconductor_mass_spec_coat");
  });
});

describe("vacuumPumpTypes", () => {
  it("returns 5 types", () => {
    expect(vacuumPumpTypes()).toHaveLength(5);
  });
});
