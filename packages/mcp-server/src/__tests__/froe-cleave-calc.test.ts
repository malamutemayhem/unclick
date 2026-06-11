import { describe, it, expect } from "vitest";
import {
  splitClean, bladeControl, grainFollow, handleLeverage,
  froeCost, folding, forShingles, bladeLength,
  bestUse, froeCleaves,
} from "../froe-cleave-calc.js";

describe("splitClean", () => {
  it("curved blade shingle cleanest split", () => {
    expect(splitClean("curved_blade_shingle")).toBeGreaterThan(splitClean("folding_camp_travel"));
  });
});

describe("bladeControl", () => {
  it("narrow blade lath best control", () => {
    expect(bladeControl("narrow_blade_lath")).toBeGreaterThan(bladeControl("wide_blade_clapboard"));
  });
});

describe("grainFollow", () => {
  it("curved blade shingle best grain follow", () => {
    expect(grainFollow("curved_blade_shingle")).toBeGreaterThan(grainFollow("folding_camp_travel"));
  });
});

describe("handleLeverage", () => {
  it("wide blade clapboard most leverage", () => {
    expect(handleLeverage("wide_blade_clapboard")).toBeGreaterThan(handleLeverage("folding_camp_travel"));
  });
});

describe("froeCost", () => {
  it("folding camp travel most expensive", () => {
    expect(froeCost("folding_camp_travel")).toBeGreaterThan(froeCost("narrow_blade_lath"));
  });
});

describe("folding", () => {
  it("folding camp travel is folding", () => {
    expect(folding("folding_camp_travel")).toBe(true);
  });
  it("straight blade standard not folding", () => {
    expect(folding("straight_blade_standard")).toBe(false);
  });
});

describe("forShingles", () => {
  it("curved blade shingle is for shingles", () => {
    expect(forShingles("curved_blade_shingle")).toBe(true);
  });
  it("straight blade standard not for shingles", () => {
    expect(forShingles("straight_blade_standard")).toBe(false);
  });
});

describe("bladeLength", () => {
  it("wide blade clapboard uses sixteen inch wide", () => {
    expect(bladeLength("wide_blade_clapboard")).toBe("sixteen_inch_wide");
  });
});

describe("bestUse", () => {
  it("narrow blade lath best for thin lath split", () => {
    expect(bestUse("narrow_blade_lath")).toBe("thin_lath_split");
  });
});

describe("froeCleaves", () => {
  it("returns 5 types", () => {
    expect(froeCleaves()).toHaveLength(5);
  });
});
