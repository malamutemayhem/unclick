import { describe, it, expect } from "vitest";
import { encode, decode, encodeUrlSafe, decodeUrlSafe, isValid } from "../base64.js";

describe("encode", () => {
  it("encodes empty string", () => {
    expect(encode("")).toBe("");
  });

  it("encodes hello", () => {
    expect(encode("Hello")).toBe("SGVsbG8=");
  });

  it("encodes with padding", () => {
    expect(encode("a")).toBe("YQ==");
    expect(encode("ab")).toBe("YWI=");
    expect(encode("abc")).toBe("YWJj");
  });
});

describe("decode", () => {
  it("decodes empty", () => {
    expect(decode("")).toBe("");
  });

  it("decodes hello", () => {
    expect(decode("SGVsbG8=")).toBe("Hello");
  });

  it("roundtrips", () => {
    const original = "The quick brown fox jumps over the lazy dog";
    expect(decode(encode(original))).toBe(original);
  });
});

describe("encodeUrlSafe", () => {
  it("uses url-safe characters", () => {
    const result = encodeUrlSafe("subjects?_d");
    expect(result).not.toContain("+");
    expect(result).not.toContain("/");
    expect(result).not.toContain("=");
  });
});

describe("decodeUrlSafe", () => {
  it("roundtrips with encodeUrlSafe", () => {
    const original = "hello+world/test=";
    expect(decodeUrlSafe(encodeUrlSafe(original))).toBe(original);
  });
});

describe("isValid", () => {
  it("validates correct base64", () => {
    expect(isValid("SGVsbG8=")).toBe(true);
    expect(isValid("YWJj")).toBe(true);
  });

  it("rejects invalid base64", () => {
    expect(isValid("not valid!")).toBe(false);
    expect(isValid("abc")).toBe(false);
  });
});
