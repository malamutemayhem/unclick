import { describe, it, expect } from "vitest";
import {
  poleHeight, ribbonCount, ribbonLength, danceCircleRadiusM,
  wrappingTurns, braidPatterns, musicBpm, setupTimeMin,
  flowerGarlands, ribbonCostTotal, ribbonMaterials,
} from "../maypole-calc.js";

describe("poleHeight", () => {
  it("positive meters", () => {
    expect(poleHeight(12)).toBeGreaterThan(3);
  });
});

describe("ribbonCount", () => {
  it("equals participants", () => {
    expect(ribbonCount(12)).toBe(12);
  });
});

describe("ribbonLength", () => {
  it("longer than pole height", () => {
    expect(ribbonLength(5, 3)).toBeGreaterThan(5);
  });
});

describe("danceCircleRadiusM", () => {
  it("positive radius", () => {
    expect(danceCircleRadiusM(8)).toBeGreaterThan(0);
  });
});

describe("wrappingTurns", () => {
  it("positive turns", () => {
    expect(wrappingTurns(5, 15)).toBeGreaterThan(0);
  });
  it("zero diameter = 0", () => {
    expect(wrappingTurns(5, 0)).toBe(0);
  });
});

describe("braidPatterns", () => {
  it("more with more ribbons", () => {
    expect(braidPatterns(12)).toBeGreaterThan(braidPatterns(4));
  });
});

describe("musicBpm", () => {
  it("jig fastest", () => {
    expect(musicBpm("jig")).toBeGreaterThan(musicBpm("slow"));
  });
});

describe("setupTimeMin", () => {
  it("positive minutes", () => {
    expect(setupTimeMin(5, 12)).toBeGreaterThan(0);
  });
});

describe("flowerGarlands", () => {
  it("positive count", () => {
    expect(flowerGarlands(5, 30)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(flowerGarlands(5, 0)).toBe(0);
  });
});

describe("ribbonCostTotal", () => {
  it("silk most expensive", () => {
    expect(ribbonCostTotal(12, 6, "silk")).toBeGreaterThan(ribbonCostTotal(12, 6, "nylon"));
  });
});

describe("ribbonMaterials", () => {
  it("returns 5 materials", () => {
    expect(ribbonMaterials()).toHaveLength(5);
  });
});
