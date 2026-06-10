import { describe, it, expect } from "vitest";
import {
  hairsPerBundle, tensileStrengthGrams, gripRating,
  rosinRequired, replacementMonths, sourcePreference,
  colorPreference, toneContribution, costPerHank, horsehairUses,
} from "../horsehair-string-calc.js";

describe("hairsPerBundle", () => {
  it("bow hair has most hairs", () => {
    expect(hairsPerBundle("bow_hair")).toBeGreaterThan(
      hairsPerBundle("weaving_thread")
    );
  });
});

describe("tensileStrengthGrams", () => {
  it("fiddle string is strongest", () => {
    expect(tensileStrengthGrams("fiddle_string")).toBeGreaterThan(
      tensileStrengthGrams("weaving_thread")
    );
  });
});

describe("gripRating", () => {
  it("bow hair has best grip", () => {
    expect(gripRating("bow_hair")).toBeGreaterThan(
      gripRating("weaving_thread")
    );
  });
});

describe("rosinRequired", () => {
  it("bow hair needs rosin", () => {
    expect(rosinRequired("bow_hair")).toBe(true);
  });
  it("fiddle string does not", () => {
    expect(rosinRequired("fiddle_string")).toBe(false);
  });
});

describe("replacementMonths", () => {
  it("weaving thread lasts longest", () => {
    expect(replacementMonths("weaving_thread")).toBeGreaterThan(
      replacementMonths("fiddle_string")
    );
  });
});

describe("sourcePreference", () => {
  it("bow hair prefers mongolian stallion", () => {
    expect(sourcePreference("bow_hair")).toBe("mongolian_stallion");
  });
});

describe("colorPreference", () => {
  it("bow hair prefers white", () => {
    expect(colorPreference("bow_hair")).toBe("white");
  });
});

describe("toneContribution", () => {
  it("fiddle string contributes most to tone", () => {
    expect(toneContribution("fiddle_string")).toBeGreaterThan(
      toneContribution("morin_khuur")
    );
  });
});

describe("costPerHank", () => {
  it("bow hair is most expensive", () => {
    expect(costPerHank("bow_hair")).toBeGreaterThan(
      costPerHank("weaving_thread")
    );
  });
});

describe("horsehairUses", () => {
  it("returns 5 uses", () => {
    expect(horsehairUses()).toHaveLength(5);
  });
});
