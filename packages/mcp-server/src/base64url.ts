const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const URL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

export function encode(input: string): string {
  return toBase64(input, CHARS, true);
}

export function decode(input: string): string {
  return fromBase64(input, CHARS);
}

export function encodeUrl(input: string): string {
  return toBase64(input, URL_CHARS, false);
}

export function decodeUrl(input: string): string {
  let std = input.replace(/-/g, "+").replace(/_/g, "/");
  std = padBase64(std);
  return fromBase64(std, CHARS);
}

export function encodeBytes(bytes: Uint8Array): string {
  return bytesToBase64(bytes, CHARS, true);
}

export function encodeBytesUrl(bytes: Uint8Array): string {
  return bytesToBase64(bytes, URL_CHARS, false);
}

export function decodeToBytes(input: string): Uint8Array {
  return base64ToBytes(input, CHARS);
}

function toBase64(input: string, chars: string, pad: boolean): string {
  const bytes = new TextEncoder().encode(input);
  return bytesToBase64(bytes, chars, pad);
}

function bytesToBase64(bytes: Uint8Array, chars: string, pad: boolean): string {
  let result = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;

    result += chars[b0 >> 2];
    result += chars[((b0 & 3) << 4) | (b1 >> 4)];
    result += i + 1 < bytes.length ? chars[((b1 & 15) << 2) | (b2 >> 6)] : (pad ? "=" : "");
    result += i + 2 < bytes.length ? chars[b2 & 63] : (pad ? "=" : "");
  }
  return result;
}

function fromBase64(input: string, chars: string): string {
  const bytes = base64ToBytes(input, chars);
  return new TextDecoder().decode(bytes);
}

function base64ToBytes(input: string, chars: string): Uint8Array {
  const clean = input.replace(/=/g, "");
  const lookup = new Map<string, number>();
  for (let i = 0; i < chars.length; i++) lookup.set(chars[i], i);

  const bytes: number[] = [];
  for (let i = 0; i < clean.length; i += 4) {
    const b0 = lookup.get(clean[i]) || 0;
    const b1 = lookup.get(clean[i + 1]) || 0;
    const b2 = i + 2 < clean.length ? (lookup.get(clean[i + 2]) || 0) : 0;
    const b3 = i + 3 < clean.length ? (lookup.get(clean[i + 3]) || 0) : 0;

    bytes.push((b0 << 2) | (b1 >> 4));
    if (i + 2 < clean.length) bytes.push(((b1 & 15) << 4) | (b2 >> 2));
    if (i + 3 < clean.length) bytes.push(((b2 & 3) << 6) | b3);
  }
  return new Uint8Array(bytes);
}

function padBase64(input: string): string {
  const pad = (4 - (input.length % 4)) % 4;
  return input + "=".repeat(pad);
}

function decodeUrl_internal(input: string): string {
  let std = input.replace(/-/g, "+").replace(/_/g, "/");
  std = padBase64(std);
  return fromBase64(std, CHARS);
}

export { decodeUrl_internal as decodeUrlAlt };
