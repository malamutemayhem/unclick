import { describe, it, expect, beforeEach } from "vitest";
import {
  infer, typeToString, typeConst, typeFn, typeVar,
  unify, applySubst, freeVars, resetCounter,
  Expr,
} from "../hindley-milner.js";

beforeEach(() => resetCounter());

describe("unify", () => {
  it("unifies two constants", () => {
    const s = unify(typeConst("Int"), typeConst("Int"));
    expect(s.size).toBe(0);
  });

  it("fails on different constants", () => {
    expect(() => unify(typeConst("Int"), typeConst("Bool"))).toThrow();
  });

  it("unifies var with const", () => {
    const s = unify(typeVar("a"), typeConst("Int"));
    expect(s.get("a")).toEqual(typeConst("Int"));
  });

  it("unifies function types", () => {
    const s = unify(
      typeFn(typeVar("a"), typeConst("Int")),
      typeFn(typeConst("Bool"), typeVar("b"))
    );
    expect(s.get("a")).toEqual(typeConst("Bool"));
    expect(s.get("b")).toEqual(typeConst("Int"));
  });

  it("occurs check prevents infinite types", () => {
    expect(() => unify(typeVar("a"), typeFn(typeVar("a"), typeConst("Int")))).toThrow("Occurs check");
  });
});

describe("applySubst", () => {
  it("substitutes variables", () => {
    const s = new Map([["a", typeConst("Int")]]);
    const result = applySubst(s, typeFn(typeVar("a"), typeVar("b")));
    expect(typeToString(result)).toBe("Int -> b");
  });
});

describe("freeVars", () => {
  it("collects free variables", () => {
    const fv = freeVars(typeFn(typeVar("a"), typeVar("b")));
    expect(fv.has("a")).toBe(true);
    expect(fv.has("b")).toBe(true);
  });

  it("constants have no free vars", () => {
    expect(freeVars(typeConst("Int")).size).toBe(0);
  });
});

describe("infer", () => {
  it("infers literal int", () => {
    const { type } = infer({ kind: "lit", type: "int" });
    expect(typeToString(type)).toBe("Int");
  });

  it("infers literal bool", () => {
    const { type } = infer({ kind: "lit", type: "bool" });
    expect(typeToString(type)).toBe("Bool");
  });

  it("infers identity function", () => {
    const expr: Expr = { kind: "abs", param: "x", body: { kind: "var", name: "x" } };
    const { type, subst } = infer(expr);
    const resolved = applySubst(subst, type);
    expect(typeToString(resolved)).toMatch(/-> /);
  });

  it("infers function application", () => {
    const env = new Map([
      ["f", { type: typeFn(typeConst("Int"), typeConst("Bool")), freeVars: new Set<string>() }],
      ["x", { type: typeConst("Int"), freeVars: new Set<string>() }],
    ]);
    const expr: Expr = { kind: "app", fn: { kind: "var", name: "f" }, arg: { kind: "var", name: "x" } };
    const { type } = infer(expr, env);
    expect(typeToString(type)).toBe("Bool");
  });

  it("infers let binding", () => {
    const expr: Expr = {
      kind: "let",
      name: "x",
      value: { kind: "lit", type: "int" },
      body: { kind: "var", name: "x" },
    };
    const { type } = infer(expr);
    expect(typeToString(type)).toBe("Int");
  });

  it("infers if expression", () => {
    const expr: Expr = {
      kind: "if",
      cond: { kind: "lit", type: "bool" },
      then: { kind: "lit", type: "int" },
      else: { kind: "lit", type: "int" },
    };
    const { type } = infer(expr);
    expect(typeToString(type)).toBe("Int");
  });

  it("rejects mismatched if branches", () => {
    const expr: Expr = {
      kind: "if",
      cond: { kind: "lit", type: "bool" },
      then: { kind: "lit", type: "int" },
      else: { kind: "lit", type: "bool" },
    };
    expect(() => infer(expr)).toThrow();
  });

  it("rejects non-bool condition", () => {
    const expr: Expr = {
      kind: "if",
      cond: { kind: "lit", type: "int" },
      then: { kind: "lit", type: "int" },
      else: { kind: "lit", type: "int" },
    };
    expect(() => infer(expr)).toThrow();
  });

  it("rejects unbound variable", () => {
    expect(() => infer({ kind: "var", name: "unknown" })).toThrow("Unbound");
  });
});

describe("typeToString", () => {
  it("formats function types", () => {
    expect(typeToString(typeFn(typeConst("Int"), typeConst("Bool")))).toBe("Int -> Bool");
  });

  it("formats nested functions with parens", () => {
    const t = typeFn(typeFn(typeConst("Int"), typeConst("Bool")), typeConst("String"));
    expect(typeToString(t)).toBe("(Int -> Bool) -> String");
  });
});
