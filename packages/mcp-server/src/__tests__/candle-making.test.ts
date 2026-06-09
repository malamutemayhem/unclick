import { describe, it, expect } from "vitest";
import {
  waxWeight, meltTemp, pourTemp, fragranceLoad, dyeAmount,
  wickSize, burnTime, cureTimeDays, hotThrow, coldThrow,
  costPerCandle, batchSize, waxTypes,
} from "../candle-making.js";

describe("waxWeight", () => {
  it("positive grams", () => {
    expect(waxWeight(250)).toBeGreaterThan(0);
  });
});

describe("meltTemp", () => {
  it("soy is 76C", () => {
    expect(meltTemp("soy")).toBe(76);
  });
  it("beeswax is 62C", () => {
    expect(meltTemp("beeswax")).toBe(62);
  });
});

describe("pourTemp", () => {
  it("paraffin is 82C", () => {
    expect(pourTemp("paraffin")).toBe(82);
  });
});

describe("fragranceLoad", () => {
  it("10% of 200g = 20g", () => {
    expect(fragranceLoad(200, 10)).toBe(20);
  });
});

describe("dyeAmount", () => {
  it("positive blocks", () => {
    expect(dyeAmount(500)).toBeGreaterThan(0);
  });
});

describe("wickSize", () => {
  it("small container gets small wick", () => {
    expect(wickSize(4)).toBe("small");
  });
  it("large container gets large wick", () => {
    expect(wickSize(10)).toBe("large");
  });
  it("very large suggests double wick", () => {
    expect(wickSize(15)).toContain("double");
  });
});

describe("burnTime", () => {
  it("positive hours", () => {
    expect(burnTime(200)).toBeGreaterThan(0);
  });
});

describe("cureTimeDays", () => {
  it("soy needs 14 days", () => {
    expect(cureTimeDays("soy")).toBe(14);
  });
  it("paraffin needs 3 days", () => {
    expect(cureTimeDays("paraffin")).toBe(3);
  });
});

describe("hotThrow", () => {
  it("paraffin is excellent", () => {
    expect(hotThrow("paraffin")).toBe("excellent");
  });
});

describe("coldThrow", () => {
  it("returns string", () => {
    expect(typeof coldThrow("soy")).toBe("string");
  });
});

describe("costPerCandle", () => {
  it("positive cost", () => {
    expect(costPerCandle(20, 200, 20, 60, 2)).toBeGreaterThan(0);
  });
});

describe("batchSize", () => {
  it("positive liters", () => {
    expect(batchSize(10, 250)).toBeGreaterThan(0);
  });
});

describe("waxTypes", () => {
  it("returns 6 types", () => {
    expect(waxTypes()).toHaveLength(6);
  });
});
