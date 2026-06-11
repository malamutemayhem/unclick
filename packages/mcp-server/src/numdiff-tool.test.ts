import { describe, it, expect } from "vitest";
import { numericalDiff } from "./numdiff-tool.js";

describe("numericalDiff", () => {
  it("computes first derivative of x^2 at x=3", async () => {
    const r = await numericalDiff({ expression: "x^2", x: 3 }) as any;
    expect(r.derivative).toBeCloseTo(6, 4);
    expect(r.f_of_x).toBe(9);
  });

  it("computes second derivative of x^3 at x=2", async () => {
    const r = await numericalDiff({ expression: "x^3", x: 2, order: 2 }) as any;
    expect(r.derivative).toBeCloseTo(12, 0);
  });

  it("computes derivative of constant", async () => {
    const r = await numericalDiff({ expression: "5", x: 0 }) as any;
    expect(Math.abs(r.derivative)).toBeLessThan(0.001);
  });

  it("handles multiplication", async () => {
    const r = await numericalDiff({ expression: "3*x + 1", x: 5 }) as any;
    expect(r.derivative).toBeCloseTo(3, 4);
  });

  it("rejects empty expression", async () => {
    await expect(
      numericalDiff({ expression: "", x: 1 }),
    ).rejects.toThrow("required");
  });

  it("rejects invalid order", async () => {
    await expect(
      numericalDiff({ expression: "x", x: 1, order: 5 }),
    ).rejects.toThrow("order");
  });

  it("stamps meta", async () => {
    const r = await numericalDiff({ expression: "x", x: 0 }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
