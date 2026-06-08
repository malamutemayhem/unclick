import { describe, it, expect } from "vitest";
import { encode, decode, encodeUrlSafe, decodeUrlSafe, isBase64, isBase64Url, encodeBytes, decodeToBytes } from "../base64.js";

describe("base64", () => {
  describe("encode / decode", () => {
    it("round-trips basic string", () => {
      expect(decode(encode("hello"))).toBe("hello");
    });
    it("encodes to known value", () => {
      expect(encode("hello")).toBe("aGVsbG8=");
    });
    it("handles empty string", () => {
      expect(encode("")).toBe("");
      expect(decode("")).toBe("");
    });
    it("handles unicode", () => {
      expect(decode(encode("hello world"))).toBe("hello world");
    });
    it("handles padding", () => {
      expect(encode("a")).toBe("YQ==");
      expect(encode("ab")).toBe("YWI=");
      expect(encode("abc")).toBe("YWJj");
    });
  });

  describe("encodeBytes / decodeToBytes", () => {
    it("round-trips bytes", () => {
      const input = new Uint8Array([0, 1, 2, 255]);
      const encoded = encodeBytes(input);
      const decoded = decodeToBytes(encoded);
      expect(Array.from(decoded)).toEqual(Array.from(input));
    });
  });

  describe("URL-safe encoding", () => {
    it("round-trips", () => {
      const input = "hello+world/test";
      expect(decodeUrlSafe(encodeUrlSafe(input))).toBe(input);
    });
    it("removes padding", () => {
      expect(encodeUrlSafe("a")).not.toContain("=");
    });
    it("uses - and _ instead of + and /", () => {
      const encoded = encodeUrlSafe("test?data=value");
      expect(encoded).not.toContain("+");
      expect(encoded).not.toContain("/");
    });
  });

  describe("isBase64", () => {
    it("validates correct base64", () => { expect(isBase64("aGVsbG8=")).toBe(true); });
    it("rejects invalid", () => { expect(isBase64("not base64!")).toBe(false); });
    it("validates no padding", () => { expect(isBase64("YWJj")).toBe(true); });
  });

  describe("isBase64Url", () => {
    it("validates url-safe", () => { expect(isBase64Url("aGVsbG8")).toBe(true); });
    it("rejects +", () => { expect(isBase64Url("a+b")).toBe(false); });
  });
});
