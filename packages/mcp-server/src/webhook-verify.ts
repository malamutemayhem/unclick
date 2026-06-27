export function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function simpleHmac(message: string, secret: string): string {
  const blockSize = 64;
  let key = secret;

  if (key.length > blockSize) {
    key = simpleHash(key);
  }
  while (key.length < blockSize) {
    key += "\0";
  }

  let oKeyPad = "";
  let iKeyPad = "";
  for (let i = 0; i < blockSize; i++) {
    oKeyPad += String.fromCharCode(key.charCodeAt(i) ^ 0x5c);
    iKeyPad += String.fromCharCode(key.charCodeAt(i) ^ 0x36);
  }

  return simpleHash(oKeyPad + simpleHash(iKeyPad + message));
}

function simpleHash(input: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const combined = 4294967296 * (2097151 & h2) + (h1 >>> 0);
  return combined.toString(36);
}

export interface WebhookConfig {
  secret: string;
  headerName?: string;
  algorithm?: string;
  tolerance?: number;
  timestampHeader?: string;
}

export function verifyWebhook(
  payload: string,
  signature: string,
  config: WebhookConfig,
): { valid: boolean; reason?: string } {
  if (!signature) return { valid: false, reason: "Missing signature" };

  const expected = simpleHmac(payload, config.secret);

  const sigParts = signature.includes("=") ? signature.split("=").slice(1).join("=") : signature;

  if (!constantTimeEqual(expected, sigParts)) {
    return { valid: false, reason: "Signature mismatch" };
  }

  return { valid: true };
}

export function verifyTimestamp(
  timestamp: string | number,
  toleranceMs = 300_000,
): { valid: boolean; reason?: string } {
  const ts = typeof timestamp === "string" ? parseInt(timestamp, 10) * 1000 : timestamp;
  const now = Date.now();
  const diff = Math.abs(now - ts);
  if (diff > toleranceMs) {
    return { valid: false, reason: `Timestamp too old (${diff}ms)` };
  }
  return { valid: true };
}

export function parseSignatureHeader(header: string): { algorithm: string; signature: string } {
  const eqIndex = header.indexOf("=");
  if (eqIndex === -1) return { algorithm: "unknown", signature: header };
  return { algorithm: header.slice(0, eqIndex), signature: header.slice(eqIndex + 1) };
}
