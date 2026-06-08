import { describe, it, expect } from "vitest";
import { encode, decode, encodeUrl, decodeUrl, isBase64, isBase64Url, safeDecode } from "../base64.js";

describe("base64", () => {
  it("encode/decode round-trips", () => {
    expect(decode(encode("hello world"))).toBe("hello world");
  });

  it("encodes to standard base64", () => {
    expect(encode("hello")).toBe("aGVsbG8=");
  });

  it("handles unicode", () => {
    const input = "Hello \u{1F600}";
    expect(decode(encode(input))).toBe(input);
  });
});

describe("base64url", () => {
  it("encodeUrl/decodeUrl round-trips", () => {
    expect(decodeUrl(encodeUrl("hello world"))).toBe("hello world");
  });

  it("produces url-safe output", () => {
    const encoded = encodeUrl("subjects?_d=1&a=2");
    expect(encoded).not.toMatch(/[+/=]/);
  });
});

describe("isBase64", () => {
  it("detects valid base64", () => {
    expect(isBase64("aGVsbG8=")).toBe(true);
    expect(isBase64("YQ==")).toBe(true);
  });

  it("rejects invalid base64", () => {
    expect(isBase64("")).toBe(false);
    expect(isBase64("not valid!!!")).toBe(false);
  });
});

describe("isBase64Url", () => {
  it("detects valid base64url", () => {
    expect(isBase64Url("aGVsbG8")).toBe(true);
    expect(isBase64Url("abc_def-ghi")).toBe(true);
  });

  it("rejects standard base64 padding", () => {
    expect(isBase64Url("aGVsbG8=")).toBe(false);
  });
});

describe("safeDecode", () => {
  it("decodes valid input", () => {
    expect(safeDecode("aGVsbG8=")).toBe("hello");
  });

  it("returns undefined for garbage", () => {
    expect(safeDecode("")).toBe("");
  });
});
