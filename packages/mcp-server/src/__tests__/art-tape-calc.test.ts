import { describe, it, expect } from "vitest";
import {
  lineSharpness, surfaceSafe, repositionability, versatility,
  tapeCost, acidFree, tearByHand, adhesiveType,
  bestUse, artTapes,
} from "../art-tape-calc.js";

describe("lineSharpness", () => {
  it("drafting blue precise best line sharpness", () => {
    expect(lineSharpness("drafting_blue_precise")).toBeGreaterThan(lineSharpness("washi_decorative_pattern"));
  });
});

describe("surfaceSafe", () => {
  it("washi decorative pattern most surface safe", () => {
    expect(surfaceSafe("washi_decorative_pattern")).toBeGreaterThan(surfaceSafe("chart_tape_thin_line"));
  });
});

describe("repositionability", () => {
  it("masking cream low tack most repositionable", () => {
    expect(repositionability("masking_cream_low_tack")).toBeGreaterThan(repositionability("chart_tape_thin_line"));
  });
});

describe("versatility", () => {
  it("washi decorative pattern most versatile", () => {
    expect(versatility("washi_decorative_pattern")).toBeGreaterThan(versatility("chart_tape_thin_line"));
  });
});

describe("tapeCost", () => {
  it("drafting blue precise most expensive", () => {
    expect(tapeCost("drafting_blue_precise")).toBeGreaterThan(tapeCost("masking_cream_low_tack"));
  });
});

describe("acidFree", () => {
  it("artists white acid free is acid free", () => {
    expect(acidFree("artists_white_acid_free")).toBe(true);
  });
  it("masking cream low tack is not acid free", () => {
    expect(acidFree("masking_cream_low_tack")).toBe(false);
  });
});

describe("tearByHand", () => {
  it("washi decorative pattern can tear by hand", () => {
    expect(tearByHand("washi_decorative_pattern")).toBe(true);
  });
  it("drafting blue precise cannot tear by hand", () => {
    expect(tearByHand("drafting_blue_precise")).toBe(false);
  });
});

describe("adhesiveType", () => {
  it("washi decorative pattern uses rice paper gentle", () => {
    expect(adhesiveType("washi_decorative_pattern")).toBe("rice_paper_gentle");
  });
});

describe("bestUse", () => {
  it("drafting blue precise best for technical drawing line", () => {
    expect(bestUse("drafting_blue_precise")).toBe("technical_drawing_line");
  });
});

describe("artTapes", () => {
  it("returns 5 types", () => {
    expect(artTapes()).toHaveLength(5);
  });
});
