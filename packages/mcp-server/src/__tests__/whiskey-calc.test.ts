import { describe, it, expect } from "vitest";
import {
  proofToAbv, abvToProof, dilutionWater, angelsShare,
  remainingVolume, caskCapacity, bottles, nosingSuggestion,
  servingTemp, iceEffect, maturationFactor, colorEstimate,
  costPerDram, whiskeyTypes,
} from "../whiskey-calc.js";

describe("proofToAbv", () => {
  it("100 proof = 50 abv", () => {
    expect(proofToAbv(100)).toBe(50);
  });
});

describe("abvToProof", () => {
  it("40 abv = 80 proof", () => {
    expect(abvToProof(40)).toBe(80);
  });
});

describe("dilutionWater", () => {
  it("positive for higher ABV", () => {
    expect(dilutionWater(60, 40, 700)).toBeGreaterThan(0);
  });

  it("0 if target >= current", () => {
    expect(dilutionWater(40, 45, 700)).toBe(0);
  });
});

describe("angelsShare", () => {
  it("more loss over time", () => {
    expect(angelsShare(12)).toBeGreaterThan(angelsShare(3));
  });
});

describe("remainingVolume", () => {
  it("less than initial", () => {
    expect(remainingVolume(200, 10)).toBeLessThan(200);
  });
});

describe("caskCapacity", () => {
  it("sherry butt is 500L", () => {
    expect(caskCapacity("sherry_butt")).toBe(500);
  });
});

describe("bottles", () => {
  it("positive count", () => {
    expect(bottles(200)).toBeGreaterThan(0);
  });
});

describe("nosingSuggestion", () => {
  it("add water for cask strength", () => {
    expect(nosingSuggestion(58)).toContain("add");
  });
});

describe("servingTemp", () => {
  it("range given", () => {
    const temp = servingTemp("bourbon");
    expect(temp.maxC).toBeGreaterThan(temp.minC);
  });
});

describe("iceEffect", () => {
  it("lowers ABV", () => {
    expect(iceEffect(40, 30, 60)).toBeLessThan(40);
  });
});

describe("maturationFactor", () => {
  it("increases with age", () => {
    expect(maturationFactor(15)).toBeGreaterThan(maturationFactor(3));
  });

  it("max 1", () => {
    expect(maturationFactor(25)).toBeLessThanOrEqual(1);
  });
});

describe("colorEstimate", () => {
  it("darker with age", () => {
    expect(colorEstimate(3, "bourbon_barrel")).not.toBe(colorEstimate(20, "bourbon_barrel"));
  });
});

describe("costPerDram", () => {
  it("fraction of bottle", () => {
    expect(costPerDram(100)).toBeLessThan(100);
  });
});

describe("whiskeyTypes", () => {
  it("returns 6 types", () => {
    expect(whiskeyTypes()).toHaveLength(6);
  });
});
