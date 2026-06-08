import { describe, expect, it } from "vitest";

import { encrypt, decrypt, hashKey, hashKeyFull } from "../keychain-crypto.js";

const TEST_API_KEY = "uk_test_abc123def456";

describe("hashKey", () => {
  it("returns first 12 hex characters of SHA-256", () => {
    const result = hashKey(TEST_API_KEY);
    expect(result).toHaveLength(12);
    expect(result).toMatch(/^[a-f0-9]{12}$/);
  });

  it("is deterministic", () => {
    expect(hashKey(TEST_API_KEY)).toBe(hashKey(TEST_API_KEY));
  });

  it("differs for different keys", () => {
    expect(hashKey("key-a")).not.toBe(hashKey("key-b"));
  });

  it("is a prefix of hashKeyFull", () => {
    expect(hashKeyFull(TEST_API_KEY).startsWith(hashKey(TEST_API_KEY))).toBe(true);
  });
});

describe("hashKeyFull", () => {
  it("returns full 64-character SHA-256 hex", () => {
    const result = hashKeyFull(TEST_API_KEY);
    expect(result).toHaveLength(64);
    expect(result).toMatch(/^[a-f0-9]{64}$/);
  });

  it("is deterministic", () => {
    expect(hashKeyFull(TEST_API_KEY)).toBe(hashKeyFull(TEST_API_KEY));
  });

  it("differs for different keys", () => {
    expect(hashKeyFull("key-a")).not.toBe(hashKeyFull("key-b"));
  });
});

describe("encrypt + decrypt roundtrip", () => {
  it("roundtrips a simple string", () => {
    const plaintext = "my-secret-credential-value";
    const enc = encrypt(plaintext, TEST_API_KEY);
    const decrypted = decrypt(enc.encrypted_value, enc.iv, enc.auth_tag, TEST_API_KEY);
    expect(decrypted).toBe(plaintext);
  });

  it("roundtrips an empty string", () => {
    const enc = encrypt("", TEST_API_KEY);
    const decrypted = decrypt(enc.encrypted_value, enc.iv, enc.auth_tag, TEST_API_KEY);
    expect(decrypted).toBe("");
  });

  it("roundtrips unicode content", () => {
    const plaintext = "credentials with unicode chars and emoji 🔑";
    const enc = encrypt(plaintext, TEST_API_KEY);
    const decrypted = decrypt(enc.encrypted_value, enc.iv, enc.auth_tag, TEST_API_KEY);
    expect(decrypted).toBe(plaintext);
  });

  it("roundtrips a long credential string", () => {
    const plaintext = "x".repeat(10_000);
    const enc = encrypt(plaintext, TEST_API_KEY);
    const decrypted = decrypt(enc.encrypted_value, enc.iv, enc.auth_tag, TEST_API_KEY);
    expect(decrypted).toBe(plaintext);
  });

  it("roundtrips JSON-encoded credentials", () => {
    const obj = { client_id: "abc", client_secret: "xyz-123" };
    const plaintext = JSON.stringify(obj);
    const enc = encrypt(plaintext, TEST_API_KEY);
    const decrypted = decrypt(enc.encrypted_value, enc.iv, enc.auth_tag, TEST_API_KEY);
    expect(JSON.parse(decrypted)).toEqual(obj);
  });
});

describe("encrypt output format", () => {
  it("returns hex-encoded encrypted_value, iv, and auth_tag", () => {
    const result = encrypt("test", TEST_API_KEY);
    expect(result.encrypted_value).toMatch(/^[a-f0-9]+$/);
    expect(result.iv).toMatch(/^[a-f0-9]+$/);
    expect(result.auth_tag).toMatch(/^[a-f0-9]+$/);
  });

  it("produces a 24-character hex IV (12 bytes)", () => {
    const result = encrypt("test", TEST_API_KEY);
    expect(result.iv).toHaveLength(24);
  });

  it("produces a 32-character hex auth tag (16 bytes)", () => {
    const result = encrypt("test", TEST_API_KEY);
    expect(result.auth_tag).toHaveLength(32);
  });

  it("produces different ciphertext on each call (random IV)", () => {
    const a = encrypt("same-plaintext", TEST_API_KEY);
    const b = encrypt("same-plaintext", TEST_API_KEY);
    expect(a.iv).not.toBe(b.iv);
    expect(a.encrypted_value).not.toBe(b.encrypted_value);
  });
});

describe("decrypt key isolation", () => {
  it("fails to decrypt with a different API key", () => {
    const enc = encrypt("secret", "key-a");
    expect(() =>
      decrypt(enc.encrypted_value, enc.iv, enc.auth_tag, "key-b"),
    ).toThrow();
  });

  it("fails with a tampered auth tag", () => {
    const enc = encrypt("secret", TEST_API_KEY);
    const tamperedTag = "0".repeat(32);
    expect(() =>
      decrypt(enc.encrypted_value, enc.iv, tamperedTag, TEST_API_KEY),
    ).toThrow();
  });

  it("fails with tampered ciphertext", () => {
    const enc = encrypt("secret", TEST_API_KEY);
    const tampered = "ff" + enc.encrypted_value.slice(2);
    expect(() =>
      decrypt(tampered, enc.iv, enc.auth_tag, TEST_API_KEY),
    ).toThrow();
  });
});
