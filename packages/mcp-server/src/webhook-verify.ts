// Webhook signature verification.
// Verifies that incoming webhook payloads actually came from the
// claimed sender by checking HMAC signatures. Supports the common
// patterns used by GitHub, Stripe, Slack, and others.

import { createHmac, timingSafeEqual } from "crypto";

export type HashAlgorithm = "sha1" | "sha256" | "sha512";

export interface VerifyOptions {
  algorithm?: HashAlgorithm;
  encoding?: "hex" | "base64";
  prefix?: string;
}

const DEFAULTS: Required<VerifyOptions> = {
  algorithm: "sha256",
  encoding: "hex",
  prefix: "",
};

export function computeSignature(
  payload: string | Buffer,
  secret: string,
  opts: VerifyOptions = {},
): string {
  const o = { ...DEFAULTS, ...opts };
  const hmac = createHmac(o.algorithm, secret);
  hmac.update(payload);
  const sig = hmac.digest(o.encoding);
  return o.prefix ? `${o.prefix}${sig}` : sig;
}

export function verifySignature(
  payload: string | Buffer,
  secret: string,
  signature: string,
  opts: VerifyOptions = {},
): boolean {
  const expected = computeSignature(payload, secret, opts);

  if (expected.length !== signature.length) return false;

  try {
    return timingSafeEqual(
      Buffer.from(expected, "utf8"),
      Buffer.from(signature, "utf8"),
    );
  } catch {
    return false;
  }
}

// Pre-built verifiers for popular platforms.

export function verifyGithubWebhook(payload: string, secret: string, signature: string): boolean {
  return verifySignature(payload, secret, signature, {
    algorithm: "sha256",
    encoding: "hex",
    prefix: "sha256=",
  });
}

export function verifyStripeWebhook(payload: string, secret: string, signature: string, tolerance = 300): boolean {
  const parts = signature.split(",");
  const tsEntry = parts.find((p) => p.startsWith("t="));
  const sigEntry = parts.find((p) => p.startsWith("v1="));

  if (!tsEntry || !sigEntry) return false;

  const timestamp = tsEntry.slice(2);
  const sig = sigEntry.slice(3);

  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (age > tolerance) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const expected = computeSignature(signedPayload, secret, {
    algorithm: "sha256",
    encoding: "hex",
  });

  if (expected.length !== sig.length) return false;

  try {
    return timingSafeEqual(
      Buffer.from(expected, "utf8"),
      Buffer.from(sig, "utf8"),
    );
  } catch {
    return false;
  }
}

export function verifySlackWebhook(payload: string, secret: string, signature: string, timestamp: string, tolerance = 300): boolean {
  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (age > tolerance) return false;

  const baseString = `v0:${timestamp}:${payload}`;
  return verifySignature(baseString, secret, signature, {
    algorithm: "sha256",
    encoding: "hex",
    prefix: "v0=",
  });
}
