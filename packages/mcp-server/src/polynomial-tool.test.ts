import { describe, it, expect } from "vitest";
import { polynomialOps } from "./polynomial-tool.js";

describe("polynomialOps", () => {
  it("evaluates 2x^2 + 3x + 1 at x=2", async () => {
    const r = await polynomialOps({
      operation: "evaluate",
      coefficients: [2, 3, 1],
      x: 2,
    }) as any;
    expect(r.result).toBe(15);
  });

  it("computes derivative of 3x^2 + 2x + 1", async () => {
    const r = await polynomialOps({
      operation: "derivative",
      coefficients: [3, 2, 1],
    }) as any;
    expect(r.derivative).toEqual([6, 2]);
  });

  it("computes integral of 3x^2 + 2x", async () => {
    const r = await polynomialOps({
      operation: "integral",
      coefficients: [3, 2, 0],
    }) as any;
    expect(r.integral[0]).toBe(1);
    expect(r.integral[1]).toBe(1);
    expect(r.integral[2]).toBe(0);
    expect(r.integral[3]).toBe(0);
  });

  it("adds two polynomials", async () => {
    const r = await polynomialOps({
      operation: "add",
      coefficients: [1, 2, 3],
      coefficients2: [4, 5],
    }) as any;
    expect(r.result).toEqual([1, 6, 8]);
  });

  it("multiplies two polynomials", async () => {
    const r = await polynomialOps({
      operation: "multiply",
      coefficients: [1, 1],
      coefficients2: [1, -1],
    }) as any;
    expect(r.result).toEqual([1, 0, -1]);
  });

  it("rejects empty coefficients", async () => {
    await expect(
      polynomialOps({ operation: "evaluate", coefficients: [] }),
    ).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await polynomialOps({
      operation: "evaluate",
      coefficients: [1],
      x: 0,
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
