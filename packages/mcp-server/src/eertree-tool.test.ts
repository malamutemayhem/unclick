import { describe, it, expect } from "vitest";
import { eertree } from "./eertree-tool.js";

describe("eertree", () => {
  it("counts distinct palindromes in 'abba'", async () => {
    const r = (await eertree({ text: "abba" })) as any;
    expect(r.distinct_palindromes).toBe(4);
    expect(r.longest_palindrome).toBe("abba");
  });

  it("handles single character", async () => {
    const r = (await eertree({ text: "a" })) as any;
    expect(r.distinct_palindromes).toBe(1);
    expect(r.longest_palindrome).toBe("a");
  });

  it("counts palindromes in 'aaa'", async () => {
    const r = (await eertree({ text: "aaa" })) as any;
    expect(r.distinct_palindromes).toBe(3);
    expect(r.palindrome_lengths).toEqual([1, 2, 3]);
  });

  it("finds longest palindrome in 'abacaba'", async () => {
    const r = (await eertree({ text: "abacaba" })) as any;
    expect(r.longest_palindrome).toBe("abacaba");
  });

  it("stamps meta", async () => {
    const r = (await eertree({ text: "abc" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
