import { describe, it, expect } from "vitest";
import {
  tempRange, chemResist, compressionSet, abrasionResist,
  orCost, foodSafe, forChemical, compound,
  bestUse, oRingSealTypes,
} from "../o-ring-seal-calc.js";

describe("tempRange", () => {
  it("perfluoro widest temp range", () => {
    expect(tempRange("perfluoro_ffkm_chem")).toBeGreaterThan(tempRange("nitrile_nbr_standard"));
  });
});

describe("chemResist", () => {
  it("perfluoro best chemical resistance", () => {
    expect(chemResist("perfluoro_ffkm_chem")).toBeGreaterThan(chemResist("silicone_food_grade"));
  });
});

describe("compressionSet", () => {
  it("perfluoro best compression set", () => {
    expect(compressionSet("perfluoro_ffkm_chem")).toBeGreaterThan(compressionSet("silicone_food_grade"));
  });
});

describe("abrasionResist", () => {
  it("nitrile best abrasion resistance", () => {
    expect(abrasionResist("nitrile_nbr_standard")).toBeGreaterThan(abrasionResist("silicone_food_grade"));
  });
});

describe("orCost", () => {
  it("perfluoro most expensive", () => {
    expect(orCost("perfluoro_ffkm_chem")).toBeGreaterThan(orCost("nitrile_nbr_standard"));
  });
});

describe("foodSafe", () => {
  it("silicone is food safe", () => {
    expect(foodSafe("silicone_food_grade")).toBe(true);
  });
  it("viton not food safe", () => {
    expect(foodSafe("viton_fkm_high_temp")).toBe(false);
  });
});

describe("forChemical", () => {
  it("perfluoro for chemical", () => {
    expect(forChemical("perfluoro_ffkm_chem")).toBe(true);
  });
  it("nitrile not for chemical", () => {
    expect(forChemical("nitrile_nbr_standard")).toBe(false);
  });
});

describe("compound", () => {
  it("epdm uses ethylene propylene", () => {
    expect(compound("epdm_steam_water")).toBe("ethylene_propylene_diene_monomer_steam_water");
  });
});

describe("bestUse", () => {
  it("silicone for food beverage", () => {
    expect(bestUse("silicone_food_grade")).toBe("food_beverage_medical_device_clean_room_seal");
  });
});

describe("oRingSealTypes", () => {
  it("returns 5 types", () => {
    expect(oRingSealTypes()).toHaveLength(5);
  });
});
