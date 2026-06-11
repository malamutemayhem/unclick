import { describe, it, expect } from "vitest";
import {
  corrosionResistance, paintAdhesion, selfHealing, thickness,
  ccCost_, rohs, forAluminum, chemistry,
  bestUse, chromateConversionTypes,
} from "../chromate-conversion-calc.js";

describe("corrosionResistance", () => {
  it("hex chrome gold best corrosion resistance", () => {
    expect(corrosionResistance("hex_chrome_gold")).toBeGreaterThan(corrosionResistance("zirconium_based"));
  });
});

describe("paintAdhesion", () => {
  it("hex chrome clear and tcp best paint adhesion", () => {
    expect(paintAdhesion("hex_chrome_clear")).toBeGreaterThan(paintAdhesion("hex_chrome_gold"));
    expect(paintAdhesion("tcp_pretreatment")).toBeGreaterThan(paintAdhesion("hex_chrome_gold"));
  });
});

describe("selfHealing", () => {
  it("hex chrome gold best self healing", () => {
    expect(selfHealing("hex_chrome_gold")).toBeGreaterThan(selfHealing("zirconium_based"));
  });
});

describe("thickness", () => {
  it("hex chrome gold thickest coating", () => {
    expect(thickness("hex_chrome_gold")).toBeGreaterThan(thickness("zirconium_based"));
  });
});

describe("ccCost_", () => {
  it("tcp pretreatment most expensive", () => {
    expect(ccCost_("tcp_pretreatment")).toBeGreaterThan(ccCost_("hex_chrome_clear"));
  });
});

describe("rohs", () => {
  it("trivalent chrome is rohs compliant", () => {
    expect(rohs("trivalent_chrome")).toBe(true);
  });
  it("hex chrome gold not rohs", () => {
    expect(rohs("hex_chrome_gold")).toBe(false);
  });
});

describe("forAluminum", () => {
  it("all types for aluminum", () => {
    expect(forAluminum("hex_chrome_gold")).toBe(true);
    expect(forAluminum("zirconium_based")).toBe(true);
  });
});

describe("chemistry", () => {
  it("zirconium based uses hexafluorozirconic acid", () => {
    expect(chemistry("zirconium_based")).toBe("hexafluorozirconic_acid_nano_ceramic_coat_chrome_free_thin");
  });
});

describe("bestUse", () => {
  it("tcp pretreatment for aerospace chrome free", () => {
    expect(bestUse("tcp_pretreatment")).toBe("aerospace_chrome_free_replacement_boeing_bac_5632_approved");
  });
});

describe("chromateConversionTypes", () => {
  it("returns 5 types", () => {
    expect(chromateConversionTypes()).toHaveLength(5);
  });
});
