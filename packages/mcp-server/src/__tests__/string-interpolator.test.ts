import { describe, it, expect } from "vitest";
import { interpolate, listFilters } from "../string-interpolator.js";

describe("interpolate", () => {
  it("replaces variables", () => {
    expect(interpolate("Hello {{name}}", { name: "Alice" })).toBe("Hello Alice");
  });

  it("handles nested paths", () => {
    expect(interpolate("{{user.name}}", { user: { name: "Bob" } })).toBe("Bob");
  });

  it("applies upper filter", () => {
    expect(interpolate("{{name | upper}}", { name: "alice" })).toBe("ALICE");
  });

  it("applies lower filter", () => {
    expect(interpolate("{{name | lower}}", { name: "ALICE" })).toBe("alice");
  });

  it("applies capitalize filter", () => {
    expect(interpolate("{{word | capitalize}}", { word: "hello" })).toBe("Hello");
  });

  it("applies truncate filter", () => {
    expect(interpolate("{{text | truncate:5}}", { text: "hello world" })).toBe("hello...");
  });

  it("chains filters", () => {
    expect(interpolate("{{name | trim | upper}}", { name: "  hi  " })).toBe("HI");
  });

  it("applies default filter", () => {
    expect(interpolate("{{missing | default:none}}", {})).toBe("none");
  });

  it("supports custom filters", () => {
    const customs = { exclaim: (v: string) => v + "!" };
    expect(interpolate("{{name | exclaim}}", { name: "hi" }, customs)).toBe("hi!");
  });

  it("missing var returns empty", () => {
    expect(interpolate("{{x}}", {})).toBe("");
  });
});

describe("listFilters", () => {
  it("returns built-in names", () => {
    const filters = listFilters();
    expect(filters).toContain("upper");
    expect(filters).toContain("lower");
    expect(filters).toContain("trim");
  });
});
