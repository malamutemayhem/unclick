import { describe, it, expect, beforeEach } from "vitest";
import {
  irConst, irBinOp, irNop, irStore,
  constantFold, deadCodeElimination, copyPropagation,
  strengthReduction, optimize, resetIdCounter,
} from "../ir-optimizer.js";

beforeEach(() => {
  resetIdCounter();
});

describe("constantFold", () => {
  it("folds add of two constants", () => {
    const instrs = [
      irConst("a", 3),
      irConst("b", 4),
      irBinOp("add", "c", "a", "b"),
    ];
    const result = constantFold(instrs);
    const cInstr = result.find(i => i.dest === "c");
    expect(cInstr!.op).toBe("const");
    expect(cInstr!.value).toBe(7);
  });

  it("folds sub", () => {
    const instrs = [
      irConst("a", 10),
      irConst("b", 3),
      irBinOp("sub", "c", "a", "b"),
    ];
    const result = constantFold(instrs);
    expect(result.find(i => i.dest === "c")!.value).toBe(7);
  });

  it("folds mul", () => {
    const instrs = [
      irConst("a", 5),
      irConst("b", 6),
      irBinOp("mul", "c", "a", "b"),
    ];
    const result = constantFold(instrs);
    expect(result.find(i => i.dest === "c")!.value).toBe(30);
  });

  it("does not fold with unknown operand", () => {
    const instrs = [
      irConst("a", 5),
      irBinOp("add", "c", "a", "unknown"),
    ];
    const result = constantFold(instrs);
    expect(result.find(i => i.dest === "c")!.op).toBe("add");
  });

  it("handles division by zero gracefully", () => {
    const instrs = [
      irConst("a", 10),
      irConst("b", 0),
      irBinOp("div", "c", "a", "b"),
    ];
    const result = constantFold(instrs);
    expect(result.find(i => i.dest === "c")!.value).toBe(0);
  });
});

describe("deadCodeElimination", () => {
  it("removes nops", () => {
    const instrs = [irConst("a", 1), irNop(), irConst("b", 2), irBinOp("add", "c", "a", "b")];
    const result = deadCodeElimination(instrs);
    expect(result.find(i => i.op === "nop")).toBeUndefined();
  });

  it("removes unused definitions", () => {
    const instrs = [
      irConst("a", 1),
      irConst("unused", 99),
      irStore("addr", "a"),
    ];
    const result = deadCodeElimination(instrs);
    expect(result.find(i => i.dest === "unused")).toBeUndefined();
  });

  it("keeps used definitions", () => {
    const instrs = [
      irConst("a", 1),
      irStore("addr", "a"),
    ];
    const result = deadCodeElimination(instrs);
    expect(result.find(i => i.dest === "a")).toBeDefined();
  });
});

describe("copyPropagation", () => {
  it("propagates through loads", () => {
    const instrs = [
      irConst("a", 5),
      { id: 1, op: "load" as const, dest: "b", args: ["a"] },
      irBinOp("add", "c", "b", "b"),
    ];
    const result = copyPropagation(instrs);
    const addInstr = result.find(i => i.dest === "c");
    expect(addInstr!.args).toEqual(["a", "a"]);
  });
});

describe("strengthReduction", () => {
  it("replaces mul by power of 2", () => {
    const instrs = [
      irConst("b", 8),
      irBinOp("mul", "c", "a", "b"),
    ];
    const result = strengthReduction(instrs);
    const mulInstr = result.find(i => i.dest === "c");
    expect(mulInstr!.args[1]).toContain("shl");
  });

  it("replaces div by power of 2", () => {
    const instrs = [
      irConst("b", 4),
      irBinOp("div", "c", "a", "b"),
    ];
    const result = strengthReduction(instrs);
    const divInstr = result.find(i => i.dest === "c");
    expect(divInstr!.args[1]).toContain("shr");
  });

  it("does not reduce non-power-of-2", () => {
    const instrs = [
      irConst("b", 7),
      irBinOp("mul", "c", "a", "b"),
    ];
    const result = strengthReduction(instrs);
    expect(result.find(i => i.dest === "c")!.op).toBe("mul");
  });
});

describe("optimize", () => {
  it("combines multiple passes", () => {
    const instrs = [
      irConst("a", 3),
      irConst("b", 4),
      irBinOp("add", "c", "a", "b"),
      irConst("unused", 99),
      irStore("mem", "c"),
    ];
    const result = optimize(instrs);
    expect(result.find(i => i.dest === "c")!.op).toBe("const");
    expect(result.find(i => i.dest === "unused")).toBeUndefined();
  });
});
