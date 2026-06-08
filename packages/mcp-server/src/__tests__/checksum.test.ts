import { describe, it, expect } from "vitest";
import { crc32, crc32Hex, adler32, fnv1a32, djb2, murmur3 } from "../checksum.js";

describe("checksum", () => {
  describe("crc32", () => {
    it("computes known crc32", () => {
      expect(crc32("hello")).toBe(0x3610A686);
    });

    it("returns 0 for empty input", () => {
      expect(crc32("")).toBe(0);
    });

    it("accepts Uint8Array", () => {
      const bytes = new TextEncoder().encode("hello");
      expect(crc32(bytes)).toBe(crc32("hello"));
    });

    it("different inputs produce different hashes", () => {
      expect(crc32("hello")).not.toBe(crc32("world"));
    });
  });

  describe("crc32Hex", () => {
    it("returns padded hex string", () => {
      const hex = crc32Hex("hello");
      expect(hex).toHaveLength(8);
      expect(hex).toMatch(/^[0-9a-f]{8}$/);
    });
  });

  describe("adler32", () => {
    it("computes known adler32 for Wikipedia", () => {
      expect(adler32("Wikipedia")).toBe(0x11E60398);
    });

    it("handles empty string", () => {
      expect(adler32("")).toBe(1);
    });
  });

  describe("fnv1a32", () => {
    it("produces consistent results", () => {
      expect(fnv1a32("hello")).toBe(fnv1a32("hello"));
    });

    it("different inputs differ", () => {
      expect(fnv1a32("hello")).not.toBe(fnv1a32("world"));
    });
  });

  describe("djb2", () => {
    it("produces consistent results", () => {
      expect(djb2("hello")).toBe(djb2("hello"));
    });

    it("different inputs differ", () => {
      expect(djb2("hello")).not.toBe(djb2("world"));
    });
  });

  describe("murmur3", () => {
    it("produces consistent results", () => {
      expect(murmur3("hello")).toBe(murmur3("hello"));
    });

    it("different seeds produce different results", () => {
      expect(murmur3("hello", 0)).not.toBe(murmur3("hello", 42));
    });

    it("handles empty string", () => {
      expect(murmur3("")).toBe(murmur3(""));
    });

    it("handles strings not aligned to 4 bytes", () => {
      expect(murmur3("a")).toBe(murmur3("a"));
      expect(murmur3("ab")).toBe(murmur3("ab"));
      expect(murmur3("abc")).toBe(murmur3("abc"));
    });
  });
});
