import { describe, it, expect } from "vitest";
import {
  roundControl, spineShape, fabricSafe, weightBalance,
  hammerCost, softFace, forLeather, headMaterial,
  bestUse, backingHammers,
} from "../backing-hammer-calc.js";

describe("roundControl", () => {
  it("french round face best round control", () => {
    expect(roundControl("french_round_face")).toBeGreaterThan(roundControl("nylon_soft_tap"));
  });
});

describe("spineShape", () => {
  it("french round face best spine shape", () => {
    expect(spineShape("french_round_face")).toBeGreaterThan(spineShape("nylon_soft_tap"));
  });
});

describe("fabricSafe", () => {
  it("nylon soft tap most fabric safe", () => {
    expect(fabricSafe("nylon_soft_tap")).toBeGreaterThan(fabricSafe("cobbler_cross_peen"));
  });
});

describe("weightBalance", () => {
  it("weighted brass head best weight balance", () => {
    expect(weightBalance("weighted_brass_head")).toBeGreaterThan(weightBalance("cobbler_cross_peen"));
  });
});

describe("hammerCost", () => {
  it("weighted brass head most expensive", () => {
    expect(hammerCost("weighted_brass_head")).toBeGreaterThan(hammerCost("nylon_soft_tap"));
  });
});

describe("softFace", () => {
  it("nylon soft tap has soft face", () => {
    expect(softFace("nylon_soft_tap")).toBe(true);
  });
  it("french round face no soft face", () => {
    expect(softFace("french_round_face")).toBe(false);
  });
});

describe("forLeather", () => {
  it("nylon soft tap is for leather", () => {
    expect(forLeather("nylon_soft_tap")).toBe(true);
  });
  it("french round face not for leather", () => {
    expect(forLeather("french_round_face")).toBe(false);
  });
});

describe("headMaterial", () => {
  it("weighted brass head uses solid brass", () => {
    expect(headMaterial("weighted_brass_head")).toBe("solid_brass");
  });
});

describe("bestUse", () => {
  it("french round face best for fine spine round", () => {
    expect(bestUse("french_round_face")).toBe("fine_spine_round");
  });
});

describe("backingHammers", () => {
  it("returns 5 types", () => {
    expect(backingHammers()).toHaveLength(5);
  });
});
