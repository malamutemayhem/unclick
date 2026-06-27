import { describe, it, expect } from "vitest";
import { JwtDecoder } from "../jwt-decoder.js";

describe("JwtDecoder", () => {
  const payload = { sub: "1234", name: "Alice", iat: 1700000000, exp: 1700003600, scope: "read write" };
  const token = JwtDecoder.createUnsigned(payload);

  it("decodes a JWT into header, payload, signature", () => {
    const decoded = JwtDecoder.decode(token);
    expect(decoded.header.alg).toBe("none");
    expect(decoded.header.typ).toBe("JWT");
    expect(decoded.payload.sub).toBe("1234");
    expect(decoded.payload.name).toBe("Alice");
  });

  it("throws on invalid token format", () => {
    expect(() => JwtDecoder.decode("not.a.valid.token")).toThrow("Invalid JWT");
    expect(() => JwtDecoder.decode("onlyonepart")).toThrow("Invalid JWT");
  });

  it("base64url encodes and decodes round-trip", () => {
    const original = '{"test": true, "value": 123}';
    const encoded = JwtDecoder.base64UrlEncode(original);
    expect(encoded).not.toContain("+");
    expect(encoded).not.toContain("/");
    expect(encoded).not.toContain("=");
    expect(JwtDecoder.base64UrlDecode(encoded)).toBe(original);
  });

  it("checks expiration correctly", () => {
    expect(JwtDecoder.isExpired(token, 1700000000)).toBe(false);
    expect(JwtDecoder.isExpired(token, 1700003600)).toBe(true);
    expect(JwtDecoder.isExpired(token, 1700003599)).toBe(false);
  });

  it("returns false for tokens with no exp", () => {
    const noExpToken = JwtDecoder.createUnsigned({ sub: "x" });
    expect(JwtDecoder.isExpired(noExpToken, 9999999999)).toBe(false);
  });

  it("checks nbf (not before)", () => {
    const nbfToken = JwtDecoder.createUnsigned({ nbf: 1700000000 });
    expect(JwtDecoder.isNotYetValid(nbfToken, 1699999999)).toBe(true);
    expect(JwtDecoder.isNotYetValid(nbfToken, 1700000000)).toBe(false);
  });

  it("calculates time to expiry", () => {
    expect(JwtDecoder.timeToExpiry(token, 1700000000)).toBe(3600);
    expect(JwtDecoder.timeToExpiry(token, 1700003000)).toBe(600);
  });

  it("returns null for time to expiry when no exp", () => {
    const noExpToken = JwtDecoder.createUnsigned({ sub: "x" });
    expect(JwtDecoder.timeToExpiry(noExpToken)).toBeNull();
  });

  it("gets claims", () => {
    const claims = JwtDecoder.getClaims(token);
    expect(claims.sub).toBe("1234");
    expect(claims.name).toBe("Alice");
  });

  it("gets algorithm", () => {
    expect(JwtDecoder.getAlgorithm(token)).toBe("none");
  });

  it("checks scope", () => {
    expect(JwtDecoder.hasScope(token, "read")).toBe(true);
    expect(JwtDecoder.hasScope(token, "write")).toBe(true);
    expect(JwtDecoder.hasScope(token, "admin")).toBe(false);
  });

  it("creates unsigned token that round-trips", () => {
    const t = JwtDecoder.createUnsigned({ sub: "test" }, { alg: "none" });
    const decoded = JwtDecoder.decode(t);
    expect(decoded.payload.sub).toBe("test");
    expect(decoded.signature).toBe("");
  });
});
