import { describe, it, expect } from "vitest";
import { proportionSolve } from "./proportion-tool.js";

describe("proportion-tool", () => {
  it("solves for d in 2/4 = 3/x", async () => {
    const r = await proportionSolve({ a: 2, b: 4, c: 3 }) as Record<string, unknown>;
    expect(r.solved_value).toBe(6);
    expect(r.solved_for).toBe("d");
    expect(r.unclick_meta).toBeDefined();
  });

  it("solves for a in x/6 = 5/10", async () => {
    const r = await proportionSolve({ b: 6, c: 5, d: 10 }) as Record<string, unknown>;
    expect(r.solved_value).toBe(3);
    expect(r.solved_for).toBe("a");
  });

  it("solves for b in 3/x = 6/8", async () => {
    const r = await proportionSolve({ a: 3, c: 6, d: 8 }) as Record<string, unknown>;
    expect(r.solved_value).toBe(4);
    expect(r.solved_for).toBe("b");
  });

  it("solves for c in 2/5 = x/10", async () => {
    const r = await proportionSolve({ a: 2, b: 5, d: 10 }) as Record<string, unknown>;
    expect(r.solved_value).toBe(4);
    expect(r.solved_for).toBe("c");
  });

  it("rejects when not exactly 3 values given", async () => {
    const r = await proportionSolve({ a: 1, b: 2 }) as Record<string, unknown>;
    expect(r.error).toMatch(/exactly 3/i);
  });
});
