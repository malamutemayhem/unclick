import { describe, it, expect } from "vitest";
import { render, extractVars, compile } from "../string-template.js";

describe("string-template", () => {
  describe("render", () => {
    it("replaces simple variables", () => {
      expect(render("Hello {{ name }}!", { name: "World" })).toBe("Hello World!");
    });

    it("handles no spaces in delimiters", () => {
      expect(render("{{name}}", { name: "Alice" })).toBe("Alice");
    });

    it("resolves dot paths", () => {
      expect(render("{{ user.name }}", { user: { name: "Bob" } })).toBe("Bob");
    });

    it("returns empty string for missing vars", () => {
      expect(render("Hi {{ name }}", {})).toBe("Hi ");
    });

    it("returns empty string for null in path", () => {
      expect(render("{{ a.b.c }}", { a: null })).toBe("");
    });

    it("converts numbers to strings", () => {
      expect(render("Count: {{ n }}", { n: 42 })).toBe("Count: 42");
    });

    it("handles multiple replacements", () => {
      expect(render("{{ a }} and {{ b }}", { a: "X", b: "Y" })).toBe("X and Y");
    });

    it("supports custom delimiters", () => {
      expect(render("<% name %>", { name: "Hi" }, { open: "<%", close: "%>" })).toBe("Hi");
    });
  });

  describe("extractVars", () => {
    it("extracts variable names", () => {
      expect(extractVars("{{ a }} and {{ b }}")).toEqual(["a", "b"]);
    });

    it("deduplicates variables", () => {
      expect(extractVars("{{ x }} {{ x }}")).toEqual(["x"]);
    });

    it("extracts dot-path names", () => {
      expect(extractVars("{{ user.name }}")).toEqual(["user.name"]);
    });

    it("returns empty for no vars", () => {
      expect(extractVars("no variables here")).toEqual([]);
    });
  });

  describe("compile", () => {
    it("returns a reusable render function", () => {
      const fn = compile("Hello {{ name }}!");
      expect(fn({ name: "A" })).toBe("Hello A!");
      expect(fn({ name: "B" })).toBe("Hello B!");
    });

    it("supports custom delimiters", () => {
      const fn = compile("[[ x ]]", { open: "[[", close: "]]" });
      expect(fn({ x: "ok" })).toBe("ok");
    });
  });
});
