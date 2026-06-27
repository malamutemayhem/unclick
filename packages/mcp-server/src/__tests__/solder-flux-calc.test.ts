import { describe, it, expect } from "vitest";
import {
  activity, wettability, residueClean, shelfLife,
  fluxCost, cleanRequired, forLeadFree, chemistry,
  bestUse, solderFluxes,
} from "../solder-flux-calc.js";

describe("activity", () => {
  it("water soluble oa highest activity", () => {
    expect(activity("water_soluble_oa")).toBeGreaterThan(activity("no_clean_low_residue"));
  });
});

describe("wettability", () => {
  it("water soluble oa best wettability", () => {
    expect(wettability("water_soluble_oa")).toBeGreaterThan(wettability("no_clean_low_residue"));
  });
});

describe("residueClean", () => {
  it("no clean low residue cleanest residue", () => {
    expect(residueClean("no_clean_low_residue")).toBeGreaterThan(residueClean("rosin_ra_activated"));
  });
});

describe("shelfLife", () => {
  it("synthetic rma mild longest shelf life", () => {
    expect(shelfLife("synthetic_rma_mild")).toBeGreaterThan(shelfLife("water_soluble_oa"));
  });
});

describe("fluxCost", () => {
  it("tacky gel flux most expensive", () => {
    expect(fluxCost("tacky_gel_flux")).toBeGreaterThan(fluxCost("rosin_ra_activated"));
  });
});

describe("cleanRequired", () => {
  it("rosin ra activated requires cleaning", () => {
    expect(cleanRequired("rosin_ra_activated")).toBe(true);
  });
  it("no clean low residue no clean required", () => {
    expect(cleanRequired("no_clean_low_residue")).toBe(false);
  });
});

describe("forLeadFree", () => {
  it("no clean low residue is for lead free", () => {
    expect(forLeadFree("no_clean_low_residue")).toBe(true);
  });
  it("rosin ra activated not for lead free", () => {
    expect(forLeadFree("rosin_ra_activated")).toBe(false);
  });
});

describe("chemistry", () => {
  it("water soluble oa uses organic acid water base", () => {
    expect(chemistry("water_soluble_oa")).toBe("organic_acid_water_base");
  });
});

describe("bestUse", () => {
  it("tacky gel flux best for bga reball rework", () => {
    expect(bestUse("tacky_gel_flux")).toBe("bga_reball_rework");
  });
});

describe("solderFluxes", () => {
  it("returns 5 types", () => {
    expect(solderFluxes()).toHaveLength(5);
  });
});
