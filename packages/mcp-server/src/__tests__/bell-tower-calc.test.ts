import { describe, it, expect } from "vitest";
import {
  heightM, baseWidthM, bellChamberHeightM, wallThicknessCm,
  stairCount, bellCount, soundReachM, swayLimitCm,
  lightningRodHeightM, constructionCost, bellTowerCaps,
} from "../bell-tower-calc.js";

describe("heightM", () => {
  it("2.5x nave height", () => {
    expect(heightM(12)).toBe(30);
  });
});

describe("baseWidthM", () => {
  it("20% of height", () => {
    expect(baseWidthM(30)).toBe(6);
  });
});

describe("bellChamberHeightM", () => {
  it("15% of tower height", () => {
    expect(bellChamberHeightM(30)).toBe(4.5);
  });
});

describe("wallThicknessCm", () => {
  it("positive thickness", () => {
    expect(wallThicknessCm(30)).toBeGreaterThan(60);
  });
});

describe("stairCount", () => {
  it("positive count", () => {
    expect(stairCount(30)).toBeGreaterThan(0);
  });
});

describe("bellCount", () => {
  it("at least 1", () => {
    expect(bellCount(0.5)).toBe(1);
  });
  it("more for wider chamber", () => {
    expect(bellCount(6)).toBeGreaterThan(bellCount(2));
  });
});

describe("soundReachM", () => {
  it("positive reach", () => {
    expect(soundReachM(30, 6)).toBeGreaterThan(0);
  });
});

describe("swayLimitCm", () => {
  it("positive limit", () => {
    expect(swayLimitCm(30)).toBeGreaterThan(0);
  });
});

describe("lightningRodHeightM", () => {
  it("greater than 1m", () => {
    expect(lightningRodHeightM(30)).toBeGreaterThan(1);
  });
});

describe("constructionCost", () => {
  it("dome most expensive", () => {
    expect(constructionCost(30, "dome", 1000)).toBeGreaterThan(
      constructionCost(30, "flat", 1000)
    );
  });
});

describe("bellTowerCaps", () => {
  it("returns 5 cap types", () => {
    expect(bellTowerCaps()).toHaveLength(5);
  });
});
