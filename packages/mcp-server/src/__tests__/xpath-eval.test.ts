import { describe, it, expect } from "vitest";
import { XPathEvaluator } from "../xpath-eval.js";
import type { XmlNode } from "../xpath-eval.js";

describe("XPathEvaluator", () => {
  const tree: XmlNode = {
    tag: "root",
    attributes: {},
    children: [
      {
        tag: "section",
        attributes: { id: "s1" },
        children: [
          { tag: "p", attributes: { class: "intro" }, children: [], text: "Hello" },
          { tag: "p", attributes: {}, children: [], text: " World" },
        ],
      },
      {
        tag: "section",
        attributes: { id: "s2" },
        children: [
          { tag: "div", attributes: { class: "box" }, children: [], text: "Content" },
        ],
      },
    ],
  };

  it("selects by tag name", () => {
    const results = XPathEvaluator.selectByTag(tree, "p");
    expect(results).toHaveLength(2);
    expect(results[0].text).toBe("Hello");
  });

  it("selects by attribute name", () => {
    const results = XPathEvaluator.selectByAttribute(tree, "id");
    expect(results).toHaveLength(2);
  });

  it("selects by attribute name and value", () => {
    const results = XPathEvaluator.selectByAttribute(tree, "id", "s2");
    expect(results).toHaveLength(1);
    expect(results[0].children[0].tag).toBe("div");
  });

  it("selects by path", () => {
    const results = XPathEvaluator.selectByPath(tree, "section/p");
    expect(results).toHaveLength(2);
  });

  it("selects wildcard children", () => {
    const results = XPathEvaluator.selectByPath(tree, "section/*");
    expect(results).toHaveLength(3);
  });

  it("filters by attribute in path", () => {
    const results = XPathEvaluator.selectByPath(tree, "section/@id");
    expect(results).toHaveLength(2);
  });

  it("gets text from node", () => {
    const p = tree.children[0].children[0];
    expect(XPathEvaluator.getText(p)).toBe("Hello");
  });

  it("gets concatenated text from parent", () => {
    const section = tree.children[0];
    expect(XPathEvaluator.getText(section)).toBe("Hello World");
  });

  it("counts nodes by tag", () => {
    expect(XPathEvaluator.count(tree, "section")).toBe(2);
    expect(XPathEvaluator.count(tree, "div")).toBe(1);
  });

  it("finds first by tag", () => {
    const first = XPathEvaluator.first(tree, "p");
    expect(first).not.toBeNull();
    expect(first!.text).toBe("Hello");
  });

  it("returns null for first when not found", () => {
    expect(XPathEvaluator.first(tree, "span")).toBeNull();
  });

  it("finds parent of node", () => {
    const target = tree.children[0].children[0];
    const parent = XPathEvaluator.parent(tree, target);
    expect(parent).not.toBeNull();
    expect(parent!.tag).toBe("section");
  });

  it("returns null for parent of root", () => {
    expect(XPathEvaluator.parent(tree, tree)).toBeNull();
  });

  it("calculates depth", () => {
    expect(XPathEvaluator.depth(tree)).toBe(2);
    expect(XPathEvaluator.depth(tree.children[0].children[0])).toBe(0);
  });

  it("counts all nodes", () => {
    expect(XPathEvaluator.nodeCount(tree)).toBe(6);
  });

  it("lists all tags", () => {
    const tags = XPathEvaluator.allTags(tree);
    expect(tags).toContain("root");
    expect(tags).toContain("section");
    expect(tags).toContain("p");
    expect(tags).toContain("div");
    expect(tags).toHaveLength(4);
  });
});
