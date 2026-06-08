import { describe, it, expect } from "vitest";
import { encode, decode, decodeToString, encodeUrlSafe, decodeUrlSafe } from "../base64.js";

describe("base64", () => {
  it("encodes a string", () => {
    expect(encode("Hello")).toBe("SGVsbG8=");
  });

  it("encodes empty string", () => {
    expect(encode("")).toBe("");
  });

  it("encodes Uint8Array", () => {
    const bytes = new Uint8Array([72, 101, 108, 108, 111]);
    expect(encode(bytes)).toBe("SGVsbG8=");
  });

  it("decodes to Uint8Array", () => {
    const bytes = decode("SGVsbG8=");
    expect([...bytes]).toEqual([72, 101, 108, 108, 111]);
  });

  it("decodeToString returns string", () => {
    expect(decodeToString("SGVsbG8=")).toBe("Hello");
  });

  it("roundtrips various strings", () => {
    const cases = ["", "a", "ab", "abc", "Hello, World!", "The quick brown fox"];
    for (const s of cases) {
      expect(decodeToString(encode(s))).toBe(s);
    }
  });

  it("handles padding correctly", () => {
    expect(encode("a")).toBe("YQ==");
    expect(encode("ab")).toBe("YWI=");
    expect(encode("abc")).toBe("YWJj");
  });

  it("url-safe encode removes padding and swaps chars", () => {
    const encoded = encodeUrlSafe("Hello?World>");
    expect(encoded).not.toContain("+");
    expect(encoded).not.toContain("/");
    expect(encoded).not.toContain("=");
  });

  it("url-safe roundtrips", () => {
    const input = "Hello?World>foo+bar";
    const encoded = encodeUrlSafe(input);
    const decoded = new TextDecoder().decode(decodeUrlSafe(encoded));
    expect(decoded).toBe(input);
  });
});
