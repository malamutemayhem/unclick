import { describe, it, expect } from "vitest";
import { kmpSearch } from "./kmp-tool.js";

describe("kmpSearch", () => {
  it("finds all occurrences", async () => {
    const r = (await kmpSearch({ text: "ababcababd", pattern: "abab" })) as any;
    expect(r.match_count).toBe(2);
    expect(r.matches).toEqual([0, 5]);
  });

  it("finds single match", async () => {
    const r = (await kmpSearch({ text: "hello world", pattern: "world" })) as any;
    expect(r.match_count).toBe(1);
    expect(r.matches).toEqual([6]);
  });

  it("returns empty for no match", async () => {
    const r = (await kmpSearch({ text: "abcdef", pattern: "xyz" })) as any;
    expect(r.match_count).toBe(0);
    expect(r.matches).toEqual([]);
  });

  it("returns failure function", async () => {
    const r = (await kmpSearch({ text: "test", pattern: "aba" })) as any;
    expect(r.failure_function).toEqual([0, 0, 1]);
  });

  it("rejects empty pattern", async () => {
    await expect(kmpSearch({ text: "abc", pattern: "" })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = (await kmpSearch({ text: "a", pattern: "a" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
