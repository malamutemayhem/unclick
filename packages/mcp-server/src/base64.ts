const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const URL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

export function encode(input: string): string {
  const bytes = new TextEncoder().encode(input);
  return encodeBytes(bytes);
}

export function decode(input: string): string {
  const bytes = decodeToBytes(input);
  return new TextDecoder().decode(bytes);
}

export function encodeBytes(bytes: Uint8Array): string {
  let result = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    result += CHARS[b0 >> 2];
    result += CHARS[((b0 & 3) << 4) | (b1 >> 4)];
    result += i + 1 < bytes.length ? CHARS[((b1 & 15) << 2) | (b2 >> 6)] : "=";
    result += i + 2 < bytes.length ? CHARS[b2 & 63] : "=";
  }
  return result;
}

export function decodeToBytes(input: string): Uint8Array {
  const clean = input.replace(/=+$/, "");
  const lookup = createLookup(CHARS);
  const result: number[] = [];

  for (let i = 0; i < clean.length; i += 4) {
    const b0 = lookup[clean[i]];
    const b1 = lookup[clean[i + 1]] || 0;
    const b2 = lookup[clean[i + 2]] || 0;
    const b3 = lookup[clean[i + 3]] || 0;
    result.push((b0 << 2) | (b1 >> 4));
    if (i + 2 < clean.length) result.push(((b1 & 15) << 4) | (b2 >> 2));
    if (i + 3 < clean.length) result.push(((b2 & 3) << 6) | b3);
  }

  return new Uint8Array(result);
}

export function encodeUrlSafe(input: string): string {
  return encode(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeUrlSafe(input: string): string {
  let padded = input.replace(/-/g, "+").replace(/_/g, "/");
  while (padded.length % 4 !== 0) padded += "=";
  return decode(padded);
}

export function isBase64(input: string): boolean {
  return /^[A-Za-z0-9+/]*={0,2}$/.test(input) && input.length % 4 === 0;
}

export function isBase64Url(input: string): boolean {
  return /^[A-Za-z0-9\-_]*$/.test(input);
}

function createLookup(chars: string): Record<string, number> {
  const lookup: Record<string, number> = {};
  for (let i = 0; i < chars.length; i++) lookup[chars[i]] = i;
  return lookup;
}
