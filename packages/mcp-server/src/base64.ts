export function encode(input: string): string {
  return Buffer.from(input, "utf-8").toString("base64");
}

export function decode(encoded: string): string {
  return Buffer.from(encoded, "base64").toString("utf-8");
}

export function encodeUrl(input: string): string {
  return Buffer.from(input, "utf-8").toString("base64url");
}

export function decodeUrl(encoded: string): string {
  return Buffer.from(encoded, "base64url").toString("utf-8");
}

export function isBase64(str: string): boolean {
  if (str.length === 0) return false;
  return /^[A-Za-z0-9+/]*={0,2}$/.test(str) && str.length % 4 === 0;
}

export function isBase64Url(str: string): boolean {
  if (str.length === 0) return false;
  return /^[A-Za-z0-9_-]+$/.test(str);
}

export function safeDecode(encoded: string): string | undefined {
  try {
    return decode(encoded);
  } catch {
    return undefined;
  }
}
