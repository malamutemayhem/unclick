import { describe, it, expect } from "vitest";
import {
  patternRange, turnEase, threadCapacity, setupSpeed,
  cardCost, multiHole, forComplex, cardShape,
  bestUse, cardWeaves,
} from "../card-weave-calc.js";

describe("patternRange", () => {
  it("hexagonal card complex widest pattern range", () => {
    expect(patternRange("hexagonal_card_complex")).toBeGreaterThan(patternRange("triangular_card_simple"));
  });
});

describe("turnEase", () => {
  it("triangular card simple easiest turn", () => {
    expect(turnEase("triangular_card_simple")).toBeGreaterThan(turnEase("hexagonal_card_complex"));
  });
});

describe("threadCapacity", () => {
  it("hexagonal card complex highest thread capacity", () => {
    expect(threadCapacity("hexagonal_card_complex")).toBeGreaterThan(threadCapacity("triangular_card_simple"));
  });
});

describe("setupSpeed", () => {
  it("triangular card simple fastest setup", () => {
    expect(setupSpeed("triangular_card_simple")).toBeGreaterThan(setupSpeed("hexagonal_card_complex"));
  });
});

describe("cardCost", () => {
  it("hexagonal card complex most expensive", () => {
    expect(cardCost("hexagonal_card_complex")).toBeGreaterThan(cardCost("triangular_card_simple"));
  });
});

describe("multiHole", () => {
  it("hexagonal card complex is multi hole", () => {
    expect(multiHole("hexagonal_card_complex")).toBe(true);
  });
  it("square card standard not multi hole", () => {
    expect(multiHole("square_card_standard")).toBe(false);
  });
});

describe("forComplex", () => {
  it("double hole pickup is for complex", () => {
    expect(forComplex("double_hole_pickup")).toBe(true);
  });
  it("square card standard not for complex", () => {
    expect(forComplex("square_card_standard")).toBe(false);
  });
});

describe("cardShape", () => {
  it("hexagonal card complex uses six hole hexagon", () => {
    expect(cardShape("hexagonal_card_complex")).toBe("six_hole_hexagon");
  });
});

describe("bestUse", () => {
  it("square card standard best for general band weave", () => {
    expect(bestUse("square_card_standard")).toBe("general_band_weave");
  });
});

describe("cardWeaves", () => {
  it("returns 5 types", () => {
    expect(cardWeaves()).toHaveLength(5);
  });
});
