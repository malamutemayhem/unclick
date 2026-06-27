import { describe, it, expect } from "vitest";
import { randomBytes, randomHex, constantTimeEqual, bytesToHex, hexToBytes, xorBytes, generateNonce, timeSafeCompare } from "../crypto-utils.js";

describe("crypto-utils", () => {
  describe("randomBytes", () => {
    it("returns correct length", () => {
      expect(randomBytes(16).length).toBe(16);
    });
    it("returns different values", () => {
      const a = randomBytes(16);
      const b = randomBytes(16);
      expect(a).not.toEqual(b);
    });
  });

  describe("randomHex", () => {
    it("returns correct length", () => {
      expect(randomHex(32)).toHaveLength(32);
    });
    it("is hex string", () => {
      expect(randomHex(16)).toMatch(/^[0-9a-f]+$/);
    });
  });

  describe("constantTimeEqual", () => {
    it("returns true for equal strings", () => {
      expect(constantTimeEqual("abc", "abc")).toBe(true);
    });
    it("returns false for different strings", () => {
      expect(constantTimeEqual("abc", "abd")).toBe(false);
    });
    it("returns false for different lengths", () => {
      expect(constantTimeEqual("ab", "abc")).toBe(false);
    });
  });

  describe("bytesToHex / hexToBytes", () => {
    it("roundtrips", () => {
      const bytes = new Uint8Array([0, 127, 255]);
      expect(hexToBytes(bytesToHex(bytes))).toEqual(bytes);
    });
    it("bytesToHex formats correctly", () => {
      expect(bytesToHex(new Uint8Array([0, 15, 255]))).toBe("000fff");
    });
  });

  describe("xorBytes", () => {
    it("XORs two byte arrays", () => {
      const a = new Uint8Array([0xff, 0x00, 0xaa]);
      const b = new Uint8Array([0x0f, 0xf0, 0x55]);
      expect(xorBytes(a, b)).toEqual(new Uint8Array([0xf0, 0xf0, 0xff]));
    });
    it("handles different lengths (uses shorter)", () => {
      expect(xorBytes(new Uint8Array([1, 2]), new Uint8Array([3]))).toEqual(new Uint8Array([2]));
    });
  });

  describe("generateNonce", () => {
    it("generates hex string", () => {
      expect(generateNonce()).toMatch(/^[0-9a-f]+$/);
    });
    it("custom length", () => {
      expect(generateNonce(32)).toHaveLength(32);
    });
  });

  describe("timeSafeCompare", () => {
    it("returns true for equal arrays", () => {
      const a = new Uint8Array([1, 2, 3]);
      expect(timeSafeCompare(a, new Uint8Array([1, 2, 3]))).toBe(true);
    });
    it("returns false for different arrays", () => {
      expect(timeSafeCompare(new Uint8Array([1]), new Uint8Array([2]))).toBe(false);
    });
    it("returns false for different lengths", () => {
      expect(timeSafeCompare(new Uint8Array([1, 2]), new Uint8Array([1]))).toBe(false);
    });
  });
});
