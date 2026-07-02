import { describe, it, expect } from "vitest";
import { setopsCalculate } from "./setops-tool.js";

describe("setops-tool", () => {
  it("computes set operations", async () => {
    const r = await setopsCalculate({
      set_a: [1, 2, 3],
      set_b: [2, 3, 4],
    }) as Record<string, unknown>;
    expect((r.union as string[]).sort()).toEqual(["1", "2", "3", "4"]);
    expect((r.intersection as string[]).sort()).toEqual(["2", "3"]);
    expect(r.difference_a_minus_b).toEqual(["1"]);
    expect(r.difference_b_minus_a).toEqual(["4"]);
    expect(r.unclick_meta).toBeDefined();
  });

  it("detects subset", async () => {
    const r = await setopsCalculate({
      set_a: [1, 2],
      set_b: [1, 2, 3],
    }) as Record<string, unknown>;
    expect(r.is_subset).toBe(true);
  });

  it("detects superset", async () => {
    const r = await setopsCalculate({
      set_a: [1, 2, 3],
      set_b: [1, 2],
    }) as Record<string, unknown>;
    expect(r.is_superset).toBe(true);
  });

  it("rejects empty inputs", async () => {
    const r = await setopsCalculate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/set/i);
  });
});
