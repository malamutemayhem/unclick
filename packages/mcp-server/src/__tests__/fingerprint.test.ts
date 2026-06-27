import { describe, it, expect } from "vitest";
import { fingerprint, fingerprintArray, isSameFingerprint } from "../fingerprint.js";

describe("fingerprint", () => {
  it("same object produces same fingerprint", () => {
    expect(fingerprint({ a: 1, b: 2 })).toBe(fingerprint({ a: 1, b: 2 }));
  });

  it("key order does not matter", () => {
    expect(fingerprint({ b: 2, a: 1 })).toBe(fingerprint({ a: 1, b: 2 }));
  });

  it("different objects produce different fingerprints", () => {
    expect(fingerprint({ a: 1 })).not.toBe(fingerprint({ a: 2 }));
  });

  it("handles primitives", () => {
    expect(fingerprint("hello")).toBe(fingerprint("hello"));
    expect(fingerprint(42)).toBe(fingerprint(42));
    expect(fingerprint(null)).toBe(fingerprint(null));
  });

  it("handles nested objects", () => {
    const obj = { a: { b: { c: 1 } } };
    expect(fingerprint(obj)).toBe(fingerprint({ a: { b: { c: 1 } } }));
  });

  it("handles arrays", () => {
    expect(fingerprint([1, 2, 3])).toBe(fingerprint([1, 2, 3]));
    expect(fingerprint([1, 2])).not.toBe(fingerprint([2, 1]));
  });

  it("fingerprintArray hashes array of items", () => {
    const fp = fingerprintArray([{ a: 1 }, { b: 2 }]);
    expect(typeof fp).toBe("string");
    expect(fp.length).toBeGreaterThan(0);
  });

  it("isSameFingerprint compares", () => {
    expect(isSameFingerprint({ x: 1 }, { x: 1 })).toBe(true);
    expect(isSameFingerprint({ x: 1 }, { x: 2 })).toBe(false);
  });
});
