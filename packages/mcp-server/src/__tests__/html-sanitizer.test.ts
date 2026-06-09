import { describe, it, expect } from "vitest";
import { sanitize, stripTags, escapeHtml, unescapeHtml } from "../html-sanitizer.js";

describe("HtmlSanitizer", () => {
  it("keeps allowed tags", () => {
    const result = sanitize("<p>Hello <b>world</b></p>");
    expect(result).toContain("<p>");
    expect(result).toContain("<b>");
  });

  it("strips disallowed tags", () => {
    const result = sanitize("<p>Hello</p><script>alert(1)</script>");
    expect(result).not.toContain("<script>");
    expect(result).not.toContain("alert");
  });

  it("strips style tags", () => {
    const result = sanitize("<style>body{color:red}</style><p>text</p>");
    expect(result).not.toContain("<style>");
    expect(result).toContain("<p>");
  });

  it("strips HTML comments", () => {
    const result = sanitize("<!-- comment --><p>text</p>");
    expect(result).not.toContain("<!--");
    expect(result).toContain("<p>");
  });

  it("keeps allowed attributes", () => {
    const result = sanitize('<a href="https://example.com" title="link">click</a>');
    expect(result).toContain('href="https://example.com"');
    expect(result).toContain('title="link"');
  });

  it("strips disallowed attributes", () => {
    const result = sanitize('<p onclick="evil()">text</p>');
    expect(result).not.toContain("onclick");
  });

  it("blocks javascript: URLs", () => {
    const result = sanitize('<a href="javascript:alert(1)">link</a>');
    expect(result).not.toContain("javascript:");
  });

  it("blocks data: URLs", () => {
    const result = sanitize('<img src="data:text/html,evil" />');
    expect(result).not.toContain("data:");
  });

  it("allows relative URLs", () => {
    const result = sanitize('<a href="/page">link</a>');
    expect(result).toContain('href="/page"');
  });

  it("strips unknown tags", () => {
    const result = sanitize("<custom>content</custom>");
    expect(result).not.toContain("<custom>");
    expect(result).toContain("content");
  });

  it("strips empty elements when configured", () => {
    const result = sanitize("<p></p><p>keep</p>", { stripEmpty: true });
    expect(result).not.toContain("<p></p>");
    expect(result).toContain("keep");
  });

  it("respects custom allowed tags", () => {
    const result = sanitize("<b>bold</b><i>italic</i>", { allowedTags: ["b"] });
    expect(result).toContain("<b>");
    expect(result).not.toContain("<i>");
  });
});

describe("stripTags", () => {
  it("removes all tags", () => {
    expect(stripTags("<p>Hello <b>world</b></p>")).toBe("Hello world");
  });

  it("removes script content", () => {
    expect(stripTags("before<script>evil</script>after")).toBe("beforeafter");
  });
});

describe("escapeHtml/unescapeHtml", () => {
  it("escapes special characters", () => {
    expect(escapeHtml('<script>"test" & \'val\'')).toBe("&lt;script&gt;&quot;test&quot; &amp; &#39;val&#39;");
  });

  it("unescapes HTML entities", () => {
    expect(unescapeHtml("&lt;p&gt;&amp;&quot;&#39;")).toBe('<p>&"\'');
  });

  it("round trips", () => {
    const text = '<script>alert("xss")</script>';
    expect(unescapeHtml(escapeHtml(text))).toBe(text);
  });
});
