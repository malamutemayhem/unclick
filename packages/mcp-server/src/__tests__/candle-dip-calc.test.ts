import { describe, it, expect } from "vitest";
import {
  meltingPointCelsius, dippingTempCelsius, dipsPerCandle, coolingSecondsPerDip,
  wickDiameterMm, burnRateGPerHour, burnTimeHours, sootRating,
  costPerKg, waxTypes,
} from "../candle-dip-calc.js";

describe("meltingPointCelsius", () => {
  it("beeswax has highest melting point", () => {
    expect(meltingPointCelsius("beeswax")).toBeGreaterThan(meltingPointCelsius("tallow"));
  });
});

describe("dippingTempCelsius", () => {
  it("dipping temp above melting point", () => {
    expect(dippingTempCelsius("beeswax")).toBeGreaterThan(meltingPointCelsius("beeswax"));
  });
});

describe("dipsPerCandle", () => {
  it("wider candle needs more dips", () => {
    expect(dipsPerCandle(30)).toBeGreaterThan(dipsPerCandle(15));
  });
});

describe("coolingSecondsPerDip", () => {
  it("beeswax cools slowest", () => {
    expect(coolingSecondsPerDip("beeswax")).toBeGreaterThan(coolingSecondsPerDip("paraffin"));
  });
});

describe("wickDiameterMm", () => {
  it("larger candle = thicker wick", () => {
    expect(wickDiameterMm(30)).toBeGreaterThan(wickDiameterMm(15));
  });
});

describe("burnRateGPerHour", () => {
  it("bayberry burns slowest", () => {
    expect(burnRateGPerHour("bayberry")).toBeLessThan(burnRateGPerHour("tallow"));
  });
});

describe("burnTimeHours", () => {
  it("more wax = longer burn", () => {
    expect(burnTimeHours(200, 8)).toBeGreaterThan(burnTimeHours(100, 8));
  });
  it("zero rate returns 0", () => {
    expect(burnTimeHours(100, 0)).toBe(0);
  });
});

describe("sootRating", () => {
  it("beeswax has least soot", () => {
    expect(sootRating("beeswax")).toBeLessThan(sootRating("tallow"));
  });
});

describe("costPerKg", () => {
  it("bayberry is most expensive", () => {
    expect(costPerKg("bayberry")).toBeGreaterThan(costPerKg("beeswax"));
  });
});

describe("waxTypes", () => {
  it("returns 5 types", () => {
    expect(waxTypes()).toHaveLength(5);
  });
});
