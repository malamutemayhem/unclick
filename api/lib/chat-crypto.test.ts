import { describe, it, expect } from "vitest";
import {
  sha256hex,
  hashesEqual,
  encryptCredential,
  decryptCredential,
  readProviderKey,
  encryptForAccount,
  decryptForAccount,
  readProviderKeyForAccount,
} from "./chat-crypto";

const API_KEY = "uc_test_key_abcdef0123456789";

describe("sha256hex", () => {
  it("is deterministic and 64 hex chars", () => {
    const a = sha256hex(API_KEY);
    expect(a).toBe(sha256hex(API_KEY));
    expect(a).toMatch(/^[0-9a-f]{64}$/);
  });

  it("differs for different keys", () => {
    expect(sha256hex(API_KEY)).not.toBe(sha256hex("uc_other"));
  });
});

describe("hashesEqual (constant-time)", () => {
  it("matches identical hashes", () => {
    const h = sha256hex(API_KEY);
    expect(hashesEqual(h, h)).toBe(true);
  });

  it("rejects different hashes and mismatched lengths", () => {
    expect(hashesEqual(sha256hex(API_KEY), sha256hex("uc_other"))).toBe(false);
    expect(hashesEqual("abcd", "abcdef")).toBe(false);
    expect(hashesEqual("", "abcd")).toBe(false);
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

  it("throws a generic sanitized error with the wrong key (no oracle, proof of possession)", () => {
    const row = encryptCredential(API_KEY, "sk-or-secret-123");
    expect(() => decryptCredential("uc_wrong_key", row)).toThrow("Decryption failed");
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

  it("ignores a crafted __proto__ payload and never pollutes the prototype", () => {
    const row = encryptCredential(
      API_KEY,
      JSON.stringify({ __proto__: { api_key: "evil" }, note: "x" }),
    );
    expect(readProviderKey(API_KEY, row)).toBeNull();
    expect(({} as Record<string, unknown>).api_key).toBeUndefined();
  });

  it("ignores a non-allowlisted requested field and uses safe synonyms", () => {
    const row = encryptCredential(API_KEY, JSON.stringify({ api_key: "sk-ok" }));
    expect(readProviderKey(API_KEY, row, "__proto__")).toBe("sk-ok");
  });
});

describe("server scheme (account-lane bound)", () => {
  const SECRET = "stable-server-secret-never-rotated";
  const LANE = "lane_hash_abc";

  it("round-trips a full credential payload via encrypt/decryptForAccount", () => {
    const payload = JSON.stringify({ access_token: "at-1", refresh_token: "rt-1", tenant_id: "t-9" });
    const row = encryptForAccount(SECRET, LANE, payload);
    expect(decryptForAccount(SECRET, LANE, row)).toBe(payload);
    expect(JSON.parse(decryptForAccount(SECRET, LANE, row))).toEqual({
      access_token: "at-1",
      refresh_token: "rt-1",
      tenant_id: "t-9",
    });
  });

  it("is bound to the lane: a different lane fails the GCM auth tag", () => {
    const row = encryptForAccount(SECRET, LANE, "secret-payload");
    expect(() => decryptForAccount(SECRET, "lane_hash_other", row)).toThrow("Decryption failed");
  });

  it("is bound to the secret: a different secret fails the GCM auth tag", () => {
    const row = encryptForAccount(SECRET, LANE, "secret-payload");
    expect(() => decryptForAccount("wrong-secret", LANE, row)).toThrow("Decryption failed");
  });

  it("readProviderKeyForAccount pulls an allowlisted field from a server row", () => {
    const row = encryptForAccount(SECRET, LANE, JSON.stringify({ api_key: "sk-live-zzz" }));
    expect(readProviderKeyForAccount(SECRET, LANE, row)).toBe("sk-live-zzz");
  });
});
