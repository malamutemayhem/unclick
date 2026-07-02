import { describe, it, expect } from "vitest";
import { quadraticSolve } from "./quadratic-tool.js";

describe("quadraticSolve", () => {
  it("finds two real roots", async () => {
    const r = await quadraticSolve({ a: 1, b: -3, c: 2 }) as any;
    expect(r.roots.type).toBe("two_real");
    expect(r.roots.x1).toBe(2);
    expect(r.roots.x2).toBe(1);
  });

  it("finds one repeated root", async () => {
    const r = await quadraticSolve({ a: 1, b: -2, c: 1 }) as any;
    expect(r.roots.type).toBe("one_repeated");
    expect(r.roots.x1).toBe(1);
  });

  it("finds complex roots", async () => {
    const r = await quadraticSolve({ a: 1, b: 0, c: 1 }) as any;
    expect(r.roots.type).toBe("two_complex");
    expect(r.roots.x1).toContain("i");
  });

  it("returns error when a is zero", async () => {
    const r = await quadraticSolve({ a: 0, b: 1, c: 1 }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for missing args", async () => {
    const r = await quadraticSolve({}) as any;
    expect(r.error).toBeTruthy();
  });
});
