import { describe, it, expect } from "vitest";
import {
  sha256hex,
  encryptCredential,
  decryptCredential,
  readProviderKey,
} from "./chat-crypto";

const API_KEY = "uc_test_key_abcdef0123456789";

describe("sha256hex", () => {
  it("is deterministic and 64 hex chars", () => {
    const a = sha256hex(API_KEY);
    const b = sha256hex(API_KEY);
    expect(a).toBe(b);
    expect(a).toMatch(/^[0-9a-f]{64}$/);
  });

  it("differs for different keys", () => {
    expect(sha256hex(API_KEY)).not.toBe(sha256hex("uc_other"));
  });
});

describe("encrypt/decrypt round trip (owned vault scheme)", () => {
  it("decrypts what it encrypted with the same key", () => {
    const row = encryptCredential(API_KEY, "sk-or-secret-123");
    expect(decryptCredential(API_KEY, row)).toBe("sk-or-secret-123");
  });

  it("produces the four hex columns the vault expects", () => {
    const row = encryptCredential(API_KEY, "x");
    for (const col of ["encryption_iv", "encryption_tag", "encrypted_data", "encryption_salt"] as const) {
      expect(row[col]).toMatch(/^[0-9a-f]+$/);
    }
  });

  it("throws when decrypting with the wrong key (proof of possession)", () => {
    const row = encryptCredential(API_KEY, "sk-or-secret-123");
    expect(() => decryptCredential("uc_wrong_key", row)).toThrow();
  });
});

describe("readProviderKey", () => {
  it("pulls the api_key field from the decrypted JSON payload", () => {
    const row = encryptCredential(API_KEY, JSON.stringify({ api_key: "sk-live-xyz" }));
    expect(readProviderKey(API_KEY, row)).toBe("sk-live-xyz");
  });

  it("falls back to token or key fields", () => {
    const tokenRow = encryptCredential(API_KEY, JSON.stringify({ token: "tok-1" }));
    expect(readProviderKey(API_KEY, tokenRow)).toBe("tok-1");
    const keyRow = encryptCredential(API_KEY, JSON.stringify({ key: "k-2" }));
    expect(readProviderKey(API_KEY, keyRow)).toBe("k-2");
  });

  it("returns null when no usable key field exists", () => {
    const row = encryptCredential(API_KEY, JSON.stringify({ note: "no key here" }));
    expect(readProviderKey(API_KEY, row)).toBeNull();
  });
});
