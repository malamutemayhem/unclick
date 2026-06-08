import { describe, it, expect } from "vitest";
import { encode, decode, buildTree, buildCodeTable } from "../huffman.js";

describe("huffman", () => {
  it("encode and decode roundtrip", () => {
    const text = "hello world";
    const { bits, tree } = encode(text);
    expect(decode(bits, tree)).toBe(text);
  });

  it("compresses repeated chars", () => {
    const text = "aaaaaabbbbcc";
    const { bits } = encode(text);
    expect(bits.length).toBeLessThan(text.length * 8);
  });

  it("single char text", () => {
    const { bits, tree } = encode("aaa");
    expect(decode(bits, tree)).toBe("aaa");
  });

  it("empty text", () => {
    const { bits, tree } = encode("");
    expect(bits).toBe("");
    expect(tree).toBeNull();
  });

  it("buildCodeTable assigns unique codes", () => {
    const tree = buildTree("abcabc");
    const codes = buildCodeTable(tree);
    expect(codes.size).toBe(3);
    const values = [...codes.values()];
    expect(new Set(values).size).toBe(3);
  });

  it("two char text", () => {
    const { bits, tree } = encode("ab");
    expect(decode(bits, tree)).toBe("ab");
  });

  it("longer text roundtrip", () => {
    const text = "the quick brown fox jumps over the lazy dog";
    const { bits, tree } = encode(text);
    expect(decode(bits, tree)).toBe(text);
  });
});
