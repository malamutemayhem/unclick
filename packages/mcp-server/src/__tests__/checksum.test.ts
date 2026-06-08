import { describe, it, expect } from "vitest";
import { crc32, adler32, fletcher16, djb2, fnv1a, simpleHash } from "../checksum.js";

describe("crc32", () => {
  it("computes consistent hash", () => {
    expect(crc32("hello")).toBe(crc32("hello"));
  });

  it("different inputs produce different hashes", () => {
    expect(crc32("hello")).not.toBe(crc32("world"));
  });

  it("empty string has known value", () => {
    expect(crc32("")).toBe(0);
  });

  it("returns positive number", () => {
    expect(crc32("test")).toBeGreaterThanOrEqual(0);
  });
});

describe("adler32", () => {
  it("computes consistent hash", () => {
    expect(adler32("hello")).toBe(adler32("hello"));
  });

  it("different inputs differ", () => {
    expect(adler32("foo")).not.toBe(adler32("bar"));
  });

  it("returns positive number", () => {
    expect(adler32("test")).toBeGreaterThan(0);
  });
});

describe("fletcher16", () => {
  it("computes consistent hash", () => {
    expect(fletcher16("test")).toBe(fletcher16("test"));
  });

  it("different inputs differ", () => {
    expect(fletcher16("abc")).not.toBe(fletcher16("xyz"));
  });
});

describe("djb2", () => {
  it("computes consistent hash", () => {
    expect(djb2("hello")).toBe(djb2("hello"));
  });

  it("returns a number", () => {
    expect(typeof djb2("test")).toBe("number");
  });
});

describe("fnv1a", () => {
  it("computes consistent hash", () => {
    expect(fnv1a("hello")).toBe(fnv1a("hello"));
  });

  it("different inputs differ", () => {
    expect(fnv1a("hello")).not.toBe(fnv1a("world"));
  });
});

describe("simpleHash", () => {
  it("maps to range", () => {
    const h = simpleHash("test", 100);
    expect(h).toBeGreaterThanOrEqual(0);
    expect(h).toBeLessThan(100);
  });

  it("is consistent", () => {
    expect(simpleHash("key", 50)).toBe(simpleHash("key", 50));
  });
});
