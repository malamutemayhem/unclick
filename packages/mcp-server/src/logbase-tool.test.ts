import { describe, it, expect } from "vitest";
import { logBase } from "./logbase-tool.js";

describe("logBase", () => {
  it("computes log base 10 of 1000", async () => {
    const r = await logBase({ value: 1000, base: 10 }) as any;
    expect(r.result).toBeCloseTo(3, 8);
    expect(r.is_integer_result).toBe(true);
  });

  it("computes log base 2 of 8", async () => {
    const r = await logBase({ value: 8, base: 2 }) as any;
    expect(r.result).toBeCloseTo(3, 8);
  });

  it("defaults to base 10", async () => {
    const r = await logBase({ value: 100 }) as any;
    expect(r.result).toBeCloseTo(2, 8);
  });

  it("returns error for negative value", async () => {
    const r = await logBase({ value: -5 }) as any;
    expect(r.error).toBeTruthy();
  });
});
