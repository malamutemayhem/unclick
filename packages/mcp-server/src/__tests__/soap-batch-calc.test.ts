import { describe, it, expect } from "vitest";
import {
  lyeWeightG, saponificationValue, waterMl, traceTimeMinutes,
  cureTimeWeeks, hardnessRating, latherRating, superfattPercent,
  costPerBar, oilTypes,
} from "../soap-batch-calc.js";

describe("lyeWeightG", () => {
  it("more oil = more lye", () => {
    expect(lyeWeightG(1000, 0.134)).toBeGreaterThan(lyeWeightG(500, 0.134));
  });
});

describe("saponificationValue", () => {
  it("coconut has highest sap value", () => {
    expect(saponificationValue("coconut")).toBeGreaterThan(saponificationValue("olive"));
  });
});

describe("waterMl", () => {
  it("scales with lye weight", () => {
    expect(waterMl(200)).toBeGreaterThan(waterMl(100));
  });
});

describe("traceTimeMinutes", () => {
  it("coconut traces fastest", () => {
    expect(traceTimeMinutes("coconut")).toBeLessThan(traceTimeMinutes("olive"));
  });
});

describe("cureTimeWeeks", () => {
  it("olive cures longest", () => {
    expect(cureTimeWeeks("olive")).toBeGreaterThan(cureTimeWeeks("coconut"));
  });
});

describe("hardnessRating", () => {
  it("coconut makes hardest bar", () => {
    expect(hardnessRating("coconut")).toBeGreaterThan(hardnessRating("castor"));
  });
});

describe("latherRating", () => {
  it("coconut lathers best", () => {
    expect(latherRating("coconut")).toBeGreaterThan(latherRating("olive"));
  });
});

describe("superfattPercent", () => {
  it("returns 5%", () => {
    expect(superfattPercent()).toBe(5);
  });
});

describe("costPerBar", () => {
  it("more expensive oil = more expensive bar", () => {
    expect(costPerBar(20, 100)).toBeGreaterThan(costPerBar(10, 100));
  });
});

describe("oilTypes", () => {
  it("returns 5 types", () => {
    expect(oilTypes()).toHaveLength(5);
  });
});
