import { describe, it, expect } from "vitest";
import {
  flourWeight, waterWeight, saltWeight, yeastWeight,
  starterWeight, hydrationPercent, bulkFermentTime,
  proofTime, ovenTemp, bakeTime, scaleBatch, bakersPercent,
  doughTemperature, desiredWaterTemp, loafCount, steamDuration,
  breadTypes,
} from "../bread-calc.js";

describe("flourWeight", () => {
  it("flour from dough weight", () => {
    expect(flourWeight(1000, 75)).toBeCloseTo(571, 0);
  });
});

describe("waterWeight", () => {
  it("75% hydration", () => {
    expect(waterWeight(500, 75)).toBe(375);
  });
});

describe("saltWeight", () => {
  it("2% default", () => {
    expect(saltWeight(500)).toBe(10);
  });
});

describe("yeastWeight", () => {
  it("fresh needs most", () => {
    expect(yeastWeight(500, "fresh")).toBeGreaterThan(yeastWeight(500, "instant"));
  });
});

describe("starterWeight", () => {
  it("20% default", () => {
    expect(starterWeight(500)).toBe(100);
  });
});

describe("hydrationPercent", () => {
  it("ciabatta is wettest", () => {
    expect(hydrationPercent("ciabatta")).toBeGreaterThan(hydrationPercent("baguette"));
  });
});

describe("bulkFermentTime", () => {
  it("sourdough takes longer", () => {
    expect(bulkFermentTime(25, "sourdough")).toBeGreaterThan(bulkFermentTime(25, "yeast"));
  });

  it("cold slows ferment", () => {
    expect(bulkFermentTime(18, "yeast")).toBeGreaterThan(bulkFermentTime(25, "yeast"));
  });
});

describe("proofTime", () => {
  it("longer when cold", () => {
    expect(proofTime(15)).toBeGreaterThan(proofTime(25));
  });
});

describe("ovenTemp", () => {
  it("baguette is hottest", () => {
    expect(ovenTemp("baguette")).toBeGreaterThanOrEqual(ovenTemp("sourdough"));
  });
});

describe("bakeTime", () => {
  it("larger loaf takes longer", () => {
    expect(bakeTime(1000, "sourdough")).toBeGreaterThan(bakeTime(500, "sourdough"));
  });
});

describe("scaleBatch", () => {
  it("doubles for double servings", () => {
    expect(scaleBatch(500, 2)).toBe(1000);
  });
});

describe("bakersPercent", () => {
  it("flour is 100%", () => {
    expect(bakersPercent(500, 500)).toBe(100);
  });

  it("0 for no flour", () => {
    expect(bakersPercent(100, 0)).toBe(0);
  });
});

describe("doughTemperature", () => {
  it("average of three temps", () => {
    expect(doughTemperature(20, 30, 25)).toBe(25);
  });
});

describe("desiredWaterTemp", () => {
  it("calculates target", () => {
    expect(desiredWaterTemp(25, 20, 22)).toBeGreaterThan(25);
  });
});

describe("loafCount", () => {
  it("divides dough", () => {
    expect(loafCount(2000, 500)).toBe(4);
  });
});

describe("steamDuration", () => {
  it("15 minutes", () => {
    expect(steamDuration()).toBe(15);
  });
});

describe("breadTypes", () => {
  it("returns 7 types", () => {
    expect(breadTypes()).toHaveLength(7);
    expect(breadTypes()).toContain("sourdough");
  });
});
