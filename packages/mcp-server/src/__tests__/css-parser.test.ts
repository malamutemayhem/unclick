import { describe, it, expect } from "vitest";
import { parseCSS, stringifyCSS, specificity } from "../css-parser.js";

describe("parseCSS", () => {
  it("parses a simple rule", () => {
    const rules = parseCSS("body { color: red; }");
    expect(rules).toHaveLength(1);
    expect(rules[0].selector).toBe("body");
    expect(rules[0].properties.color).toBe("red");
  });

  it("parses multiple properties", () => {
    const rules = parseCSS("div { color: blue; font-size: 16px; }");
    expect(rules[0].properties).toEqual({ color: "blue", "font-size": "16px" });
  });

  it("parses multiple rules", () => {
    const rules = parseCSS("h1 { color: red; } p { margin: 0; }");
    expect(rules).toHaveLength(2);
    expect(rules[0].selector).toBe("h1");
    expect(rules[1].selector).toBe("p");
  });

  it("ignores comments", () => {
    const rules = parseCSS("/* comment */ body { color: red; }");
    expect(rules).toHaveLength(1);
    expect(rules[0].selector).toBe("body");
  });

  it("handles empty body", () => {
    const rules = parseCSS("div {}");
    expect(rules).toHaveLength(1);
    expect(Object.keys(rules[0].properties)).toHaveLength(0);
  });
});

describe("stringifyCSS", () => {
  it("converts rules back to string", () => {
    const result = stringifyCSS([
      { selector: "body", properties: { color: "red" } },
    ]);
    expect(result).toContain("body {");
    expect(result).toContain("color: red;");
  });

  it("roundtrips with parseCSS", () => {
    const original = "body {\n  color: red;\n}";
    const rules = parseCSS(original);
    const output = stringifyCSS(rules);
    expect(output).toContain("color: red");
  });
});

describe("specificity", () => {
  it("counts element selectors", () => {
    expect(specificity("div")).toEqual([0, 0, 1]);
  });

  it("counts class selectors", () => {
    expect(specificity(".foo")).toEqual([0, 1, 0]);
  });

  it("counts id selectors", () => {
    expect(specificity("#bar")).toEqual([1, 0, 0]);
  });

  it("counts combined selectors", () => {
    expect(specificity("div.foo#bar")).toEqual([1, 1, 1]);
  });

  it("universal selector has zero specificity", () => {
    expect(specificity("*")).toEqual([0, 0, 0]);
  });
});
