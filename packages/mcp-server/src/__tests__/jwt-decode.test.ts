import { describe, it, expect } from "vitest";
import { decode, isExpired, getExpiresAt, getIssuedAt, getClaim } from "../jwt-decode.js";

function makeJwt(payload: Record<string, unknown>, header?: Record<string, unknown>): string {
  const h = header || { alg: "HS256", typ: "JWT" };
  const encode = (obj: unknown) => {
    const json = JSON.stringify(obj);
    const b64 = btoa(json);
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  };
  return `${encode(h)}.${encode(payload)}.fakesig`;
}

describe("jwt-decode", () => {
  describe("decode", () => {
    it("decodes header and payload", () => {
      const token = makeJwt({ sub: "123", name: "test" });
      const { header, payload, signature } = decode(token);
      expect(header.alg).toBe("HS256");
      expect(payload.sub).toBe("123");
      expect(signature).toBe("fakesig");
    });

    it("throws for invalid token", () => {
      expect(() => decode("not.a.valid.jwt.here")).toThrow("Invalid JWT");
      expect(() => decode("onlyonepart")).toThrow("Invalid JWT");
    });
  });

  describe("isExpired", () => {
    it("returns false for non-expired token", () => {
      const exp = Math.floor(Date.now() / 1000) + 3600;
      expect(isExpired(makeJwt({ exp }))).toBe(false);
    });

    it("returns true for expired token", () => {
      const exp = Math.floor(Date.now() / 1000) - 100;
      expect(isExpired(makeJwt({ exp }))).toBe(true);
    });

    it("returns false when no exp claim", () => {
      expect(isExpired(makeJwt({}))).toBe(false);
    });

    it("respects clock skew", () => {
      const exp = Math.floor(Date.now() / 1000) - 5;
      expect(isExpired(makeJwt({ exp }), 10)).toBe(false);
    });
  });

  describe("getExpiresAt", () => {
    it("returns Date for exp claim", () => {
      const exp = Math.floor(Date.now() / 1000) + 3600;
      const d = getExpiresAt(makeJwt({ exp }));
      expect(d).toBeInstanceOf(Date);
    });

    it("returns null when no exp", () => {
      expect(getExpiresAt(makeJwt({}))).toBeNull();
    });
  });

  describe("getIssuedAt", () => {
    it("returns Date for iat claim", () => {
      const iat = Math.floor(Date.now() / 1000);
      expect(getIssuedAt(makeJwt({ iat }))).toBeInstanceOf(Date);
    });

    it("returns null when no iat", () => {
      expect(getIssuedAt(makeJwt({}))).toBeNull();
    });
  });

  describe("getClaim", () => {
    it("returns specific claim", () => {
      expect(getClaim(makeJwt({ role: "admin" }), "role")).toBe("admin");
    });

    it("returns undefined for missing claim", () => {
      expect(getClaim(makeJwt({}), "role")).toBeUndefined();
    });
  });
});
