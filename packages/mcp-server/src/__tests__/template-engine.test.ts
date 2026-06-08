import { describe, it, expect } from "vitest";
import { render, extractVars, hasUnresolved } from "../template-engine.js";

describe("template-engine", () => {
  it("renders simple variables", () => {
    expect(render("Hello {{ name }}!", { name: "World" })).toBe("Hello World!");
  });

  it("renders multiple variables", () => {
    const result = render("{{greeting}}, {{name}}!", { greeting: "Hi", name: "Alice" });
    expect(result).toBe("Hi, Alice!");
  });

  it("resolves nested paths", () => {
    const result = render("{{user.name}} is {{user.age}}", {
      user: { name: "Bob", age: 30 },
    });
    expect(result).toBe("Bob is 30");
  });

  it("replaces missing vars with empty string", () => {
    expect(render("Hello {{name}}!", {})).toBe("Hello !");
  });

  it("supports custom delimiters", () => {
    const result = render("Hello <% name %>!", { name: "World" }, { open: "<%", close: "%>" });
    expect(result).toBe("Hello World!");
  });

  it("extractVars returns unique variable names", () => {
    const vars = extractVars("{{a}} and {{b}} and {{a}}");
    expect(vars).toEqual(["a", "b"]);
  });

  it("extractVars handles nested paths", () => {
    const vars = extractVars("{{user.name}} {{user.email}}");
    expect(vars).toEqual(["user.name", "user.email"]);
  });

  it("hasUnresolved detects missing vars", () => {
    expect(hasUnresolved("{{a}} {{b}}", { a: 1 })).toBe(true);
    expect(hasUnresolved("{{a}} {{b}}", { a: 1, b: 2 })).toBe(false);
  });

  it("handles templates with no variables", () => {
    expect(render("No vars here", {})).toBe("No vars here");
    expect(extractVars("No vars here")).toEqual([]);
  });

  it("handles numbers and booleans", () => {
    expect(render("Count: {{n}}, Active: {{flag}}", { n: 42, flag: true })).toBe(
      "Count: 42, Active: true"
    );
  });
});
