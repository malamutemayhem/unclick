import { describe, it, expect } from "vitest";
import { sanitizeHtml, stripTags, sanitizeFilename, sanitizeUrl, escapeRegex, escapeShell, truncate, normalizeWhitespace, removeNullBytes } from "../sanitize.js";

describe("sanitize", () => {
  it("sanitizeHtml escapes special chars", () => {
    expect(sanitizeHtml('<script>alert("xss")</script>')).toBe("&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;");
  });

  it("stripTags removes all tags", () => {
    expect(stripTags("<b>bold</b> and <i>italic</i>")).toBe("bold and italic");
  });

  it("sanitizeFilename removes dangerous chars", () => {
    expect(sanitizeFilename('../../etc/passwd')).toBe("etcpasswd");
    expect(sanitizeFilename('file<>:"|name')).toBe("filename");
  });

  it("sanitizeUrl blocks javascript:", () => {
    expect(sanitizeUrl("javascript:alert(1)")).toBe("");
    expect(sanitizeUrl("JAVASCRIPT:alert(1)")).toBe("");
    expect(sanitizeUrl("data:text/html,<h1>hi</h1>")).toBe("");
  });

  it("sanitizeUrl allows safe urls", () => {
    expect(sanitizeUrl("https://example.com")).toBe("https://example.com");
  });

  it("escapeRegex escapes special regex chars", () => {
    expect(escapeRegex("hello.world (test)")).toBe("hello\\.world \\(test\\)");
  });

  it("escapeShell wraps in single quotes", () => {
    expect(escapeShell("hello world")).toBe("'hello world'");
    expect(escapeShell("it's")).toBe("'it'\\''s'");
  });

  it("truncate with suffix", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
    expect(truncate("short", 10)).toBe("short");
  });

  it("normalizeWhitespace collapses spaces", () => {
    expect(normalizeWhitespace("  hello   world  ")).toBe("hello world");
  });

  it("removeNullBytes strips nulls", () => {
    expect(removeNullBytes("he\0llo")).toBe("hello");
  });
});
