import { describe, it, expect } from "vitest";
import { knapsackSolve } from "./knapsack-tool.js";

describe("knapsackSolve", () => {
  it("solves a basic knapsack problem", async () => {
    const r = await knapsackSolve({
      capacity: 50,
      items: [
        { name: "A", weight: 10, value: 60 },
        { name: "B", weight: 20, value: 100 },
        { name: "C", weight: 30, value: 120 },
      ],
    }) as any;
    expect(r.max_value).toBe(220);
    expect(r.total_weight).toBe(50);
    expect(r.selected_count).toBe(2);
  });

  it("selects nothing when items are too heavy", async () => {
    const r = await knapsackSolve({
      capacity: 5,
      items: [
        { weight: 10, value: 100 },
        { weight: 20, value: 200 },
      ],
    }) as any;
    expect(r.max_value).toBe(0);
    expect(r.selected_count).toBe(0);
  });

  it("selects all items when they fit", async () => {
    const r = await knapsackSolve({
      capacity: 100,
      items: [
        { weight: 10, value: 10 },
        { weight: 20, value: 20 },
        { weight: 30, value: 30 },
      ],
    }) as any;
    expect(r.max_value).toBe(60);
    expect(r.selected_count).toBe(3);
  });

  it("rejects empty items", async () => {
    await expect(
      knapsackSolve({ capacity: 10, items: [] }),
    ).rejects.toThrow("non-empty");
  });

  it("rejects invalid capacity", async () => {
    await expect(
      knapsackSolve({ capacity: -1, items: [{ weight: 1, value: 1 }] }),
    ).rejects.toThrow("positive");
  });

  it("stamps meta", async () => {
    const r = await knapsackSolve({
      capacity: 10,
      items: [{ weight: 5, value: 10 }],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
