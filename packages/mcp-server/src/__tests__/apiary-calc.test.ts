import { describe, it, expect } from "vitest";
import {
  frameCount, honeyYieldKg, broodArea, beePopulation,
  smokerFuel, feedSyrupLiters, swarmRisk, waxYieldG,
  pollinationRadius, winterSurvival, hiveTypes,
} from "../apiary-calc.js";

describe("frameCount", () => {
  it("langstroth = 10", () => {
    expect(frameCount("langstroth")).toBe(10);
  });
});

describe("honeyYieldKg", () => {
  it("positive yield", () => {
    expect(honeyYieldKg(10, 80)).toBeGreaterThan(0);
  });
  it("zero fill = 0", () => {
    expect(honeyYieldKg(10, 0)).toBe(0);
  });
});

describe("broodArea", () => {
  it("frames x cells x 2 sides", () => {
    expect(broodArea(5, 3000)).toBe(30000);
  });
});

describe("beePopulation", () => {
  it("2500 per frame", () => {
    expect(beePopulation(10)).toBe(25000);
  });
});

describe("smokerFuel", () => {
  it("positive grams", () => {
    expect(smokerFuel(20)).toBeGreaterThan(0);
  });
});

describe("feedSyrupLiters", () => {
  it("positive when underweight", () => {
    expect(feedSyrupLiters(15, 25)).toBeGreaterThan(0);
  });
  it("zero when at target", () => {
    expect(feedSyrupLiters(25, 25)).toBe(0);
  });
});

describe("swarmRisk", () => {
  it("higher with large population", () => {
    expect(swarmRisk(60000, 2)).toBeGreaterThan(swarmRisk(20000, 2));
  });
});

describe("waxYieldG", () => {
  it("10g per kg honey", () => {
    expect(waxYieldG(5)).toBe(50);
  });
});

describe("pollinationRadius", () => {
  it("positive km", () => {
    expect(pollinationRadius(40000)).toBeGreaterThan(0);
  });
});

describe("winterSurvival", () => {
  it("insulation helps", () => {
    expect(winterSurvival(15, true)).toBeGreaterThan(winterSurvival(15, false));
  });
});

describe("hiveTypes", () => {
  it("returns 5 types", () => {
    expect(hiveTypes()).toHaveLength(5);
  });
});
