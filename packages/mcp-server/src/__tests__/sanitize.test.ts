import { describe, it, expect } from "vitest";
import { escapeHtml, unescapeHtml, stripHtml, escapeRegex, sanitizeFilename, truncate, normalizeWhitespace, removeControlChars, sanitizeSql, escapeShell } from "../sanitize.js";

describe("sanitize", () => {
  describe("escapeHtml / unescapeHtml", () => {
    it("escapes special chars", () => {
      expect(escapeHtml('<script>"hi"</script>')).toBe("&lt;script&gt;&quot;hi&quot;&lt;/script&gt;");
    });
    it("round-trips", () => {
      const input = '<p class="x">Hello & world</p>';
      expect(unescapeHtml(escapeHtml(input))).toBe(input);
    });
    it("escapes ampersand", () => { expect(escapeHtml("a&b")).toBe("a&amp;b"); });
    it("escapes single quote", () => { expect(escapeHtml("it's")).toContain("&#x27;"); });
  });

  describe("stripHtml", () => {
    it("removes tags", () => { expect(stripHtml("<b>bold</b>")).toBe("bold"); });
    it("handles nested tags", () => { expect(stripHtml("<div><p>hi</p></div>")).toBe("hi"); });
  });

  describe("escapeRegex", () => {
    it("escapes special regex chars", () => {
      expect(escapeRegex("a.b*c")).toBe("a\\.b\\*c");
    });
  });

  describe("sanitizeFilename", () => {
    it("removes illegal chars", () => {
      expect(sanitizeFilename('my:file?.txt')).toBe("myfile.txt");
    });
    it("replaces spaces with underscore", () => {
      expect(sanitizeFilename("my file.txt")).toBe("my_file.txt");
    });
    it("removes leading dots", () => {
      expect(sanitizeFilename("..hidden")).toBe("hidden");
    });
    it("truncates to 255", () => {
      expect(sanitizeFilename("a".repeat(300)).length).toBe(255);
    });
  });

  describe("truncate", () => {
    it("truncates long strings", () => { expect(truncate("hello world", 8)).toBe("hello..."); });
    it("returns short strings unchanged", () => { expect(truncate("hi", 10)).toBe("hi"); });
    it("custom suffix", () => { expect(truncate("hello world", 7, "~")).toBe("hello ~"); });
  });

  describe("normalizeWhitespace", () => {
    it("collapses whitespace", () => { expect(normalizeWhitespace("  a   b  c  ")).toBe("a b c"); });
  });

  describe("removeControlChars", () => {
    it("removes control chars", () => { expect(removeControlChars("a\x00b\x01c")).toBe("abc"); });
    it("keeps newlines and tabs", () => { expect(removeControlChars("a\nb\tc")).toBe("a\nb\tc"); });
  });

  describe("sanitizeSql", () => {
    it("escapes single quotes", () => { expect(sanitizeSql("it's")).toBe("it''s"); });
  });

  describe("escapeShell", () => {
    it("wraps in single quotes", () => { expect(escapeShell("hello")).toBe("'hello'"); });
    it("escapes inner quotes", () => { expect(escapeShell("it's")).toBe("'it'\\''s'"); });
  });
});
