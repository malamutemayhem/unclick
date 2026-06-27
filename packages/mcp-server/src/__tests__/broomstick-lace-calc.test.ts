import { describe, it, expect } from "vitest";
import {
  loopEven, slideSmooth, durability, sizeRange,
  rodCost, natural, lightweight, rodMaterial,
  bestUse, broomstickLaces,
} from "../broomstick-lace-calc.js";

describe("loopEven", () => {
  it("acrylic rod smooth most even loops", () => {
    expect(loopEven("acrylic_rod_smooth")).toBeGreaterThan(loopEven("wood_dowel_classic"));
  });
});

describe("slideSmooth", () => {
  it("acrylic rod smooth smoothest slide", () => {
    expect(slideSmooth("acrylic_rod_smooth")).toBeGreaterThan(slideSmooth("wood_dowel_classic"));
  });
});

describe("durability", () => {
  it("metal rod heavy most durable", () => {
    expect(durability("metal_rod_heavy")).toBeGreaterThan(durability("bamboo_stick_light"));
  });
});

describe("sizeRange", () => {
  it("bamboo stick light widest size range", () => {
    expect(sizeRange("bamboo_stick_light")).toBeGreaterThan(sizeRange("acrylic_rod_smooth"));
  });
});

describe("rodCost", () => {
  it("metal rod heavy most expensive", () => {
    expect(rodCost("metal_rod_heavy")).toBeGreaterThan(rodCost("wood_dowel_classic"));
  });
});

describe("natural", () => {
  it("wood dowel classic is natural", () => {
    expect(natural("wood_dowel_classic")).toBe(true);
  });
  it("acrylic rod smooth not natural", () => {
    expect(natural("acrylic_rod_smooth")).toBe(false);
  });
});

describe("lightweight", () => {
  it("bamboo stick light is lightweight", () => {
    expect(lightweight("bamboo_stick_light")).toBe(true);
  });
  it("wood dowel classic not lightweight", () => {
    expect(lightweight("wood_dowel_classic")).toBe(false);
  });
});

describe("rodMaterial", () => {
  it("knitting needle large uses coated aluminum rod", () => {
    expect(rodMaterial("knitting_needle_large")).toBe("coated_aluminum_rod");
  });
});

describe("bestUse", () => {
  it("wood dowel classic best for traditional broomstick", () => {
    expect(bestUse("wood_dowel_classic")).toBe("traditional_broomstick");
  });
});

describe("broomstickLaces", () => {
  it("returns 5 types", () => {
    expect(broomstickLaces()).toHaveLength(5);
  });
});
