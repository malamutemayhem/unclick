export interface JWTHeader {
  alg: string;
  typ?: string;
  kid?: string;
  [key: string]: unknown;
}

export interface JWTPayload {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  [key: string]: unknown;
}

export interface DecodedJWT {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
}

export function decode(token: string): DecodedJWT {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT: expected 3 parts");

  const header = JSON.parse(decodeBase64Url(parts[0])) as JWTHeader;
  const payload = JSON.parse(decodeBase64Url(parts[1])) as JWTPayload;

  return { header, payload, signature: parts[2] };
}

export function isExpired(token: string, clockSkewSeconds = 0): boolean {
  const { payload } = decode(token);
  if (payload.exp === undefined) return false;
  const now = Math.floor(Date.now() / 1000);
  return now > payload.exp + clockSkewSeconds;
}

export function getExpiresAt(token: string): Date | null {
  const { payload } = decode(token);
  if (payload.exp === undefined) return null;
  return new Date(payload.exp * 1000);
}

export function getIssuedAt(token: string): Date | null {
  const { payload } = decode(token);
  if (payload.iat === undefined) return null;
  return new Date(payload.iat * 1000);
}

export function getClaim(token: string, claim: string): unknown {
  const { payload } = decode(token);
  return payload[claim];
}

function decodeBase64Url(input: string): string {
  let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = (4 - (base64.length % 4)) % 4;
  base64 += "=".repeat(pad);

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}
