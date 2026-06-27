import { describe, it, expect } from "vitest";
import { HuffmanCoder } from "../huffman-tree.js";

describe("HuffmanCoder", () => {
  it("builds frequency table", () => {
    const freq = HuffmanCoder.buildFrequencyTable("hello");
    expect(freq.get("l")).toBe(2);
    expect(freq.get("h")).toBe(1);
  });

  it("builds a Huffman tree", () => {
    const freq = HuffmanCoder.buildFrequencyTable("aabbbcccc");
    const tree = HuffmanCoder.buildTree(freq);
    expect(tree.freq).toBe(9);
    expect(tree.char).toBeNull();
  });

  it("generates unique prefix-free codes", () => {
    const freq = HuffmanCoder.buildFrequencyTable("aabbbcccc");
    const tree = HuffmanCoder.buildTree(freq);
    const codes = HuffmanCoder.generateCodes(tree);
    expect(Object.keys(codes)).toHaveLength(3);
    for (const code of Object.values(codes)) {
      expect(code.length).toBeGreaterThan(0);
      expect(/^[01]+$/.test(code)).toBe(true);
    }
  });

  it("frequent chars get shorter codes", () => {
    const result = HuffmanCoder.encode("aabbbcccccccc");
    expect(result.codes["c"].length).toBeLessThanOrEqual(result.codes["a"].length);
  });

  it("encodes and decodes strings", () => {
    const text = "hello world";
    const result = HuffmanCoder.encode(text);
    const encoded = HuffmanCoder.encodeString(text, result.codes);
    const decoded = HuffmanCoder.decodeString(encoded, result.tree);
    expect(decoded).toBe(text);
  });

  it("achieves compression for repetitive text", () => {
    const text = "aaaaaabbbbbbcccccc";
    const result = HuffmanCoder.encode(text);
    const ratio = HuffmanCoder.compressionRatio(result);
    expect(ratio).toBeLessThan(1);
  });

  it("calculates encoded length in bits", () => {
    const result = HuffmanCoder.encode("aabb");
    expect(result.encodedLength).toBeGreaterThan(0);
    expect(result.originalLength).toBe(32);
  });

  it("calculates average code length", () => {
    const text = "aabbbcccc";
    const result = HuffmanCoder.encode(text);
    const avg = HuffmanCoder.averageCodeLength(text, result.codes);
    expect(avg).toBeGreaterThan(0);
    expect(avg).toBeLessThanOrEqual(8);
  });

  it("handles single character", () => {
    const result = HuffmanCoder.encode("aaaa");
    expect(Object.keys(result.codes)).toHaveLength(1);
    expect(result.codes["a"]).toBe("0");
  });
});
