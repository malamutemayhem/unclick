import { describe, it, expect } from "vitest";
import { computeSignature, verifySignature, verifyGithubWebhook } from "../webhook-verify.js";

describe("computeSignature", () => {
  it("computes hex HMAC-SHA256 by default", () => {
    const sig = computeSignature("payload", "secret");
    expect(sig).toMatch(/^[0-9a-f]{64}$/);
  });

  it("is deterministic", () => {
    const a = computeSignature("test", "key");
    const b = computeSignature("test", "key");
    expect(a).toBe(b);
  });

  it("differs for different payloads", () => {
    const a = computeSignature("a", "key");
    const b = computeSignature("b", "key");
    expect(a).not.toBe(b);
  });

  it("differs for different secrets", () => {
    const a = computeSignature("payload", "key1");
    const b = computeSignature("payload", "key2");
    expect(a).not.toBe(b);
  });

  it("supports prefix", () => {
    const sig = computeSignature("payload", "secret", { prefix: "sha256=" });
    expect(sig).toMatch(/^sha256=[0-9a-f]{64}$/);
  });

  it("supports base64 encoding", () => {
    const sig = computeSignature("payload", "secret", { encoding: "base64" });
    expect(sig).toMatch(/^[A-Za-z0-9+/=]+$/);
  });

  it("supports SHA-1", () => {
    const sig = computeSignature("payload", "secret", { algorithm: "sha1" });
    expect(sig).toMatch(/^[0-9a-f]{40}$/);
  });
});

describe("verifySignature", () => {
  it("returns true for valid signature", () => {
    const sig = computeSignature("hello", "secret");
    expect(verifySignature("hello", "secret", sig)).toBe(true);
  });

  it("returns false for tampered payload", () => {
    const sig = computeSignature("hello", "secret");
    expect(verifySignature("tampered", "secret", sig)).toBe(false);
  });

  it("returns false for wrong secret", () => {
    const sig = computeSignature("hello", "secret");
    expect(verifySignature("hello", "wrong", sig)).toBe(false);
  });

  it("returns false for garbage signature", () => {
    expect(verifySignature("hello", "secret", "garbage")).toBe(false);
  });
});

describe("verifyGithubWebhook", () => {
  it("verifies a valid GitHub webhook", () => {
    const payload = '{"action":"opened"}';
    const secret = "webhook-secret";
    const sig = computeSignature(payload, secret, {
      algorithm: "sha256",
      encoding: "hex",
      prefix: "sha256=",
    });
    expect(verifyGithubWebhook(payload, secret, sig)).toBe(true);
  });

  it("rejects tampered payload", () => {
    const secret = "webhook-secret";
    const sig = computeSignature("original", secret, {
      algorithm: "sha256",
      encoding: "hex",
      prefix: "sha256=",
    });
    expect(verifyGithubWebhook("tampered", secret, sig)).toBe(false);
  });
});
