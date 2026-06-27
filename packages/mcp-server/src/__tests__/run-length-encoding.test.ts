import { describe, it, expect } from "vitest";
import {
  encode, decode, encodeBytes, decodeBytes, compressionRatio,
} from "../run-length-encoding.js";

describe("encode", () => {
  it("encodes repeated characters", () => {
    expect(encode("aaabbbcc")).toBe("3a3b2c");
  });

  it("handles single characters without count", () => {
    expect(encode("abcd")).toBe("abcd");
  });

  it("handles empty string", () => {
    expect(encode("")).toBe("");
  });

  it("handles single character", () => {
    expect(encode("a")).toBe("a");
  });

  it("handles long runs", () => {
    expect(encode("a".repeat(100))).toBe("100a");
  });
});

describe("decode", () => {
  it("decodes encoded string", () => {
    expect(decode("3a3b2c")).toBe("aaabbbcc");
  });

  it("handles single characters without count", () => {
    expect(decode("abcd")).toBe("abcd");
  });

  it("handles empty string", () => {
    expect(decode("")).toBe("");
  });

  it("roundtrips with encode", () => {
    const input = "aaabbccccddddde";
    expect(decode(encode(input))).toBe(input);
  });
});

describe("encodeBytes / decodeBytes", () => {
  it("roundtrips byte data", () => {
    const data = new Uint8Array([1, 1, 1, 2, 2, 3]);
    const encoded = encodeBytes(data);
    const decoded = decodeBytes(encoded);
    expect(decoded).toEqual(data);
  });

  it("handles empty array", () => {
    const data = new Uint8Array(0);
    expect(encodeBytes(data)).toEqual(new Uint8Array(0));
  });
});

describe("compressionRatio", () => {
  it("calculates ratio", () => {
    const original = "aaaaaaaaaa";
    const encoded = encode(original);
    const ratio = compressionRatio(original, encoded);
    expect(ratio).toBeLessThan(1);
  });

  it("returns 1 for empty string", () => {
    expect(compressionRatio("", "")).toBe(1);
  });
});
