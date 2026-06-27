import { describe, it, expect } from "vitest";
import {
  sides, average, poolAverage, exactProb, atLeastProb,
  atMostProb, critProb, advantageAvg, disadvantageAvg,
  multiDiceSum, dropLowest, explodingAvg, successCount,
  variance, dieTypes,
} from "../dice-prob.js";

describe("sides", () => {
  it("d20 has 20", () => {
    expect(sides("d20")).toBe(20);
  });
});

describe("average", () => {
  it("d6 avg is 3.5", () => {
    expect(average("d6")).toBe(3.5);
  });
});

describe("poolAverage", () => {
  it("2d6 avg is 7", () => {
    expect(poolAverage(2, "d6")).toBe(7);
  });
});

describe("exactProb", () => {
  it("1/6 for d6", () => {
    expect(exactProb("d6", 3)).toBeCloseTo(1 / 6, 4);
  });

  it("0 for out of range", () => {
    expect(exactProb("d6", 7)).toBe(0);
  });
});

describe("atLeastProb", () => {
  it("1 for target 1", () => {
    expect(atLeastProb("d20", 0)).toBe(1);
  });

  it("50% for d6 target 4", () => {
    expect(atLeastProb("d6", 4)).toBeCloseTo(0.5, 4);
  });
});

describe("atMostProb", () => {
  it("1 for max", () => {
    expect(atMostProb("d6", 6)).toBe(1);
  });
});

describe("critProb", () => {
  it("5% for d20", () => {
    expect(critProb("d20")).toBe(0.05);
  });
});

describe("advantageAvg", () => {
  it("above normal avg", () => {
    expect(advantageAvg("d20")).toBeGreaterThan(average("d20"));
  });
});

describe("disadvantageAvg", () => {
  it("below normal avg", () => {
    expect(disadvantageAvg("d20")).toBeLessThan(average("d20"));
  });
});

describe("multiDiceSum", () => {
  it("correct min/max for 2d6", () => {
    const result = multiDiceSum(2, "d6");
    expect(result.min).toBe(2);
    expect(result.max).toBe(12);
    expect(result.avg).toBe(7);
  });
});

describe("dropLowest", () => {
  it("higher than 3d6 avg", () => {
    expect(dropLowest(4, "d6")).toBeGreaterThan(poolAverage(3, "d6"));
  });
});

describe("explodingAvg", () => {
  it("higher than normal avg", () => {
    expect(explodingAvg("d6")).toBeGreaterThan(average("d6"));
  });
});

describe("successCount", () => {
  it("positive for pool", () => {
    expect(successCount(5, "d6", 4)).toBeGreaterThan(0);
  });
});

describe("variance", () => {
  it("d6 variance", () => {
    expect(variance("d6")).toBeCloseTo(35 / 12, 1);
  });
});

describe("dieTypes", () => {
  it("returns 7 types", () => {
    expect(dieTypes()).toHaveLength(7);
  });
});
