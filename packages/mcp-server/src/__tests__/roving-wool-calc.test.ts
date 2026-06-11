import { describe, it, expect } from "vitest";
import {
  feltEase, colorVivid, softTouch, durability,
  woolCost, natural, blended, fiberSource,
  bestUse, rovingWools,
} from "../roving-wool-calc.js";

describe("feltEase", () => {
  it("merino fine soft easiest felt", () => {
    expect(feltEase("merino_fine_soft")).toBeGreaterThan(feltEase("silk_blend_luxury"));
  });
});

describe("colorVivid", () => {
  it("silk blend luxury most vivid color", () => {
    expect(colorVivid("silk_blend_luxury")).toBeGreaterThan(colorVivid("romney_coarse_sturdy"));
  });
});

describe("softTouch", () => {
  it("merino fine soft softest touch", () => {
    expect(softTouch("merino_fine_soft")).toBeGreaterThan(softTouch("romney_coarse_sturdy"));
  });
});

describe("durability", () => {
  it("romney coarse sturdy most durable", () => {
    expect(durability("romney_coarse_sturdy")).toBeGreaterThan(durability("merino_fine_soft"));
  });
});

describe("woolCost", () => {
  it("silk blend luxury most expensive", () => {
    expect(woolCost("silk_blend_luxury")).toBeGreaterThan(woolCost("romney_coarse_sturdy"));
  });
});

describe("natural", () => {
  it("merino fine soft is natural", () => {
    expect(natural("merino_fine_soft")).toBe(true);
  });
});

describe("blended", () => {
  it("silk blend luxury is blended", () => {
    expect(blended("silk_blend_luxury")).toBe(true);
  });
  it("merino fine soft not blended", () => {
    expect(blended("merino_fine_soft")).toBe(false);
  });
});

describe("fiberSource", () => {
  it("alpaca silky warm uses alpaca fiber hair", () => {
    expect(fiberSource("alpaca_silky_warm")).toBe("alpaca_fiber_hair");
  });
});

describe("bestUse", () => {
  it("corriedale medium general best for general purpose felt", () => {
    expect(bestUse("corriedale_medium_general")).toBe("general_purpose_felt");
  });
});

describe("rovingWools", () => {
  it("returns 5 types", () => {
    expect(rovingWools()).toHaveLength(5);
  });
});
