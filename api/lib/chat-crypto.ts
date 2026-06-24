// ============================================================
// Chat vault crypto
//
// Chat reads a user's provider key from the owned credential vault (the
// user_credentials table) to run an api-lane model on their key. The
// scheme is AES-256-GCM with a PBKDF2 (100k) key derived from the raw
// UnClick api key, matching api/credentials.ts exactly so existing rows
// decrypt. This module is self-contained and owned: it has NO dependency
// on the retired BackstagePass layer.
//
// Proof of possession is implicit. Only the holder of the raw api key
// can derive the right key, and a wrong key fails the GCM auth tag, so
// decrypt throws. We never store the raw key, only its SHA-256 hash for
// tenant lookups, and the decrypted provider key is never returned to
// the browser.
// ============================================================

import * as crypto from "crypto";

const PBKDF2_ITERATIONS = 100_000;
const KEY_BYTES = 32;
const IV_BYTES = 12;
const SALT_BYTES = 32;

// Tenant lookup hash. Stable, deterministic, and the only form of the
// api key we ever persist.
export function sha256hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export function deriveKey(apiKey: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(apiKey, salt, PBKDF2_ITERATIONS, KEY_BYTES, "sha256");
}

// The hex-column shape stored on user_credentials.
export interface EncryptedCredential {
  encryption_iv: string;
  encryption_tag: string;
  encrypted_data: string;
  encryption_salt: string;
}

// Encrypt a plaintext payload into the vault's hex-column shape. Used by
// tests and any owned write path; the Chat read path only decrypts.
export function encryptCredential(apiKey: string, plaintext: string): EncryptedCredential {
  const salt = crypto.randomBytes(SALT_BYTES);
  const key = deriveKey(apiKey, salt);
  const iv = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return {
    encryption_iv: iv.toString("hex"),
    encryption_tag: cipher.getAuthTag().toString("hex"),
    encrypted_data: enc.toString("hex"),
    encryption_salt: salt.toString("hex"),
  };
}

// Decrypt a vault row with the raw api key. Throws if the key is wrong
// (GCM auth failure) or the row is malformed.
export function decryptCredential(apiKey: string, row: EncryptedCredential): string {
  const salt = Buffer.from(row.encryption_salt, "hex");
  const key = deriveKey(apiKey, salt);
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(row.encryption_iv, "hex"),
  );
  decipher.setAuthTag(Buffer.from(row.encryption_tag, "hex"));
  return Buffer.concat([
    decipher.update(Buffer.from(row.encrypted_data, "hex")),
    decipher.final(),
  ]).toString("utf8");
}

// Decrypt and parse the JSON credential payload, then pull the provider
// key field. The vault stores credentials as a string map, e.g.
// { api_key: "sk-..." }. Returns null when no usable key field exists.
export function readProviderKey(
  apiKey: string,
  row: EncryptedCredential,
  field = "api_key",
): string | null {
  const parsed = JSON.parse(decryptCredential(apiKey, row)) as Record<string, unknown>;
  const value = parsed[field] ?? parsed.token ?? parsed.key;
  return typeof value === "string" && value.length > 0 ? value : null;
}
