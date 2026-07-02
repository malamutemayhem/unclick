import { describe, it, expect } from "vitest";
import { permutationCalc } from "./permutation-tool.js";

describe("permutation-tool", () => {
  it("computes P(5,3)", async () => {
    const r = await permutationCalc({ n: 5, r: 3 }) as Record<string, unknown>;
    expect(r.permutations).toBe(60);
    expect(r.unclick_meta).toBeDefined();
  });

  it("computes P(n,n) as n!", async () => {
    const r = await permutationCalc({ n: 4, r: 4 }) as Record<string, unknown>;
    expect(r.permutations).toBe(24);
  });

  it("defaults r to n", async () => {
    const r = await permutationCalc({ n: 3 }) as Record<string, unknown>;
    expect(r.permutations).toBe(6);
  });

  it("handles P(n,0) = 1", async () => {
    const r = await permutationCalc({ n: 10, r: 0 }) as Record<string, unknown>;
    expect(r.permutations).toBe(1);
  });

  it("rejects missing n", async () => {
    const r = await permutationCalc({}) as Record<string, unknown>;
    expect(r.error).toMatch(/n/i);
  });
});
