import { describe, it, expect } from "vitest";
import {
  patternRange, turnEase, durability, threadCapacity,
  tabletCost, multiHole, forComplex, cardShape,
  bestUse, tabletWeaves,
} from "../tablet-weave-calc.js";

describe("patternRange", () => {
  it("hexagonal card complex widest pattern range", () => {
    expect(patternRange("hexagonal_card_complex")).toBeGreaterThan(patternRange("double_hole_card"));
  });
});

describe("turnEase", () => {
  it("double hole card easiest turn", () => {
    expect(turnEase("double_hole_card")).toBeGreaterThan(turnEase("hexagonal_card_complex"));
  });
});

describe("durability", () => {
  it("acrylic card smooth most durable", () => {
    expect(durability("acrylic_card_smooth")).toBeGreaterThan(durability("triangular_card_twill"));
  });
});

describe("threadCapacity", () => {
  it("hexagonal card complex highest thread capacity", () => {
    expect(threadCapacity("hexagonal_card_complex")).toBeGreaterThan(threadCapacity("double_hole_card"));
  });
});

describe("tabletCost", () => {
  it("acrylic card smooth most expensive", () => {
    expect(tabletCost("acrylic_card_smooth")).toBeGreaterThan(tabletCost("double_hole_card"));
  });
});

describe("multiHole", () => {
  it("hexagonal card complex is multi hole", () => {
    expect(multiHole("hexagonal_card_complex")).toBe(true);
  });
  it("square card basic not multi hole", () => {
    expect(multiHole("square_card_basic")).toBe(false);
  });
});

describe("forComplex", () => {
  it("hexagonal card complex is for complex", () => {
    expect(forComplex("hexagonal_card_complex")).toBe(true);
  });
  it("square card basic not for complex", () => {
    expect(forComplex("square_card_basic")).toBe(false);
  });
});

describe("cardShape", () => {
  it("triangular card twill uses three hole triangle", () => {
    expect(cardShape("triangular_card_twill")).toBe("three_hole_triangle");
  });
});

describe("bestUse", () => {
  it("square card basic best for general band weave", () => {
    expect(bestUse("square_card_basic")).toBe("general_band_weave");
  });
});

describe("tabletWeaves", () => {
  it("returns 5 types", () => {
    expect(tabletWeaves()).toHaveLength(5);
  });
});
