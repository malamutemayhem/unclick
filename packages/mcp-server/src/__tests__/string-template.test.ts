import { describe, it, expect } from "vitest";
import { template, strip, extractVars } from "../string-template.js";

describe("template", () => {
  it("replaces variables", () => {
    expect(template("Hello {{name}}", { name: "World" })).toBe("Hello World");
  });

  it("handles nested paths", () => {
    expect(template("{{user.name}}", { user: { name: "Alice" } })).toBe("Alice");
  });

  it("keeps unresolved variables", () => {
    expect(template("Hello {{missing}}", {})).toBe("Hello {{missing}}");
  });

  it("custom delimiters", () => {
    expect(template("Hello <%name%>", { name: "World" }, { open: "<%", close: "%>" })).toBe("Hello World");
  });

  it("handles spaces in tags", () => {
    expect(template("{{ name }}", { name: "test" })).toBe("test");
  });
});

describe("strip", () => {
  it("removes all template variables", () => {
    expect(strip("Hello {{name}}, you are {{age}}")).toBe("Hello , you are ");
  });
});

describe("extractVars", () => {
  it("extracts variable names", () => {
    expect(extractVars("{{a}} and {{b}} and {{a}}")).toEqual(["a", "b"]);
  });

  it("extracts nested paths", () => {
    expect(extractVars("{{user.name}}")).toEqual(["user.name"]);
  });
});
