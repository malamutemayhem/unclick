export interface JwtHeader {
  alg: string;
  typ?: string;
  kid?: string;
  [key: string]: unknown;
}

export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  [key: string]: unknown;
}

export interface DecodedJwt {
  header: JwtHeader;
  payload: JwtPayload;
  signature: string;
}

export class JwtDecoder {
  static decode(token: string): DecodedJwt {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT: expected 3 parts separated by dots");
    }

    const header = JSON.parse(JwtDecoder.base64UrlDecode(parts[0])) as JwtHeader;
    const payload = JSON.parse(JwtDecoder.base64UrlDecode(parts[1])) as JwtPayload;
    const signature = parts[2];

    return { header, payload, signature };
  }

  static base64UrlDecode(input: string): string {
    let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) {
      base64 += "=";
    }
    return Buffer.from(base64, "base64").toString("utf-8");
  }

  static base64UrlEncode(input: string): string {
    return Buffer.from(input, "utf-8")
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  static isExpired(token: string, now?: number): boolean {
    const { payload } = JwtDecoder.decode(token);
    if (payload.exp === undefined) return false;
    const currentTime = now !== undefined ? now : Math.floor(Date.now() / 1000);
    return currentTime >= payload.exp;
  }

  static isNotYetValid(token: string, now?: number): boolean {
    const { payload } = JwtDecoder.decode(token);
    if (payload.nbf === undefined) return false;
    const currentTime = now !== undefined ? now : Math.floor(Date.now() / 1000);
    return currentTime < payload.nbf;
  }

  static timeToExpiry(token: string, now?: number): number | null {
    const { payload } = JwtDecoder.decode(token);
    if (payload.exp === undefined) return null;
    const currentTime = now !== undefined ? now : Math.floor(Date.now() / 1000);
    return payload.exp - currentTime;
  }

  static getClaims(token: string): JwtPayload {
    return JwtDecoder.decode(token).payload;
  }

  static getAlgorithm(token: string): string {
    return JwtDecoder.decode(token).header.alg;
  }

  static hasScope(token: string, scope: string): boolean {
    const { payload } = JwtDecoder.decode(token);
    const scopes = payload.scope;
    if (typeof scopes === "string") {
      return scopes.split(" ").includes(scope);
    }
    if (Array.isArray(scopes)) {
      return scopes.includes(scope);
    }
    return false;
  }

  static createUnsigned(payload: JwtPayload, header?: Partial<JwtHeader>): string {
    const h: JwtHeader = { alg: "none", typ: "JWT", ...header };
    const headerPart = JwtDecoder.base64UrlEncode(JSON.stringify(h));
    const payloadPart = JwtDecoder.base64UrlEncode(JSON.stringify(payload));
    return `${headerPart}.${payloadPart}.`;
  }
}
