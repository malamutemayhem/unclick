import { describe, it, expect } from "vitest";
import { HuffmanCoding } from "../huffman-coding.js";

describe("HuffmanCoding", () => {
  it("encode and decode roundtrip", () => {
    const text = "abracadabra";
    const { encoded, codes } = HuffmanCoding.encode(text);
    const decoded = HuffmanCoding.decode(encoded, codes);
    expect(decoded).toBe(text);
  });

  it("frequent chars get shorter codes", () => {
    const { codes } = HuffmanCoding.encode("aaaaabc");
    expect(codes.get("a")!.length).toBeLessThanOrEqual(codes.get("b")!.length);
  });

  it("single character text", () => {
    const { encoded, codes } = HuffmanCoding.encode("aaa");
    expect(codes.size).toBe(1);
    const decoded = HuffmanCoding.decode(encoded, codes);
    expect(decoded).toBe("aaa");
  });

  it("two character text", () => {
    const { encoded, codes } = HuffmanCoding.encode("ab");
    expect(codes.size).toBe(2);
    const decoded = HuffmanCoding.decode(encoded, codes);
    expect(decoded).toBe("ab");
  });

  it("compressionRatio is less than 1 for repetitive text", () => {
    const ratio = HuffmanCoding.compressionRatio("aaaaaaaaaa");
    expect(ratio).toBeLessThan(1);
  });

  it("empty text", () => {
    const { encoded, codes } = HuffmanCoding.encode("");
    expect(encoded).toBe("");
    expect(codes.size).toBe(0);
  });

  it("buildTree returns null for empty", () => {
    expect(HuffmanCoding.buildTree("")).toBeNull();
  });
});
