import { describe, it, expect } from "vitest";
import { regressionFit } from "./regression-tool.js";

describe("regression-tool", () => {
  it("fits a perfect linear relationship", async () => {
    const r = await regressionFit({
      x: [1, 2, 3, 4, 5],
      y: [2, 4, 6, 8, 10],
    }) as Record<string, unknown>;
    expect(r.slope).toBe(2);
    expect(r.intercept).toBe(0);
    expect(r.r_squared).toBe(1);
    expect(r.unclick_meta).toBeDefined();
  });

  it("handles imperfect data", async () => {
    const r = await regressionFit({
      x: [1, 2, 3, 4, 5],
      y: [2, 4, 5, 4, 5],
    }) as Record<string, unknown>;
    expect(typeof r.slope).toBe("number");
    expect((r.r_squared as number)).toBeLessThan(1);
    expect((r.r_squared as number)).toBeGreaterThan(0);
  });

  it("returns equation string", async () => {
    const r = await regressionFit({ x: [1, 2], y: [3, 5] }) as Record<string, unknown>;
    expect(typeof r.equation).toBe("string");
    expect((r.equation as string)).toContain("y =");
  });

  it("rejects mismatched lengths", async () => {
    const r = await regressionFit({ x: [1, 2], y: [1] }) as Record<string, unknown>;
    expect(r.error).toMatch(/same length/i);
  });

  it("rejects too few points", async () => {
    const r = await regressionFit({ x: [1], y: [1] }) as Record<string, unknown>;
    expect(r.error).toMatch(/at least/i);
  });
});
