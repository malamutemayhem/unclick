import { describe, it, expect } from "vitest";
import {
  stockCapacityM, hammerWeightKg, strokesPerMinute, fullingTimeHours,
  shrinkagePercent, waterConsumptionLiters, tenterhookCount,
  dryingFrameLengthM, dailyOutputKg, operatingCostPerKg, fullingAgents,
} from "../fulling-mill-calc.js";

describe("stockCapacityM", () => {
  it("2x wheel diameter", () => {
    expect(stockCapacityM(2)).toBe(4);
  });
});

describe("hammerWeightKg", () => {
  it("positive weight", () => {
    expect(hammerWeightKg(4)).toBeGreaterThan(0);
  });
});

describe("strokesPerMinute", () => {
  it("positive rate", () => {
    expect(strokesPerMinute(2, 10)).toBeGreaterThan(0);
  });
});

describe("fullingTimeHours", () => {
  it("urine longest", () => {
    expect(fullingTimeHours(10, "urine")).toBeGreaterThan(fullingTimeHours(10, "soap"));
  });
});

describe("shrinkagePercent", () => {
  it("lye most shrinkage", () => {
    expect(shrinkagePercent("lye")).toBeGreaterThan(shrinkagePercent("soap"));
  });
});

describe("waterConsumptionLiters", () => {
  it("positive consumption", () => {
    expect(waterConsumptionLiters(10)).toBeGreaterThan(0);
  });
});

describe("tenterhookCount", () => {
  it("positive count", () => {
    expect(tenterhookCount(5)).toBeGreaterThan(0);
  });
});

describe("dryingFrameLengthM", () => {
  it("shorter than original", () => {
    expect(dryingFrameLengthM(10, 20)).toBeLessThan(10);
  });
});

describe("dailyOutputKg", () => {
  it("positive output", () => {
    expect(dailyOutputKg(10, 8)).toBeGreaterThan(0);
  });
});

describe("operatingCostPerKg", () => {
  it("soap most expensive", () => {
    expect(operatingCostPerKg("soap", 10)).toBeGreaterThan(operatingCostPerKg("urine", 10));
  });
});

describe("fullingAgents", () => {
  it("returns 5 agents", () => {
    expect(fullingAgents()).toHaveLength(5);
  });
});
