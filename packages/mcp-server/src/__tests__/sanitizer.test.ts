import { describe, it, expect } from "vitest";
import {
  escapeHtml, unescapeHtml, stripHtml, escapeRegExp,
  stripAnsi, normalizeWhitespace, truncate, removeControlChars,
} from "../sanitizer.js";

describe("sanitizer", () => {
  it("escapeHtml escapes special chars", () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
    );
    expect(escapeHtml("a & b")).toBe("a &amp; b");
    expect(escapeHtml("it's")).toBe("it&#39;s");
  });

  it("unescapeHtml reverses escapeHtml", () => {
    const original = '<a href="test">link</a>';
    expect(unescapeHtml(escapeHtml(original))).toBe(original);
  });

  it("stripHtml removes all tags", () => {
    expect(stripHtml("<b>bold</b> and <i>italic</i>")).toBe("bold and italic");
    expect(stripHtml("no tags")).toBe("no tags");
  });

  it("escapeRegExp escapes regex special chars", () => {
    const escaped = escapeRegExp("price is $10.00 (USD)");
    expect(new RegExp(escaped).test("price is $10.00 (USD)")).toBe(true);
  });

  it("stripAnsi removes ANSI codes", () => {
    expect(stripAnsi("\x1b[31mred\x1b[0m")).toBe("red");
    expect(stripAnsi("plain")).toBe("plain");
  });

  it("normalizeWhitespace collapses and trims", () => {
    expect(normalizeWhitespace("  hello   world  ")).toBe("hello world");
    expect(normalizeWhitespace("a\n\t b")).toBe("a b");
  });

  it("truncate shortens with suffix", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
    expect(truncate("short", 10)).toBe("short");
    expect(truncate("hello world", 8, ">>")).toBe("hello >>");
  });

  it("removeControlChars strips control characters", () => {
    expect(removeControlChars("hello\x00world\x1F")).toBe("helloworld");
    expect(removeControlChars("normal text")).toBe("normal text");
    expect(removeControlChars("keep\nnewlines\tand\ttabs")).toBe("keep\nnewlines\tand\ttabs");
  });
});
