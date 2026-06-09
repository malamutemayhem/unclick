import { describe, it, expect } from "vitest";
import { suffixArrayBuild } from "./suffixarray-tool.js";

describe("suffixArrayBuild", () => {
  it("builds suffix array for banana", async () => {
    const r = (await suffixArrayBuild({ text: "banana" })) as any;
    expect(r.suffix_array).toEqual([5, 3, 1, 0, 4, 2]);
    expect(r.length).toBe(6);
  });

  it("builds suffix array for abc", async () => {
    const r = (await suffixArrayBuild({ text: "abc" })) as any;
    expect(r.suffix_array).toEqual([0, 1, 2]);
  });

  it("computes LCP array when requested", async () => {
    const r = (await suffixArrayBuild({ text: "banana", lcp: true })) as any;
    expect(r.lcp_array).toBeDefined();
    expect(r.lcp_array).toHaveLength(6);
  });

  it("rejects empty text", async () => {
    await expect(suffixArrayBuild({ text: "" })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = (await suffixArrayBuild({ text: "test" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
