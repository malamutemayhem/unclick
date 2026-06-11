import { describe, it, expect } from "vitest";
import {
  rejection, flux, backwash, chemResist,
  ufCost, submerged, forDrinkWater, membrane,
  bestUse, ufMembraneTypes,
} from "../uf-membrane-calc.js";

describe("rejection", () => {
  it("tubular ceramic highest rejection", () => {
    expect(rejection("tubular_ceramic_robust")).toBeGreaterThan(rejection("spiral_wound_uf"));
  });
});

describe("flux", () => {
  it("spiral wound uf highest flux", () => {
    expect(flux("spiral_wound_uf")).toBeGreaterThan(flux("tubular_ceramic_robust"));
  });
});

describe("backwash", () => {
  it("tubular ceramic best backwash", () => {
    expect(backwash("tubular_ceramic_robust")).toBeGreaterThan(backwash("spiral_wound_uf"));
  });
});

describe("chemResist", () => {
  it("tubular ceramic best chemical resistance", () => {
    expect(chemResist("tubular_ceramic_robust")).toBeGreaterThan(chemResist("spiral_wound_uf"));
  });
});

describe("ufCost", () => {
  it("tubular ceramic most expensive", () => {
    expect(ufCost("tubular_ceramic_robust")).toBeGreaterThan(ufCost("spiral_wound_uf"));
  });
});

describe("submerged", () => {
  it("hollow fiber outside in is submerged", () => {
    expect(submerged("hollow_fiber_outside_in")).toBe(true);
  });
  it("hollow fiber inside out not submerged", () => {
    expect(submerged("hollow_fiber_inside_out")).toBe(false);
  });
});

describe("forDrinkWater", () => {
  it("hollow fiber outside in for drinking water", () => {
    expect(forDrinkWater("hollow_fiber_outside_in")).toBe(true);
  });
  it("tubular ceramic not for drinking water", () => {
    expect(forDrinkWater("tubular_ceramic_robust")).toBe(false);
  });
});

describe("membrane", () => {
  it("flat sheet uses cassette submerge", () => {
    expect(membrane("flat_sheet_submerged")).toBe("flat_sheet_cassette_submerge_aerate");
  });
});

describe("bestUse", () => {
  it("spiral wound uf for whey protein", () => {
    expect(bestUse("spiral_wound_uf")).toBe("whey_protein_concentrate_dairy_process");
  });
});

describe("ufMembraneTypes", () => {
  it("returns 5 types", () => {
    expect(ufMembraneTypes()).toHaveLength(5);
  });
});
