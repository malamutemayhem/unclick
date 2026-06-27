import { describe, it, expect } from "vitest";
import { crc32, crc32Hex, verify } from "../crc32.js";

describe("crc32", () => {
  it("computes known CRC32 for empty string", () => {
    expect(crc32("")).toBe(0);
  });

  it("computes known CRC32 for test string", () => {
    expect(crc32Hex("123456789")).toBe("cbf43926");
  });

  it("different inputs produce different CRCs", () => {
    expect(crc32("hello")).not.toBe(crc32("world"));
  });

  it("same input produces same CRC", () => {
    expect(crc32("test")).toBe(crc32("test"));
  });

  it("works with Uint8Array", () => {
    const bytes = new Uint8Array([0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39]);
    expect(crc32Hex(bytes)).toBe("cbf43926");
  });

  it("verify checks correctness", () => {
    const checksum = crc32("hello");
    expect(verify("hello", checksum)).toBe(true);
    expect(verify("hello", checksum + 1)).toBe(false);
  });

  it("crc32Hex returns 8-char hex string", () => {
    const hex = crc32Hex("abc");
    expect(hex.length).toBe(8);
    expect(/^[0-9a-f]+$/.test(hex)).toBe(true);
  });
});
