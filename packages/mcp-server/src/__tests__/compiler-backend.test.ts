import { describe, it, expect } from "vitest";
import { IRBuilder, buildCFG, countUses, deadCodeElimination } from "../compiler-backend.js";

describe("IRBuilder", () => {
  it("emits constants", () => {
    const b = new IRBuilder();
    const t = b.emitConst("42");
    expect(t).toBe("t0");
    expect(b.instructionCount()).toBe(1);
  });

  it("emits binary operations", () => {
    const b = new IRBuilder();
    const a = b.emitConst("10");
    const c = b.emitConst("20");
    const sum = b.emitBinOp("add", a, c);
    expect(sum).toBe("t2");
    expect(b.instructionCount()).toBe(3);
  });

  it("emits load and store", () => {
    const b = new IRBuilder();
    const v = b.emitConst("5");
    b.emitStore("x", v);
    const loaded = b.emitLoad("x");
    expect(loaded).toBeTruthy();
    expect(b.instructionCount()).toBe(3);
  });

  it("emits comparisons", () => {
    const b = new IRBuilder();
    const a = b.emitConst("1");
    const c = b.emitConst("2");
    const result = b.emitCmp("lt", a, c);
    expect(result).toBeTruthy();
  });

  it("emits labels and jumps", () => {
    const b = new IRBuilder();
    const label = b.newLabel();
    b.emitLabel(label);
    b.emitJump(label);
    const instrs = b.getInstructions();
    expect(instrs.some((i) => i.op === "label")).toBe(true);
    expect(instrs.some((i) => i.op === "jump")).toBe(true);
  });

  it("emits branches", () => {
    const b = new IRBuilder();
    const cond = b.emitConst("1");
    const l1 = b.newLabel();
    const l2 = b.newLabel();
    b.emitBranch(cond, l1, l2);
    const instrs = b.getInstructions();
    expect(instrs[instrs.length - 1].op).toBe("branch");
  });

  it("emits function calls", () => {
    const b = new IRBuilder();
    const a = b.emitConst("5");
    const result = b.emitCall("sqrt", [a]);
    expect(result).toBeTruthy();
  });

  it("emits return", () => {
    const b = new IRBuilder();
    const v = b.emitConst("0");
    b.emitReturn(v);
    expect(b.getInstructions().some((i) => i.op === "ret")).toBe(true);
  });

  it("emits neg and not", () => {
    const b = new IRBuilder();
    const v = b.emitConst("1");
    b.emitNeg(v);
    b.emitNot(v);
    expect(b.instructionCount()).toBe(3);
  });
});

describe("buildCFG", () => {
  it("creates basic blocks", () => {
    const b = new IRBuilder();
    const v = b.emitConst("1");
    b.emitReturn(v);
    const blocks = buildCFG(b.getInstructions());
    expect(blocks.length).toBeGreaterThan(0);
  });

  it("splits on jumps", () => {
    const b = new IRBuilder();
    const l = b.newLabel();
    b.emitJump(l);
    b.emitLabel(l);
    const v = b.emitConst("1");
    b.emitReturn(v);
    const blocks = buildCFG(b.getInstructions());
    expect(blocks.length).toBe(2);
  });

  it("links predecessors and successors", () => {
    const b = new IRBuilder();
    const cond = b.emitConst("1");
    const l1 = b.newLabel();
    const l2 = b.newLabel();
    b.emitBranch(cond, l1, l2);
    b.emitLabel(l1);
    b.emitReturn(cond);
    b.emitLabel(l2);
    b.emitReturn(cond);
    const blocks = buildCFG(b.getInstructions());
    const entry = blocks[0];
    expect(entry.successors.length).toBe(2);
  });
});

describe("countUses", () => {
  it("counts variable references", () => {
    const b = new IRBuilder();
    const a = b.emitConst("1");
    b.emitBinOp("add", a, a);
    const uses = countUses(b.getInstructions());
    expect(uses.get(a)).toBe(2);
  });
});

describe("deadCodeElimination", () => {
  it("removes unused assignments", () => {
    const b = new IRBuilder();
    b.emitConst("unused");
    const used = b.emitConst("used");
    b.emitReturn(used);
    const optimized = deadCodeElimination(b.getInstructions());
    expect(optimized.length).toBe(2);
  });

  it("keeps call instructions even if unused", () => {
    const b = new IRBuilder();
    b.emitCall("sideEffect", []);
    const optimized = deadCodeElimination(b.getInstructions());
    expect(optimized.length).toBe(1);
  });
});
