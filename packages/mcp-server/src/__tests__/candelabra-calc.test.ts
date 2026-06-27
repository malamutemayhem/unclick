import { describe, it, expect } from "vitest";
import {
  armCount, totalHeight, baseWeight, candleCapacity,
  lightOutput, burnDuration, dripCatcherArea,
  polishFrequencyDays, symmetryAngle, costEstimate, candleMetals,
} from "../candelabra-calc.js";

describe("armCount", () => {
  it("3 branches = 7 arms", () => {
    expect(armCount(3)).toBe(7);
  });
});

describe("totalHeight", () => {
  it("sum of parts", () => {
    expect(totalHeight(10, 30, 5)).toBe(45);
  });
});

describe("baseWeight", () => {
  it("silver heavier than pewter", () => {
    expect(baseWeight(15, "silver")).toBeGreaterThan(baseWeight(15, "pewter"));
  });
});

describe("candleCapacity", () => {
  it("positive capacity", () => {
    expect(candleCapacity(5, 3)).toBeGreaterThan(0);
  });
});

describe("lightOutput", () => {
  it("proportional to count", () => {
    expect(lightOutput(5, 12)).toBe(60);
  });
});

describe("burnDuration", () => {
  it("positive hours", () => {
    expect(burnDuration(20, 2.5)).toBeGreaterThan(0);
  });
  it("zero rate = 0", () => {
    expect(burnDuration(20, 0)).toBe(0);
  });
});

describe("dripCatcherArea", () => {
  it("larger than cup", () => {
    expect(dripCatcherArea(3)).toBeGreaterThan(Math.PI * Math.pow(1.5, 2));
  });
});

describe("polishFrequencyDays", () => {
  it("silver most frequent", () => {
    expect(polishFrequencyDays("silver")).toBeLessThan(polishFrequencyDays("iron"));
  });
});

describe("symmetryAngle", () => {
  it("3 branches = 120 deg", () => {
    expect(symmetryAngle(3)).toBe(120);
  });
  it("zero branches = 0", () => {
    expect(symmetryAngle(0)).toBe(0);
  });
});

describe("costEstimate", () => {
  it("silver most expensive", () => {
    expect(costEstimate("silver", 2)).toBeGreaterThan(costEstimate("iron", 2));
  });
});

describe("candleMetals", () => {
  it("returns 5 metals", () => {
    expect(candleMetals()).toHaveLength(5);
  });
});
