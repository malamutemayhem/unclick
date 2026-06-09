import { describe, it, expect } from "vitest";
import { hashBytes, hashString, hashHex, hmac, hmacHex, verify, deriveKey } from "../hmac-sim.js";

describe("hashBytes", () => {
  it("returns 16-byte hash", () => {
    const result = hashBytes(new Uint8Array([1, 2, 3]));
    expect(result.length).toBe(16);
  });

  it("same input produces same hash", () => {
    const a = hashBytes(new Uint8Array([1, 2, 3]));
    const b = hashBytes(new Uint8Array([1, 2, 3]));
    expect(a).toEqual(b);
  });

  it("different input produces different hash", () => {
    const a = hashBytes(new Uint8Array([1, 2, 3]));
    const b = hashBytes(new Uint8Array([4, 5, 6]));
    expect(a).not.toEqual(b);
  });
});

describe("hashString", () => {
  it("hashes string to bytes", () => {
    const result = hashString("hello");
    expect(result.length).toBe(16);
  });
});

describe("hashHex", () => {
  it("returns hex string", () => {
    const result = hashHex(new Uint8Array([1, 2, 3]));
    expect(result).toMatch(/^[0-9a-f]{32}$/);
  });
});

describe("hmac", () => {
  it("produces consistent output", () => {
    const key = new Uint8Array([1, 2, 3, 4]);
    const msg = new Uint8Array([5, 6, 7, 8]);
    const a = hmac(key, msg);
    const b = hmac(key, msg);
    expect(a).toEqual(b);
  });

  it("different keys produce different macs", () => {
    const msg = new Uint8Array([1, 2, 3]);
    const a = hmac(new Uint8Array([1]), msg);
    const b = hmac(new Uint8Array([2]), msg);
    expect(a).not.toEqual(b);
  });

  it("different messages produce different macs", () => {
    const key = new Uint8Array([1, 2, 3]);
    const a = hmac(key, new Uint8Array([1]));
    const b = hmac(key, new Uint8Array([2]));
    expect(a).not.toEqual(b);
  });
});

describe("hmacHex", () => {
  it("returns hex string", () => {
    const result = hmacHex(new Uint8Array([1]), new Uint8Array([2]));
    expect(result).toMatch(/^[0-9a-f]{32}$/);
  });
});

describe("verify", () => {
  it("returns true for valid mac", () => {
    const key = new Uint8Array([1, 2, 3]);
    const msg = new Uint8Array([4, 5, 6]);
    const mac = hmac(key, msg);
    expect(verify(key, msg, mac)).toBe(true);
  });

  it("returns false for tampered message", () => {
    const key = new Uint8Array([1, 2, 3]);
    const mac = hmac(key, new Uint8Array([4, 5, 6]));
    expect(verify(key, new Uint8Array([4, 5, 7]), mac)).toBe(false);
  });

  it("returns false for wrong key", () => {
    const msg = new Uint8Array([1, 2, 3]);
    const mac = hmac(new Uint8Array([1]), msg);
    expect(verify(new Uint8Array([2]), msg, mac)).toBe(false);
  });
});

describe("deriveKey", () => {
  it("produces consistent output", () => {
    const pw = new Uint8Array([1, 2, 3]);
    const salt = new Uint8Array([4, 5, 6]);
    const a = deriveKey(pw, salt, 10);
    const b = deriveKey(pw, salt, 10);
    expect(a).toEqual(b);
  });

  it("different salts produce different keys", () => {
    const pw = new Uint8Array([1, 2, 3]);
    const a = deriveKey(pw, new Uint8Array([1]), 10);
    const b = deriveKey(pw, new Uint8Array([2]), 10);
    expect(a).not.toEqual(b);
  });
});
