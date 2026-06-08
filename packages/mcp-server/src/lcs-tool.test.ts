import { describe, it, expect } from "vitest";
import { stringLcs } from "./lcs-tool.js";

describe("stringLcs", () => {
  it("finds LCS of two strings", async () => {
    const r = await stringLcs({ a: "ABCBDAB", b: "BDCAB" }) as any;
    expect(r.lcs_length).toBe(4);
    expect(["BCAB", "BDAB"]).toContain(r.lcs);
  });

  it("returns empty for no common subsequence", async () => {
    const r = await stringLcs({ a: "abc", b: "xyz" }) as any;
    expect(r.lcs_length).toBe(0);
    expect(r.lcs).toBe("");
    expect(r.similarity).toBe(0);
  });

  it("handles identical strings", async () => {
    const r = await stringLcs({ a: "hello", b: "hello" }) as any;
    expect(r.lcs).toBe("hello");
    expect(r.lcs_length).toBe(5);
    expect(r.similarity).toBe(1);
  });

  it("handles empty strings", async () => {
    const r = await stringLcs({ a: "", b: "test" }) as any;
    expect(r.lcs_length).toBe(0);
  });

  it("rejects strings over 5000 chars", async () => {
    await expect(
      stringLcs({ a: "x".repeat(5001), b: "y" }),
    ).rejects.toThrow("5000");
  });

  it("stamps meta with local source", async () => {
    const r = await stringLcs({ a: "ab", b: "b" }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
