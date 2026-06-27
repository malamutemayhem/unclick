import { describe, it, expect } from "vitest";
import { sanitizeUrl, checkSsrf, redactUrlForLog, validateAndSanitize } from "../url-sanitizer.js";

describe("sanitizeUrl", () => {
  it("strips basic auth credentials", () => {
    const result = sanitizeUrl("https://user:pass@example.com/api");
    expect(result).not.toContain("user");
    expect(result).not.toContain("pass");
    expect(result).toContain("example.com/api");
  });

  it("redacts secret query params", () => {
    const result = sanitizeUrl("https://api.example.com/v1?api_key=sk_123&format=json");
    expect(result).toContain("api_key=***");
    expect(result).toContain("format=json");
  });

  it("redacts token params", () => {
    const result = sanitizeUrl("https://example.com?access_token=abc123");
    expect(result).toContain("access_token=***");
  });

  it("preserves non-secret params", () => {
    const result = sanitizeUrl("https://example.com/search?q=hello&page=1");
    expect(result).toContain("q=hello");
    expect(result).toContain("page=1");
  });

  it("returns [invalid-url] for garbage input", () => {
    expect(sanitizeUrl("not a url")).toBe("[invalid-url]");
  });

  it("supports extra secret param patterns", () => {
    const result = sanitizeUrl("https://example.com?custom_field=secret", {
      extraSecretParams: ["custom_field"],
    });
    expect(result).toContain("custom_field=***");
  });

  it("can skip auth stripping", () => {
    const result = sanitizeUrl("https://user:pass@example.com", { stripAuth: false });
    expect(result).toContain("user");
  });
});

describe("checkSsrf", () => {
  it("allows normal URLs", () => {
    expect(checkSsrf("https://api.github.com/repos")).toEqual({ safe: true });
  });

  it("blocks metadata endpoints", () => {
    const result = checkSsrf("http://169.254.169.254/latest/meta-data/");
    expect(result.safe).toBe(false);
    expect(result.reason).toContain("Blocked host");
  });

  it("blocks localhost", () => {
    expect(checkSsrf("http://localhost:8080/admin").safe).toBe(false);
  });

  it("blocks private IP ranges", () => {
    expect(checkSsrf("http://192.168.1.1/admin").safe).toBe(false);
    expect(checkSsrf("http://10.0.0.1/internal").safe).toBe(false);
    expect(checkSsrf("http://172.16.0.1/secret").safe).toBe(false);
  });

  it("blocks non-http protocols", () => {
    const result = checkSsrf("file:///etc/passwd");
    expect(result.safe).toBe(false);
    expect(result.reason).toContain("Blocked protocol");
  });

  it("blocks invalid URLs", () => {
    expect(checkSsrf("not-a-url").safe).toBe(false);
  });

  it("blocks IPv6 loopback", () => {
    expect(checkSsrf("http://[::1]:8080/").safe).toBe(false);
  });
});

describe("redactUrlForLog", () => {
  it("strips both auth and secret params", () => {
    const result = redactUrlForLog("https://user:pass@example.com/api?api_key=sk_123&q=test");
    expect(result).not.toContain("user");
    expect(result).not.toContain("pass");
    expect(result).toContain("api_key=***");
    expect(result).toContain("q=test");
  });
});

describe("validateAndSanitize", () => {
  it("returns both sanitized URL and SSRF check", () => {
    const result = validateAndSanitize("https://api.example.com?token=abc");
    expect(result.ssrf.safe).toBe(true);
    expect(result.url).toContain("token=***");
  });

  it("flags SSRF while still sanitizing", () => {
    const result = validateAndSanitize("http://169.254.169.254/latest?token=abc");
    expect(result.ssrf.safe).toBe(false);
    expect(result.url).toContain("token=***");
  });
});
