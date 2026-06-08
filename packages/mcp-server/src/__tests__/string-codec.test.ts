import { describe, it, expect } from "vitest";
import { rot13, caesar, atbash, reverseString, xorEncode, xorDecode, toCharCodes, fromCharCodes } from "../string-codec.js";

describe("string-codec", () => {
  it("rot13 roundtrip", () => {
    expect(rot13(rot13("Hello World"))).toBe("Hello World");
  });

  it("rot13 transforms", () => {
    expect(rot13("ABC")).toBe("NOP");
    expect(rot13("abc")).toBe("nop");
  });

  it("caesar shift and unshift", () => {
    expect(caesar("ABC", 3)).toBe("DEF");
    expect(caesar("DEF", -3)).toBe("ABC");
  });

  it("caesar wraps around", () => {
    expect(caesar("XYZ", 3)).toBe("ABC");
  });

  it("atbash roundtrip", () => {
    expect(atbash(atbash("Hello"))).toBe("Hello");
  });

  it("atbash transforms", () => {
    expect(atbash("ABC")).toBe("ZYX");
  });

  it("reverseString", () => {
    expect(reverseString("hello")).toBe("olleh");
    expect(reverseString("")).toBe("");
  });

  it("xor encode/decode roundtrip", () => {
    const encoded = xorEncode("hello", "key");
    expect(xorDecode(encoded, "key")).toBe("hello");
  });

  it("toCharCodes and fromCharCodes roundtrip", () => {
    const codes = toCharCodes("ABC");
    expect(codes).toEqual([65, 66, 67]);
    expect(fromCharCodes(codes)).toBe("ABC");
  });
});
