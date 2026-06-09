import { describe, it, expect } from "vitest";
import { zFunction } from "./zfunction-tool.js";

describe("zFunction", () => {
  it("computes Z-array for a string", async () => {
    const r = (await zFunction({ text: "aabxaab" })) as any;
    // z = [7, 1, 0, 0, 3, 1, 0]
    expect(r.z_array).toEqual([7, 1, 0, 0, 3, 1, 0]);
    expect(r.max_z).toBe(3);
  });

  it("finds pattern matches in text", async () => {
    const r = (await zFunction({ text: "abcabcabc", pattern: "abc" })) as any;
    expect(r.match_count).toBe(3);
    expect(r.match_positions).toEqual([0, 3, 6]);
  });

  it("handles no matches", async () => {
    const r = (await zFunction({ text: "hello", pattern: "xyz" })) as any;
    expect(r.match_count).toBe(0);
    expect(r.match_positions).toEqual([]);
  });

  it("handles all-same characters", async () => {
    const r = (await zFunction({ text: "aaaa" })) as any;
    expect(r.z_array).toEqual([4, 3, 2, 1]);
  });

  it("stamps meta", async () => {
    const r = (await zFunction({ text: "ab" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
