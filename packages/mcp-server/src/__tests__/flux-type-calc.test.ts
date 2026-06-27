import { describe, it, expect } from "vitest";
import {
  cleaningPower, residueSafe, workingTime, easeOfClean,
  fluxCost, needsCleanup, forGlass, baseChemistry,
  bestProject, fluxTypes,
} from "../flux-type-calc.js";

describe("cleaningPower", () => {
  it("paste flux plumb strongest cleaning", () => {
    expect(cleaningPower("paste_flux_plumb")).toBeGreaterThan(cleaningPower("no_clean_low_res"));
  });
});

describe("residueSafe", () => {
  it("no clean low res safest residue", () => {
    expect(residueSafe("no_clean_low_res")).toBeGreaterThan(residueSafe("water_soluble_active"));
  });
});

describe("workingTime", () => {
  it("oleic acid stained longest working time", () => {
    expect(workingTime("oleic_acid_stained")).toBeGreaterThan(workingTime("paste_flux_plumb"));
  });
});

describe("easeOfClean", () => {
  it("water soluble active easiest to clean", () => {
    expect(easeOfClean("water_soluble_active")).toBeGreaterThan(easeOfClean("paste_flux_plumb"));
  });
});

describe("fluxCost", () => {
  it("oleic acid stained most expensive", () => {
    expect(fluxCost("oleic_acid_stained")).toBeGreaterThan(fluxCost("rosin_core_mild"));
  });
});

describe("needsCleanup", () => {
  it("rosin core mild needs cleanup", () => {
    expect(needsCleanup("rosin_core_mild")).toBe(true);
  });
  it("no clean low res does not need cleanup", () => {
    expect(needsCleanup("no_clean_low_res")).toBe(false);
  });
});

describe("forGlass", () => {
  it("oleic acid stained is for glass", () => {
    expect(forGlass("oleic_acid_stained")).toBe(true);
  });
  it("rosin core mild is not for glass", () => {
    expect(forGlass("rosin_core_mild")).toBe(false);
  });
});

describe("baseChemistry", () => {
  it("paste flux plumb uses zinc chloride active", () => {
    expect(baseChemistry("paste_flux_plumb")).toBe("zinc_chloride_active");
  });
});

describe("bestProject", () => {
  it("oleic acid stained best for stained glass copper", () => {
    expect(bestProject("oleic_acid_stained")).toBe("stained_glass_copper");
  });
});

describe("fluxTypes", () => {
  it("returns 5 types", () => {
    expect(fluxTypes()).toHaveLength(5);
  });
});
