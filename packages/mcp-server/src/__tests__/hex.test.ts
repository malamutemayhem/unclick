import { describe, it, expect } from "vitest";
import { encode, decode, encodeBytes, decodeToBytes, isValid, dump } from "../hex.js";

describe("hex", () => {
  it("encode/decode roundtrip", () => {
    expect(decode(encode("hello"))).toBe("hello");
    expect(decode(encode("abc 123"))).toBe("abc 123");
  });

  it("encode produces lowercase hex", () => {
    expect(encode("A")).toBe("41");
    expect(encode("ab")).toBe("6162");
  });

  it("encodeBytes/decodeToBytes roundtrip", () => {
    const bytes = new Uint8Array([0, 127, 255]);
    const hex = encodeBytes(bytes);
    expect(hex).toBe("007fff");
    const back = decodeToBytes(hex);
    expect([...back]).toEqual([0, 127, 255]);
  });

  it("isValid", () => {
    expect(isValid("48656c6c6f")).toBe(true);
    expect(isValid("ABCDEF")).toBe(true);
    expect(isValid("xyz")).toBe(false);
    expect(isValid("abc")).toBe(false);
  });

  it("dump produces hex dump", () => {
    const d = dump("Hello");
    expect(d).toContain("48 65 6c 6c 6f");
    expect(d).toContain("|Hello");
  });

  it("decode handles spaces", () => {
    expect(decode("48 65 6c 6c 6f")).toBe("Hello");
  });
});
