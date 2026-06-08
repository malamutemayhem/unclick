import { describe, it, expect } from "vitest";
import { fnv1a, djb2, crc32, simpleHash, toHex } from "../checksum.js";

describe("checksum", () => {
  it("fnv1a produces consistent hash", () => {
    expect(fnv1a("hello")).toBe(fnv1a("hello"));
    expect(fnv1a("hello")).not.toBe(fnv1a("world"));
  });

  it("fnv1a returns unsigned 32-bit integer", () => {
    const h = fnv1a("test");
    expect(h).toBeGreaterThanOrEqual(0);
    expect(h).toBeLessThanOrEqual(0xFFFFFFFF);
  });

  it("djb2 produces consistent hash", () => {
    expect(djb2("hello")).toBe(djb2("hello"));
    expect(djb2("hello")).not.toBe(djb2("world"));
  });

  it("djb2 returns unsigned 32-bit integer", () => {
    const h = djb2("test");
    expect(h).toBeGreaterThanOrEqual(0);
    expect(h).toBeLessThanOrEqual(0xFFFFFFFF);
  });

  it("crc32 produces consistent hash", () => {
    expect(crc32("hello")).toBe(crc32("hello"));
    expect(crc32("hello")).not.toBe(crc32("world"));
  });

  it("crc32 matches known value", () => {
    expect(crc32("hello")).toBe(0x3610a686);
  });

  it("simpleHash with default seed", () => {
    expect(simpleHash("test")).toBe(simpleHash("test"));
    expect(simpleHash("test")).not.toBe(simpleHash("other"));
  });

  it("simpleHash with different seeds", () => {
    expect(simpleHash("test", 1)).not.toBe(simpleHash("test", 2));
  });

  it("toHex formats as 8 char hex string", () => {
    expect(toHex(255)).toBe("000000ff");
    expect(toHex(0xDEADBEEF)).toBe("deadbeef");
  });

  it("empty string hashing", () => {
    expect(typeof fnv1a("")).toBe("number");
    expect(typeof djb2("")).toBe("number");
    expect(typeof crc32("")).toBe("number");
  });
});
