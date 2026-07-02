import { describe, it, expect } from "vitest";
import { palindromeCheck } from "./palindrome-tool.js";

describe("palindrome-tool", () => {
  it("detects a palindrome", async () => {
    const r = await palindromeCheck({ text: "racecar" }) as Record<string, unknown>;
    expect(r.is_palindrome).toBe(true);
    expect(r.unclick_meta).toBeDefined();
  });

  it("detects palindrome ignoring spaces and case", async () => {
    const r = await palindromeCheck({ text: "A man a plan a canal Panama" }) as Record<string, unknown>;
    expect(r.is_palindrome).toBe(true);
  });

  it("detects non-palindrome", async () => {
    const r = await palindromeCheck({ text: "hello world" }) as Record<string, unknown>;
    expect(r.is_palindrome).toBe(false);
  });

  it("finds longest palindrome substring", async () => {
    const r = await palindromeCheck({ text: "abacaba" }) as Record<string, unknown>;
    expect(r.longest_palindrome_substring).toBe("abacaba");
  });

  it("rejects empty input", async () => {
    const r = await palindromeCheck({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
