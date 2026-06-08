import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { encrypt, decrypt, hashKey, hashKeyFull } from "../keychain-crypto.js";

const TEST_API_KEY = "uk_test_abc123def456";

describe("hashKey", () => {
  test("returns first 12 hex characters of SHA-256", () => {
    const result = hashKey(TEST_API_KEY);
    assert.equal(result.length, 12);
    assert.ok(/^[a-f0-9]{12}$/.test(result));
  });

  test("is deterministic", () => {
    assert.equal(hashKey(TEST_API_KEY), hashKey(TEST_API_KEY));
  });

  test("differs for different keys", () => {
    assert.notEqual(hashKey("key-a"), hashKey("key-b"));
  });

  test("is a prefix of hashKeyFull", () => {
    assert.ok(hashKeyFull(TEST_API_KEY).startsWith(hashKey(TEST_API_KEY)));
  });
});

describe("hashKeyFull", () => {
  test("returns full 64-character SHA-256 hex", () => {
    const result = hashKeyFull(TEST_API_KEY);
    assert.equal(result.length, 64);
    assert.ok(/^[a-f0-9]{64}$/.test(result));
  });

  test("is deterministic", () => {
    assert.equal(hashKeyFull(TEST_API_KEY), hashKeyFull(TEST_API_KEY));
  });

  test("differs for different keys", () => {
    assert.notEqual(hashKeyFull("key-a"), hashKeyFull("key-b"));
  });
});

describe("encrypt + decrypt roundtrip", () => {
  test("roundtrips a simple string", () => {
    const plaintext = "my-secret-credential-value";
    const enc = encrypt(plaintext, TEST_API_KEY);
    const decrypted = decrypt(enc.encrypted_value, enc.iv, enc.auth_tag, TEST_API_KEY);
    assert.equal(decrypted, plaintext);
  });

  test("roundtrips an empty string", () => {
    const enc = encrypt("", TEST_API_KEY);
    const decrypted = decrypt(enc.encrypted_value, enc.iv, enc.auth_tag, TEST_API_KEY);
    assert.equal(decrypted, "");
  });

  test("roundtrips unicode content", () => {
    const plaintext = "credentials with unicode chars and emoji 🔑";
    const enc = encrypt(plaintext, TEST_API_KEY);
    const decrypted = decrypt(enc.encrypted_value, enc.iv, enc.auth_tag, TEST_API_KEY);
    assert.equal(decrypted, plaintext);
  });

  test("roundtrips a long credential string", () => {
    const plaintext = "x".repeat(10_000);
    const enc = encrypt(plaintext, TEST_API_KEY);
    const decrypted = decrypt(enc.encrypted_value, enc.iv, enc.auth_tag, TEST_API_KEY);
    assert.equal(decrypted, plaintext);
  });

  test("roundtrips JSON-encoded credentials", () => {
    const obj = { client_id: "abc", client_secret: "xyz-123" };
    const plaintext = JSON.stringify(obj);
    const enc = encrypt(plaintext, TEST_API_KEY);
    const decrypted = decrypt(enc.encrypted_value, enc.iv, enc.auth_tag, TEST_API_KEY);
    assert.deepEqual(JSON.parse(decrypted), obj);
  });
});

describe("encrypt output format", () => {
  test("returns hex-encoded encrypted_value, iv, and auth_tag", () => {
    const result = encrypt("test", TEST_API_KEY);
    assert.ok(/^[a-f0-9]+$/.test(result.encrypted_value));
    assert.ok(/^[a-f0-9]+$/.test(result.iv));
    assert.ok(/^[a-f0-9]+$/.test(result.auth_tag));
  });

  test("produces a 24-character hex IV (12 bytes)", () => {
    const result = encrypt("test", TEST_API_KEY);
    assert.equal(result.iv.length, 24);
  });

  test("produces a 32-character hex auth tag (16 bytes)", () => {
    const result = encrypt("test", TEST_API_KEY);
    assert.equal(result.auth_tag.length, 32);
  });

  test("produces different ciphertext on each call (random IV)", () => {
    const a = encrypt("same-plaintext", TEST_API_KEY);
    const b = encrypt("same-plaintext", TEST_API_KEY);
    assert.notEqual(a.iv, b.iv);
    assert.notEqual(a.encrypted_value, b.encrypted_value);
  });
});

describe("decrypt key isolation", () => {
  test("fails to decrypt with a different API key", () => {
    const enc = encrypt("secret", "key-a");
    assert.throws(() =>
      decrypt(enc.encrypted_value, enc.iv, enc.auth_tag, "key-b"),
    );
  });

  test("fails with a tampered auth tag", () => {
    const enc = encrypt("secret", TEST_API_KEY);
    const tamperedTag = "0".repeat(32);
    assert.throws(() =>
      decrypt(enc.encrypted_value, enc.iv, tamperedTag, TEST_API_KEY),
    );
  });

  test("fails with tampered ciphertext", () => {
    const enc = encrypt("secret", TEST_API_KEY);
    const tampered = "ff" + enc.encrypted_value.slice(2);
    assert.throws(() =>
      decrypt(tampered, enc.iv, enc.auth_tag, TEST_API_KEY),
    );
  });
});
