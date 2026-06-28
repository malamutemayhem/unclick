import { describe, it, expect } from "vitest";
import { ahoCorasickSearch } from "./ahocorasick-tool.js";

describe("ahoCorasickSearch", () => {
  it("finds multiple patterns", async () => {
    const r = (await ahoCorasickSearch({
      text: "ushers",
      patterns: ["he", "she", "his", "hers"],
    })) as any;
    expect(r.total_matches).toBe(3);
    const found = r.matches.map((m: any) => m.pattern);
    expect(found).toContain("she");
    expect(found).toContain("he");
    expect(found).toContain("hers");
  });

  it("finds overlapping patterns", async () => {
    const r = (await ahoCorasickSearch({
      text: "abcabc",
      patterns: ["abc", "bc", "c"],
    })) as any;
    expect(r.total_matches).toBe(6);
  });

  it("returns empty for no matches", async () => {
    const r = (await ahoCorasickSearch({
      text: "hello",
      patterns: ["xyz", "uvw"],
    })) as any;
    expect(r.total_matches).toBe(0);
  });

  it("rejects empty patterns array", async () => {
    await expect(
      ahoCorasickSearch({ text: "hello", patterns: [] }),
    ).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = (await ahoCorasickSearch({
      text: "test",
      patterns: ["t"],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
