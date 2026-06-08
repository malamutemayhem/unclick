import { describe, it, expect } from "vitest";
import { escapeHtml, unescapeHtml, stripTags, escapeRegex, sanitizeFilename, sanitizeUrl, truncate } from "../sanitize.js";

describe("escapeHtml", () => {
  it("escapes special chars", () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe("&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;");
  });

  it("escapes ampersand", () => {
    expect(escapeHtml("a & b")).toBe("a &amp; b");
  });
});

describe("unescapeHtml", () => {
  it("unescapes entities", () => {
    expect(unescapeHtml("&lt;div&gt;")).toBe("<div>");
  });

  it("roundtrips", () => {
    const input = '<a href="test">';
    expect(unescapeHtml(escapeHtml(input))).toBe(input);
  });
});

describe("stripTags", () => {
  it("removes HTML tags", () => {
    expect(stripTags("<p>Hello <b>world</b></p>")).toBe("Hello world");
  });

  it("handles self-closing tags", () => {
    expect(stripTags("line<br/>break")).toBe("linebreak");
  });
});

describe("escapeRegex", () => {
  it("escapes special regex chars", () => {
    expect(escapeRegex("hello.world*")).toBe("hello\\.world\\*");
  });

  it("escaped string works in RegExp", () => {
    const pattern = escapeRegex("[test]");
    expect(new RegExp(pattern).test("[test]")).toBe(true);
  });
});

describe("sanitizeFilename", () => {
  it("removes invalid characters", () => {
    expect(sanitizeFilename('file<>:"/\\|?*name.txt')).toBe("filename.txt");
  });

  it("limits length to 255", () => {
    const long = "a".repeat(300) + ".txt";
    expect(sanitizeFilename(long).length).toBeLessThanOrEqual(255);
  });
});

describe("sanitizeUrl", () => {
  it("blocks javascript urls", () => {
    expect(sanitizeUrl("javascript:alert(1)")).toBe("");
  });

  it("blocks data urls", () => {
    expect(sanitizeUrl("data:text/html,<script>")).toBe("");
  });

  it("allows normal urls", () => {
    expect(sanitizeUrl("https://example.com")).toBe("https://example.com");
  });
});

describe("truncate", () => {
  it("truncates long strings", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
  });

  it("keeps short strings unchanged", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("custom suffix", () => {
    expect(truncate("hello world", 9, "--")).toBe("hello w--");
  });
});
