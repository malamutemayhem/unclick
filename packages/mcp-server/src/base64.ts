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
    result += CHARS[(b0 >> 2) & 63];
    result += CHARS[((b0 << 4) | (b1 >> 4)) & 63];
    result += i + 1 < bytes.length ? CHARS[((b1 << 2) | (b2 >> 6)) & 63] : "=";
    result += i + 2 < bytes.length ? CHARS[b2 & 63] : "=";
  }
  return result;
}

export function decodeToBytes(input: string): Uint8Array {
  const isUrlSafe = /[-_]/.test(input);
  const normalized = isUrlSafe
    ? input.replace(/-/g, "+").replace(/_/g, "/")
    : input;
  const padded = normalized.replace(/[^A-Za-z0-9+/=]/g, "");
  const lookup = new Map<string, number>();
  for (let i = 0; i < CHARS.length; i++) lookup.set(CHARS[i], i);
  const out: number[] = [];
  for (let i = 0; i < padded.length; i += 4) {
    const a = lookup.get(padded[i]) ?? 0;
    const b = lookup.get(padded[i + 1]) ?? 0;
    const c = lookup.get(padded[i + 2]) ?? 0;
    const d = lookup.get(padded[i + 3]) ?? 0;
    out.push((a << 2) | (b >> 4));
    if (padded[i + 2] !== "=" && padded[i + 2] !== undefined) out.push(((b << 4) | (c >> 2)) & 255);
    if (padded[i + 3] !== "=" && padded[i + 3] !== undefined) out.push(((c << 6) | d) & 255);
  }
  return new Uint8Array(out);
}

export function encodeUrlSafe(input: string): string {
  return encode(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeUrlSafe(input: string): string {
  let padded = input.replace(/-/g, "+").replace(/_/g, "/");
  while (padded.length % 4 !== 0) padded += "=";
  return decode(padded);
}

export function isValid(input: string): boolean {
  return /^[A-Za-z0-9+/]*={0,2}$/.test(input) && input.length % 4 === 0;
}
