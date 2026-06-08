import { describe, it, expect } from "vitest";
import { render, renderConditional, renderLoop } from "../template-engine.js";

describe("template-engine", () => {
  describe("render", () => {
    it("replaces simple variables", () => {
      expect(render("Hello {{name}}!", { name: "World" })).toBe("Hello World!");
    });
    it("handles nested paths", () => {
      expect(render("{{user.name}}", { user: { name: "Alice" } })).toBe("Alice");
    });
    it("replaces missing values with empty string", () => {
      expect(render("{{missing}}", {})).toBe("");
    });
    it("applies upper filter", () => {
      expect(render("{{name|upper}}", { name: "hello" })).toBe("HELLO");
    });
    it("applies lower filter", () => {
      expect(render("{{name|lower}}", { name: "HELLO" })).toBe("hello");
    });
    it("applies trim filter", () => {
      expect(render("{{name|trim}}", { name: "  hi  " })).toBe("hi");
    });
    it("applies capitalize filter", () => {
      expect(render("{{name|capitalize}}", { name: "hello" })).toBe("Hello");
    });
    it("applies reverse filter", () => {
      expect(render("{{name|reverse}}", { name: "abc" })).toBe("cba");
    });
    it("chains filters", () => {
      expect(render("{{name|trim|upper}}", { name: "  hello  " })).toBe("HELLO");
    });
    it("handles null values", () => {
      expect(render("{{val}}", { val: null })).toBe("");
    });
  });

  describe("renderConditional", () => {
    it("renders if block when truthy", () => {
      expect(renderConditional("{{#if show}}yes{{/if}}", { show: true })).toBe("yes");
    });
    it("skips if block when falsy", () => {
      expect(renderConditional("{{#if show}}yes{{/if}}", { show: false })).toBe("");
    });
    it("renders else block when falsy", () => {
      expect(renderConditional("{{#if show}}yes{{#else}}no{{/if}}", { show: false })).toBe("no");
    });
    it("treats empty array as falsy", () => {
      expect(renderConditional("{{#if items}}yes{{#else}}no{{/if}}", { items: [] })).toBe("no");
    });
    it("treats non-empty string as truthy", () => {
      expect(renderConditional("{{#if name}}hi {{name}}{{/if}}", { name: "Bob" })).toBe("hi Bob");
    });
  });

  describe("renderLoop", () => {
    it("iterates arrays of objects", () => {
      const data = { items: [{ name: "a" }, { name: "b" }] };
      expect(renderLoop("{{#each items}}{{name}},{{/each}}", data)).toBe("a,b,");
    });
    it("provides _index", () => {
      const data = { items: [{ x: 1 }, { x: 2 }] };
      expect(renderLoop("{{#each items}}{{_index}}:{{x}} {{/each}}", data)).toBe("0:1 1:2 ");
    });
    it("handles primitive arrays", () => {
      const data = { nums: [10, 20] };
      expect(renderLoop("{{#each nums}}{{_item}},{{/each}}", data)).toBe("10,20,");
    });
    it("returns empty for non-array", () => {
      expect(renderLoop("{{#each items}}x{{/each}}", { items: "nope" })).toBe("");
    });
  });
});
