import { describe, it, expect } from "vitest";
import { schedule } from "../dag-scheduler.js";

describe("dag-scheduler", () => {
  it("runs independent tasks", async () => {
    const result = await schedule([
      { id: "a", deps: [], run: async () => 1 },
      { id: "b", deps: [], run: async () => 2 },
    ]);
    expect(result.results.get("a")).toBe(1);
    expect(result.results.get("b")).toBe(2);
    expect(result.order.length).toBe(2);
  });

  it("respects dependencies", async () => {
    const order: string[] = [];
    await schedule([
      { id: "a", deps: [], run: async () => { order.push("a"); } },
      { id: "b", deps: ["a"], run: async () => { order.push("b"); } },
      { id: "c", deps: ["b"], run: async () => { order.push("c"); } },
    ]);
    expect(order).toEqual(["a", "b", "c"]);
  });

  it("runs with concurrency limit", async () => {
    let maxConcurrent = 0;
    let current = 0;
    await schedule(
      [
        { id: "a", deps: [], run: async () => { current++; maxConcurrent = Math.max(maxConcurrent, current); await delay(10); current--; } },
        { id: "b", deps: [], run: async () => { current++; maxConcurrent = Math.max(maxConcurrent, current); await delay(10); current--; } },
        { id: "c", deps: [], run: async () => { current++; maxConcurrent = Math.max(maxConcurrent, current); await delay(10); current--; } },
      ],
      1
    );
    expect(maxConcurrent).toBe(1);
  });

  it("diamond dependency", async () => {
    const order: string[] = [];
    await schedule([
      { id: "a", deps: [], run: async () => { order.push("a"); } },
      { id: "b", deps: ["a"], run: async () => { order.push("b"); } },
      { id: "c", deps: ["a"], run: async () => { order.push("c"); } },
      { id: "d", deps: ["b", "c"], run: async () => { order.push("d"); } },
    ]);
    expect(order.indexOf("a")).toBe(0);
    expect(order.indexOf("d")).toBe(3);
  });

  it("single task", async () => {
    const result = await schedule([
      { id: "x", deps: [], run: async () => 42 },
    ]);
    expect(result.results.get("x")).toBe(42);
  });
});

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
