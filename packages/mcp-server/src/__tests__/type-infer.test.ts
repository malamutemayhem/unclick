import { describe, it, expect, beforeEach } from "vitest";
import {
  resetIds, freshVar, INT, BOOL, STRING, fnType, listType,
  unify, apply, typeToString, emptySubst, infer,
  type Expr, type TypeEnv,
} from "../type-infer.js";

beforeEach(() => resetIds());

describe("unify", () => {
  it("unifies same concrete types", () => {
    const s = unify(INT, INT);
    expect(s.size).toBe(0);
  });

  it("unifies variable with concrete", () => {
    const v = freshVar();
    const s = unify(v, INT);
    expect(typeToString(apply(s, v))).toBe("Int");
  });

  it("unifies function types", () => {
    const a = freshVar();
    const s = unify(fnType(a, INT), fnType(BOOL, INT));
    expect(typeToString(apply(s, a))).toBe("Bool");
  });

  it("unifies list types", () => {
    const a = freshVar();
    const s = unify(listType(a), listType(INT));
    expect(typeToString(apply(s, a))).toBe("Int");
  });

  it("throws on incompatible types", () => {
    expect(() => unify(INT, BOOL)).toThrow("Cannot unify");
  });

  it("detects infinite types", () => {
    const a = freshVar();
    expect(() => unify(a, fnType(a, INT))).toThrow("Infinite type");
  });
});

describe("typeToString", () => {
  it("prints fn type", () => {
    expect(typeToString(fnType(INT, BOOL))).toBe("Int -> Bool");
  });

  it("prints nested fn with parens", () => {
    expect(typeToString(fnType(fnType(INT, INT), BOOL))).toBe("(Int -> Int) -> Bool");
  });

  it("prints list type", () => {
    expect(typeToString(listType(INT))).toBe("[Int]");
  });
});

describe("infer", () => {
  it("infers literal int", () => {
    const [t] = infer({ tag: "lit", type: "int" });
    expect(typeToString(t)).toBe("Int");
  });

  it("infers variable from env", () => {
    const env: TypeEnv = new Map([["x", INT]]);
    const [t] = infer({ tag: "var", name: "x" }, env);
    expect(typeToString(t)).toBe("Int");
  });

  it("infers identity lambda", () => {
    const expr: Expr = { tag: "lam", param: "x", body: { tag: "var", name: "x" } };
    const [t, s] = infer(expr);
    const resolved = typeToString(apply(s, t));
    expect(resolved).toMatch(/t\d+ -> t\d+/);
  });

  it("infers application", () => {
    const env: TypeEnv = new Map([["f", fnType(INT, BOOL)]]);
    const expr: Expr = { tag: "app", fn: { tag: "var", name: "f" }, arg: { tag: "lit", type: "int" } };
    const [t, s] = infer(expr, env);
    expect(typeToString(apply(s, t))).toBe("Bool");
  });

  it("infers let binding", () => {
    const expr: Expr = {
      tag: "let",
      name: "x",
      value: { tag: "lit", type: "int" },
      body: { tag: "var", name: "x" },
    };
    const [t] = infer(expr);
    expect(typeToString(t)).toBe("Int");
  });

  it("throws on unbound variable", () => {
    expect(() => infer({ tag: "var", name: "z" })).toThrow("Unbound variable");
  });
});
