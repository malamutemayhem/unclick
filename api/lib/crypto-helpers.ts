// api/lib/crypto-helpers.ts
//
// Shared crypto helpers — single source of truth for PBKDF2 key derivation
// and AES-256-GCM encrypt/decrypt across the API surface.
//
// Closes UnClick todo "Architecture QC: shared API crypto helper v1".
//
// Today these helpers are duplicated in API/backstagepass.ts and similar
// files. The duplication risks drift in cryptographic constants (iteration
// count, salt size, IV size, tag handling) which is the worst place to
// accept drift. This module is the canonical implementation; call-site
// patches that swap to it are a separate follow-up PR per the ScopePack.
//
// Conventions:
//   - PBKDF2: SHA-256, 210_000 iterations (matches OWASP 2023 guidance), 16-byte salt.
//   - AES-256-GCM: 12-byte IV, 16-byte tag (Node default), AAD optional.
//   - Stored ciphertext layout: `${ivB64}.${tagB64}.${ciphertextB64}`. Three pieces
//     joined by `.` so the receiving side can split + decrypt without an extra format byte.
//   - Errors are surfaced as Error objects with a deterministic `code` property
//     so callers can branch without string parsing.

import {
  pbkdf2Sync,
  randomBytes,
  createCipheriv,
  createDecipheriv,
  timingSafeEqual,
  type CipherGCM,
  type DecipherGCM,
} from "node:crypto";

// --- Constants (exported for tests, NOT for callers to override at runtime) ---

export const PBKDF2_ITERATIONS = 210_000;
export const PBKDF2_SALT_BYTES = 16;
export const PBKDF2_KEY_BYTES = 32; // 256-bit derived key for AES-256
export const PBKDF2_HASH = "sha256";

export const AES_GCM_IV_BYTES = 12;
export const AES_GCM_TAG_BYTES = 16;
export const AES_GCM_ALGO = "aes-256-gcm" as const;

// --- Error helpers ---

export class CryptoHelperError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    this.name = "CryptoHelperError";
  }
}

function asError(code: string, message: string): never {
  throw new CryptoHelperError(message, code);
}

// --- PBKDF2 ---

export interface DerivedKey {
  /** 32-byte derived key. */
  key: Buffer;
  /** Salt actually used (random if not provided). */
  salt: Buffer;
  iterations: number;
  hash: string;
}

/**
 * Derive a 256-bit key from a passphrase using PBKDF2-HMAC-SHA256.
 *
 * @param passphrase utf8 string — the input secret.
 * @param salt       optional Buffer; a fresh random salt is generated when omitted.
 * @param iterations optional override; defaults to PBKDF2_ITERATIONS. Increase for new use cases; never decrease.
 */
export function derivePbkdf2Key(
  passphrase: string,
  salt: Buffer = randomBytes(PBKDF2_SALT_BYTES),
  iterations: number = PBKDF2_ITERATIONS,
): DerivedKey {
  if (typeof passphrase !== "string" || passphrase.length === 0) {
    asError("invalid_passphrase", "passphrase must be a non-empty string");
  }
  if (!Buffer.isBuffer(salt) || salt.length === 0) {
    asError("invalid_salt", "salt must be a non-empty Buffer");
  }
  if (!Number.isInteger(iterations) || iterations < 100_000) {
    asError("invalid_iterations", `iterations must be an integer >= 100_000 (got ${iterations})`);
  }
  const key = pbkdf2Sync(passphrase, salt, iterations, PBKDF2_KEY_BYTES, PBKDF2_HASH);
  return { key, salt, iterations, hash: PBKDF2_HASH };
}

/**
 * Verify a passphrase against a previously stored salt + iterations + reference key.
 * Uses timingSafeEqual to avoid side-channels.
 */
export function verifyPbkdf2Key(
  passphrase: string,
  storedSalt: Buffer,
  storedIterations: number,
  expectedKey: Buffer,
): boolean {
  if (!Buffer.isBuffer(expectedKey) || expectedKey.length !== PBKDF2_KEY_BYTES) {
    asError("invalid_expected_key", `expectedKey must be ${PBKDF2_KEY_BYTES}-byte Buffer`);
  }
  const derived = derivePbkdf2Key(passphrase, storedSalt, storedIterations);
  if (derived.key.length !== expectedKey.length) return false;
  return timingSafeEqual(derived.key, expectedKey);
}

// --- AES-256-GCM ---

export interface EncryptedString {
  /** `${ivB64}.${tagB64}.${ciphertextB64}` */
  payload: string;
  iv: Buffer;
  tag: Buffer;
  ciphertext: Buffer;
}

export interface EncryptOptions {
  /** Additional Authenticated Data — bound into the tag, not encrypted. */
  aad?: Buffer | string;
}

export function encryptGcm(
  plaintext: string | Buffer,
  key: Buffer,
  options: EncryptOptions = {},
): EncryptedString {
  if (!Buffer.isBuffer(key) || key.length !== 32) {
    asError("invalid_key", "key must be a 32-byte Buffer");
  }
  const text = typeof plaintext === "string" ? Buffer.from(plaintext, "utf8") : plaintext;
  if (!Buffer.isBuffer(text)) {
    asError("invalid_plaintext", "plaintext must be string or Buffer");
  }

  const iv = randomBytes(AES_GCM_IV_BYTES);
  const cipher = createCipheriv(AES_GCM_ALGO, key, iv) as CipherGCM;
  if (options.aad) {
    cipher.setAAD(typeof options.aad === "string" ? Buffer.from(options.aad, "utf8") : options.aad);
  }
  const ciphertext = Buffer.concat([cipher.update(text), cipher.final()]);
  const tag = cipher.getAuthTag();
  if (tag.length !== AES_GCM_TAG_BYTES) {
    asError("unexpected_tag_size", `tag length ${tag.length} != ${AES_GCM_TAG_BYTES}`);
  }
  const payload = `${iv.toString("base64")}.${tag.toString("base64")}.${ciphertext.toString("base64")}`;
  return { payload, iv, tag, ciphertext };
}

export interface DecryptOptions {
  /** Same AAD that was bound at encrypt time. */
  aad?: Buffer | string;
}

/**
 * Decrypt the canonical `${ivB64}.${tagB64}.${ciphertextB64}` payload.
 * Throws on auth failure (tag mismatch) — never returns a partial plaintext.
 */
export function decryptGcm(
  payload: string,
  key: Buffer,
  options: DecryptOptions = {},
): Buffer {
  if (!Buffer.isBuffer(key) || key.length !== 32) {
    asError("invalid_key", "key must be a 32-byte Buffer");
  }
  if (typeof payload !== "string" || !payload.includes(".")) {
    asError("invalid_payload", "payload must be `${ivB64}.${tagB64}.${ciphertextB64}`");
  }
  const parts = payload.split(".");
  if (parts.length !== 3) {
    asError("invalid_payload", "payload must have exactly 3 dot-separated parts");
  }
  const [ivB64, tagB64, ctB64] = parts;
  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const ciphertext = Buffer.from(ctB64, "base64");
  if (iv.length !== AES_GCM_IV_BYTES) asError("invalid_iv", `iv length ${iv.length} != ${AES_GCM_IV_BYTES}`);
  if (tag.length !== AES_GCM_TAG_BYTES) asError("invalid_tag", `tag length ${tag.length} != ${AES_GCM_TAG_BYTES}`);

  const decipher = createDecipheriv(AES_GCM_ALGO, key, iv) as DecipherGCM;
  decipher.setAuthTag(tag);
  if (options.aad) {
    decipher.setAAD(typeof options.aad === "string" ? Buffer.from(options.aad, "utf8") : options.aad);
  }
  try {
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  } catch (err) {
    // Node's GCM auth failures throw without a stable `code`; normalise here.
    throw new CryptoHelperError(
      `auth failure: ${(err as Error)?.message ?? String(err)}`,
      "auth_failure",
    );
  }
}

/**
 * Convenience: encrypt a string then return only the canonical payload string.
 */
export function encryptGcmToString(plaintext: string, key: Buffer, options?: EncryptOptions): string {
  return encryptGcm(plaintext, key, options).payload;
}

/**
 * Convenience: decrypt the canonical payload then return the plaintext as utf8 string.
 */
export function decryptGcmToString(payload: string, key: Buffer, options?: DecryptOptions): string {
  return decryptGcm(payload, key, options).toString("utf8");
}

// Re-export for direct tooling / migration scripts.
export const __testing__ = {
  PBKDF2_ITERATIONS,
  PBKDF2_SALT_BYTES,
  PBKDF2_KEY_BYTES,
  PBKDF2_HASH,
  AES_GCM_IV_BYTES,
  AES_GCM_TAG_BYTES,
  AES_GCM_ALGO,
};
