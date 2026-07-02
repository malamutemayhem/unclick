import { describe, it, expect } from "vitest";
import { prefixFunction } from "./prefixfn-tool.js";

describe("prefixFunction", () => {
  it("computes prefix values for 'abcabc'", async () => {
    const r = (await prefixFunction({ text: "abcabc" })) as any;
    expect(r.prefix_values).toEqual([0, 0, 0, 1, 2, 3]);
    expect(r.max_prefix).toBe(3);
  });

  it("returns all zeros for a string with no repeated prefix", async () => {
    const r = (await prefixFunction({ text: "abcdef" })) as any;
    expect(r.prefix_values).toEqual([0, 0, 0, 0, 0, 0]);
    expect(r.max_prefix).toBe(0);
  });

  it("finds pattern occurrences when pattern is provided", async () => {
    const r = (await prefixFunction({
      text: "abcabcabc",
      pattern: "abc",
    })) as any;
    expect(r.occurrences).toBe(3);
    expect(r.positions).toEqual([0, 3, 6]);
  });

  it("returns zero occurrences when pattern is absent from text", async () => {
    const r = (await prefixFunction({
      text: "aaaa",
      pattern: "bb",
    })) as any;
    expect(r.occurrences).toBe(0);
    expect(r.positions).toEqual([]);
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await prefixFunction({ text: "aab" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
