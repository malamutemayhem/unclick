import { describe, it, expect } from "vitest";
import { encode, decode, decodeToString, isValid, toUpperCase, toLowerCase } from "../hex.js";

describe("hex", () => {
  it("encodes string to hex", () => {
    expect(encode("hello")).toBe("68656c6c6f");
  });

  it("decodes hex to bytes", () => {
    const bytes = decode("68656c6c6f");
    expect(new TextDecoder().decode(bytes)).toBe("hello");
  });

  it("decodeToString shortcut", () => {
    expect(decodeToString("68656c6c6f")).toBe("hello");
  });

  it("roundtrip works", () => {
    const original = "The quick brown fox";
    expect(decodeToString(encode(original))).toBe(original);
  });

  it("encodes Uint8Array", () => {
    const bytes = new Uint8Array([0, 1, 255]);
    expect(encode(bytes)).toBe("0001ff");
  });

  it("isValid checks hex format", () => {
    expect(isValid("abcdef")).toBe(true);
    expect(isValid("ABCDEF")).toBe(true);
    expect(isValid("xyz")).toBe(false);
    expect(isValid("abc")).toBe(false);
  });

  it("case conversion", () => {
    expect(toUpperCase("abcdef")).toBe("ABCDEF");
    expect(toLowerCase("ABCDEF")).toBe("abcdef");
  });

  it("decode throws on odd length", () => {
    expect(() => decode("abc")).toThrow("even length");
  });

  it("handles empty input", () => {
    expect(encode("")).toBe("");
    expect(decodeToString("")).toBe("");
  });
});
