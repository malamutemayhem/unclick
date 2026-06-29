// ============================================================
// Chat vault crypto
//
// Chat reads a user's provider key from the owned credential vault (the
// user_credentials table) to run an api-lane model on their key. The
// scheme is AES-256-GCM with a PBKDF2 (100k) key derived from the raw
// UnClick api key, matching api/credentials.ts exactly so existing rows
// decrypt. Self-contained and owned: NO dependency on the retired
// BackstagePass layer.
//
// Why 100k PBKDF2 is sufficient here: the input is the raw UnClick api
// key, a high-entropy random secret (uc_ = 128 bits, agt_ = 256 bits),
// not a human-chosen password. At that entropy the key space is not
// bruteforceable, so the iteration count is not the security boundary.
// Do NOT swap in a different iteration count or KDF without migrating
// every existing vault row (see SCHEME_VERSION below).
//
// Proof of possession is implicit. Only the holder of the raw api key
// can derive the right key, and a wrong key fails the GCM auth tag, so
// decrypt throws a generic sanitized error. We never store the raw key,
// only its SHA-256 hash for tenant lookups, and the decrypted provider
// key is never returned to the browser. The derived AES key Buffer is
// zeroed after use; the plaintext key is a JS string and cannot be
// wiped (an accepted limitation of this design).
// ============================================================

import * as crypto from "crypto";

// Bump and branch on a row's scheme_version to introduce a future v2
// (e.g. Argon2id, AAD binding, higher iterations) without breaking the
// v1 rows already written by credentials.ts / backstagepass.
export const SCHEME_VERSION = "v1" as const;

const PBKDF2_ITERATIONS = 100_000;
const KEY_BYTES = 32;
const IV_BYTES = 12;
const SALT_BYTES = 32;

// Provider-key field names we will read from a decrypted credential
// payload. Allowlisted so a crafted field name (for example __proto__)
// can never be used as a lookup key.
const ALLOWED_KEY_FIELDS = ["api_key", "token", "key"] as const;

// Tenant lookup hash. Stable, deterministic, and the only form of the
// api key we ever persist.
export function sha256hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

// Constant-time compare of two equal-length hex hashes. Use this for any
// proof-of-possession check so callers cannot learn the stored hash via
// response timing.
export function hashesEqual(aHex: string, bHex: string): boolean {
  if (typeof aHex !== "string" || typeof bHex !== "string" || aHex.length !== bHex.length) {
    return false;
  }
  try {
    return crypto.timingSafeEqual(Buffer.from(aHex, "hex"), Buffer.from(bHex, "hex"));
  } catch {
    return false;
  }
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
// tests and any owned write path; the Chat read path only decrypts. The
// derived key Buffer is zeroed after use.
export function encryptCredential(apiKey: string, plaintext: string): EncryptedCredential {
  const salt = crypto.randomBytes(SALT_BYTES);
  const key = deriveKey(apiKey, salt);
  try {
    const iv = crypto.randomBytes(IV_BYTES);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
    return {
      encryption_iv: iv.toString("hex"),
      encryption_tag: cipher.getAuthTag().toString("hex"),
      encrypted_data: enc.toString("hex"),
      encryption_salt: salt.toString("hex"),
    };
  } finally {
    key.fill(0);
  }
}

// Decrypt a vault row with the raw api key. Throws a generic sanitized
// error if the key is wrong (GCM auth failure) or the row is malformed,
// so no GCM internals or failure reason leak to a caller's logs. The
// derived key Buffer is zeroed in all paths.
export function decryptCredential(apiKey: string, row: EncryptedCredential): string {
  const salt = Buffer.from(row.encryption_salt, "hex");
  const key = deriveKey(apiKey, salt);
  try {
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
  } catch {
    throw new Error("Decryption failed");
  } finally {
    key.fill(0);
  }
}

// Decrypt and parse the JSON credential payload, then pull the provider
// key. The vault stores credentials as a string map, e.g.
// { api_key: "sk-..." }. Only own, allowlisted fields are read (so a
// crafted __proto__ / constructor payload cannot influence the result),
// and only a non-empty string is returned. Returns null otherwise.
export function readProviderKey(
  apiKey: string,
  row: EncryptedCredential,
  field = "api_key",
): string | null {
  const parsed = JSON.parse(decryptCredential(apiKey, row)) as Record<string, unknown>;

  const ownString = (k: string): string | null => {
    if (!Object.prototype.hasOwnProperty.call(parsed, k)) return null;
    const v = parsed[k];
    return typeof v === "string" && v.length > 0 ? v : null;
  };

  // Honor the requested field first (only if it is an allowlisted name),
  // then the standard synonyms.
  const order = (ALLOWED_KEY_FIELDS as readonly string[]).includes(field)
    ? [field, ...ALLOWED_KEY_FIELDS.filter((f) => f !== field)]
    : [...ALLOWED_KEY_FIELDS];

  for (const k of order) {
    const v = ownString(k);
    if (v) return v;
  }
  return null;
}

// ─── Server scheme (AI provider keys) ───────────────────────────────────────
//
// AI provider keys (OpenRouter, Anthropic, ...) for the website chat are
// encrypted with a stable SERVER secret bound to the account lane, NOT the
// rotating master api key. This keeps them readable on a logged-in session
// alone and completely untouched by master-key rotation - the lane and the
// secret both stay constant. Same AES-256-GCM / PBKDF2 primitive as above;
// only the secret fed in differs (server_secret:lane_hash). Rows written this
// way carry enc_scheme = 'server'.
function serverSchemePassword(serverSecret: string, laneHash: string): string {
  return `${serverSecret}:${laneHash}`;
}

export function encryptForAccount(
  serverSecret: string,
  laneHash: string,
  plaintext: string,
): EncryptedCredential {
  return encryptCredential(serverSchemePassword(serverSecret, laneHash), plaintext);
}

export function readProviderKeyForAccount(
  serverSecret: string,
  laneHash: string,
  row: EncryptedCredential,
  field = "api_key",
): string | null {
  return readProviderKey(serverSchemePassword(serverSecret, laneHash), row, field);
}
