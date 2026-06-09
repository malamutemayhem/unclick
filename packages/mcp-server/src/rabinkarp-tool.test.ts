import { describe, it, expect } from "vitest";
import { rabinKarpSearch } from "./rabinkarp-tool.js";

describe("rabinKarpSearch", () => {
  it("finds pattern in text", async () => {
    const r = await rabinKarpSearch({
      text: "hello world hello",
      pattern: "hello",
    }) as any;
    expect(r.match_count).toBe(2);
    expect(r.matches).toEqual([0, 12]);
  });

  it("finds single occurrence", async () => {
    const r = await rabinKarpSearch({
      text: "abcdef",
      pattern: "cde",
    }) as any;
    expect(r.match_count).toBe(1);
    expect(r.matches).toEqual([2]);
  });

  it("returns empty for no match", async () => {
    const r = await rabinKarpSearch({
      text: "abcdef",
      pattern: "xyz",
    }) as any;
    expect(r.match_count).toBe(0);
    expect(r.matches).toEqual([]);
  });

  it("handles pattern longer than text", async () => {
    const r = await rabinKarpSearch({
      text: "hi",
      pattern: "hello",
    }) as any;
    expect(r.match_count).toBe(0);
  });

  it("stamps meta", async () => {
    const r = await rabinKarpSearch({
      text: "test",
      pattern: "t",
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
