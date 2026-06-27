import { describe, it, expect } from "vitest";
import {
  speed, imageQuality, runLength, inkDensity,
  gpCost, electronicEngraving, forLongRun, cylinder,
  bestUse, gravurePressTypes,
} from "../gravure-press-calc.js";

describe("speed", () => {
  it("publication fastest", () => {
    expect(speed("publication")).toBeGreaterThan(speed("specialty"));
  });
});

describe("imageQuality", () => {
  it("packaging best image quality", () => {
    expect(imageQuality("packaging")).toBeGreaterThan(imageQuality("narrow_web"));
  });
});

describe("runLength", () => {
  it("publication best run length", () => {
    expect(runLength("publication")).toBeGreaterThan(runLength("specialty"));
  });
});

describe("inkDensity", () => {
  it("packaging best ink density", () => {
    expect(inkDensity("packaging")).toBeGreaterThan(inkDensity("narrow_web"));
  });
});

describe("gpCost", () => {
  it("publication most expensive", () => {
    expect(gpCost("publication")).toBeGreaterThan(gpCost("narrow_web"));
  });
});

describe("electronicEngraving", () => {
  it("publication uses electronic engraving", () => {
    expect(electronicEngraving("publication")).toBe(true);
  });
  it("decorative not electronic engraving", () => {
    expect(electronicEngraving("decorative")).toBe(false);
  });
});

describe("forLongRun", () => {
  it("publication for long run", () => {
    expect(forLongRun("publication")).toBe(true);
  });
  it("specialty not for long run", () => {
    expect(forLongRun("specialty")).toBe(false);
  });
});

describe("cylinder", () => {
  it("decorative uses chemically etched", () => {
    expect(cylinder("decorative")).toBe("chemically_etched_pattern_cylinder_wood_grain_texture");
  });
});

describe("bestUse", () => {
  it("packaging for flexible film", () => {
    expect(bestUse("packaging")).toBe("flexible_film_laminate_pouch_foil_wrapper_food_grade");
  });
});

describe("gravurePressTypes", () => {
  it("returns 5 types", () => {
    expect(gravurePressTypes()).toHaveLength(5);
  });
});
