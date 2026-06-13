import { describe, it, expect } from "vitest";
import { fibonacciSequence } from "./fibonacci-tool.js";

describe("fibonacci-tool", () => {
  it("generates first 10 Fibonacci numbers", async () => {
    const r = await fibonacciSequence({ n: 10 }) as Record<string, unknown>;
    const seq = r.sequence as number[];
    expect(seq).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    expect(r.count).toBe(10);
    expect(r.last).toBe(34);
    expect(r.unclick_meta).toBeDefined();
  });

  it("defaults to 10", async () => {
    const r = await fibonacciSequence({}) as Record<string, unknown>;
    expect(r.count).toBe(10);
  });

  it("checks if a number is Fibonacci", async () => {
    const r = await fibonacciSequence({ n: 5, check: 8 }) as Record<string, unknown>;
    expect(r.is_fibonacci).toBe(true);
  });

  it("detects non-Fibonacci number", async () => {
    const r = await fibonacciSequence({ n: 5, check: 7 }) as Record<string, unknown>;
    expect(r.is_fibonacci).toBe(false);
  });

  it("caps at 100", async () => {
    const r = await fibonacciSequence({ n: 200 }) as Record<string, unknown>;
    expect(r.count).toBe(100);
  });
});
