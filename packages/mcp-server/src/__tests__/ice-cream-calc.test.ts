import { describe, it, expect } from "vitest";
import {
  baseRatio, fatPercent, overrun, yieldLiters, servings,
  churningTemp, churningTime, hardeningTime, servingTemp,
  eggYolks, sweetenerAmount, mixInPercent, baseTypes,
} from "../ice-cream-calc.js";

describe("baseRatio", () => {
  it("custard has cream and milk", () => {
    const r = baseRatio("custard");
    expect(r.cream).toBeGreaterThan(0);
    expect(r.milk).toBeGreaterThan(0);
  });
  it("sorbet has no cream or milk", () => {
    const r = baseRatio("sorbet");
    expect(r.cream).toBe(0);
    expect(r.milk).toBe(0);
  });
});

describe("fatPercent", () => {
  it("custard has high fat", () => {
    expect(fatPercent("custard")).toBeGreaterThan(fatPercent("gelato"));
  });
  it("sorbet has 0 fat", () => {
    expect(fatPercent("sorbet")).toBe(0);
  });
});

describe("overrun", () => {
  it("gelato has less overrun", () => {
    expect(overrun("gelato")).toBeLessThan(overrun("custard"));
  });
});

describe("yieldLiters", () => {
  it("more than base with overrun", () => {
    expect(yieldLiters(1, 50)).toBeGreaterThan(1);
  });
  it("1L + 50% = 1.5L", () => {
    expect(yieldLiters(1, 50)).toBe(1.5);
  });
});

describe("servings", () => {
  it("1000ml / 120ml = 8 scoops", () => {
    expect(servings(1000)).toBe(8);
  });
});

describe("churningTemp", () => {
  it("is -6C", () => {
    expect(churningTemp()).toBe(-6);
  });
});

describe("churningTime", () => {
  it("gelato takes longest", () => {
    expect(churningTime("gelato")).toBeGreaterThanOrEqual(churningTime("philadelphia"));
  });
});

describe("hardeningTime", () => {
  it("positive hours", () => {
    expect(hardeningTime("custard")).toBeGreaterThan(0);
  });
});

describe("servingTemp", () => {
  it("gelato warmer than custard", () => {
    expect(servingTemp("gelato")).toBeGreaterThan(servingTemp("custard"));
  });
});

describe("eggYolks", () => {
  it("custard needs yolks", () => {
    expect(eggYolks(1, "custard")).toBeGreaterThan(0);
  });
  it("sorbet needs no yolks", () => {
    expect(eggYolks(1, "sorbet")).toBe(0);
  });
});

describe("sweetenerAmount", () => {
  it("stevia needs much less", () => {
    expect(sweetenerAmount(1000, "stevia")).toBeLessThan(sweetenerAmount(1000, "sugar"));
  });
});

describe("mixInPercent", () => {
  it("computes percent", () => {
    expect(mixInPercent(100, 1000)).toBe(10);
  });
  it("zero total returns 0", () => {
    expect(mixInPercent(50, 0)).toBe(0);
  });
});

describe("baseTypes", () => {
  it("returns 6 types", () => {
    expect(baseTypes()).toHaveLength(6);
  });
});
