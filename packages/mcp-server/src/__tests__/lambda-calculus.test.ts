import { describe, it, expect, beforeEach } from "vitest";
import {
  v, abs, app, num, bool, if_, binop,
  betaReduce, freeVars, exprToString, isNormalForm, resetFresh,
} from "../lambda-calculus.js";

beforeEach(() => resetFresh());

describe("freeVars", () => {
  it("finds free variables", () => {
    expect(freeVars(v("x")).has("x")).toBe(true);
  });

  it("removes bound variables", () => {
    expect(freeVars(abs("x", v("x"))).size).toBe(0);
  });

  it("finds free in application", () => {
    const fv = freeVars(app(v("f"), v("x")));
    expect(fv.has("f")).toBe(true);
    expect(fv.has("x")).toBe(true);
  });
});

describe("betaReduce", () => {
  it("reduces identity application", () => {
    const expr = app(abs("x", v("x")), num(42));
    const result = betaReduce(expr);
    expect(result).toEqual(num(42));
  });

  it("reduces constant function", () => {
    const expr = app(abs("x", num(99)), num(1));
    expect(betaReduce(expr)).toEqual(num(99));
  });

  it("reduces nested application", () => {
    const expr = app(app(abs("x", abs("y", v("x"))), num(1)), num(2));
    expect(betaReduce(expr)).toEqual(num(1));
  });

  it("reduces arithmetic", () => {
    const expr = binop("+", num(3), num(4));
    expect(betaReduce(expr)).toEqual(num(7));
  });

  it("reduces if-then-else true", () => {
    expect(betaReduce(if_(bool(true), num(1), num(2)))).toEqual(num(1));
  });

  it("reduces if-then-else false", () => {
    expect(betaReduce(if_(bool(false), num(1), num(2)))).toEqual(num(2));
  });

  it("reduces comparison", () => {
    expect(betaReduce(binop("<", num(1), num(2)))).toEqual(bool(true));
    expect(betaReduce(binop("==", num(3), num(3)))).toEqual(bool(true));
  });

  it("handles capture avoidance", () => {
    const expr = app(abs("x", abs("y", app(v("x"), v("y")))), v("y"));
    const result = betaReduce(expr);
    const s = exprToString(result);
    expect(s).not.toContain("\\y.");
  });
});

describe("exprToString", () => {
  it("prints lambda", () => {
    expect(exprToString(abs("x", v("x")))).toBe("(\\x. x)");
  });
});

describe("isNormalForm", () => {
  it("detects normal form", () => {
    expect(isNormalForm(num(42))).toBe(true);
    expect(isNormalForm(abs("x", v("x")))).toBe(true);
  });

  it("detects non-normal form", () => {
    expect(isNormalForm(app(abs("x", v("x")), num(1)))).toBe(false);
  });
});
