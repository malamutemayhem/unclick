import { describe, it, expect } from "vitest";
import {
  containerVolume, waxWeight, fragranceAmount, maxFragrance,
  dyeAmount, wickSize, burnTime, burnRate,
  meltingPoint, pouringTemp, calculateCandle,
  batchQuantity, costPerCandle, cureTime, waxTypes,
} from "../candle-calc.js";

describe("containerVolume", () => {
  it("computes cylinder volume", () => {
    const vol = containerVolume(8, 10);
    expect(vol).toBeCloseTo(502.7, 0);
  });
});

describe("waxWeight", () => {
  it("soy wax density ~0.9", () => {
    expect(waxWeight(100, "soy")).toBeCloseTo(90, 0);
  });
});

describe("fragranceAmount", () => {
  it("8% of 100g = 8g", () => {
    expect(fragranceAmount(100, 8)).toBe(8);
  });
});

describe("maxFragrance", () => {
  it("soy max 10%", () => {
    expect(maxFragrance(100, "soy")).toBe(10);
  });
});

describe("dyeAmount", () => {
  it("small amount", () => {
    expect(dyeAmount(100)).toBe(0.1);
  });
});

describe("wickSize", () => {
  it("small for narrow containers", () => {
    expect(wickSize(4)).toBe("small");
  });

  it("large for wide containers", () => {
    expect(wickSize(9)).toBe("large");
  });
});

describe("burnTime", () => {
  it("computes burn hours", () => {
    expect(burnTime(200, 10)).toBe(20);
  });
});

describe("burnRate", () => {
  it("varies with diameter", () => {
    expect(burnRate(8)).toBeGreaterThan(burnRate(5));
  });
});

describe("meltingPoint / pouringTemp", () => {
  it("beeswax melts at 63C", () => {
    expect(meltingPoint("beeswax")).toBe(63);
  });

  it("pouring temp > melting point", () => {
    expect(pouringTemp("soy")).toBeGreaterThan(meltingPoint("soy"));
  });
});

describe("calculateCandle", () => {
  it("returns complete spec", () => {
    const spec = calculateCandle(8, 10, "soy");
    expect(spec.waxWeightG).toBeGreaterThan(0);
    expect(spec.fragranceG).toBeGreaterThan(0);
    expect(spec.burnTimeHours).toBeGreaterThan(0);
    expect(spec.wickSize).toBe("large");
  });
});

describe("batchQuantity", () => {
  it("multiplies by count", () => {
    const spec = calculateCandle(8, 10, "soy");
    const batch = batchQuantity(10, spec);
    expect(batch.totalWaxG).toBeCloseTo(spec.waxWeightG * 10, -1);
  });
});

describe("costPerCandle", () => {
  it("positive cost", () => {
    const spec = calculateCandle(8, 10, "soy");
    const cost = costPerCandle(20, 40, 2, 0.5, spec);
    expect(cost).toBeGreaterThan(0);
  });
});

describe("cureTime", () => {
  it("soy needs 14 days", () => {
    expect(cureTime("soy")).toBe(14);
  });

  it("paraffin needs 3 days", () => {
    expect(cureTime("paraffin")).toBe(3);
  });
});

describe("waxTypes", () => {
  it("has 5 types", () => {
    expect(waxTypes().length).toBe(5);
  });
});
