import { describe, it, expect } from "vitest";
import { compress, decompress, compressToBase64, ratio } from "../lz-string.js";

describe("lz-string", () => {
  it("compresses and decompresses simple string", () => {
    const input = "hello world";
    const compressed = compress(input);
    expect(decompress(compressed)).toBe(input);
  });

  it("handles empty string", () => {
    expect(compress("")).toBe("");
    expect(decompress("")).toBe("");
  });

  it("handles single character", () => {
    expect(decompress(compress("a"))).toBe("a");
  });

  it("compresses repeated content well", () => {
    const input = "abcabc".repeat(50);
    const compressed = compress(input);
    expect(compressed.length).toBeLessThan(input.length);
    expect(decompress(compressed)).toBe(input);
  });

  it("handles all ASCII characters", () => {
    let input = "";
    for (let i = 32; i < 127; i++) input += String.fromCharCode(i);
    expect(decompress(compress(input))).toBe(input);
  });

  it("compressToBase64 produces base64 output", () => {
    const result = compressToBase64("hello world");
    expect(result).toMatch(/^[A-Za-z0-9+/=]+$/);
  });

  it("ratio is less than 1 for repetitive data", () => {
    const input = "aaaa".repeat(100);
    expect(ratio(input)).toBeLessThan(1);
  });

  it("ratio is 0 for empty string", () => {
    expect(ratio("")).toBe(0);
  });

  it("preserves distinct long strings", () => {
    const input = "The quick brown fox jumps over the lazy dog. The quick brown fox jumps again.";
    expect(decompress(compress(input))).toBe(input);
  });

  it("handles patterns with dictionary growth", () => {
    const input = "ababababcdcdcdcd";
    expect(decompress(compress(input))).toBe(input);
  });
});
