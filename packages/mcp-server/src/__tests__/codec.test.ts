import { describe, it, expect } from "vitest";
import { toBase64, fromBase64, toHex, fromHex, toUrlSafeBase64, fromUrlSafeBase64, bytesToHex, hexToBytes } from "../codec.js";

describe("base64", () => {
  it("encodes and decodes", () => {
    expect(fromBase64(toBase64("Hello World"))).toBe("Hello World");
  });

  it("handles empty string", () => {
    expect(fromBase64(toBase64(""))).toBe("");
  });

  it("handles unicode", () => {
    expect(fromBase64(toBase64("cafe"))).toBe("cafe");
  });
});

describe("hex", () => {
  it("encodes and decodes", () => {
    expect(fromHex(toHex("ABC"))).toBe("ABC");
  });

  it("produces correct hex", () => {
    expect(toHex("A")).toBe("41");
  });
});

describe("url-safe base64", () => {
  it("roundtrips", () => {
    expect(fromUrlSafeBase64(toUrlSafeBase64("test+data/here"))).toBe("test+data/here");
  });

  it("has no padding or unsafe chars", () => {
    const encoded = toUrlSafeBase64("test");
    expect(encoded).not.toContain("+");
    expect(encoded).not.toContain("/");
    expect(encoded).not.toContain("=");
  });
});

describe("bytesToHex/hexToBytes", () => {
  it("roundtrips", () => {
    const bytes = new Uint8Array([0, 127, 255]);
    expect(hexToBytes(bytesToHex(bytes))).toEqual(bytes);
  });
});
