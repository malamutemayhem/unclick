import { describe, it, expect } from "vitest";
import { base64Encode, base64Decode, hexEncode, hexDecode, rot13, caesarCipher, runLengthEncode, runLengthDecode } from "../string-codec.js";

describe("base64", () => {
  it("encode/decode roundtrip", () => {
    expect(base64Decode(base64Encode("Hello, World!"))).toBe("Hello, World!");
  });

  it("encode known value", () => {
    expect(base64Encode("Hello")).toBe("SGVsbG8=");
  });

  it("handles empty string", () => {
    expect(base64Encode("")).toBe("");
    expect(base64Decode("")).toBe("");
  });
});

describe("hex", () => {
  it("encode/decode roundtrip", () => {
    expect(hexDecode(hexEncode("test"))).toBe("test");
  });

  it("encode known value", () => {
    expect(hexEncode("AB")).toBe("4142");
  });
});

describe("rot13", () => {
  it("encodes and decodes", () => {
    expect(rot13("Hello")).toBe("Uryyb");
    expect(rot13(rot13("Hello"))).toBe("Hello");
  });

  it("preserves non-alpha", () => {
    expect(rot13("123!")).toBe("123!");
  });
});

describe("caesarCipher", () => {
  it("shifts forward", () => {
    expect(caesarCipher("abc", 3)).toBe("def");
  });

  it("wraps around", () => {
    expect(caesarCipher("xyz", 3)).toBe("abc");
  });

  it("negative shift decodes", () => {
    expect(caesarCipher("def", -3)).toBe("abc");
  });
});

describe("runLengthEncode/Decode", () => {
  it("encodes runs", () => {
    expect(runLengthEncode("aaabbc")).toBe("3a2bc");
  });

  it("decode reverses encode", () => {
    const encoded = runLengthEncode("aaabbcccc");
    expect(runLengthDecode(encoded)).toBe("aaabbcccc");
  });

  it("handles single chars", () => {
    expect(runLengthEncode("abc")).toBe("abc");
  });

  it("handles empty", () => {
    expect(runLengthEncode("")).toBe("");
  });
});
