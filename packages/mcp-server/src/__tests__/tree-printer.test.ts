import { describe, it, expect } from "vitest";
import { TreePrinter } from "../tree-printer.js";

describe("TreePrinter", () => {
  const tree = {
    label: "root",
    children: [
      { label: "a", children: [{ label: "a1" }, { label: "a2" }] },
      { label: "b" },
    ],
  };

  it("renders tree structure", () => {
    const output = TreePrinter.render(tree);
    expect(output).toContain("root");
    expect(output).toContain("a");
    expect(output).toContain("a1");
    expect(output).toContain("b");
  });

  it("uses box-drawing connectors", () => {
    const output = TreePrinter.render(tree);
    expect(output).toContain("├──");
    expect(output).toContain("└──");
  });

  it("builds tree from paths", () => {
    const node = TreePrinter.fromPaths(["src/a.ts", "src/b.ts", "lib/c.ts"]);
    expect(node.label).toBe(".");
    expect(node.children!.length).toBe(2);
  });

  it("builds tree from object", () => {
    const node = TreePrinter.fromObject({ a: { b: 1 }, c: 2 });
    expect(node.label).toBe("root");
    expect(node.children!.length).toBe(2);
  });

  it("calculates depth", () => {
    expect(TreePrinter.depth(tree)).toBe(2);
    expect(TreePrinter.depth({ label: "leaf" })).toBe(0);
  });

  it("counts nodes", () => {
    expect(TreePrinter.nodeCount(tree)).toBe(5);
  });

  it("counts leaves", () => {
    expect(TreePrinter.leafCount(tree)).toBe(3);
  });

  it("finds nodes", () => {
    const found = TreePrinter.find(tree, (n) => n.label === "a2");
    expect(found).not.toBeNull();
    expect(found!.label).toBe("a2");
  });

  it("returns null when not found", () => {
    expect(TreePrinter.find(tree, (n) => n.label === "xyz")).toBeNull();
  });

  it("handles single node tree", () => {
    const output = TreePrinter.render({ label: "alone" });
    expect(output).toBe("alone");
  });
});
