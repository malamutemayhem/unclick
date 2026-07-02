import { describe, it, expect } from "vitest";
import { suffixTree } from "./suffixtree-tool.js";

describe("suffixTree", () => {
  it("counts distinct substrings", async () => {
    const r = (await suffixTree({ text: "abc" })) as any;
    expect(r.distinct_substrings).toBe(6);
  });

  it("finds longest repeated substring", async () => {
    const r = (await suffixTree({ text: "banana" })) as any;
    expect(r.longest_repeated_substring).toBe("ana");
  });

  it("handles single character repeated", async () => {
    const r = (await suffixTree({ text: "aaa" })) as any;
    expect(r.distinct_substrings).toBe(3);
    expect(r.longest_repeated_substring).toBe("aa");
  });

  it("reports node count", async () => {
    const r = (await suffixTree({ text: "ab" })) as any;
    expect(r.node_count).toBeGreaterThan(1);
    expect(r.text_length).toBe(2);
  });

  it("stamps meta", async () => {
    const r = (await suffixTree({ text: "x" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
