import { describe, it, expect } from "vitest";
import { LZWCompress } from "../lzw-compress.js";

describe("LZWCompress", () => {
  it("compress and decompress roundtrip", () => {
    const input = "TOBEORNOTTOBEORTOBEORNOT";
    const compressed = LZWCompress.compress(input);
    const decompressed = LZWCompress.decompress(compressed);
    expect(decompressed).toBe(input);
  });

  it("compressed is shorter for repetitive input", () => {
    const input = "ABABABABABABABABABABABAB";
    const compressed = LZWCompress.compress(input);
    expect(compressed.length).toBeLessThan(input.length);
  });

  it("handles single character", () => {
    const compressed = LZWCompress.compress("A");
    expect(LZWCompress.decompress(compressed)).toBe("A");
  });

  it("handles empty input", () => {
    expect(LZWCompress.compress("")).toEqual([]);
    expect(LZWCompress.decompress([])).toBe("");
  });

  it("compressionRatio returns ratio", () => {
    const ratio = LZWCompress.compressionRatio("AAAAAAAAAA");
    expect(ratio).toBeLessThan(1);
  });

  it("dictionarySize grows with input", () => {
    const small = LZWCompress.dictionarySize("AB");
    const large = LZWCompress.dictionarySize("ABCDEFGHIJKLMNOP");
    expect(large).toBeGreaterThan(small);
  });

  it("handles binary-like strings", () => {
    const input = "0101010101010101";
    const compressed = LZWCompress.compress(input);
    expect(LZWCompress.decompress(compressed)).toBe(input);
  });
});
