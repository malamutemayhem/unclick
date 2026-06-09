import { describe, it, expect } from "vitest";
import {
  tankVolume, fishCapacity, growBedArea, plantCapacity,
  feedRate, waterTemp, phRange, pumpFlowRate, aerationNeeded,
  nitrogenCycle, harvestTime, electricityCost, waterUsage,
  fishTypes, plantTypes,
} from "../aquaponics-calc.js";

describe("tankVolume", () => {
  it("liters from cm", () => {
    expect(tankVolume(100, 50, 50)).toBe(250);
  });
});

describe("fishCapacity", () => {
  it("goldfish fits most", () => {
    expect(fishCapacity(200, "goldfish")).toBeGreaterThan(fishCapacity(200, "koi"));
  });
});

describe("growBedArea", () => {
  it("scales with fish count", () => {
    expect(growBedArea(20)).toBeGreaterThan(growBedArea(10));
  });
});

describe("plantCapacity", () => {
  it("lettuce fits most per m2", () => {
    expect(plantCapacity(1, "lettuce")).toBeGreaterThan(plantCapacity(1, "tomato"));
  });
});

describe("feedRate", () => {
  it("2% body weight", () => {
    expect(feedRate(10, 100)).toBe(20);
  });
});

describe("waterTemp", () => {
  it("trout needs cold water", () => {
    expect(waterTemp("trout").idealC).toBeLessThan(waterTemp("tilapia").idealC);
  });
});

describe("phRange", () => {
  it("ideal is 7.0", () => {
    expect(phRange().ideal).toBe(7.0);
  });
});

describe("pumpFlowRate", () => {
  it("liters per minute", () => {
    expect(pumpFlowRate(600)).toBe(10);
  });
});

describe("aerationNeeded", () => {
  it("scales with tank", () => {
    expect(aerationNeeded(1000)).toBeGreaterThan(aerationNeeded(500));
  });
});

describe("nitrogenCycle", () => {
  it("ammonia first", () => {
    expect(nitrogenCycle(1)).toBe("ammonia spike");
  });

  it("cycled after 6 weeks", () => {
    expect(nitrogenCycle(7)).toBe("cycled");
  });
});

describe("harvestTime", () => {
  it("lettuce is fastest", () => {
    expect(harvestTime("lettuce")).toBeLessThan(harvestTime("tomato"));
  });
});

describe("electricityCost", () => {
  it("positive monthly cost", () => {
    expect(electricityCost(50, 24, 0.3)).toBeGreaterThan(0);
  });
});

describe("waterUsage", () => {
  it("daily top-up", () => {
    expect(waterUsage(1000)).toBe(20);
  });
});

describe("fishTypes", () => {
  it("returns 6 types", () => {
    expect(fishTypes()).toHaveLength(6);
  });
});

describe("plantTypes", () => {
  it("returns 6 types", () => {
    expect(plantTypes()).toHaveLength(6);
  });
});
