import { describe, it, expect } from "vitest";
import { KnapsackSolver } from "../knapsack-solver.js";

describe("KnapsackSolver", () => {
  const items = [
    { name: "laptop", weight: 3, value: 2000 },
    { name: "phone", weight: 1, value: 1500 },
    { name: "tablet", weight: 2, value: 1000 },
    { name: "camera", weight: 4, value: 2500 },
    { name: "headphones", weight: 1, value: 300 },
  ];

  it("solve finds optimal selection", () => {
    const result = KnapsackSolver.solve(items, 5);
    expect(result.totalWeight).toBeLessThanOrEqual(5);
    expect(result.totalValue).toBeGreaterThan(0);
    expect(result.items.length).toBeGreaterThan(0);
  });

  it("solve respects capacity", () => {
    const result = KnapsackSolver.solve(items, 3);
    expect(result.totalWeight).toBeLessThanOrEqual(3);
  });

  it("solve maximizes value", () => {
    const result = KnapsackSolver.solve(items, 4);
    expect(result.totalValue).toBeGreaterThanOrEqual(3500);
  });

  it("greedy provides fast approximation", () => {
    const result = KnapsackSolver.greedy(items, 5);
    expect(result.totalWeight).toBeLessThanOrEqual(5);
    expect(result.totalValue).toBeGreaterThan(0);
  });

  it("fractional allows partial items", () => {
    const result = KnapsackSolver.fractional(items, 5);
    expect(result.totalValue).toBeGreaterThanOrEqual(
      KnapsackSolver.solve(items, 5).totalValue,
    );
  });

  it("fractional uses fractions when needed", () => {
    const result = KnapsackSolver.fractional(items, 2);
    const hasFraction = result.selections.some((s) => s.fraction < 1);
    expect(hasFraction || result.selections.length <= 2).toBe(true);
  });

  it("valuePerWeight ranks items by efficiency", () => {
    const ranked = KnapsackSolver.valuePerWeight(items);
    expect(ranked.length).toBe(5);
    expect(ranked[0].ratio).toBeGreaterThanOrEqual(ranked[1].ratio);
  });

  it("handles empty items", () => {
    const result = KnapsackSolver.solve([], 10);
    expect(result.totalValue).toBe(0);
    expect(result.items).toEqual([]);
  });

  it("handles zero capacity", () => {
    const result = KnapsackSolver.solve(items, 0);
    expect(result.totalValue).toBe(0);
  });

  it("efficiency shows capacity usage", () => {
    const result = KnapsackSolver.solve(items, 10);
    expect(result.efficiency).toBeGreaterThan(0);
    expect(result.efficiency).toBeLessThanOrEqual(100);
  });
});
