import { describe, it, expect } from "vitest";
import { berlekampMassey } from "./berlekamp-tool.js";

describe("berlekampMassey", () => {
  it("finds recurrence for Fibonacci-like sequence", async () => {
    const r = (await berlekampMassey({ sequence: [1, 1, 2, 3, 5, 8, 13, 21] })) as any;
    expect(r.recurrence_length).toBe(2);
    expect(r.recurrence_coefficients).toEqual([1, 1]);
  });

  it("finds recurrence for constant sequence", async () => {
    const r = (await berlekampMassey({ sequence: [5, 5, 5, 5, 5] })) as any;
    expect(r.recurrence_length).toBe(1);
    expect(r.recurrence_coefficients).toEqual([1]);
  });

  it("finds recurrence for geometric sequence (powers of 2)", async () => {
    const r = (await berlekampMassey({ sequence: [1, 2, 4, 8, 16, 32] })) as any;
    expect(r.recurrence_length).toBe(1);
    expect(r.recurrence_coefficients).toEqual([2]);
  });

  it("handles longer recurrence", async () => {
    const seq = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1];
    const r = (await berlekampMassey({ sequence: seq })) as any;
    expect(r.recurrence_length).toBe(4);
  });

  it("stamps meta", async () => {
    const r = (await berlekampMassey({ sequence: [1, 1] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
