import { describe, it, expect } from "vitest";
import { powerSet } from "./powerset-tool.js";

describe("powerSet", () => {
  it("generates all subsets of a 3-element set", async () => {
    const r = (await powerSet({ elements: [1, 2, 3] })) as any;
    expect(r.subset_count).toBe(8);
    expect(r.subsets).toHaveLength(8);
    // Empty set should be present
    expect(r.subsets).toContainEqual([]);
    // Full set should be present
    expect(r.subsets).toContainEqual([1, 2, 3]);
  });

  it("handles empty input", async () => {
    const r = (await powerSet({ elements: [] })) as any;
    expect(r.subset_count).toBe(1);
    expect(r.subsets).toEqual([[]]);
    expect(r.element_count).toBe(0);
  });

  it("handles string elements", async () => {
    const r = (await powerSet({ elements: ["a", "b"] })) as any;
    expect(r.subset_count).toBe(4);
    expect(r.subsets).toContainEqual(["a"]);
    expect(r.subsets).toContainEqual(["b"]);
    expect(r.subsets).toContainEqual(["a", "b"]);
  });

  it("rejects more than 20 elements", async () => {
    const big = Array.from({ length: 21 }, (_, i) => i);
    await expect(powerSet({ elements: big })).rejects.toThrow("20 or fewer");
  });

  it("stamps meta", async () => {
    const r = (await powerSet({ elements: [1] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
