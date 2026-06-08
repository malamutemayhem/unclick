import { describe, it, expect } from "vitest";
import { CssSelectorParser } from "../css-selector.js";

describe("CssSelectorParser", () => {
  it("parses tag selector", () => {
    const result = CssSelectorParser.parse("div");
    expect(result.parts).toEqual([{ type: "tag", value: "div" }]);
  });

  it("parses class selector", () => {
    const result = CssSelectorParser.parse(".container");
    expect(result.parts).toEqual([{ type: "class", value: "container" }]);
  });

  it("parses id selector", () => {
    const result = CssSelectorParser.parse("#main");
    expect(result.parts).toEqual([{ type: "id", value: "main" }]);
  });

  it("parses attribute selector", () => {
    const result = CssSelectorParser.parse("[href]");
    expect(result.parts).toHaveLength(1);
    expect(result.parts[0].type).toBe("attribute");
    expect(result.parts[0].value).toBe("href");
  });

  it("parses attribute selector with value", () => {
    const result = CssSelectorParser.parse('[type="text"]');
    expect(result.parts[0].operator).toBe("=");
    expect(result.parts[0].attrValue).toBe("text");
  });

  it("parses pseudo selector", () => {
    const result = CssSelectorParser.parse(":hover");
    expect(result.parts[0].type).toBe("pseudo");
    expect(result.parts[0].value).toBe("hover");
  });

  it("parses universal selector", () => {
    const result = CssSelectorParser.parse("*");
    expect(result.parts).toEqual([{ type: "universal", value: "*" }]);
  });

  it("parses compound selector", () => {
    const result = CssSelectorParser.parse("div.container#main");
    expect(result.parts).toHaveLength(3);
    expect(result.parts[0]).toEqual({ type: "tag", value: "div" });
    expect(result.parts[1]).toEqual({ type: "class", value: "container" });
    expect(result.parts[2]).toEqual({ type: "id", value: "main" });
  });

  it("calculates specificity for id", () => {
    const result = CssSelectorParser.parse("#main");
    expect(result.specificity).toEqual([1, 0, 0]);
  });

  it("calculates specificity for compound", () => {
    const result = CssSelectorParser.parse("div.active#header");
    expect(result.specificity).toEqual([1, 1, 1]);
  });

  it("compares specificity correctly", () => {
    expect(CssSelectorParser.compareSpecificity([1, 0, 0], [0, 5, 0])).toBeGreaterThan(0);
    expect(CssSelectorParser.compareSpecificity([0, 1, 0], [0, 1, 0])).toBe(0);
    expect(CssSelectorParser.compareSpecificity([0, 0, 1], [0, 1, 0])).toBeLessThan(0);
  });

  it("formats specificity summary", () => {
    expect(CssSelectorParser.specificitySummary([1, 2, 3])).toBe("1,2,3");
  });

  it("validates selectors", () => {
    expect(CssSelectorParser.isValid("div.class")).toBe(true);
    expect(CssSelectorParser.isValid("")).toBe(false);
  });

  it("counts parts", () => {
    expect(CssSelectorParser.partCount("div.a.b#c")).toBe(4);
  });
});
