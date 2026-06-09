import { describe, it, expect } from "vitest";
import { numericalIntegrate } from "./numintegrate-tool.js";

describe("numericalIntegrate", () => {
  it("integrates x^2 from 0 to 1 (should be 1/3)", async () => {
    const r = await numericalIntegrate({
      expression: "x^2",
      a: 0,
      b: 1,
    }) as any;
    expect(r.integral).toBeCloseTo(1 / 3, 6);
  });

  it("integrates constant 5 from 0 to 3 (should be 15)", async () => {
    const r = await numericalIntegrate({
      expression: "5",
      a: 0,
      b: 3,
    }) as any;
    expect(r.integral).toBeCloseTo(15, 6);
  });

  it("works with trapezoid method", async () => {
    const r = await numericalIntegrate({
      expression: "x",
      a: 0,
      b: 4,
      method: "trapezoid",
    }) as any;
    expect(r.integral).toBeCloseTo(8, 6);
  });

  it("works with midpoint method", async () => {
    const r = await numericalIntegrate({
      expression: "x",
      a: 0,
      b: 2,
      method: "midpoint",
    }) as any;
    expect(r.integral).toBeCloseTo(2, 4);
  });

  it("rejects a >= b", async () => {
    await expect(
      numericalIntegrate({ expression: "x", a: 5, b: 3 }),
    ).rejects.toThrow("less than");
  });

  it("rejects invalid method", async () => {
    await expect(
      numericalIntegrate({ expression: "x", a: 0, b: 1, method: "rk4" }),
    ).rejects.toThrow("method");
  });

  it("stamps meta", async () => {
    const r = await numericalIntegrate({
      expression: "1",
      a: 0,
      b: 1,
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
