import { describe, it, expect } from "vitest";
import {
  opacity, colorIntense, rewetAbility, layerSmooth,
  gouacheCost, waterproof, forIllustration, binderType,
  bestUse, gouaches,
} from "../gouache-calc.js";

describe("opacity", () => {
  it("designer gouache pro most opaque", () => {
    expect(opacity("designer_gouache_pro")).toBeGreaterThan(opacity("watercolor_gouache_blend"));
  });
});

describe("colorIntense", () => {
  it("designer gouache pro most intense color", () => {
    expect(colorIntense("designer_gouache_pro")).toBeGreaterThan(colorIntense("student_gouache_basic"));
  });
});

describe("rewetAbility", () => {
  it("watercolor gouache blend best rewet ability", () => {
    expect(rewetAbility("watercolor_gouache_blend")).toBeGreaterThan(rewetAbility("acrylic_gouache_bind"));
  });
});

describe("layerSmooth", () => {
  it("designer gouache pro smoothest layer", () => {
    expect(layerSmooth("designer_gouache_pro")).toBeGreaterThan(layerSmooth("student_gouache_basic"));
  });
});

describe("gouacheCost", () => {
  it("designer gouache pro most expensive", () => {
    expect(gouacheCost("designer_gouache_pro")).toBeGreaterThan(gouacheCost("student_gouache_basic"));
  });
});

describe("waterproof", () => {
  it("acrylic gouache bind is waterproof", () => {
    expect(waterproof("acrylic_gouache_bind")).toBe(true);
  });
  it("designer gouache pro not waterproof", () => {
    expect(waterproof("designer_gouache_pro")).toBe(false);
  });
});

describe("forIllustration", () => {
  it("designer gouache pro is for illustration", () => {
    expect(forIllustration("designer_gouache_pro")).toBe(true);
  });
  it("student gouache basic not for illustration", () => {
    expect(forIllustration("student_gouache_basic")).toBe(false);
  });
});

describe("binderType", () => {
  it("acrylic gouache bind uses acrylic polymer emulsion", () => {
    expect(binderType("acrylic_gouache_bind")).toBe("acrylic_polymer_emulsion");
  });
});

describe("bestUse", () => {
  it("student gouache basic best for student practice paint", () => {
    expect(bestUse("student_gouache_basic")).toBe("student_practice_paint");
  });
});

describe("gouaches", () => {
  it("returns 5 types", () => {
    expect(gouaches()).toHaveLength(5);
  });
});
