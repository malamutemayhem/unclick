import { describe, it, expect } from "vitest";
import {
  lightEffect, colorDepth, setEase, sizeRange,
  nuggetCost, transparent, handmade, cutProfile,
  bestUse, glassNuggets,
} from "../glass-nugget-calc.js";

describe("lightEffect", () => {
  it("faceted gem sparkle best light effect", () => {
    expect(lightEffect("faceted_gem_sparkle")).toBeGreaterThan(lightEffect("irregular_pebble_natural"));
  });
});

describe("colorDepth", () => {
  it("millefiori slice pattern deepest color", () => {
    expect(colorDepth("millefiori_slice_pattern")).toBeGreaterThan(colorDepth("flat_back_clear"));
  });
});

describe("setEase", () => {
  it("flat back clear easiest set", () => {
    expect(setEase("flat_back_clear")).toBeGreaterThan(setEase("irregular_pebble_natural"));
  });
});

describe("sizeRange", () => {
  it("irregular pebble natural widest size range", () => {
    expect(sizeRange("irregular_pebble_natural")).toBeGreaterThan(sizeRange("millefiori_slice_pattern"));
  });
});

describe("nuggetCost", () => {
  it("millefiori slice pattern most expensive", () => {
    expect(nuggetCost("millefiori_slice_pattern")).toBeGreaterThan(nuggetCost("flat_back_clear"));
  });
});

describe("transparent", () => {
  it("flat back clear is transparent", () => {
    expect(transparent("flat_back_clear")).toBe(true);
  });
  it("irregular pebble natural not transparent", () => {
    expect(transparent("irregular_pebble_natural")).toBe(false);
  });
});

describe("handmade", () => {
  it("millefiori slice pattern is handmade", () => {
    expect(handmade("millefiori_slice_pattern")).toBe(true);
  });
  it("flat back clear not handmade", () => {
    expect(handmade("flat_back_clear")).toBe(false);
  });
});

describe("cutProfile", () => {
  it("round dome color uses smooth dome top", () => {
    expect(cutProfile("round_dome_color")).toBe("smooth_dome_top");
  });
});

describe("bestUse", () => {
  it("flat back clear best for general accent piece", () => {
    expect(bestUse("flat_back_clear")).toBe("general_accent_piece");
  });
});

describe("glassNuggets", () => {
  it("returns 5 types", () => {
    expect(glassNuggets()).toHaveLength(5);
  });
});
