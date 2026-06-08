import { describe, it, expect } from "vitest";
import { render, compile } from "../template-engine.js";

describe("render", () => {
  it("replaces variables", () => {
    expect(render("Hello {{name}}!", { name: "World" })).toBe("Hello World!");
  });

  it("resolves dot paths", () => {
    expect(render("{{user.name}}", { user: { name: "Alice" } })).toBe("Alice");
  });

  it("handles missing vars as empty", () => {
    expect(render("Hi {{name}}", {})).toBe("Hi ");
  });

  it("if/endif shows on truthy", () => {
    expect(render("{{#if show}}yes{{/if}}", { show: true })).toBe("yes");
  });

  it("if/endif hides on falsy", () => {
    expect(render("{{#if show}}yes{{/if}}", { show: false })).toBe("");
  });

  it("if/else branch", () => {
    expect(render("{{#if admin}}admin{{else}}user{{/if}}", { admin: false })).toBe("user");
    expect(render("{{#if admin}}admin{{else}}user{{/if}}", { admin: true })).toBe("admin");
  });

  it("each loop", () => {
    expect(render("{{#each items as item}}{{item}} {{/each}}", { items: ["a", "b", "c"] })).toBe("a b c ");
  });

  it("each with objects", () => {
    const data = { users: [{ name: "Alice" }, { name: "Bob" }] };
    expect(render("{{#each users as u}}{{u.name}} {{/each}}", data)).toBe("Alice Bob ");
  });

  it("nested if inside each", () => {
    const data = { items: [{ show: true, v: "a" }, { show: false, v: "b" }] };
    expect(render("{{#each items as i}}{{#if i.show}}{{i.v}}{{/if}}{{/each}}", data)).toBe("a");
  });
});

describe("compile", () => {
  it("returns reusable function", () => {
    const fn = compile("Hello {{name}}!");
    expect(fn({ name: "A" })).toBe("Hello A!");
    expect(fn({ name: "B" })).toBe("Hello B!");
  });

  it("custom delimiters", () => {
    const fn = compile("Hello <% name %>!", { openTag: "<%", closeTag: "%>" });
    expect(fn({ name: "World" })).toBe("Hello World!");
  });
});
