import { describe, it, expect } from "vitest";
import { combinationCalc } from "./combination-tool.js";

describe("combination-tool", () => {
  it("computes C(5,3)", async () => {
    const r = await combinationCalc({ n: 5, r: 3 }) as Record<string, unknown>;
    expect(r.combinations).toBe(10);
    expect(r.unclick_meta).toBeDefined();
  });

  it("computes C(n,0) = 1", async () => {
    const r = await combinationCalc({ n: 10, r: 0 }) as Record<string, unknown>;
    expect(r.combinations).toBe(1);
  });

  it("computes C(n,n) = 1", async () => {
    const r = await combinationCalc({ n: 7, r: 7 }) as Record<string, unknown>;
    expect(r.combinations).toBe(1);
  });

  it("C(10,3) = 120", async () => {
    const r = await combinationCalc({ n: 10, r: 3 }) as Record<string, unknown>;
    expect(r.combinations).toBe(120);
  });

  it("rejects missing n", async () => {
    const r = await combinationCalc({}) as Record<string, unknown>;
    expect(r.error).toMatch(/n/i);
  });
});
