import { describe, it, expect } from "vitest";
import {
  lineDetail, colorIntensity, breakResist, placeEase,
  stringerCost, decorative, bendable, crossSection,
  bestUse, glassStringers,
} from "../glass-stringer-calc.js";

describe("lineDetail", () => {
  it("thin 1mm detail most line detail", () => {
    expect(lineDetail("thin_1mm_detail")).toBeGreaterThan(lineDetail("thick_3mm_accent"));
  });
});

describe("colorIntensity", () => {
  it("thick 3mm accent most color intensity", () => {
    expect(colorIntensity("thick_3mm_accent")).toBeGreaterThan(colorIntensity("thin_1mm_detail"));
  });
});

describe("breakResist", () => {
  it("thick 3mm accent most break resistant", () => {
    expect(breakResist("thick_3mm_accent")).toBeGreaterThan(breakResist("thin_1mm_detail"));
  });
});

describe("placeEase", () => {
  it("thick 3mm accent easiest to place", () => {
    expect(placeEase("thick_3mm_accent")).toBeGreaterThan(placeEase("twisted_pair_deco"));
  });
});

describe("stringerCost", () => {
  it("twisted pair deco more expensive", () => {
    expect(stringerCost("twisted_pair_deco")).toBeGreaterThan(stringerCost("thin_1mm_detail"));
  });
});

describe("decorative", () => {
  it("twisted pair deco is decorative", () => {
    expect(decorative("twisted_pair_deco")).toBe(true);
  });
  it("thin 1mm detail not decorative", () => {
    expect(decorative("thin_1mm_detail")).toBe(false);
  });
});

describe("bendable", () => {
  it("thin 1mm detail is bendable", () => {
    expect(bendable("thin_1mm_detail")).toBe(true);
  });
  it("thick 3mm accent not bendable", () => {
    expect(bendable("thick_3mm_accent")).toBe(false);
  });
});

describe("crossSection", () => {
  it("thin 1mm detail uses round solid 1mm", () => {
    expect(crossSection("thin_1mm_detail")).toBe("round_solid_1mm");
  });
});

describe("bestUse", () => {
  it("twisted pair deco best for decorative swirl art", () => {
    expect(bestUse("twisted_pair_deco")).toBe("decorative_swirl_art");
  });
});

describe("glassStringers", () => {
  it("returns 5 types", () => {
    expect(glassStringers()).toHaveLength(5);
  });
});
