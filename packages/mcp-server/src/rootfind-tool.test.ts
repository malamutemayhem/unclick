import { describe, it, expect } from "vitest";
import { rootFind } from "./rootfind-tool.js";

describe("rootFind", () => {
  it("finds root of x^2 - 4 via Newton", async () => {
    const r = await rootFind({ expression: "x^2 - 4", x0: 3 }) as any;
    expect(r.root).toBeCloseTo(2, 8);
    expect(r.converged).toBe(true);
    expect(r.method).toBe("newton");
  });

  it("finds root of x^3 - 2 via Newton", async () => {
    const r = await rootFind({ expression: "x^3 - 2", x0: 1.5 }) as any;
    expect(r.root).toBeCloseTo(Math.cbrt(2), 6);
    expect(r.converged).toBe(true);
  });

  it("finds root via bisection", async () => {
    const r = await rootFind({
      expression: "x^2 - 2",
      method: "bisection",
      a: 0,
      b: 2,
    }) as any;
    expect(r.root).toBeCloseTo(Math.SQRT2, 6);
    expect(r.converged).toBe(true);
  });

  it("rejects bisection without sign change", async () => {
    await expect(
      rootFind({ expression: "x^2 + 1", method: "bisection", a: 0, b: 2 }),
    ).rejects.toThrow("opposite signs");
  });

  it("rejects empty expression", async () => {
    await expect(rootFind({ expression: "" })).rejects.toThrow("required");
  });

  it("rejects invalid method", async () => {
    await expect(
      rootFind({ expression: "x", method: "secant" }),
    ).rejects.toThrow("method");
  });

  it("stamps meta", async () => {
    const r = await rootFind({ expression: "x - 5", x0: 0 }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
