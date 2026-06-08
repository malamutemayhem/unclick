import { describe, it, expect } from "vitest";
import { render, extractVariables, validate, buildPrompt } from "../prompt-template.js";

describe("render", () => {
  it("replaces variables", () => {
    expect(render("Hello {{name}}!", { name: "World" })).toBe("Hello World!");
  });

  it("handles multiple variables", () => {
    expect(render("{{a}} + {{b}}", { a: 1, b: 2 })).toBe("1 + 2");
  });

  it("leaves unknown variables in non-strict mode", () => {
    expect(render("Hello {{name}}", {})).toBe("Hello {{name}}");
  });

  it("throws in strict mode for missing variables", () => {
    expect(() => render("Hello {{name}}", {}, { strict: true })).toThrow("Missing variable: name");
  });

  it("handles spaces inside delimiters", () => {
    expect(render("Hello {{ name }}", { name: "Bob" })).toBe("Hello Bob");
  });

  it("supports custom delimiters", () => {
    expect(render("Hello <%name%>", { name: "World" }, { openDelimiter: "<%", closeDelimiter: "%>" })).toBe("Hello World");
  });

  it("handles boolean and number values", () => {
    expect(render("{{flag}} {{count}}", { flag: true, count: 42 })).toBe("true 42");
  });
});

describe("extractVariables", () => {
  it("extracts all unique variables", () => {
    expect(extractVariables("{{a}} and {{b}} and {{a}}")).toEqual(["a", "b"]);
  });

  it("returns empty for no variables", () => {
    expect(extractVariables("no vars here")).toEqual([]);
  });
});

describe("validate", () => {
  it("returns valid when all provided", () => {
    const r = validate("{{x}} {{y}}", { x: "1", y: "2" });
    expect(r.valid).toBe(true);
    expect(r.missing).toEqual([]);
  });

  it("returns missing variables", () => {
    const r = validate("{{x}} {{y}} {{z}}", { x: "1" });
    expect(r.valid).toBe(false);
    expect(r.missing).toEqual(["y", "z"]);
  });
});

describe("buildPrompt", () => {
  it("builds multi-section prompt", () => {
    const result = buildPrompt([
      { role: "system", content: "You are {{role}}" },
      { role: "user", content: "Hello" },
    ], { role: "helpful" });
    expect(result).toContain("[system]");
    expect(result).toContain("You are helpful");
    expect(result).toContain("[user]");
    expect(result).toContain("Hello");
  });

  it("works without variables", () => {
    const result = buildPrompt([{ role: "user", content: "Hi" }]);
    expect(result).toBe("[user]\nHi");
  });
});
