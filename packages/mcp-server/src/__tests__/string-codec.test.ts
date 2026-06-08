import { describe, it, expect } from "vitest";
import { rot13, caesarEncrypt, caesarDecrypt, runLengthEncode, runLengthDecode, reverseWords, isPalindrome, countWords } from "../string-codec.js";

describe("rot13", () => {
  it("rotates letters", () => {
    expect(rot13("Hello")).toBe("Uryyb");
    expect(rot13(rot13("Hello"))).toBe("Hello");
  });
});

describe("caesarEncrypt/Decrypt", () => {
  it("roundtrips", () => {
    expect(caesarDecrypt(caesarEncrypt("Hello World!", 3), 3)).toBe("Hello World!");
  });

  it("handles negative shift", () => {
    expect(caesarEncrypt("abc", -1)).toBe("zab");
  });
});

describe("runLengthEncode/Decode", () => {
  it("encodes runs", () => {
    expect(runLengthEncode("aaabbc")).toBe("3a2bc");
  });

  it("roundtrips", () => {
    expect(runLengthDecode(runLengthEncode("aabbccdd"))).toBe("aabbccdd");
  });

  it("handles single chars", () => {
    expect(runLengthEncode("abc")).toBe("abc");
  });

  it("handles empty", () => {
    expect(runLengthEncode("")).toBe("");
  });
});

describe("reverseWords", () => {
  it("reverses word order", () => {
    expect(reverseWords("hello world")).toBe("world hello");
  });
});

describe("isPalindrome", () => {
  it("detects palindromes", () => {
    expect(isPalindrome("racecar")).toBe(true);
    expect(isPalindrome("A man a plan a canal Panama")).toBe(true);
    expect(isPalindrome("hello")).toBe(false);
  });
});

describe("countWords", () => {
  it("counts words", () => {
    expect(countWords("hello world")).toBe(2);
    expect(countWords("  spaces  everywhere  ")).toBe(2);
    expect(countWords("")).toBe(0);
  });
});
