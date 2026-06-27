import { describe, it, expect } from "vitest";
import {
  waxWeight, wickSize, burnTimeHours, meltPool,
  fragranceLoad, dyeAmount, pourTemperature, cureTimeDays,
  containerVolumeMl, wickTypes,
} from "../chandlery-calc.js";

describe("waxWeight", () => {
  it("positive grams", () => {
    expect(waxWeight(7, 10, 0.9)).toBeGreaterThan(0);
  });
});

describe("wickSize", () => {
  it("small for narrow candle", () => {
    expect(wickSize(3)).toBe("small");
  });
  it("large for wide candle", () => {
    expect(wickSize(10)).toBe("large");
  });
});

describe("burnTimeHours", () => {
  it("positive hours", () => {
    expect(burnTimeHours(300, 10)).toBe(30);
  });
  it("zero rate = 0", () => {
    expect(burnTimeHours(300, 0)).toBe(0);
  });
});

describe("meltPool", () => {
  it("positive area", () => {
    expect(meltPool(7)).toBeGreaterThan(0);
  });
});

describe("fragranceLoad", () => {
  it("percentage of wax", () => {
    expect(fragranceLoad(1000, 8)).toBe(80);
  });
});

describe("dyeAmount", () => {
  it("positive grams", () => {
    expect(dyeAmount(500, 1)).toBe(5);
  });
});

describe("pourTemperature", () => {
  it("beeswax hottest", () => {
    expect(pourTemperature("beeswax")).toBeGreaterThan(pourTemperature("coconut"));
  });
});

describe("cureTimeDays", () => {
  it("soy longest", () => {
    expect(cureTimeDays("soy")).toBeGreaterThan(cureTimeDays("paraffin"));
  });
});

describe("containerVolumeMl", () => {
  it("positive ml", () => {
    expect(containerVolumeMl(8, 10)).toBeGreaterThan(0);
  });
});

describe("wickTypes", () => {
  it("returns 5 types", () => {
    expect(wickTypes()).toHaveLength(5);
  });
});
