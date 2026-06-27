import { describe, it, expect } from "vitest";
import {
  coverage, evenCoat, cleanEase, durability,
  brushCost, reusable, naturalBristle, bristleType,
  bestUse, pasteBrushes,
} from "../paste-brush-calc.js";

describe("coverage", () => {
  it("foam roller even best coverage", () => {
    expect(coverage("foam_roller_even")).toBeGreaterThan(coverage("silicon_spreader_flex"));
  });
});

describe("evenCoat", () => {
  it("foam roller even most even coat", () => {
    expect(evenCoat("foam_roller_even")).toBeGreaterThan(evenCoat("flat_glue_stiff"));
  });
});

describe("cleanEase", () => {
  it("silicon spreader flex easiest to clean", () => {
    expect(cleanEase("silicon_spreader_flex")).toBeGreaterThan(cleanEase("foam_roller_even"));
  });
});

describe("durability", () => {
  it("silicon spreader flex most durable", () => {
    expect(durability("silicon_spreader_flex")).toBeGreaterThan(durability("foam_roller_even"));
  });
});

describe("brushCost", () => {
  it("japanese nori soft most expensive", () => {
    expect(brushCost("japanese_nori_soft")).toBeGreaterThan(brushCost("flat_glue_stiff"));
  });
});

describe("reusable", () => {
  it("round hake wide is reusable", () => {
    expect(reusable("round_hake_wide")).toBe(true);
  });
  it("foam roller even not reusable", () => {
    expect(reusable("foam_roller_even")).toBe(false);
  });
});

describe("naturalBristle", () => {
  it("round hake wide has natural bristle", () => {
    expect(naturalBristle("round_hake_wide")).toBe(true);
  });
  it("silicon spreader flex no natural bristle", () => {
    expect(naturalBristle("silicon_spreader_flex")).toBe(false);
  });
});

describe("bristleType", () => {
  it("round hake wide uses goat hair round", () => {
    expect(bristleType("round_hake_wide")).toBe("goat_hair_round");
  });
});

describe("bestUse", () => {
  it("japanese nori soft best for rice paste tissue", () => {
    expect(bestUse("japanese_nori_soft")).toBe("rice_paste_tissue");
  });
});

describe("pasteBrushes", () => {
  it("returns 5 types", () => {
    expect(pasteBrushes()).toHaveLength(5);
  });
});
