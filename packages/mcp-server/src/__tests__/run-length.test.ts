import { describe, it, expect } from "vitest";
import { encode, decode, encodeString, decodeString } from "../run-length.js";

describe("run-length", () => {
  it("encodes array of values", () => {
    expect(encode([1, 1, 2, 3, 3, 3])).toEqual([
      { value: 1, count: 2 },
      { value: 2, count: 1 },
      { value: 3, count: 3 },
    ]);
  });

  it("decodes back to original", () => {
    const original = [1, 1, 2, 3, 3, 3];
    expect(decode(encode(original))).toEqual(original);
  });

  it("handles empty array", () => {
    expect(encode([])).toEqual([]);
    expect(decode([])).toEqual([]);
  });

  it("single element", () => {
    expect(encode(["a"])).toEqual([{ value: "a", count: 1 }]);
  });

  it("encodeString compresses repeated chars", () => {
    expect(encodeString("aaabbc")).toBe("3a2bc");
  });

  it("decodeString expands back", () => {
    expect(decodeString("3a2bc")).toBe("aaabbc");
  });

  it("string roundtrip", () => {
    const input = "aaaaaabbccccd";
    expect(decodeString(encodeString(input))).toBe(input);
  });

  it("encodeString with no repeats", () => {
    expect(encodeString("abc")).toBe("abc");
  });
});
