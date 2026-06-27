import { describe, it, expect } from "vitest";
import {
  substrateWeight, spawnRate, moistureContent, idealMoisture,
  colonizationDays, fruitingTemp, fruitingHumidity, expectedYield,
  flushCount, harvestWindow, sterilizationTime, costPerKg,
  mushroomTypes,
} from "../mushroom-calc.js";

describe("substrateWeight", () => {
  it("positive weight", () => {
    expect(substrateWeight(10, "straw")).toBeGreaterThan(0);
  });

  it("grain is densest", () => {
    expect(substrateWeight(10, "grain")).toBeGreaterThan(substrateWeight(10, "straw"));
  });
});

describe("spawnRate", () => {
  it("10% default", () => {
    expect(spawnRate(5)).toBe(0.5);
  });
});

describe("moistureContent", () => {
  it("positive percent", () => {
    expect(moistureContent(40, 100)).toBe(60);
  });

  it("0 for no weight", () => {
    expect(moistureContent(0, 0)).toBe(0);
  });
});

describe("idealMoisture", () => {
  it("straw needs high moisture", () => {
    expect(idealMoisture("straw")).toBeGreaterThan(idealMoisture("grain"));
  });
});

describe("colonizationDays", () => {
  it("shiitake takes longest", () => {
    expect(colonizationDays("shiitake").max).toBeGreaterThan(colonizationDays("oyster").max);
  });
});

describe("fruitingTemp", () => {
  it("enoki is coldest", () => {
    expect(fruitingTemp("enoki").idealC).toBeLessThan(fruitingTemp("oyster").idealC);
  });
});

describe("fruitingHumidity", () => {
  it("high for all types", () => {
    expect(fruitingHumidity("oyster")).toBeGreaterThan(70);
  });
});

describe("expectedYield", () => {
  it("oyster yields most", () => {
    expect(expectedYield(10, "oyster")).toBeGreaterThan(expectedYield(10, "reishi"));
  });
});

describe("flushCount", () => {
  it("shiitake has most flushes", () => {
    expect(flushCount("shiitake")).toBeGreaterThanOrEqual(flushCount("oyster"));
  });
});

describe("harvestWindow", () => {
  it("positive days", () => {
    expect(harvestWindow("oyster")).toBeGreaterThan(0);
  });
});

describe("sterilizationTime", () => {
  it("pressure is fastest", () => {
    expect(sterilizationTime(5, "pressure")).toBeLessThan(sterilizationTime(5, "steam"));
  });
});

describe("costPerKg", () => {
  it("positive cost", () => {
    expect(costPerKg(10, 5, 3)).toBeGreaterThan(0);
  });

  it("0 for no yield", () => {
    expect(costPerKg(10, 5, 0)).toBe(0);
  });
});

describe("mushroomTypes", () => {
  it("returns 6 types", () => {
    expect(mushroomTypes()).toHaveLength(6);
    expect(mushroomTypes()).toContain("oyster");
  });
});
