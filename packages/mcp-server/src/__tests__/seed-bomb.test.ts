import { describe, it, expect } from "vitest";
import {
  seedsPerBomb, clayRatio, compostRatio, waterMl, dryingDays,
  bombDiameterCm, batchWeight, germinationDays, bestSeason,
  coverageM2, survivalRate, expectedPlants, seedTypes,
} from "../seed-bomb.js";

describe("seedsPerBomb", () => {
  it("grass has most seeds", () => {
    expect(seedsPerBomb("grass")).toBeGreaterThan(seedsPerBomb("tree"));
  });
});

describe("clayRatio", () => {
  it("is 5", () => {
    expect(clayRatio()).toBe(5);
  });
});

describe("compostRatio", () => {
  it("is 3", () => {
    expect(compostRatio()).toBe(3);
  });
});

describe("waterMl", () => {
  it("10ml per bomb", () => {
    expect(waterMl(10)).toBe(100);
  });
});

describe("dryingDays", () => {
  it("humid takes longer", () => {
    expect(dryingDays(90)).toBeGreaterThan(dryingDays(30));
  });
});

describe("bombDiameterCm", () => {
  it("positive diameter", () => {
    expect(bombDiameterCm(25)).toBeGreaterThan(0);
  });
});

describe("batchWeight", () => {
  it("positive kg", () => {
    expect(batchWeight(50, 25)).toBeGreaterThan(0);
  });
});

describe("germinationDays", () => {
  it("tree slowest", () => {
    expect(germinationDays("tree")).toBeGreaterThan(germinationDays("vegetable"));
  });
});

describe("bestSeason", () => {
  it("grass = fall", () => {
    expect(bestSeason("grass")).toBe("fall");
  });
  it("wildflower = spring", () => {
    expect(bestSeason("wildflower")).toBe("spring");
  });
});

describe("coverageM2", () => {
  it("0.5 m2 per bomb", () => {
    expect(coverageM2(10)).toBe(5);
  });
});

describe("survivalRate", () => {
  it("between 0 and 1", () => {
    const r = survivalRate("wildflower");
    expect(r).toBeGreaterThan(0);
    expect(r).toBeLessThanOrEqual(1);
  });
});

describe("expectedPlants", () => {
  it("positive count", () => {
    expect(expectedPlants(10, "wildflower")).toBeGreaterThan(0);
  });
});

describe("seedTypes", () => {
  it("returns 6 types", () => {
    expect(seedTypes()).toHaveLength(6);
  });
});
