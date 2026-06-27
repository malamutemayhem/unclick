import { describe, it, expect } from "vitest";
import {
  colorRange, cutEase, durability, lightReflect,
  tessCost, transparent, forOutdoor, material,
  bestUse, tesseraes,
} from "../tesserae-calc.js";

describe("colorRange", () => {
  it("glass tesserae vivid widest color range", () => {
    expect(colorRange("glass_tesserae_vivid")).toBeGreaterThan(colorRange("gold_tesserae_leaf"));
  });
});

describe("cutEase", () => {
  it("ceramic tesserae matte easiest cut", () => {
    expect(cutEase("ceramic_tesserae_matte")).toBeGreaterThan(cutEase("stone_tesserae_natural"));
  });
});

describe("durability", () => {
  it("stone tesserae natural most durable", () => {
    expect(durability("stone_tesserae_natural")).toBeGreaterThan(durability("glass_tesserae_vivid"));
  });
});

describe("lightReflect", () => {
  it("gold tesserae leaf most reflective", () => {
    expect(lightReflect("gold_tesserae_leaf")).toBeGreaterThan(lightReflect("ceramic_tesserae_matte"));
  });
});

describe("tessCost", () => {
  it("gold tesserae leaf most expensive", () => {
    expect(tessCost("gold_tesserae_leaf")).toBeGreaterThan(tessCost("ceramic_tesserae_matte"));
  });
});

describe("transparent", () => {
  it("glass tesserae vivid is transparent", () => {
    expect(transparent("glass_tesserae_vivid")).toBe(true);
  });
  it("stone tesserae natural not transparent", () => {
    expect(transparent("stone_tesserae_natural")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("stone tesserae natural is for outdoor", () => {
    expect(forOutdoor("stone_tesserae_natural")).toBe(true);
  });
  it("glass tesserae vivid not for outdoor", () => {
    expect(forOutdoor("glass_tesserae_vivid")).toBe(false);
  });
});

describe("material", () => {
  it("marble tesserae classic uses polished marble cube", () => {
    expect(material("marble_tesserae_classic")).toBe("polished_marble_cube");
  });
});

describe("bestUse", () => {
  it("ceramic tesserae matte best for general floor mosaic", () => {
    expect(bestUse("ceramic_tesserae_matte")).toBe("general_floor_mosaic");
  });
});

describe("tesseraes", () => {
  it("returns 5 types", () => {
    expect(tesseraes()).toHaveLength(5);
  });
});
