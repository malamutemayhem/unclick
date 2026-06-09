import { describe, it, expect } from "vitest";
import { digitDp } from "./digitdp-tool.js";

describe("digitDp", () => {
  it("counts single-digit numbers with digit sum 5", async () => {
    // From 1 to 9, only 5 has digit sum 5
    const r = (await digitDp({ n: 9, target_digit_sum: 5 })) as any;
    expect(r.count).toBe(1);
    expect(r.digit_count).toBe(1);
  });

  it("counts numbers 1-100 with digit sum 1", async () => {
    // digit sum 1: 1, 10, 100 = 3 numbers
    const r = (await digitDp({ n: 100, target_digit_sum: 1 })) as any;
    expect(r.count).toBe(3);
  });

  it("counts numbers 1-20 with digit sum 3", async () => {
    // digit sum 3: 3, 12 = 2 numbers
    const r = (await digitDp({ n: 20, target_digit_sum: 3 })) as any;
    expect(r.count).toBe(2);
  });

  it("rejects n exceeding 1e15", async () => {
    await expect(digitDp({ n: 1e16, target_digit_sum: 5 })).rejects.toThrow("at most 1e15");
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await digitDp({ n: 10, target_digit_sum: 1 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
