import { describe, it, expect } from "vitest";
import { sanitizeOutput, estimateOutputSize } from "../sanitize-output.js";

describe("sanitizeOutput", () => {
  it("passes clean text through", () => {
    expect(sanitizeOutput("hello world")).toBe("hello world");
  });

  it("strips control characters", () => {
    const result = sanitizeOutput("hello\x00world\x07!");
    expect(result).toBe("helloworld!");
  });

  it("preserves newlines and tabs", () => {
    const result = sanitizeOutput("line1\nline2\ttab");
    expect(result).toContain("\n");
    expect(result).toContain("\t");
  });

  it("truncates oversized output", () => {
    const long = "x".repeat(200);
    const result = sanitizeOutput(long, { maxLength: 100 });
    expect(result.length).toBeLessThan(200);
    expect(result).toContain("truncated");
  });

  it("redacts API key patterns", () => {
    const result = sanitizeOutput("key: sk-live-abc123def456ghi789jkl012");
    expect(result).not.toContain("sk-live-abc123def456ghi789jkl012");
    expect(result).toContain("...");
  });

  it("redacts GitHub tokens", () => {
    const result = sanitizeOutput("token: ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghij");
    expect(result).toContain("...");
    expect(result).not.toContain("ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  });

  it("redacts AWS access keys", () => {
    const result = sanitizeOutput("key=AKIAIOSFODNN7EXAMPLE");
    expect(result).toContain("...");
  });

  it("can disable secret redaction", () => {
    const result = sanitizeOutput("sk-live-testkey1234567890", { redactSecrets: false });
    expect(result).toBe("sk-live-testkey1234567890");
  });

  it("can disable control char stripping", () => {
    const result = sanitizeOutput("hello\x00", { stripControlChars: false });
    expect(result).toContain("\x00");
  });
});

describe("estimateOutputSize", () => {
  it("estimates token count", () => {
    const result = estimateOutputSize("hello world test");
    expect(result.chars).toBe(16);
    expect(result.estimatedTokens).toBe(4);
    expect(result.oversized).toBe(false);
  });

  it("flags oversized output", () => {
    const result = estimateOutputSize("x".repeat(200_000));
    expect(result.oversized).toBe(true);
  });
});
