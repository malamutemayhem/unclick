import { describe, it, expect } from "vitest";
import {
  outputKgPerHour, laborersNeeded, floorAreaM2, grainLossPercent,
  strawConditionRating, winnowingAreaM2, dryingRequiredDays,
  animalCount, dailyCapacityKg, operatingCostPerKg, threshingMethods,
} from "../threshing-calc.js";

describe("outputKgPerHour", () => {
  it("machine fastest", () => {
    expect(outputKgPerHour("machine")).toBeGreaterThan(outputKgPerHour("flail"));
  });
});

describe("laborersNeeded", () => {
  it("machine most labor", () => {
    expect(laborersNeeded("machine")).toBeGreaterThan(laborersNeeded("rubbing"));
  });
});

describe("floorAreaM2", () => {
  it("positive area", () => {
    expect(floorAreaM2(100)).toBeGreaterThan(10);
  });
});

describe("grainLossPercent", () => {
  it("machine least loss", () => {
    expect(grainLossPercent("machine")).toBeLessThan(grainLossPercent("rubbing"));
  });
});

describe("strawConditionRating", () => {
  it("rubbing best straw", () => {
    expect(strawConditionRating("rubbing")).toBeGreaterThan(strawConditionRating("roller"));
  });
});

describe("winnowingAreaM2", () => {
  it("60% of threshing floor", () => {
    expect(winnowingAreaM2(20)).toBe(12);
  });
});

describe("dryingRequiredDays", () => {
  it("zero if dry enough", () => {
    expect(dryingRequiredDays(12)).toBe(0);
  });
  it("positive if too moist", () => {
    expect(dryingRequiredDays(20)).toBeGreaterThan(0);
  });
});

describe("animalCount", () => {
  it("treading uses 4", () => {
    expect(animalCount("treading")).toBe(4);
  });
  it("flail uses none", () => {
    expect(animalCount("flail")).toBe(0);
  });
});

describe("dailyCapacityKg", () => {
  it("positive capacity", () => {
    expect(dailyCapacityKg("machine", 8)).toBeGreaterThan(0);
  });
});

describe("operatingCostPerKg", () => {
  it("positive cost", () => {
    expect(operatingCostPerKg("flail", 10)).toBeGreaterThan(0);
  });
});

describe("threshingMethods", () => {
  it("returns 5 methods", () => {
    expect(threshingMethods()).toHaveLength(5);
  });
});
