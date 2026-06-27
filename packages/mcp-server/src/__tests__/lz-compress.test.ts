import { describe, it, expect } from "vitest";
import {
  lzwEncode, lzwDecode, lz77Encode, lz77Decode, compressionRatio,
} from "../lz-compress.js";

describe("lzwEncode / lzwDecode", () => {
  it("roundtrips simple string", () => {
    const input = "TOBEORNOTTOBEORTOBEORNOT";
    const encoded = lzwEncode(input);
    expect(lzwDecode(encoded)).toBe(input);
  });

  it("handles empty string", () => {
    expect(lzwEncode("")).toEqual([]);
    expect(lzwDecode([])).toBe("");
  });

  it("compresses repeated patterns", () => {
    const input = "ABABABABABABABABAB";
    const encoded = lzwEncode(input);
    expect(encoded.length).toBeLessThan(input.length);
    expect(lzwDecode(encoded)).toBe(input);
  });

  it("handles single character", () => {
    const input = "A";
    expect(lzwDecode(lzwEncode(input))).toBe(input);
  });

  it("handles all unique characters", () => {
    const input = "ABCDEFGHIJ";
    expect(lzwDecode(lzwEncode(input))).toBe(input);
  });

  it("handles the special case where code equals next entry", () => {
    const input = "AAAAAA";
    const encoded = lzwEncode(input);
    expect(lzwDecode(encoded)).toBe(input);
  });
});

describe("lz77Encode / lz77Decode", () => {
  it("roundtrips simple string", () => {
    const input = "ABCABCABC";
    const tokens = lz77Encode(input);
    expect(lz77Decode(tokens)).toBe(input);
  });

  it("handles empty string", () => {
    expect(lz77Encode("")).toEqual([]);
  });

  it("handles no repetition", () => {
    const input = "ABCD";
    const tokens = lz77Encode(input);
    expect(lz77Decode(tokens)).toBe(input);
  });

  it("handles single character repeated", () => {
    const input = "AAAA";
    const tokens = lz77Encode(input);
    expect(lz77Decode(tokens)).toBe(input);
  });
});

describe("compressionRatio", () => {
  it("calculates ratio for encoded data", () => {
    const input = "ABABABABABABABABAB";
    const encoded = lzwEncode(input);
    const ratio = compressionRatio(input, encoded);
    expect(ratio).toBeLessThan(2);
    expect(ratio).toBeGreaterThan(0);
  });

  it("returns 1 for empty input", () => {
    expect(compressionRatio("", [])).toBe(1);
  });
});
