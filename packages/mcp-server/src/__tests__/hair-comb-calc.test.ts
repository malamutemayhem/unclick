import { describe, it, expect } from "vitest";
import {
  detangling, styling, gentleness, precision,
  combCost, antiStatic, heatResistant, combMaterial,
  bestHairType, hairCombs,
} from "../hair-comb-calc.js";

describe("detangling", () => {
  it("wide tooth detangle best at detangling", () => {
    expect(detangling("wide_tooth_detangle")).toBeGreaterThan(detangling("fine_tooth_styling"));
  });
});

describe("styling", () => {
  it("fine tooth styling best for styling", () => {
    expect(styling("fine_tooth_styling")).toBeGreaterThan(styling("wide_tooth_detangle"));
  });
});

describe("gentleness", () => {
  it("wide tooth detangle most gentle", () => {
    expect(gentleness("wide_tooth_detangle")).toBeGreaterThan(gentleness("fine_tooth_styling"));
  });
});

describe("precision", () => {
  it("rat tail sectioning most precise", () => {
    expect(precision("rat_tail_sectioning")).toBeGreaterThan(precision("wide_tooth_detangle"));
  });
});

describe("combCost", () => {
  it("wooden sandalwood most expensive", () => {
    expect(combCost("wooden_sandalwood")).toBeGreaterThan(combCost("rat_tail_sectioning"));
  });
});

describe("antiStatic", () => {
  it("wooden sandalwood is anti static", () => {
    expect(antiStatic("wooden_sandalwood")).toBe(true);
  });
  it("fine tooth styling is not", () => {
    expect(antiStatic("fine_tooth_styling")).toBe(false);
  });
});

describe("heatResistant", () => {
  it("wide tooth detangle is heat resistant", () => {
    expect(heatResistant("wide_tooth_detangle")).toBe(true);
  });
  it("wooden sandalwood is not", () => {
    expect(heatResistant("wooden_sandalwood")).toBe(false);
  });
});

describe("combMaterial", () => {
  it("wooden sandalwood uses indian sandalwood carved", () => {
    expect(combMaterial("wooden_sandalwood")).toBe("indian_sandalwood_carved");
  });
});

describe("bestHairType", () => {
  it("wide tooth detangle best for curly thick wet", () => {
    expect(bestHairType("wide_tooth_detangle")).toBe("curly_thick_wet");
  });
});

describe("hairCombs", () => {
  it("returns 5 types", () => {
    expect(hairCombs()).toHaveLength(5);
  });
});
