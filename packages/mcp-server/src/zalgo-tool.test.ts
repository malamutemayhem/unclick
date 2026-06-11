import { describe, it, expect } from "vitest";
import { zAlgorithm } from "./zalgo-tool.js";

describe("zAlgorithm", () => {
  it("computes Z-array for a string", async () => {
    const r = (await zAlgorithm({ text: "aabxaab" })) as any;
    expect(r.z_array).toEqual([7, 1, 0, 0, 3, 1, 0]);
    expect(r.length).toBe(7);
  });

  it("finds pattern matches", async () => {
    const r = (await zAlgorithm({ text: "abcabcabc", pattern: "abc" })) as any;
    expect(r.match_count).toBe(3);
    expect(r.matches).toEqual([0, 3, 6]);
  });

  it("returns empty for no match", async () => {
    const r = (await zAlgorithm({ text: "hello", pattern: "xyz" })) as any;
    expect(r.match_count).toBe(0);
    expect(r.matches).toEqual([]);
  });

  it("rejects empty text", async () => {
    await expect(zAlgorithm({ text: "" })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = (await zAlgorithm({ text: "ab" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
