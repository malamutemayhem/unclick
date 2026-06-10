import { describe, it, expect } from "vitest";
import {
  totalHeight, baseWidth, topWidth, volumeM3, weightTonnes,
  shadowLength, inscriptionArea, quarryingDays,
  transportWorkers, foundationDepthM, stoneTypes,
} from "../obelisk-calc.js";

describe("totalHeight", () => {
  it("shaft plus pyramidion", () => {
    expect(totalHeight(20, 2)).toBe(22);
  });
});

describe("baseWidth", () => {
  it("positive width", () => {
    expect(baseWidth(20, 10)).toBeGreaterThan(0);
  });
});

describe("topWidth", () => {
  it("smaller than base", () => {
    expect(topWidth(2, 0.6)).toBeLessThan(2);
  });
});

describe("volumeM3", () => {
  it("positive volume", () => {
    expect(volumeM3(20, 2, 1.2)).toBeGreaterThan(0);
  });
});

describe("weightTonnes", () => {
  it("basalt heaviest", () => {
    expect(weightTonnes(10, "basalt")).toBeGreaterThan(weightTonnes(10, "sandstone"));
  });
});

describe("shadowLength", () => {
  it("positive length", () => {
    expect(shadowLength(20, 45)).toBeGreaterThan(0);
  });
  it("zero angle = 0", () => {
    expect(shadowLength(20, 0)).toBe(0);
  });
});

describe("inscriptionArea", () => {
  it("positive area", () => {
    expect(inscriptionArea(8, 2)).toBeGreaterThan(0);
  });
});

describe("quarryingDays", () => {
  it("granite slowest", () => {
    expect(quarryingDays(10, "granite")).toBeGreaterThan(quarryingDays(10, "sandstone"));
  });
});

describe("transportWorkers", () => {
  it("positive workers", () => {
    expect(transportWorkers(50)).toBeGreaterThan(0);
  });
});

describe("foundationDepthM", () => {
  it("sand deepest", () => {
    expect(foundationDepthM(20, "sand")).toBeGreaterThan(foundationDepthM(20, "rock"));
  });
});

describe("stoneTypes", () => {
  it("returns 5 types", () => {
    expect(stoneTypes()).toHaveLength(5);
  });
});
