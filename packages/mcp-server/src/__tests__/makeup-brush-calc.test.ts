import { describe, it, expect } from "vitest";
import {
  coverage, blendAbility, precision, softness,
  brushCost, veganFriendly, washable, bristleMaterial,
  bestProduct, makeupBrushes,
} from "../makeup-brush-calc.js";

describe("coverage", () => {
  it("flat foundation paddle best coverage", () => {
    expect(coverage("flat_foundation_paddle")).toBeGreaterThan(coverage("fan_highlight_sweep"));
  });
});

describe("blendAbility", () => {
  it("blending sponge damp best blending", () => {
    expect(blendAbility("blending_sponge_damp")).toBeGreaterThan(blendAbility("fan_highlight_sweep"));
  });
});

describe("precision", () => {
  it("angled contour sculpt most precise", () => {
    expect(precision("angled_contour_sculpt")).toBeGreaterThan(precision("kabuki_powder_round"));
  });
});

describe("softness", () => {
  it("fan highlight sweep softest", () => {
    expect(softness("fan_highlight_sweep")).toBeGreaterThan(softness("flat_foundation_paddle"));
  });
});

describe("brushCost", () => {
  it("fan highlight sweep most expensive", () => {
    expect(brushCost("fan_highlight_sweep")).toBeGreaterThan(brushCost("blending_sponge_damp"));
  });
});

describe("veganFriendly", () => {
  it("kabuki powder round is vegan friendly", () => {
    expect(veganFriendly("kabuki_powder_round")).toBe(true);
  });
  it("fan highlight sweep is not", () => {
    expect(veganFriendly("fan_highlight_sweep")).toBe(false);
  });
});

describe("washable", () => {
  it("all brushes are washable", () => {
    expect(washable("kabuki_powder_round")).toBe(true);
    expect(washable("blending_sponge_damp")).toBe(true);
  });
});

describe("bristleMaterial", () => {
  it("fan highlight sweep uses natural goat hair fan", () => {
    expect(bristleMaterial("fan_highlight_sweep")).toBe("natural_goat_hair_fan");
  });
});

describe("bestProduct", () => {
  it("angled contour sculpt best for bronzer contour define", () => {
    expect(bestProduct("angled_contour_sculpt")).toBe("bronzer_contour_define");
  });
});

describe("makeupBrushes", () => {
  it("returns 5 types", () => {
    expect(makeupBrushes()).toHaveLength(5);
  });
});
