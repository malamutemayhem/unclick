// api/lib/crypto-helpers.test.ts

import { describe, test, expect } from "vitest";
import { randomBytes } from "node:crypto";

import {
  derivePbkdf2Key,
  verifyPbkdf2Key,
  encryptGcm,
  decryptGcm,
  encryptGcmToString,
  decryptGcmToString,
  CryptoHelperError,
  __testing__,
} from "./crypto-helpers";

const PASSPHRASE = "correct horse battery staple";
const KEY = randomBytes(32);

describe("derivePbkdf2Key", () => {
  test("returns 32-byte derived key with iteration count and salt", () => {
    const r = derivePbkdf2Key(PASSPHRASE);
    expect(r.key.length).toBe(__testing__.PBKDF2_KEY_BYTES);
    expect(r.iterations).toBe(__testing__.PBKDF2_ITERATIONS);
    expect(r.hash).toBe(__testing__.PBKDF2_HASH);
    expect(r.salt.length).toBe(__testing__.PBKDF2_SALT_BYTES);
  });

  test("same passphrase + same salt + same iterations → same derived key", () => {
    const salt = randomBytes(16);
    const a = derivePbkdf2Key(PASSPHRASE, salt, 100_000);
    const b = derivePbkdf2Key(PASSPHRASE, salt, 100_000);
    expect(a.key.equals(b.key)).toBe(true);
  });

  test("different salt → different derived key", () => {
    const a = derivePbkdf2Key(PASSPHRASE, randomBytes(16));
    const b = derivePbkdf2Key(PASSPHRASE, randomBytes(16));
    expect(a.key.equals(b.key)).toBe(false);
  });

  test("rejects empty passphrase", () => {
    expect(() => derivePbkdf2Key("")).toThrow(/invalid_passphrase/);
  });

  test("rejects empty salt", () => {
    expect(() => derivePbkdf2Key(PASSPHRASE, Buffer.alloc(0))).toThrow(/invalid_salt/);
  });

  test("rejects iterations under floor", () => {
    expect(() => derivePbkdf2Key(PASSPHRASE, randomBytes(16), 50_000)).toThrow(/invalid_iterations/);
    expect(() => derivePbkdf2Key(PASSPHRASE, randomBytes(16), 1)).toThrow(/invalid_iterations/);
    expect(() => derivePbkdf2Key(PASSPHRASE, randomBytes(16), 1.5 as any)).toThrow(/invalid_iterations/);
  });

  test("error includes code", () => {
    try {
      derivePbkdf2Key("");
      expect.fail("expected throw");
    } catch (err) {
      expect(err).toBeInstanceOf(CryptoHelperError);
      expect((err as CryptoHelperError).code).toBe("invalid_passphrase");
    }
  });
});

describe("verifyPbkdf2Key", () => {
  test("returns true for matching passphrase + salt + iterations + key", () => {
    const d = derivePbkdf2Key(PASSPHRASE, randomBytes(16), 100_000);
    expect(verifyPbkdf2Key(PASSPHRASE, d.salt, d.iterations, d.key)).toBe(true);
  });

  test("returns false for wrong passphrase", () => {
    const d = derivePbkdf2Key(PASSPHRASE, randomBytes(16), 100_000);
    expect(verifyPbkdf2Key("wrong", d.salt, d.iterations, d.key)).toBe(false);
  });

  test("rejects wrong-length expectedKey", () => {
    const wrong = Buffer.alloc(16);
    const d = derivePbkdf2Key(PASSPHRASE, randomBytes(16), 100_000);
    expect(() => verifyPbkdf2Key(PASSPHRASE, d.salt, d.iterations, wrong)).toThrow(/invalid_expected_key/);
  });
});

describe("encryptGcm / decryptGcm", () => {
  test("round-trip preserves plaintext", () => {
    const enc = encryptGcm("hello secret world", KEY);
    const dec = decryptGcm(enc.payload, KEY);
    expect(dec.toString("utf8")).toBe("hello secret world");
  });

  test("payload format is ivB64.tagB64.ciphertextB64", () => {
    const enc = encryptGcm("x", KEY);
    expect(enc.payload.split(".").length).toBe(3);
    for (const part of enc.payload.split(".")) {
      // valid base64
      expect(() => Buffer.from(part, "base64")).not.toThrow();
    }
  });

  test("IV is 12 bytes, tag is 16 bytes", () => {
    const enc = encryptGcm("x", KEY);
    expect(enc.iv.length).toBe(__testing__.AES_GCM_IV_BYTES);
    expect(enc.tag.length).toBe(__testing__.AES_GCM_TAG_BYTES);
  });

  test("two encrypts of same plaintext produce different payloads (random IV)", () => {
    const a = encryptGcm("same", KEY);
    const b = encryptGcm("same", KEY);
    expect(a.payload).not.toBe(b.payload);
  });

  test("decrypt with wrong key throws auth_failure", () => {
    const enc = encryptGcm("secret", KEY);
    const wrongKey = randomBytes(32);
    try {
      decryptGcm(enc.payload, wrongKey);
      expect.fail("expected auth failure");
    } catch (err) {
      expect(err).toBeInstanceOf(CryptoHelperError);
      expect((err as CryptoHelperError).code).toBe("auth_failure");
    }
  });

  test("tampered ciphertext throws auth_failure", () => {
    const enc = encryptGcm("secret payload", KEY);
    // Flip a byte in the ciphertext portion of the payload.
    const parts = enc.payload.split(".");
    const ct = Buffer.from(parts[2], "base64");
    ct[0] = ct[0] ^ 0xFF;
    parts[2] = ct.toString("base64");
    const tampered = parts.join(".");
    try {
      decryptGcm(tampered, KEY);
      expect.fail("expected auth failure on tampered ciphertext");
    } catch (err) {
      expect((err as CryptoHelperError).code).toBe("auth_failure");
    }
  });

  test("AAD round-trip works when matching, fails when mismatched", () => {
    const enc = encryptGcm("body", KEY, { aad: "context-A" });
    expect(decryptGcm(enc.payload, KEY, { aad: "context-A" }).toString("utf8")).toBe("body");
    try {
      decryptGcm(enc.payload, KEY, { aad: "context-B" });
      expect.fail("expected auth failure on AAD mismatch");
    } catch (err) {
      expect((err as CryptoHelperError).code).toBe("auth_failure");
    }
  });

  test("rejects wrong-size key", () => {
    expect(() => encryptGcm("x", Buffer.alloc(16))).toThrow(/invalid_key/);
    expect(() => decryptGcm("a.b.c", Buffer.alloc(16))).toThrow(/invalid_key/);
  });

  test("rejects malformed payload string", () => {
    expect(() => decryptGcm("nodots", KEY)).toThrow(/invalid_payload/);
    expect(() => decryptGcm("only.two", KEY)).toThrow(/invalid_payload/);
  });

  test("rejects payload with wrong-length IV", () => {
    const badIv = Buffer.alloc(8).toString("base64");
    const tag = Buffer.alloc(16).toString("base64");
    const ct = Buffer.alloc(8).toString("base64");
    expect(() => decryptGcm(`${badIv}.${tag}.${ct}`, KEY)).toThrow(/invalid_iv/);
  });

  test("rejects payload with wrong-length tag", () => {
    const iv = Buffer.alloc(12).toString("base64");
    const badTag = Buffer.alloc(8).toString("base64");
    const ct = Buffer.alloc(8).toString("base64");
    expect(() => decryptGcm(`${iv}.${badTag}.${ct}`, KEY)).toThrow(/invalid_tag/);
  });
});

describe("string helpers", () => {
  test("encryptGcmToString + decryptGcmToString are symmetric", () => {
    const payload = encryptGcmToString("hello", KEY);
    expect(typeof payload).toBe("string");
    expect(decryptGcmToString(payload, KEY)).toBe("hello");
  });
});

describe("end-to-end: PBKDF2 → AES-256-GCM", () => {
  test("realistic flow: derive key from passphrase, encrypt + decrypt", () => {
    const d = derivePbkdf2Key("my-master-pass");
    const enc = encryptGcm("hello sensitive payload", d.key);
    const back = decryptGcmToString(enc.payload, d.key);
    expect(back).toBe("hello sensitive payload");
  });

  test("verify flow: stored salt+iterations+keyhash matches the same passphrase", () => {
    const d = derivePbkdf2Key("my-master-pass");
    // Imagine the API stored d.salt, d.iterations, and d.key as the credential record.
    // Later, the API verifies an inbound passphrase:
    expect(verifyPbkdf2Key("my-master-pass", d.salt, d.iterations, d.key)).toBe(true);
    expect(verifyPbkdf2Key("wrong-pass",      d.salt, d.iterations, d.key)).toBe(false);
  });
});
