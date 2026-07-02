import { describe, it, expect } from "vitest";
import { nthRoot } from "./nthroot-tool.js";

describe("nthRoot", () => {
  it("computes square root", async () => {
    const r = await nthRoot({ value: 16, n: 2 }) as any;
    expect(r.result).toBeCloseTo(4, 8);
    expect(r.is_integer_result).toBe(true);
  });

  it("computes cube root of negative", async () => {
    const r = await nthRoot({ value: -27, n: 3 }) as any;
    expect(r.result).toBeCloseTo(-3, 8);
  });

  it("returns error for even root of negative", async () => {
    const r = await nthRoot({ value: -4, n: 2 }) as any;
    expect(r.error).toBeTruthy();
  });

  it("defaults to square root", async () => {
    const r = await nthRoot({ value: 25 }) as any;
    expect(r.result).toBeCloseTo(5, 8);
  });
});
