import { describe, it, expect } from "vitest";
import {
  burnRateCmPerHour, totalBurnHours, markingsPerHour, accuracyMinutes,
  draftSensitivity, scentLevel, smokeLevel, wickType,
  costPerHour, candleWaxTypes,
} from "../candle-clock-calc.js";

describe("burnRateCmPerHour", () => {
  it("paraffin burns fastest", () => {
    expect(burnRateCmPerHour("paraffin")).toBeGreaterThan(
      burnRateCmPerHour("beeswax")
    );
  });
});

describe("totalBurnHours", () => {
  it("taller candle burns longer", () => {
    expect(totalBurnHours(30, "beeswax")).toBeGreaterThan(
      totalBurnHours(15, "beeswax")
    );
  });
});

describe("markingsPerHour", () => {
  it("bayberry has most markings", () => {
    expect(markingsPerHour("bayberry")).toBeGreaterThan(
      markingsPerHour("paraffin")
    );
  });
});

describe("accuracyMinutes", () => {
  it("bayberry is most accurate", () => {
    expect(accuracyMinutes("bayberry")).toBeLessThan(
      accuracyMinutes("tallow")
    );
  });
});

describe("draftSensitivity", () => {
  it("tallow is most draft sensitive", () => {
    expect(draftSensitivity("tallow")).toBeGreaterThan(
      draftSensitivity("beeswax")
    );
  });
});

describe("scentLevel", () => {
  it("bayberry is most fragrant", () => {
    expect(scentLevel("bayberry")).toBeGreaterThan(
      scentLevel("paraffin")
    );
  });
});

describe("smokeLevel", () => {
  it("tallow is smokiest", () => {
    expect(smokeLevel("tallow")).toBeGreaterThan(smokeLevel("beeswax"));
  });
});

describe("wickType", () => {
  it("tallow uses rush pith", () => {
    expect(wickType("tallow")).toBe("rush_pith");
  });
});

describe("costPerHour", () => {
  it("bayberry is most expensive", () => {
    expect(costPerHour("bayberry")).toBeGreaterThan(
      costPerHour("tallow")
    );
  });
});

describe("candleWaxTypes", () => {
  it("returns 5 types", () => {
    expect(candleWaxTypes()).toHaveLength(5);
  });
});
