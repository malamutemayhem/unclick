import { describe, it, expect } from "vitest";
import {
  capacity, selectivity, regeneration, purity,
  ieCost, acidRegen, forDemin, resin,
  bestUse, ionExchangeTypes,
} from "../ion-exchange-calc.js";

describe("capacity", () => {
  it("wac highest capacity", () => {
    expect(capacity("weak_acid_cation_wac")).toBeGreaterThan(capacity("mixed_bed_cation_anion"));
  });
});

describe("selectivity", () => {
  it("mixed bed highest selectivity", () => {
    expect(selectivity("mixed_bed_cation_anion")).toBeGreaterThan(selectivity("weak_acid_cation_wac"));
  });
});

describe("regeneration", () => {
  it("wac easiest regeneration", () => {
    expect(regeneration("weak_acid_cation_wac")).toBeGreaterThan(regeneration("mixed_bed_cation_anion"));
  });
});

describe("purity", () => {
  it("mixed bed highest purity", () => {
    expect(purity("mixed_bed_cation_anion")).toBeGreaterThan(purity("weak_acid_cation_wac"));
  });
});

describe("ieCost", () => {
  it("mixed bed most expensive", () => {
    expect(ieCost("mixed_bed_cation_anion")).toBeGreaterThan(ieCost("weak_acid_cation_wac"));
  });
});

describe("acidRegen", () => {
  it("sac uses acid regen", () => {
    expect(acidRegen("strong_acid_cation_sac")).toBe(true);
  });
  it("sba not acid regen", () => {
    expect(acidRegen("strong_base_anion_sba")).toBe(false);
  });
});

describe("forDemin", () => {
  it("sac for demin", () => {
    expect(forDemin("strong_acid_cation_sac")).toBe(true);
  });
  it("wac not for demin", () => {
    expect(forDemin("weak_acid_cation_wac")).toBe(false);
  });
});

describe("resin", () => {
  it("mixed bed uses mixed sac sba", () => {
    expect(resin("mixed_bed_cation_anion")).toBe("mixed_sac_sba_single_vessel");
  });
});

describe("bestUse", () => {
  it("mixed bed for polishing ultrapure", () => {
    expect(bestUse("mixed_bed_cation_anion")).toBe("polishing_ultrapure_boiler_condensate");
  });
});

describe("ionExchangeTypes", () => {
  it("returns 5 types", () => {
    expect(ionExchangeTypes()).toHaveLength(5);
  });
});
