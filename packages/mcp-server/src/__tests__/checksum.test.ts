import { describe, it, expect } from "vitest";
import { crc32, adler32, fnv1a, djb2, murmurHash3, hexDigest } from "../checksum.js";

describe("crc32", () => {
  it("computes known hash", () => {
    const hash = crc32("hello");
    expect(hash).toBeTypeOf("number");
    expect(hash).toBeGreaterThan(0);
  });

  it("different inputs give different hashes", () => {
    expect(crc32("hello")).not.toBe(crc32("world"));
  });

  it("same input gives same hash", () => {
    expect(crc32("test")).toBe(crc32("test"));
  });
});

describe("adler32", () => {
  it("computes hash", () => {
    expect(adler32("hello")).toBeTypeOf("number");
  });

  it("deterministic", () => {
    expect(adler32("abc")).toBe(adler32("abc"));
  });
});

describe("fnv1a", () => {
  it("computes hash", () => {
    expect(fnv1a("hello")).toBeTypeOf("number");
  });

  it("different for different inputs", () => {
    expect(fnv1a("a")).not.toBe(fnv1a("b"));
  });
});

describe("djb2", () => {
  it("computes hash", () => {
    expect(djb2("hello")).toBeTypeOf("number");
  });

  it("deterministic", () => {
    expect(djb2("test")).toBe(djb2("test"));
  });
});

describe("murmurHash3", () => {
  it("computes hash", () => {
    expect(murmurHash3("hello")).toBeTypeOf("number");
  });

  it("seed changes hash", () => {
    expect(murmurHash3("hello", 0)).not.toBe(murmurHash3("hello", 42));
  });

  it("deterministic with same seed", () => {
    expect(murmurHash3("test", 1)).toBe(murmurHash3("test", 1));
  });
});

describe("hexDigest", () => {
  it("formats as 8-char hex", () => {
    const hex = hexDigest(255);
    expect(hex).toBe("000000ff");
    expect(hex.length).toBe(8);
  });
});
