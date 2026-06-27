import { describe, it, expect } from "vitest";
import { fnv1a, djb2, simpleChecksum, contentId, consistentHash, hashRing } from "../content-hasher.js";

describe("fnv1a", () => {
  it("returns consistent hash", () => {
    expect(fnv1a("hello")).toBe(fnv1a("hello"));
  });
  it("different inputs differ", () => {
    expect(fnv1a("hello")).not.toBe(fnv1a("world"));
  });
  it("returns number", () => {
    expect(typeof fnv1a("test")).toBe("number");
  });
});

describe("djb2", () => {
  it("returns consistent hash", () => {
    expect(djb2("hello")).toBe(djb2("hello"));
  });
  it("different from fnv1a", () => {
    expect(djb2("hello")).not.toBe(fnv1a("hello"));
  });
});

describe("simpleChecksum", () => {
  it("returns 16 char hex string", () => {
    const cs = simpleChecksum("test");
    expect(cs.length).toBe(16);
    expect(/^[0-9a-f]+$/.test(cs)).toBe(true);
  });
  it("consistent", () => {
    expect(simpleChecksum("abc")).toBe(simpleChecksum("abc"));
  });
});

describe("contentId", () => {
  it("starts with cid_", () => {
    expect(contentId("hello").startsWith("cid_")).toBe(true);
  });
  it("consistent", () => {
    expect(contentId("test")).toBe(contentId("test"));
  });
});

describe("consistentHash", () => {
  it("returns value within range", () => {
    const h = consistentHash("key", 10);
    expect(h).toBeGreaterThanOrEqual(0);
    expect(h).toBeLessThan(10);
  });
  it("consistent for same key", () => {
    expect(consistentHash("x", 5)).toBe(consistentHash("x", 5));
  });
});

describe("hashRing", () => {
  it("maps keys to nodes", () => {
    const ring = hashRing(["k1", "k2", "k3"], ["n1", "n2"]);
    expect(ring.size).toBe(3);
    for (const node of ring.values()) {
      expect(["n1", "n2"]).toContain(node);
    }
  });
});
