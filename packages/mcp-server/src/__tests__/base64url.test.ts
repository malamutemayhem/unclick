import { describe, it, expect } from "vitest";
import { encode, decode, encodeUrl, decodeUrlAlt, encodeBytes, decodeToBytes } from "../base64url.js";

describe("base64", () => {
  it("encode/decode round-trip", () => {
    expect(decode(encode("Hello, World!"))).toBe("Hello, World!");
  });

  it("encodes empty string", () => {
    expect(encode("")).toBe("");
    expect(decode("")).toBe("");
  });

  it("known encoding", () => {
    expect(encode("Man")).toBe("TWFu");
    expect(encode("Ma")).toBe("TWE=");
    expect(encode("M")).toBe("TQ==");
  });

  it("encodeUrl produces url-safe output", () => {
    const encoded = encodeUrl("subjects?_d");
    expect(encoded).not.toContain("+");
    expect(encoded).not.toContain("/");
    expect(encoded).not.toContain("=");
  });

  it("decodeUrlAlt round-trips with encodeUrl", () => {
    const input = "Hello, World! Special chars: +/=";
    expect(decodeUrlAlt(encodeUrl(input))).toBe(input);
  });

  it("encodeBytes/decodeToBytes round-trip", () => {
    const bytes = new Uint8Array([0, 1, 127, 128, 255]);
    const encoded = encodeBytes(bytes);
    const decoded = decodeToBytes(encoded);
    expect([...decoded]).toEqual([...bytes]);
  });

  it("handles unicode", () => {
    const input = "Hello! Special chars: +/=";
    expect(decode(encode(input))).toBe(input);
  });
});
