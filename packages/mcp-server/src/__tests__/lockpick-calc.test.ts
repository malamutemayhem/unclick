import { describe, it, expect } from "vitest";
import {
  pinCount, keyCombinations, securityRating, pickTime,
  tensionDirection, bindingOrder, masterKeyPins, bumpKeyDepth,
  decodePinHeight, shearLineGap, springTensionG, rekeyCost,
  difficultyLevel, lockTypes,
} from "../lockpick-calc.js";

describe("pinCount", () => {
  it("pin tumbler has 5 pins", () => {
    expect(pinCount("pin_tumbler")).toBe(5);
  });
  it("tubular has 7 pins", () => {
    expect(pinCount("tubular")).toBe(7);
  });
});

describe("keyCombinations", () => {
  it("5 pins 10 heights = 100000", () => {
    expect(keyCombinations(5, 10)).toBe(100000);
  });
});

describe("securityRating", () => {
  it("capped at 100", () => {
    expect(securityRating(6, 6, 6)).toBeLessThanOrEqual(100);
  });
  it("spool pins increase rating", () => {
    expect(securityRating(5, 3, 0)).toBeGreaterThan(securityRating(5, 0, 0));
  });
});

describe("pickTime", () => {
  it("higher skill = less time", () => {
    expect(pickTime(50, 8)).toBeLessThan(pickTime(50, 2));
  });
});

describe("tensionDirection", () => {
  it("top keyway suggests BOK", () => {
    expect(tensionDirection("top")).toContain("BOK");
  });
  it("bottom keyway suggests TOK", () => {
    expect(tensionDirection("bottom")).toContain("TOK");
  });
});

describe("bindingOrder", () => {
  it("returns array of pin count length", () => {
    expect(bindingOrder(5)).toHaveLength(5);
  });
});

describe("masterKeyPins", () => {
  it("positive difference", () => {
    expect(masterKeyPins(7, 3)).toBe(4);
  });
});

describe("bumpKeyDepth", () => {
  it("one less than max", () => {
    expect(bumpKeyDepth(9)).toBe(8);
  });
});

describe("decodePinHeight", () => {
  it("returns correct height", () => {
    expect(decodePinHeight([3, 5, 7, 2, 4], 2)).toBe(7);
  });
  it("out of range returns 0", () => {
    expect(decodePinHeight([3, 5], 5)).toBe(0);
  });
});

describe("shearLineGap", () => {
  it("positive mm", () => {
    expect(shearLineGap(0.1)).toBeGreaterThan(0);
  });
});

describe("springTensionG", () => {
  it("positive grams", () => {
    expect(springTensionG(0.5)).toBeGreaterThan(0);
  });
});

describe("rekeyCost", () => {
  it("positive cost", () => {
    expect(rekeyCost(5, 3)).toBeGreaterThan(0);
  });
});

describe("difficultyLevel", () => {
  it("disc detainer harder than wafer", () => {
    expect(difficultyLevel("disc_detainer")).toBeGreaterThan(difficultyLevel("wafer"));
  });
});

describe("lockTypes", () => {
  it("returns 6 types", () => {
    expect(lockTypes()).toHaveLength(6);
  });
});
