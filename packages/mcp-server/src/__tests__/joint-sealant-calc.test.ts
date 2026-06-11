import { describe, it, expect } from "vitest";
import {
  movement, adhesion, longevity, flexibility,
  jsCost, paintable, forExterior, cure,
  bestUse, jointSealantTypes,
} from "../joint-sealant-calc.js";

describe("movement", () => {
  it("silicone best movement", () => {
    expect(movement("silicone_neutral_cure")).toBeGreaterThan(movement("acrylic_latex_paint"));
  });
});

describe("adhesion", () => {
  it("hybrid best adhesion", () => {
    expect(adhesion("hybrid_ms_polymer")).toBeGreaterThan(adhesion("acrylic_latex_paint"));
  });
});

describe("longevity", () => {
  it("silicone longest lasting", () => {
    expect(longevity("silicone_neutral_cure")).toBeGreaterThan(longevity("acrylic_latex_paint"));
  });
});

describe("flexibility", () => {
  it("silicone most flexible", () => {
    expect(flexibility("silicone_neutral_cure")).toBeGreaterThan(flexibility("acrylic_latex_paint"));
  });
});

describe("jsCost", () => {
  it("hybrid most expensive", () => {
    expect(jsCost("hybrid_ms_polymer")).toBeGreaterThan(jsCost("acrylic_latex_paint"));
  });
});

describe("paintable", () => {
  it("polyurethane is paintable", () => {
    expect(paintable("polyurethane_self_level")).toBe(true);
  });
  it("silicone not paintable", () => {
    expect(paintable("silicone_neutral_cure")).toBe(false);
  });
});

describe("forExterior", () => {
  it("silicone for exterior", () => {
    expect(forExterior("silicone_neutral_cure")).toBe(true);
  });
  it("acrylic not exterior", () => {
    expect(forExterior("acrylic_latex_paint")).toBe(false);
  });
});

describe("cure", () => {
  it("polysulfide uses two part", () => {
    expect(cure("polysulfide_fuel_resist")).toBe("two_part_chemical_cure");
  });
});

describe("bestUse", () => {
  it("hybrid for multi substrate", () => {
    expect(bestUse("hybrid_ms_polymer")).toBe("multi_substrate_versatile_bond");
  });
});

describe("jointSealantTypes", () => {
  it("returns 5 types", () => {
    expect(jointSealantTypes()).toHaveLength(5);
  });
});
