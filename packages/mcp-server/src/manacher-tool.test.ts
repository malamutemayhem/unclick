import { describe, it, expect } from "vitest";
import { manacherPalindrome } from "./manacher-tool.js";

describe("manacherPalindrome", () => {
  it("finds longest palindrome", async () => {
    const r = (await manacherPalindrome({ text: "babad" })) as any;
    expect(["bab", "aba"]).toContain(r.longest_palindrome);
    expect(r.longest_length).toBe(3);
  });

  it("handles full palindrome", async () => {
    const r = (await manacherPalindrome({ text: "racecar" })) as any;
    expect(r.longest_palindrome).toBe("racecar");
    expect(r.longest_length).toBe(7);
  });

  it("handles single character", async () => {
    const r = (await manacherPalindrome({ text: "a" })) as any;
    expect(r.longest_palindrome).toBe("a");
    expect(r.longest_length).toBe(1);
  });

  it("lists all palindromes when requested", async () => {
    const r = (await manacherPalindrome({ text: "abacaba", all: true })) as any;
    expect(r.palindromes.length).toBeGreaterThan(0);
    expect(r.palindromes[0].text).toBe("abacaba");
  });

  it("rejects empty text", async () => {
    await expect(manacherPalindrome({ text: "" })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = (await manacherPalindrome({ text: "ab" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
