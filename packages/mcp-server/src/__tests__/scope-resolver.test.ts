import { describe, it, expect } from "vitest";
import { ScopeResolver } from "../scope-resolver.js";

describe("ScopeResolver", () => {
  it("declares and resolves in global scope", () => {
    const sr = new ScopeResolver();
    sr.declare("x", "var");
    const sym = sr.resolve("x");
    expect(sym).not.toBeNull();
    expect(sym!.name).toBe("x");
    expect(sym!.kind).toBe("var");
  });

  it("resolves from parent scope", () => {
    const sr = new ScopeResolver();
    sr.declare("x", "var");
    sr.enterScope("inner");
    const sym = sr.resolve("x");
    expect(sym).not.toBeNull();
    expect(sym!.scopeId).toBe(0);
  });

  it("inner scope shadows outer", () => {
    const sr = new ScopeResolver();
    sr.declare("x", "var");
    sr.enterScope("inner");
    sr.declare("x", "var");
    const sym = sr.resolve("x");
    expect(sym!.scopeId).toBe(1);
  });

  it("exitScope returns to parent", () => {
    const sr = new ScopeResolver();
    sr.declare("x", "var");
    sr.enterScope();
    sr.declare("y", "var");
    sr.exitScope();
    expect(sr.resolve("y")).toBeNull();
    expect(sr.resolve("x")).not.toBeNull();
  });

  it("resolveOrError logs error for missing", () => {
    const sr = new ScopeResolver();
    sr.resolveOrError("missing", 10);
    const errors = sr.getErrors();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toContain("Undefined");
    expect(errors[0].line).toBe(10);
  });

  it("detects duplicate declarations", () => {
    const sr = new ScopeResolver();
    sr.declare("x", "var");
    sr.declare("x", "var");
    expect(sr.getErrors()).toHaveLength(1);
  });

  it("isShadowing detects shadowing", () => {
    const sr = new ScopeResolver();
    sr.declare("x", "var");
    sr.enterScope();
    sr.declare("x", "var");
    expect(sr.isShadowing("x")).toBe(true);
  });

  it("scopeCount tracks scopes", () => {
    const sr = new ScopeResolver();
    expect(sr.scopeCount).toBe(1);
    sr.enterScope();
    expect(sr.scopeCount).toBe(2);
    sr.enterScope();
    expect(sr.scopeCount).toBe(3);
  });

  it("scopeDepth tracks nesting", () => {
    const sr = new ScopeResolver();
    expect(sr.scopeDepth).toBe(0);
    sr.enterScope();
    expect(sr.scopeDepth).toBe(1);
    sr.enterScope();
    expect(sr.scopeDepth).toBe(2);
  });

  it("allSymbols returns all declared symbols", () => {
    const sr = new ScopeResolver();
    sr.declare("a", "var");
    sr.enterScope();
    sr.declare("b", "fn");
    const all = sr.allSymbols();
    expect(all).toHaveLength(2);
  });

  it("symbolsInScope includes parent symbols", () => {
    const sr = new ScopeResolver();
    sr.declare("x", "var");
    const inner = sr.enterScope();
    sr.declare("y", "fn");
    const symbols = sr.symbolsInScope(inner);
    expect(symbols.some((s) => s.name === "x")).toBe(true);
    expect(symbols.some((s) => s.name === "y")).toBe(true);
  });

  it("symbolsInScope shows inner over outer on shadow", () => {
    const sr = new ScopeResolver();
    sr.declare("x", "var");
    const inner = sr.enterScope();
    sr.declare("x", "fn");
    const symbols = sr.symbolsInScope(inner);
    const xSym = symbols.find((s) => s.name === "x");
    expect(xSym!.kind).toBe("fn");
  });

  it("getScope returns scope info", () => {
    const sr = new ScopeResolver();
    const scope = sr.getScope(0);
    expect(scope.name).toBe("global");
    expect(scope.parentId).toBeNull();
  });

  it("clearErrors resets error list", () => {
    const sr = new ScopeResolver();
    sr.resolveOrError("missing");
    sr.clearErrors();
    expect(sr.getErrors()).toHaveLength(0);
  });

  it("toDot generates graph", () => {
    const sr = new ScopeResolver();
    sr.declare("x", "var");
    sr.enterScope("fn_main");
    sr.declare("y", "param");
    const dot = sr.toDot();
    expect(dot).toContain("digraph Scopes");
    expect(dot).toContain("global");
    expect(dot).toContain("fn_main");
  });

  it("different symbol kinds", () => {
    const sr = new ScopeResolver();
    sr.declare("x", "var");
    sr.declare("f", "fn");
    sr.declare("T", "type");
    sr.declare("MAX", "const");
    expect(sr.allSymbols().map((s) => s.kind)).toEqual(["var", "fn", "type", "const"]);
  });
});
