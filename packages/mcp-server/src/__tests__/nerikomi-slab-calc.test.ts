import { describe, it, expect } from "vitest";
import {
  patternClarity, colorIntense, blendSmooth, sliceClean,
  slabCost, stained, natural, colorSource,
  bestUse, nerikomiSlabs,
} from "../nerikomi-slab-calc.js";

describe("patternClarity", () => {
  it("porcelain stain fine clearest pattern", () => {
    expect(patternClarity("porcelain_stain_fine")).toBeGreaterThan(patternClarity("natural_clay_blend"));
  });
});

describe("colorIntense", () => {
  it("mason stain bright most intense color", () => {
    expect(colorIntense("mason_stain_bright")).toBeGreaterThan(colorIntense("natural_clay_blend"));
  });
});

describe("blendSmooth", () => {
  it("natural clay blend smoothest blend", () => {
    expect(blendSmooth("natural_clay_blend")).toBeGreaterThan(blendSmooth("mason_stain_bright"));
  });
});

describe("sliceClean", () => {
  it("porcelain stain fine cleanest slice", () => {
    expect(sliceClean("porcelain_stain_fine")).toBeGreaterThan(sliceClean("natural_clay_blend"));
  });
});

describe("slabCost", () => {
  it("porcelain stain fine most expensive", () => {
    expect(slabCost("porcelain_stain_fine")).toBeGreaterThan(slabCost("natural_clay_blend"));
  });
});

describe("stained", () => {
  it("porcelain stain fine is stained", () => {
    expect(stained("porcelain_stain_fine")).toBe(true);
  });
  it("natural clay blend not stained", () => {
    expect(stained("natural_clay_blend")).toBe(false);
  });
});

describe("natural", () => {
  it("oxide tint earthy is natural", () => {
    expect(natural("oxide_tint_earthy")).toBe(true);
  });
  it("colored clay standard not natural", () => {
    expect(natural("colored_clay_standard")).toBe(false);
  });
});

describe("colorSource", () => {
  it("mason stain bright uses mason stain powder", () => {
    expect(colorSource("mason_stain_bright")).toBe("mason_stain_powder");
  });
});

describe("bestUse", () => {
  it("colored clay standard best for general pattern slab", () => {
    expect(bestUse("colored_clay_standard")).toBe("general_pattern_slab");
  });
});

describe("nerikomiSlabs", () => {
  it("returns 5 types", () => {
    expect(nerikomiSlabs()).toHaveLength(5);
  });
});
