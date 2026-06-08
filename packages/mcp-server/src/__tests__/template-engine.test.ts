import { describe, it, expect } from "vitest";
import { render, renderWithBlocks, escape, unescape } from "../template-engine.js";

describe("template-engine", () => {
  it("replaces simple variables", () => {
    expect(render("Hello {{name}}!", { name: "World" })).toBe("Hello World!");
  });

  it("resolves nested paths", () => {
    expect(render("{{user.name}}", { user: { name: "Alice" } })).toBe("Alice");
  });

  it("returns empty for missing keys", () => {
    expect(render("{{missing}}", {})).toBe("");
  });

  it("processes if blocks", () => {
    const tpl = "{{#if show}}visible{{/if}}";
    expect(renderWithBlocks(tpl, { show: true })).toBe("visible");
    expect(renderWithBlocks(tpl, { show: false })).toBe("");
  });

  it("processes if/else blocks", () => {
    const tpl = "{{#if logged}}hi{{else}}login{{/if}}";
    expect(renderWithBlocks(tpl, { logged: true })).toBe("hi");
    expect(renderWithBlocks(tpl, { logged: false })).toBe("login");
  });

  it("processes each blocks", () => {
    const tpl = "{{#each items}}{{this}},{{/each}}";
    expect(renderWithBlocks(tpl, { items: ["a", "b", "c"] })).toBe("a,b,c,");
  });

  it("each with object items", () => {
    const tpl = "{{#each users}}{{name}} {{/each}}";
    expect(renderWithBlocks(tpl, { users: [{ name: "A" }, { name: "B" }] })).toBe("A B ");
  });

  it("escapes HTML", () => {
    expect(escape('<script>"hi"</script>')).toBe("&lt;script&gt;&quot;hi&quot;&lt;/script&gt;");
  });

  it("unescapes HTML", () => {
    expect(unescape("&lt;b&gt;bold&lt;/b&gt;")).toBe("<b>bold</b>");
  });
});
