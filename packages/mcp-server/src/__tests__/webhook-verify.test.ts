import { describe, it, expect } from "vitest";
import { constantTimeEqual, simpleHmac, verifyWebhook, verifyTimestamp, parseSignatureHeader } from "../webhook-verify.js";

describe("constantTimeEqual", () => {
  it("returns true for equal strings", () => {
    expect(constantTimeEqual("abc", "abc")).toBe(true);
  });

  it("returns false for different strings", () => {
    expect(constantTimeEqual("abc", "abd")).toBe(false);
  });

  it("returns false for different lengths", () => {
    expect(constantTimeEqual("abc", "ab")).toBe(false);
  });
});

describe("simpleHmac", () => {
  it("produces consistent output", () => {
    const h1 = simpleHmac("hello", "secret");
    const h2 = simpleHmac("hello", "secret");
    expect(h1).toBe(h2);
  });

  it("different messages produce different hmacs", () => {
    expect(simpleHmac("hello", "secret")).not.toBe(simpleHmac("world", "secret"));
  });

  it("different secrets produce different hmacs", () => {
    expect(simpleHmac("hello", "key1")).not.toBe(simpleHmac("hello", "key2"));
  });
});

describe("verifyWebhook", () => {
  it("validates correct signature", () => {
    const payload = '{"event":"test"}';
    const sig = simpleHmac(payload, "mysecret");
    const result = verifyWebhook(payload, sig, { secret: "mysecret" });
    expect(result.valid).toBe(true);
  });

  it("rejects invalid signature", () => {
    const result = verifyWebhook("payload", "badsig", { secret: "mysecret" });
    expect(result.valid).toBe(false);
  });

  it("rejects missing signature", () => {
    const result = verifyWebhook("payload", "", { secret: "mysecret" });
    expect(result.valid).toBe(false);
  });
});

describe("verifyTimestamp", () => {
  it("accepts recent timestamp", () => {
    const ts = Math.floor(Date.now() / 1000);
    expect(verifyTimestamp(String(ts)).valid).toBe(true);
  });

  it("rejects old timestamp", () => {
    const ts = Math.floor((Date.now() - 600_000) / 1000);
    expect(verifyTimestamp(String(ts)).valid).toBe(false);
  });
});

describe("parseSignatureHeader", () => {
  it("parses sha256=xxx", () => {
    const result = parseSignatureHeader("sha256=abc123");
    expect(result.algorithm).toBe("sha256");
    expect(result.signature).toBe("abc123");
  });

  it("handles no algorithm prefix", () => {
    const result = parseSignatureHeader("abc123");
    expect(result.algorithm).toBe("unknown");
    expect(result.signature).toBe("abc123");
  });
});
