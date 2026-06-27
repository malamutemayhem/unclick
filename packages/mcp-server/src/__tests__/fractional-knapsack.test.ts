import { describe, it, expect } from "vitest";
import { FractionalKnapsack } from "../fractional-knapsack.js";

describe("FractionalKnapsack", () => {
  it("takes full items when capacity allows", () => {
    const items = [
      { value: 60, weight: 10 },
      { value: 100, weight: 20 },
      { value: 120, weight: 30 },
    ];
    const result = FractionalKnapsack.solve(items, 60);
    expect(result.totalValue).toBe(280);
  });

  it("takes fractional items when needed", () => {
    const items = [
      { value: 60, weight: 10 },
      { value: 100, weight: 20 },
      { value: 120, weight: 30 },
    ];
    const result = FractionalKnapsack.solve(items, 50);
    expect(result.totalValue).toBeCloseTo(240);
    expect(result.totalWeight).toBe(50);
  });

  it("fractions sum correctly", () => {
    const items = [{ value: 10, weight: 5 }];
    const result = FractionalKnapsack.solve(items, 3);
    expect(result.fractions[0]).toBeCloseTo(0.6);
    expect(result.totalValue).toBeCloseTo(6);
  });

  it("zero capacity returns nothing", () => {
    const items = [{ value: 100, weight: 10 }];
    const result = FractionalKnapsack.solve(items, 0);
    expect(result.totalValue).toBe(0);
  });

  it("density returns sorted ratios", () => {
    const items = [
      { value: 10, weight: 5 },
      { value: 20, weight: 4 },
      { value: 6, weight: 3 },
    ];
    const d = FractionalKnapsack.density(items);
    expect(d[0].index).toBe(1);
    expect(d[0].ratio).toBe(5);
  });

  it("upperBound equals fractional solution", () => {
    const items = [
      { value: 60, weight: 10 },
      { value: 100, weight: 20 },
    ];
    expect(FractionalKnapsack.upperBound(items, 25)).toBeCloseTo(135);
  });

  it("large capacity takes everything", () => {
    const items = [
      { value: 10, weight: 5 },
      { value: 20, weight: 10 },
    ];
    const result = FractionalKnapsack.solve(items, 1000);
    expect(result.totalValue).toBe(30);
    expect(result.fractions).toEqual([1, 1]);
  });
});
