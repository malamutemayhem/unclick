import { describe, it, expect } from "vitest";
import { render, renderFull, escape, unescape } from "../template-engine.js";

describe("template-engine", () => {
  it("simple variable substitution", () => {
    expect(render("Hello {{name}}!", { name: "World" })).toBe("Hello World!");
  });

  it("nested dot paths", () => {
    expect(render("{{user.name}}", { user: { name: "Alice" } })).toBe("Alice");
  });

  it("missing vars become empty string", () => {
    expect(render("{{missing}}", {})).toBe("");
  });

  it("if block with truthy condition", () => {
    const tpl = "{{#if show}}visible{{/if}}";
    expect(renderFull(tpl, { show: true })).toBe("visible");
  });

  it("if block with falsy condition", () => {
    const tpl = "{{#if show}}visible{{/if}}";
    expect(renderFull(tpl, { show: false })).toBe("");
  });

  it("if/else block", () => {
    const tpl = "{{#if loggedIn}}Hi{{else}}Login{{/if}}";
    expect(renderFull(tpl, { loggedIn: true })).toBe("Hi");
    expect(renderFull(tpl, { loggedIn: false })).toBe("Login");
  });

  it("each loop over array", () => {
    const tpl = "{{#each items}}{{name}},{{/each}}";
    const data = { items: [{ name: "a" }, { name: "b" }, { name: "c" }] };
    expect(renderFull(tpl, data)).toBe("a,b,c,");
  });

  it("each loop with @index", () => {
    const tpl = "{{#each items}}{{@index}}{{/each}}";
    const data = { items: ["a", "b", "c"] };
    expect(renderFull(tpl, data)).toBe("012");
  });

  it("empty array produces no output", () => {
    const tpl = "{{#each items}}x{{/each}}";
    expect(renderFull(tpl, { items: [] })).toBe("");
  });

  it("escape HTML entities", () => {
    expect(escape('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
  });

  it("unescape reverses escape", () => {
    const original = '<a href="test">link</a>';
    expect(unescape(escape(original))).toBe(original);
  });

  it("handles null and undefined gracefully", () => {
    expect(render("{{a}}", { a: null })).toBe("");
    expect(render("{{a}}", { a: undefined })).toBe("");
  });
});
