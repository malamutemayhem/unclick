import { describe, it, expect } from "vitest";
import {
  coverage, precision, inkLife, bleedThrough,
  highlighterCost, erasable, dryResistant, inkFormula,
  bestUse, highlighters,
} from "../highlighter-calc.js";

describe("coverage", () => {
  it("chisel tip standard best coverage", () => {
    expect(coverage("chisel_tip_standard")).toBeGreaterThan(coverage("fine_tip_precise"));
  });
});

describe("precision", () => {
  it("fine tip precise most precise", () => {
    expect(precision("fine_tip_precise")).toBeGreaterThan(precision("chisel_tip_standard"));
  });
});

describe("inkLife", () => {
  it("gel wax no bleed longest ink life", () => {
    expect(inkLife("gel_wax_no_bleed")).toBeGreaterThan(inkLife("erasable_friction"));
  });
});

describe("bleedThrough", () => {
  it("gel wax no bleed least bleed through", () => {
    expect(bleedThrough("gel_wax_no_bleed")).toBeGreaterThan(bleedThrough("chisel_tip_standard"));
  });
});

describe("highlighterCost", () => {
  it("erasable friction most expensive", () => {
    expect(highlighterCost("erasable_friction")).toBeGreaterThan(highlighterCost("chisel_tip_standard"));
  });
});

describe("erasable", () => {
  it("erasable friction is erasable", () => {
    expect(erasable("erasable_friction")).toBe(true);
  });
  it("chisel tip standard is not", () => {
    expect(erasable("chisel_tip_standard")).toBe(false);
  });
});

describe("dryResistant", () => {
  it("gel wax no bleed is dry resistant", () => {
    expect(dryResistant("gel_wax_no_bleed")).toBe(true);
  });
  it("chisel tip standard is not", () => {
    expect(dryResistant("chisel_tip_standard")).toBe(false);
  });
});

describe("inkFormula", () => {
  it("gel wax no bleed uses solid gel wax stick", () => {
    expect(inkFormula("gel_wax_no_bleed")).toBe("solid_gel_wax_stick");
  });
});

describe("bestUse", () => {
  it("fine tip precise best for bible thin page study", () => {
    expect(bestUse("fine_tip_precise")).toBe("bible_thin_page_study");
  });
});

describe("highlighters", () => {
  it("returns 5 types", () => {
    expect(highlighters()).toHaveLength(5);
  });
});
