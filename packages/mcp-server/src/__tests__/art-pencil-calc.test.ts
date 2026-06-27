import { describe, it, expect } from "vitest";
import {
  darknessRange, blendability, lineDetail, smudgeResistance,
  pencilCost, erasable, waterSoluble, coreMaterial,
  bestSubject, artPencils,
} from "../art-pencil-calc.js";

describe("darknessRange", () => {
  it("charcoal vine darkest", () => {
    expect(darknessRange("charcoal_vine")).toBeGreaterThan(darknessRange("watercolor_pencil"));
  });
});

describe("blendability", () => {
  it("charcoal vine most blendable", () => {
    expect(blendability("charcoal_vine")).toBeGreaterThan(blendability("colored_wax"));
  });
});

describe("lineDetail", () => {
  it("graphite drawing best line detail", () => {
    expect(lineDetail("graphite_drawing")).toBeGreaterThan(lineDetail("charcoal_vine"));
  });
});

describe("smudgeResistance", () => {
  it("colored wax most smudge resistant", () => {
    expect(smudgeResistance("colored_wax")).toBeGreaterThan(smudgeResistance("charcoal_vine"));
  });
});

describe("pencilCost", () => {
  it("watercolor pencil most expensive", () => {
    expect(pencilCost("watercolor_pencil")).toBeGreaterThan(pencilCost("charcoal_vine"));
  });
});

describe("erasable", () => {
  it("graphite drawing is erasable", () => {
    expect(erasable("graphite_drawing")).toBe(true);
  });
  it("colored wax is not", () => {
    expect(erasable("colored_wax")).toBe(false);
  });
});

describe("waterSoluble", () => {
  it("watercolor pencil is water soluble", () => {
    expect(waterSoluble("watercolor_pencil")).toBe(true);
  });
  it("graphite drawing is not", () => {
    expect(waterSoluble("graphite_drawing")).toBe(false);
  });
});

describe("coreMaterial", () => {
  it("charcoal vine uses burned willow vine stick", () => {
    expect(coreMaterial("charcoal_vine")).toBe("burned_willow_vine_stick");
  });
});

describe("bestSubject", () => {
  it("colored wax for illustration layered color", () => {
    expect(bestSubject("colored_wax")).toBe("illustration_layered_color");
  });
});

describe("artPencils", () => {
  it("returns 5 types", () => {
    expect(artPencils()).toHaveLength(5);
  });
});
