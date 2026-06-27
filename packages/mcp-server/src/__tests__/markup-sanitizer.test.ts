import { describe, it, expect } from "vitest";
import { MarkupSanitizer } from "../markup-sanitizer.js";

describe("MarkupSanitizer", () => {
  it("removes script tags", () => {
    const result = MarkupSanitizer.sanitize('<p>Hello</p><script>alert("xss")</script>');
    expect(result).not.toContain("script");
    expect(result).toContain("<p>Hello</p>");
  });

  it("removes style tags", () => {
    const result = MarkupSanitizer.sanitize("<style>body{color:red}</style><p>Hi</p>");
    expect(result).not.toContain("style");
  });

  it("removes disallowed tags", () => {
    const result = MarkupSanitizer.sanitize("<p>OK</p><iframe src='x'></iframe>");
    expect(result).toContain("<p>OK</p>");
    expect(result).not.toContain("iframe");
  });

  it("preserves allowed tags", () => {
    const result = MarkupSanitizer.sanitize("<p><strong>Bold</strong> and <em>italic</em></p>");
    expect(result).toContain("<strong>");
    expect(result).toContain("<em>");
  });

  it("filters dangerous URLs in href", () => {
    const result = MarkupSanitizer.sanitize('<a href="javascript:alert(1)">Click</a>');
    expect(result).not.toContain("javascript:");
  });

  it("allows safe URLs", () => {
    const result = MarkupSanitizer.sanitize('<a href="https://example.com">Link</a>');
    expect(result).toContain('href="https://example.com"');
  });

  it("removes disallowed attributes", () => {
    const result = MarkupSanitizer.sanitize('<p onclick="evil()">Text</p>');
    expect(result).not.toContain("onclick");
    expect(result).toContain("<p>");
  });

  it("removes HTML comments", () => {
    const result = MarkupSanitizer.sanitize("<!-- comment --><p>Text</p>");
    expect(result).not.toContain("<!--");
  });

  it("escapes HTML entities", () => {
    expect(MarkupSanitizer.escapeHtml('<script>"test"</script>')).toBe("&lt;script&gt;&quot;test&quot;&lt;/script&gt;");
  });

  it("unescapes HTML entities", () => {
    expect(MarkupSanitizer.unescapeHtml("&lt;p&gt;Hello&lt;/p&gt;")).toBe("<p>Hello</p>");
  });

  it("strips all tags", () => {
    expect(MarkupSanitizer.stripTags("<p>Hello <b>World</b></p>")).toBe("Hello World");
  });

  it("detects dangerous URLs", () => {
    expect(MarkupSanitizer.isDangerousUrl("javascript:alert(1)")).toBe(true);
    expect(MarkupSanitizer.isDangerousUrl("https://safe.com")).toBe(false);
  });
});
