import { describe, it, expect } from "vitest";
import { safeEval, validateExpression, safeCompute } from "../sandbox-executor.js";

describe("safeEval", () => {
  it("evaluates simple expression", () => {
    const r = safeEval("1 + 2");
    expect(r.success).toBe(true);
    expect(r.value).toBe(3);
  });

  it("uses variables", () => {
    const r = safeEval("x + y", { x: 10, y: 20 });
    expect(r.value).toBe(30);
  });

  it("handles math functions", () => {
    const r = safeEval("Math.sqrt(16)");
    expect(r.value).toBe(4);
  });

  it("catches errors", () => {
    const r = safeEval("unknownFunction()");
    expect(r.success).toBe(false);
    expect(r.error).toBeDefined();
  });

  it("handles string results", () => {
    const r = safeEval('"hello" + " world"');
    expect(r.value).toBe("hello world");
  });
});

describe("validateExpression", () => {
  it("allows safe expressions", () => {
    expect(validateExpression("1 + 2").valid).toBe(true);
    expect(validateExpression("Math.sqrt(x)").valid).toBe(true);
  });

  it("blocks eval", () => {
    expect(validateExpression("eval('bad')").valid).toBe(false);
  });

  it("blocks process", () => {
    expect(validateExpression("process.exit()").valid).toBe(false);
  });

  it("blocks require", () => {
    expect(validateExpression("require('fs')").valid).toBe(false);
  });
});

describe("safeCompute", () => {
  it("computes math expressions", () => {
    const r = safeCompute("x * 2 + y", { x: 5, y: 3 });
    expect(r.success).toBe(true);
    expect(r.value).toBe(13);
  });

  it("rejects dangerous expressions", () => {
    expect(safeCompute("eval('bad')").success).toBe(false);
  });

  it("rejects forbidden characters", () => {
    expect(safeCompute("x; delete y").success).toBe(false);
  });
});
