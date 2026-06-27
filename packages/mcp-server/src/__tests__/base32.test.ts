import { describe, it, expect } from "vitest";
import { encode, decode, decodeToString, isValid } from "../base32.js";

describe("base32", () => {
  it("encodes string to base32", () => {
    expect(encode("hello")).toBe("NBSWY3DP");
  });

  it("decodes base32 to bytes", () => {
    const bytes = decode("NBSWY3DP");
    expect(new TextDecoder().decode(bytes)).toBe("hello");
  });

  it("decodeToString is a shortcut", () => {
    expect(decodeToString("NBSWY3DP")).toBe("hello");
  });

  it("roundtrip works", () => {
    const original = "The quick brown fox";
    const encoded = encode(original);
    expect(decodeToString(encoded)).toBe(original);
  });

  it("encodes Uint8Array", () => {
    const bytes = new Uint8Array([0, 1, 2, 255]);
    const encoded = encode(bytes);
    const decoded = decode(encoded);
    expect([...decoded]).toEqual([0, 1, 2, 255]);
  });

  it("handles empty input", () => {
    expect(encode("")).toBe("");
    expect(decodeToString("")).toBe("");
  });

  it("isValid checks format", () => {
    expect(isValid("NBSWY3DP")).toBe(true);
    expect(isValid("!!!")).toBe(false);
    expect(isValid("NBSWY3D")).toBe(false);
  });

  it("decode throws on invalid character", () => {
    expect(() => decode("!!!")).toThrow("Invalid base32");
  });
});
