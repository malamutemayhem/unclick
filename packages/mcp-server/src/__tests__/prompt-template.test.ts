import { describe, it, expect } from "vitest";
import { PromptTemplate, buildSystemPrompt, injectContext } from "../prompt-template.js";

describe("PromptTemplate", () => {
  it("formats with variables", () => {
    const pt = new PromptTemplate("Hello {{name}}, you are {{role}}.", [
      { name: "name", required: true },
      { name: "role", default: "user" },
    ]);
    expect(pt.format({ name: "Alice" })).toBe("Hello Alice, you are user.");
    expect(pt.format({ name: "Bob", role: "admin" })).toBe("Hello Bob, you are admin.");
  });

  it("throws on missing required", () => {
    const pt = new PromptTemplate("{{name}}", [{ name: "name", required: true }]);
    expect(() => pt.format({})).toThrow("Missing required");
  });

  it("extractVariableNames finds all placeholders", () => {
    const pt = new PromptTemplate("{{a}} and {{b}} and {{a}}");
    expect(pt.extractVariableNames().sort()).toEqual(["a", "b"]);
  });

  it("compose joins templates", () => {
    const a = new PromptTemplate("Part A: {{x}}", [{ name: "x" }]);
    const b = new PromptTemplate("Part B: {{y}}", [{ name: "y" }]);
    const combined = PromptTemplate.compose(a, b);
    expect(combined.format({ x: "1", y: "2" })).toContain("Part A: 1");
    expect(combined.format({ x: "1", y: "2" })).toContain("Part B: 2");
  });
});

describe("buildSystemPrompt", () => {
  it("builds sectioned prompt", () => {
    const result = buildSystemPrompt([
      { role: "Identity", content: "You are a helpful assistant." },
      { role: "Rules", content: "Be concise." },
    ]);
    expect(result).toContain("# Identity");
    expect(result).toContain("# Rules");
  });
});

describe("injectContext", () => {
  it("replaces placeholders", () => {
    expect(injectContext("Hello {{name}}!", { name: "World" })).toBe("Hello World!");
  });

  it("replaces missing with empty", () => {
    expect(injectContext("{{missing}}", {})).toBe("");
  });
});
