import { describe, it, expect } from "vitest";
import {
  resistStrength, lineControl, removeEase, layerBuild,
  resistCost, needsHeat, peelable, baseType,
  bestUse, waxResists,
} from "../wax-resist-calc.js";

describe("resistStrength", () => {
  it("shellac alcohol coat strongest resist", () => {
    expect(resistStrength("shellac_alcohol_coat")).toBeGreaterThan(resistStrength("crayon_draw_mark"));
  });
});

describe("lineControl", () => {
  it("crayon draw mark best line control", () => {
    expect(lineControl("crayon_draw_mark")).toBeGreaterThan(lineControl("shellac_alcohol_coat"));
  });
});

describe("removeEase", () => {
  it("latex peel mask easiest remove", () => {
    expect(removeEase("latex_peel_mask")).toBeGreaterThan(removeEase("shellac_alcohol_coat"));
  });
});

describe("layerBuild", () => {
  it("shellac alcohol coat best layer build", () => {
    expect(layerBuild("shellac_alcohol_coat")).toBeGreaterThan(layerBuild("crayon_draw_mark"));
  });
});

describe("resistCost", () => {
  it("latex peel mask more expensive", () => {
    expect(resistCost("latex_peel_mask")).toBeGreaterThan(resistCost("crayon_draw_mark"));
  });
});

describe("needsHeat", () => {
  it("hot wax brush needs heat", () => {
    expect(needsHeat("hot_wax_brush")).toBe(true);
  });
  it("cold wax emulsion no heat needed", () => {
    expect(needsHeat("cold_wax_emulsion")).toBe(false);
  });
});

describe("peelable", () => {
  it("latex peel mask is peelable", () => {
    expect(peelable("latex_peel_mask")).toBe(true);
  });
  it("hot wax brush not peelable", () => {
    expect(peelable("hot_wax_brush")).toBe(false);
  });
});

describe("baseType", () => {
  it("hot wax brush uses paraffin beeswax blend", () => {
    expect(baseType("hot_wax_brush")).toBe("paraffin_beeswax_blend");
  });
});

describe("bestUse", () => {
  it("shellac alcohol coat best for multi layer fire", () => {
    expect(bestUse("shellac_alcohol_coat")).toBe("multi_layer_fire");
  });
});

describe("waxResists", () => {
  it("returns 5 types", () => {
    expect(waxResists()).toHaveLength(5);
  });
});
