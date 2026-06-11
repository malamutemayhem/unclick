import { describe, it, expect } from "vitest";
import {
  absorption, selectivity, loadCapacity, regenEnergy,
  atCost, selective, forCo2, solvent,
  bestUse, amineTreatTypes,
} from "../amine-treat-calc.js";

describe("absorption", () => {
  it("mea primary highest absorption", () => {
    expect(absorption("mea_primary_amine")).toBeGreaterThan(absorption("mdea_tertiary_selective"));
  });
});

describe("selectivity", () => {
  it("mdea tertiary most selective", () => {
    expect(selectivity("mdea_tertiary_selective")).toBeGreaterThan(selectivity("mea_primary_amine"));
  });
});

describe("loadCapacity", () => {
  it("activated mdea highest load capacity", () => {
    expect(loadCapacity("activated_mdea_piperazine")).toBeGreaterThan(loadCapacity("mea_primary_amine"));
  });
});

describe("regenEnergy", () => {
  it("mdea tertiary lowest regen energy (highest score)", () => {
    expect(regenEnergy("mdea_tertiary_selective")).toBeGreaterThan(regenEnergy("mea_primary_amine"));
  });
});

describe("atCost", () => {
  it("activated mdea most expensive", () => {
    expect(atCost("activated_mdea_piperazine")).toBeGreaterThan(atCost("mea_primary_amine"));
  });
});

describe("selective", () => {
  it("mdea tertiary is selective", () => {
    expect(selective("mdea_tertiary_selective")).toBe(true);
  });
  it("mea primary not selective", () => {
    expect(selective("mea_primary_amine")).toBe(false);
  });
});

describe("forCo2", () => {
  it("mea primary for co2", () => {
    expect(forCo2("mea_primary_amine")).toBe(true);
  });
  it("mdea tertiary not for co2", () => {
    expect(forCo2("mdea_tertiary_selective")).toBe(false);
  });
});

describe("solvent", () => {
  it("dga uses diglycolamine", () => {
    expect(solvent("dga_diglycolamine")).toBe("diglycolamine_50_60_wt_low_freeze");
  });
});

describe("bestUse", () => {
  it("activated mdea for lng plant", () => {
    expect(bestUse("activated_mdea_piperazine")).toBe("lng_plant_deep_co2_h2s_remove_spec");
  });
});

describe("amineTreatTypes", () => {
  it("returns 5 types", () => {
    expect(amineTreatTypes()).toHaveLength(5);
  });
});
