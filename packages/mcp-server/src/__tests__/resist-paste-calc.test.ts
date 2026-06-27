import { describe, it, expect } from "vitest";
import {
  lineSharp, removeEase, coverage, dyeBlock,
  pasteCost, washable, needsHeat, baseIngredient,
  bestUse, resistPastes,
} from "../resist-paste-calc.js";

describe("lineSharp", () => {
  it("gutta rubber clear sharpest line", () => {
    expect(lineSharp("gutta_rubber_clear")).toBeGreaterThan(lineSharp("flour_paste_trad"));
  });
});

describe("removeEase", () => {
  it("water based wash easiest remove", () => {
    expect(removeEase("water_based_wash")).toBeGreaterThan(removeEase("wax_resist_hot"));
  });
});

describe("coverage", () => {
  it("soy wax cold most coverage", () => {
    expect(coverage("soy_wax_cold")).toBeGreaterThan(coverage("gutta_rubber_clear"));
  });
});

describe("dyeBlock", () => {
  it("gutta rubber clear best dye block", () => {
    expect(dyeBlock("gutta_rubber_clear")).toBeGreaterThan(dyeBlock("water_based_wash"));
  });
});

describe("pasteCost", () => {
  it("gutta rubber clear more expensive", () => {
    expect(pasteCost("gutta_rubber_clear")).toBeGreaterThan(pasteCost("water_based_wash"));
  });
});

describe("washable", () => {
  it("water based wash is washable", () => {
    expect(washable("water_based_wash")).toBe(true);
  });
  it("gutta rubber clear not washable", () => {
    expect(washable("gutta_rubber_clear")).toBe(false);
  });
});

describe("needsHeat", () => {
  it("wax resist hot needs heat", () => {
    expect(needsHeat("wax_resist_hot")).toBe(true);
  });
  it("soy wax cold no heat needed", () => {
    expect(needsHeat("soy_wax_cold")).toBe(false);
  });
});

describe("baseIngredient", () => {
  it("gutta rubber clear uses natural rubber latex", () => {
    expect(baseIngredient("gutta_rubber_clear")).toBe("natural_rubber_latex");
  });
});

describe("bestUse", () => {
  it("flour paste trad best for katazome stencil", () => {
    expect(bestUse("flour_paste_trad")).toBe("katazome_stencil");
  });
});

describe("resistPastes", () => {
  it("returns 5 types", () => {
    expect(resistPastes()).toHaveLength(5);
  });
});
