import { describe, it, expect } from "vitest";
import { ASTVisitor } from "../ast-visitor.js";
import type { ASTNode } from "../ast-visitor.js";

describe("ASTVisitor", () => {
  const ast: ASTNode = {
    type: "program",
    body: [
      {
        type: "assign",
        target: "x",
        value: {
          type: "binary",
          op: "+",
          left: { type: "number", value: 1 },
          right: { type: "identifier", name: "y" },
        },
      },
      {
        type: "call",
        callee: { type: "identifier", name: "print" },
        args: [{ type: "identifier", name: "x" }],
      },
    ],
  };

  it("walks all nodes", () => {
    let count = 0;
    ASTVisitor.walk(ast, () => count++);
    expect(count).toBe(8);
  });

  it("counts nodes", () => {
    expect(ASTVisitor.nodeCount(ast)).toBe(8);
  });

  it("collects identifiers", () => {
    const ids = ASTVisitor.identifiers(ast);
    expect(ids).toContain("y");
    expect(ids).toContain("print");
    expect(ids).toContain("x");
  });

  it("visits and transforms nodes", () => {
    const result = ASTVisitor.visit(ast, {
      number: (node) => ({ ...node, value: node.value * 10 }),
    });
    const assign = (result as { type: "program"; body: ASTNode[] }).body[0] as { type: "assign"; value: ASTNode };
    const binary = assign.value as { type: "binary"; left: ASTNode };
    expect((binary.left as { type: "number"; value: number }).value).toBe(10);
  });

  it("collects specific node types", () => {
    const numbers = ASTVisitor.collect(ast, (n) =>
      n.type === "number" ? n.value : null
    );
    expect(numbers).toEqual([1]);
  });

  it("handles if nodes", () => {
    const ifAst: ASTNode = {
      type: "if",
      condition: { type: "identifier", name: "flag" },
      then: { type: "number", value: 1 },
      else: { type: "number", value: 0 },
    };
    expect(ASTVisitor.nodeCount(ifAst)).toBe(4);
  });

  it("handles block nodes", () => {
    const block: ASTNode = {
      type: "block",
      body: [{ type: "number", value: 1 }, { type: "number", value: 2 }],
    };
    expect(ASTVisitor.nodeCount(block)).toBe(3);
  });
});
