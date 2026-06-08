import { describe, it, expect } from "vitest";
import { crc32, adler32, fnv1a, djb2, checksumEqual } from "../checksum.js";

describe("checksum", () => {
  it("crc32 produces consistent results", () => {
    expect(crc32("hello")).toBe(crc32("hello"));
    expect(crc32("hello")).not.toBe(crc32("world"));
  });

  it("crc32 produces non-zero for non-empty input", () => {
    expect(crc32("test")).toBeGreaterThan(0);
  });

  it("adler32 produces consistent results", () => {
    expect(adler32("hello")).toBe(adler32("hello"));
    expect(adler32("hello")).not.toBe(adler32("world"));
  });

  it("fnv1a produces consistent results", () => {
    expect(fnv1a("hello")).toBe(fnv1a("hello"));
    expect(fnv1a("hello")).not.toBe(fnv1a("world"));
  });

  it("djb2 produces consistent results", () => {
    expect(djb2("hello")).toBe(djb2("hello"));
    expect(djb2("hello")).not.toBe(djb2("world"));
  });

  it("checksumEqual compares via crc32", () => {
    expect(checksumEqual("abc", "abc")).toBe(true);
    expect(checksumEqual("abc", "xyz")).toBe(false);
  });

  it("different algorithms give different values", () => {
    const input = "test-data";
    const results = [crc32(input), adler32(input), fnv1a(input), djb2(input)];
    const unique = new Set(results);
    expect(unique.size).toBe(4);
  });

  it("handles empty string", () => {
    expect(crc32("")).toBe(0);
    expect(adler32("")).toBe(1);
  });
});
