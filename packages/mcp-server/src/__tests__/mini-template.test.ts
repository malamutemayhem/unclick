import { describe, it, expect } from "vitest";
import { compile } from "../mini-template.js";

describe("mini-template", () => {
  it("renders plain text", () => {
    const fn = compile("hello world");
    expect(fn({})).toBe("hello world");
  });

  it("interpolates variables", () => {
    const fn = compile("Hello {{name}}!");
    expect(fn({ name: "Alice" })).toBe("Hello Alice!");
  });

  it("resolves dotted paths", () => {
    const fn = compile("{{user.name}}");
    expect(fn({ user: { name: "Bob" } })).toBe("Bob");
  });

  it("renders if blocks", () => {
    const fn = compile("{{#if show}}visible{{/if}}");
    expect(fn({ show: true })).toBe("visible");
    expect(fn({ show: false })).toBe("");
  });

  it("renders if/else blocks", () => {
    const fn = compile("{{#if active}}on{{else}}off{{/if}}");
    expect(fn({ active: true })).toBe("on");
    expect(fn({ active: false })).toBe("off");
  });

  it("renders each blocks", () => {
    const fn = compile("{{#each items}}[{{item}}]{{/each}}");
    expect(fn({ items: ["a", "b", "c"] })).toBe("[a][b][c]");
  });

  it("each provides index", () => {
    const fn = compile("{{#each items}}{{index}}{{/each}}");
    expect(fn({ items: ["x", "y"] })).toBe("01");
  });

  it("missing variable renders empty", () => {
    const fn = compile("Hello {{name}}!");
    expect(fn({})).toBe("Hello !");
  });

  it("multiple variables", () => {
    const fn = compile("{{a}} + {{b}}");
    expect(fn({ a: "1", b: "2" })).toBe("1 + 2");
  });
});
