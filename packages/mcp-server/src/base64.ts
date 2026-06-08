const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

export function encode(input: string | Uint8Array): string {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  let result = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    result += chars[b0 >> 2];
    result += chars[((b0 & 3) << 4) | (b1 >> 4)];
    result += i + 1 < bytes.length ? chars[((b1 & 15) << 2) | (b2 >> 6)] : "=";
    result += i + 2 < bytes.length ? chars[b2 & 63] : "=";
  }
  return result;
}

export function decode(input: string): Uint8Array {
  const clean = input.replace(/[^A-Za-z0-9+/=]/g, "");
  const len = clean.length;
  const padLen = clean.endsWith("==") ? 2 : clean.endsWith("=") ? 1 : 0;
  const byteLen = (len * 3) / 4 - padLen;
  const result = new Uint8Array(byteLen);
  let pos = 0;
  for (let i = 0; i < len; i += 4) {
    const a = chars.indexOf(clean[i]);
    const b = chars.indexOf(clean[i + 1]);
    const c = chars.indexOf(clean[i + 2]);
    const d = chars.indexOf(clean[i + 3]);
    result[pos++] = (a << 2) | (b >> 4);
    if (pos < byteLen) result[pos++] = ((b & 15) << 4) | (c >> 2);
    if (pos < byteLen) result[pos++] = ((c & 3) << 6) | d;
  }
  return result;
}

export function decodeToString(input: string): string {
  return new TextDecoder().decode(decode(input));
}

export function encodeUrlSafe(input: string | Uint8Array): string {
  return encode(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeUrlSafe(input: string): Uint8Array {
  let s = input.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return decode(s);
}
