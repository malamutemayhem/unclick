import { describe, it, expect } from "vitest";
import { crc32, crc32Hex, adler32, fletcher16, djb2, fnv1a, verifyChecksum } from "../checksum.js";

describe("checksum", () => {
  it("crc32 produces consistent output", () => {
    const a = crc32("hello");
    const b = crc32("hello");
    expect(a).toBe(b);
    expect(typeof a).toBe("number");
    expect(a).toBeGreaterThan(0);
  });

  it("crc32 differs for different input", () => {
    expect(crc32("hello")).not.toBe(crc32("world"));
  });

  it("crc32Hex returns hex string", () => {
    const hex = crc32Hex("hello");
    expect(hex).toHaveLength(8);
    expect(/^[0-9a-f]+$/.test(hex)).toBe(true);
  });

  it("adler32 produces consistent output", () => {
    expect(adler32("hello")).toBe(adler32("hello"));
    expect(adler32("hello")).not.toBe(adler32("world"));
  });

  it("fletcher16 produces consistent output", () => {
    expect(fletcher16("hello")).toBe(fletcher16("hello"));
    expect(fletcher16("hello")).not.toBe(fletcher16("world"));
  });

  it("djb2 produces consistent output", () => {
    expect(djb2("hello")).toBe(djb2("hello"));
    expect(djb2("hello")).not.toBe(djb2("world"));
  });

  it("fnv1a produces consistent output", () => {
    expect(fnv1a("hello")).toBe(fnv1a("hello"));
    expect(fnv1a("hello")).not.toBe(fnv1a("world"));
  });

  it("verifyChecksum validates correctly", () => {
    const sum = crc32("test");
    expect(verifyChecksum("test", sum, "crc32")).toBe(true);
    expect(verifyChecksum("test", sum + 1, "crc32")).toBe(false);
  });

  it("verifyChecksum works with all algorithms", () => {
    const algos = ["crc32", "adler32", "fletcher16", "djb2", "fnv1a"] as const;
    for (const algo of algos) {
      const fns: Record<string, (s: string) => number> = { crc32, adler32, fletcher16, djb2, fnv1a };
      const sum = fns[algo]("data");
      expect(verifyChecksum("data", sum, algo)).toBe(true);
    }
  });
});
