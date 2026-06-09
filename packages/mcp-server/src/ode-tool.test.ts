import { describe, it, expect } from "vitest";
import { odeSolve } from "./ode-tool.js";

describe("odeSolve", () => {
  it("solves dy/dx = 1 (linear growth)", async () => {
    const r = await odeSolve({
      expression: "1",
      x0: 0, y0: 0, x_end: 5, steps: 100,
    }) as any;
    expect(r.final_y).toBeCloseTo(5, 4);
  });

  it("solves dy/dx = y (exponential growth) with rk4", async () => {
    const r = await odeSolve({
      expression: "y",
      x0: 0, y0: 1, x_end: 1, steps: 100,
    }) as any;
    expect(r.final_y).toBeCloseTo(Math.E, 4);
    expect(r.method).toBe("rk4");
  });

  it("solves with euler method", async () => {
    const r = await odeSolve({
      expression: "1",
      x0: 0, y0: 0, x_end: 1, steps: 100,
      method: "euler",
    }) as any;
    expect(r.final_y).toBeCloseTo(1, 4);
    expect(r.method).toBe("euler");
  });

  it("rejects x_end <= x0", async () => {
    await expect(
      odeSolve({ expression: "1", x0: 5, y0: 0, x_end: 3 }),
    ).rejects.toThrow("greater");
  });

  it("rejects empty expression", async () => {
    await expect(odeSolve({ expression: "" })).rejects.toThrow("required");
  });

  it("stamps meta", async () => {
    const r = await odeSolve({ expression: "1", x0: 0, y0: 0, x_end: 1 }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
