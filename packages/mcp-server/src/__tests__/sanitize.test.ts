import { describe, it, expect } from "vitest";
import {
  sanitizeHtml, stripTags, sanitizeFilename, sanitizeUrl,
  escapeRegex, escapeSql, sanitizeHeaderValue, normalizeWhitespace,
  truncate, slugify, camelToKebab, kebabToCamel
} from "../sanitize.js";

describe("sanitizeHtml", () => {
  it("escapes all HTML entities", () => {
    expect(sanitizeHtml('<script>"alert\'</script>')).toBe("&lt;script&gt;&quot;alert&#39;&lt;/script&gt;");
  });
});

describe("stripTags", () => {
  it("removes all HTML tags", () => {
    expect(stripTags("<p>Hello <b>world</b></p>")).toBe("Hello world");
  });
});

describe("sanitizeFilename", () => {
  it("removes dangerous characters", () => {
    expect(sanitizeFilename('file<>:"/\\|?*name.txt')).toBe("filename.txt");
  });

  it("removes leading dots", () => {
    expect(sanitizeFilename("..secret")).toBe("secret");
  });

  it("replaces spaces with underscores", () => {
    expect(sanitizeFilename("my file.txt")).toBe("my_file.txt");
  });
});

describe("sanitizeUrl", () => {
  it("blocks javascript: urls", () => {
    expect(sanitizeUrl("javascript:alert(1)")).toBe("");
  });

  it("blocks data: urls", () => {
    expect(sanitizeUrl("data:text/html,<h1>hi</h1>")).toBe("");
  });

  it("allows normal urls", () => {
    expect(sanitizeUrl("https://example.com")).toBe("https://example.com");
  });
});

describe("escapeRegex", () => {
  it("escapes special regex characters", () => {
    expect(escapeRegex("[test].*+?")).toBe("\\[test\\]\\.\\*\\+\\?");
  });
});

describe("escapeSql", () => {
  it("doubles single quotes", () => {
    expect(escapeSql("it's")).toBe("it''s");
  });
});

describe("sanitizeHeaderValue", () => {
  it("strips CR and LF", () => {
    expect(sanitizeHeaderValue("value\r\ninjected")).toBe("valueinjected");
  });
});

describe("normalizeWhitespace", () => {
  it("collapses multiple spaces", () => {
    expect(normalizeWhitespace("  hello   world  ")).toBe("hello world");
  });
});

describe("truncate", () => {
  it("truncates long strings", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
  });

  it("no-op for short strings", () => {
    expect(truncate("hi", 10)).toBe("hi");
  });
});

describe("slugify", () => {
  it("creates url-safe slug", () => {
    expect(slugify("Hello World! #2024")).toBe("hello-world-2024");
  });
});

describe("camelToKebab", () => {
  it("converts camelCase", () => {
    expect(camelToKebab("backgroundColor")).toBe("background-color");
  });
});

describe("kebabToCamel", () => {
  it("converts kebab-case", () => {
    expect(kebabToCamel("background-color")).toBe("backgroundColor");
  });
});
