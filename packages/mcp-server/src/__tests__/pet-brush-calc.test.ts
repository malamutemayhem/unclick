import { describe, it, expect } from "vitest";
import {
  sheddingRemoval, gentleness, detangling, shineBoost,
  brushCost, selfCleaning, safeForKittens, bristleType,
  bestCoat, petBrushes,
} from "../pet-brush-calc.js";

describe("sheddingRemoval", () => {
  it("deshedding blade best shedding removal", () => {
    expect(sheddingRemoval("deshedding_blade")).toBeGreaterThan(sheddingRemoval("bristle_boar_hair"));
  });
});

describe("gentleness", () => {
  it("rubber curry comb most gentle", () => {
    expect(gentleness("rubber_curry_comb")).toBeGreaterThan(gentleness("deshedding_blade"));
  });
});

describe("detangling", () => {
  it("slicker wire best detangling", () => {
    expect(detangling("slicker_wire")).toBeGreaterThan(detangling("rubber_curry_comb"));
  });
});

describe("shineBoost", () => {
  it("bristle boar hair best shine boost", () => {
    expect(shineBoost("bristle_boar_hair")).toBeGreaterThan(shineBoost("deshedding_blade"));
  });
});

describe("brushCost", () => {
  it("deshedding blade most expensive", () => {
    expect(brushCost("deshedding_blade")).toBeGreaterThan(brushCost("rubber_curry_comb"));
  });
});

describe("selfCleaning", () => {
  it("slicker wire is self cleaning", () => {
    expect(selfCleaning("slicker_wire")).toBe(true);
  });
  it("bristle boar hair is not", () => {
    expect(selfCleaning("bristle_boar_hair")).toBe(false);
  });
});

describe("safeForKittens", () => {
  it("rubber curry comb is safe for kittens", () => {
    expect(safeForKittens("rubber_curry_comb")).toBe(true);
  });
  it("deshedding blade is not", () => {
    expect(safeForKittens("deshedding_blade")).toBe(false);
  });
});

describe("bristleType", () => {
  it("deshedding blade uses stainless comb edge", () => {
    expect(bristleType("deshedding_blade")).toBe("stainless_comb_edge");
  });
});

describe("bestCoat", () => {
  it("rubber curry comb best for short hair sensitive skin", () => {
    expect(bestCoat("rubber_curry_comb")).toBe("short_hair_sensitive_skin");
  });
});

describe("petBrushes", () => {
  it("returns 5 types", () => {
    expect(petBrushes()).toHaveLength(5);
  });
});
