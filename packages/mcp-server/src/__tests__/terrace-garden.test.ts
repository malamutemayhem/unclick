import { describe, it, expect } from "vitest";
import {
  containerVolume, soilNeeded, drainageLayer, plantsPerContainer,
  wateringFrequency, fertilizerAmount, sunlightHours, harvestWeeks,
  companionPlanting, weightCapacity, potWeight, costEstimate,
  containerTypes,
} from "../terrace-garden.js";

describe("containerVolume", () => {
  it("positive liters", () => {
    expect(containerVolume("pot", 30)).toBeGreaterThan(0);
  });

  it("raised bed largest", () => {
    expect(containerVolume("raised_bed", 50)).toBeGreaterThan(containerVolume("pot", 50));
  });
});

describe("soilNeeded", () => {
  it("85% of volume", () => {
    expect(soilNeeded(100)).toBe(85);
  });
});

describe("drainageLayer", () => {
  it("15% of volume", () => {
    expect(drainageLayer(100)).toBe(15);
  });
});

describe("plantsPerContainer", () => {
  it("positive count", () => {
    expect(plantsPerContainer(30, 10)).toBeGreaterThan(0);
  });

  it("0 for no spacing", () => {
    expect(plantsPerContainer(30, 0)).toBe(0);
  });
});

describe("wateringFrequency", () => {
  it("daily in hot weather", () => {
    expect(wateringFrequency(35, "pot")).toBe("daily");
  });
});

describe("fertilizerAmount", () => {
  it("positive amount", () => {
    expect(fertilizerAmount(20, "liquid")).toBeGreaterThan(0);
  });
});

describe("sunlightHours", () => {
  it("vegetables need most", () => {
    expect(sunlightHours("vegetable")).toBeGreaterThanOrEqual(sunlightHours("herb"));
  });
});

describe("harvestWeeks", () => {
  it("herbs fastest", () => {
    expect(harvestWeeks("herb")).toBeLessThan(harvestWeeks("fruit"));
  });

  it("succulents have 0", () => {
    expect(harvestWeeks("succulent")).toBe(0);
  });
});

describe("companionPlanting", () => {
  it("herbs and veggies are good", () => {
    expect(companionPlanting("herb", "vegetable")).toBe(true);
  });

  it("succulents not companion", () => {
    expect(companionPlanting("succulent", "vegetable")).toBe(false);
  });
});

describe("weightCapacity", () => {
  it("positive kg", () => {
    expect(weightCapacity(5)).toBeGreaterThan(0);
  });
});

describe("potWeight", () => {
  it("heavier with more soil", () => {
    expect(potWeight(20)).toBeGreaterThan(potWeight(5));
  });
});

describe("costEstimate", () => {
  it("positive cost", () => {
    expect(costEstimate(3, 15, 60, 0.5)).toBeGreaterThan(0);
  });
});

describe("containerTypes", () => {
  it("returns 6 types", () => {
    expect(containerTypes()).toHaveLength(6);
  });
});
