import { describe, it, expect } from "vitest";
import { ManacherPalindrome } from "../manacher-palindrome.js";

describe("ManacherPalindrome", () => {
  it("finds longest palindrome", () => {
    expect(ManacherPalindrome.longestPalindrome("babad")).toHaveLength(3);
  });

  it("full string palindrome", () => {
    expect(ManacherPalindrome.longestPalindrome("racecar")).toBe("racecar");
  });

  it("single character", () => {
    expect(ManacherPalindrome.longestPalindrome("a")).toBe("a");
  });

  it("empty string", () => {
    expect(ManacherPalindrome.longestPalindrome("")).toBe("");
  });

  it("even length palindrome", () => {
    expect(ManacherPalindrome.longestPalindrome("abba")).toBe("abba");
  });

  it("isPalindrome checks correctly", () => {
    expect(ManacherPalindrome.isPalindrome("racecar")).toBe(true);
    expect(ManacherPalindrome.isPalindrome("hello")).toBe(false);
    expect(ManacherPalindrome.isPalindrome("abba")).toBe(true);
  });

  it("allPalindromes finds all", () => {
    const pals = ManacherPalindrome.allPalindromes("abacaba");
    expect(pals.length).toBeGreaterThan(0);
    expect(pals).toContain("aba");
  });

  it("countPalindromes counts distinct palindromes", () => {
    const count = ManacherPalindrome.countPalindromes("aaa");
    expect(count).toBeGreaterThan(0);
  });
});
