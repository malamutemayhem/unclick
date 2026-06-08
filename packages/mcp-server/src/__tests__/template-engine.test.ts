import { describe, it, expect } from "vitest";
import { render, compile, escapeHtml, unescapeHtml } from "../template-engine.js";

describe("render", () => {
  it("replaces simple variables", () => {
    expect(render("Hello {{ name }}!", { name: "World" })).toBe("Hello World!");
  });

  it("handles nested paths", () => {
    expect(render("{{ user.name }}", { user: { name: "Alice" } })).toBe("Alice");
  });

  it("returns empty string for missing values", () => {
    expect(render("{{ missing }}", {})).toBe("");
  });

  it("escapes HTML by default", () => {
    expect(render("{{ content }}", { content: "<b>bold</b>" })).toBe("&lt;b&gt;bold&lt;/b&gt;");
  });

  it("can disable escaping", () => {
    expect(render("{{ content }}", { content: "<b>bold</b>" }, { escape: false })).toBe("<b>bold</b>");
  });

  it("handles multiple replacements", () => {
    const result = render("{{ a }} and {{ b }}", { a: "foo", b: "bar" });
    expect(result).toBe("foo and bar");
  });

  it("handles custom delimiters", () => {
    const result = render("<% name %>", { name: "test" }, { openTag: "<%", closeTag: "%>" });
    expect(result).toBe("test");
  });

  it("converts non-string values to string", () => {
    expect(render("{{ num }}", { num: 42 })).toBe("42");
    expect(render("{{ bool }}", { bool: true })).toBe("true");
  });
});

describe("compile", () => {
  it("returns a reusable template function", () => {
    const tmpl = compile("Hello {{ name }}!");
    expect(tmpl({ name: "Alice" })).toBe("Hello Alice!");
    expect(tmpl({ name: "Bob" })).toBe("Hello Bob!");
  });
});

describe("escapeHtml", () => {
  it("escapes all special characters", () => {
    expect(escapeHtml('<script>"hello" & \'world\'</script>')).toBe(
      "&lt;script&gt;&quot;hello&quot; &amp; &#39;world&#39;&lt;/script&gt;"
    );
  });

  it("leaves safe strings unchanged", () => {
    expect(escapeHtml("hello world")).toBe("hello world");
  });
});

describe("unescapeHtml", () => {
  it("unescapes all entities", () => {
    expect(unescapeHtml("&lt;b&gt;&amp;&quot;&#39;&lt;/b&gt;")).toBe('<b>&"\'</b>');
  });

  it("roundtrips with escapeHtml", () => {
    const original = '<div class="test">&</div>';
    expect(unescapeHtml(escapeHtml(original))).toBe(original);
  });
});
