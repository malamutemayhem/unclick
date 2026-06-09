import { describe, it, expect } from "vitest";
import {
  mohsHardness, barrelCapacity, mediaAmount, waterLevel,
  gritAmount, stageDuration, totalDays, electricityCost,
  rpmRecommended, shrinkagePercent, totalShrinkage,
  batchCost, costPerRock, rockTypes, gritStages,
} from "../rock-tumble.js";

describe("mohsHardness", () => {
  it("quartz is 7", () => {
    expect(mohsHardness("quartz")).toBe(7);
  });

  it("limestone is softest", () => {
    expect(mohsHardness("limestone")).toBeLessThan(mohsHardness("agate"));
  });
});

describe("barrelCapacity", () => {
  it("67% of volume", () => {
    expect(barrelCapacity(48)).toBe(32);
  });
});

describe("mediaAmount", () => {
  it("half of rock weight", () => {
    expect(mediaAmount(20)).toBe(10);
  });
});

describe("waterLevel", () => {
  it("30% of rock weight", () => {
    expect(waterLevel(20)).toBe(6);
  });
});

describe("gritAmount", () => {
  it("more for coarse stage", () => {
    expect(gritAmount(20, "coarse")).toBeGreaterThan(gritAmount(20, "polish"));
  });
});

describe("stageDuration", () => {
  it("longer for hard rocks", () => {
    expect(stageDuration("coarse", 7)).toBeGreaterThan(stageDuration("coarse", 4));
  });
});

describe("totalDays", () => {
  it("about 28 for soft rocks", () => {
    expect(totalDays(4)).toBe(28);
  });
});

describe("electricityCost", () => {
  it("positive cost", () => {
    expect(electricityCost(25, 7, 0.15)).toBeGreaterThan(0);
  });
});

describe("rpmRecommended", () => {
  it("positive rpm", () => {
    expect(rpmRecommended(6)).toBeGreaterThan(0);
  });
});

describe("shrinkagePercent", () => {
  it("coarse has most loss", () => {
    expect(shrinkagePercent("coarse")).toBeGreaterThan(shrinkagePercent("polish"));
  });
});

describe("totalShrinkage", () => {
  it("22.5%", () => {
    expect(totalShrinkage()).toBe(22.5);
  });
});

describe("batchCost", () => {
  it("sums costs", () => {
    expect(batchCost(5, 3, 2)).toBe(10);
  });
});

describe("costPerRock", () => {
  it("divides by count", () => {
    expect(costPerRock(10, 20)).toBe(0.5);
  });

  it("0 for no rocks", () => {
    expect(costPerRock(10, 0)).toBe(0);
  });
});

describe("rockTypes", () => {
  it("returns 6 types", () => {
    expect(rockTypes()).toHaveLength(6);
  });
});

describe("gritStages", () => {
  it("returns 4 stages", () => {
    expect(gritStages()).toHaveLength(4);
  });
});
