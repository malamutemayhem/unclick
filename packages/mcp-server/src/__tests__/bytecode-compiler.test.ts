import { describe, it, expect } from "vitest";
import { Op, Bytecode, VM, disassemble } from "../bytecode-compiler.js";

describe("Bytecode", () => {
  it("emits instructions", () => {
    const bc = new Bytecode();
    bc.emit(Op.PUSH, 42);
    bc.emit(Op.HALT);
    const prog = bc.resolve();
    expect(prog).toHaveLength(2);
    expect(prog[0]).toEqual({ op: Op.PUSH, operand: 42 });
  });

  it("labels and jump resolution", () => {
    const bc = new Bytecode();
    bc.emitJump(Op.JMP, "end");
    bc.emit(Op.PUSH, 1);
    bc.label("end");
    bc.emit(Op.HALT);
    const prog = bc.resolve();
    expect(prog[0].operand).toBe(2);
  });

  it("throws on unknown label", () => {
    const bc = new Bytecode();
    bc.emitJump(Op.JMP, "nowhere");
    expect(() => bc.resolve()).toThrow("Unknown label");
  });

  it("tracks size", () => {
    const bc = new Bytecode();
    bc.emit(Op.PUSH, 1);
    bc.emit(Op.PUSH, 2);
    expect(bc.size).toBe(2);
  });
});

describe("VM", () => {
  it("arithmetic operations", () => {
    const prog = [
      { op: Op.PUSH, operand: 10 },
      { op: Op.PUSH, operand: 3 },
      { op: Op.ADD },
      { op: Op.HALT },
    ];
    const result = new VM().execute(prog);
    expect(result.stack).toEqual([13]);
  });

  it("subtraction and multiplication", () => {
    const prog = [
      { op: Op.PUSH, operand: 7 },
      { op: Op.PUSH, operand: 2 },
      { op: Op.SUB },
      { op: Op.PUSH, operand: 3 },
      { op: Op.MUL },
      { op: Op.HALT },
    ];
    const result = new VM().execute(prog);
    expect(result.stack).toEqual([15]);
  });

  it("division and modulo", () => {
    const prog = [
      { op: Op.PUSH, operand: 10 },
      { op: Op.PUSH, operand: 3 },
      { op: Op.DIV },
      { op: Op.PUSH, operand: 10 },
      { op: Op.PUSH, operand: 3 },
      { op: Op.MOD },
      { op: Op.HALT },
    ];
    const result = new VM().execute(prog);
    expect(result.stack).toEqual([3, 1]);
  });

  it("division by zero returns 0", () => {
    const prog = [
      { op: Op.PUSH, operand: 5 },
      { op: Op.PUSH, operand: 0 },
      { op: Op.DIV },
      { op: Op.HALT },
    ];
    const result = new VM().execute(prog);
    expect(result.stack).toEqual([0]);
  });

  it("comparison operations", () => {
    const prog = [
      { op: Op.PUSH, operand: 3 },
      { op: Op.PUSH, operand: 5 },
      { op: Op.LT },
      { op: Op.HALT },
    ];
    const result = new VM().execute(prog);
    expect(result.stack).toEqual([1]);
  });

  it("negation", () => {
    const prog = [
      { op: Op.PUSH, operand: 42 },
      { op: Op.NEG },
      { op: Op.HALT },
    ];
    const result = new VM().execute(prog);
    expect(result.stack).toEqual([-42]);
  });

  it("dup and swap", () => {
    const prog = [
      { op: Op.PUSH, operand: 1 },
      { op: Op.PUSH, operand: 2 },
      { op: Op.DUP },
      { op: Op.HALT },
    ];
    const result = new VM().execute(prog);
    expect(result.stack).toEqual([1, 2, 2]);
  });

  it("load and store variables", () => {
    const prog = [
      { op: Op.PUSH, operand: 99 },
      { op: Op.STORE, operand: 0 },
      { op: Op.LOAD, operand: 0 },
      { op: Op.HALT },
    ];
    const result = new VM().execute(prog);
    expect(result.stack).toEqual([99]);
    expect(result.vars.get(0)).toBe(99);
  });

  it("conditional jump", () => {
    const prog = [
      { op: Op.PUSH, operand: 0 },
      { op: Op.JZ, operand: 3 },
      { op: Op.PUSH, operand: 1 },
      { op: Op.PUSH, operand: 2 },
      { op: Op.HALT },
    ];
    const result = new VM().execute(prog);
    expect(result.stack).toEqual([2]);
  });

  it("loop with JNZ", () => {
    const bc = new Bytecode();
    bc.emit(Op.PUSH, 5);
    bc.emit(Op.STORE, 0);
    bc.label("loop");
    bc.emit(Op.LOAD, 0);
    bc.emit(Op.PRINT);
    bc.emit(Op.LOAD, 0);
    bc.emit(Op.PUSH, 1);
    bc.emit(Op.SUB);
    bc.emit(Op.STORE, 0);
    bc.emit(Op.LOAD, 0);
    bc.emitJump(Op.JNZ, "loop");
    bc.emit(Op.HALT);
    const result = new VM().execute(bc.resolve());
    expect(result.output).toEqual([5, 4, 3, 2, 1]);
  });

  it("call and ret", () => {
    const bc = new Bytecode();
    bc.emit(Op.PUSH, 10);
    bc.emitJump(Op.CALL, "double");
    bc.emit(Op.HALT);
    bc.label("double");
    bc.emit(Op.DUP);
    bc.emit(Op.ADD);
    bc.emit(Op.RET);
    const result = new VM().execute(bc.resolve());
    expect(result.stack).toEqual([20]);
  });

  it("print collects output", () => {
    const prog = [
      { op: Op.PUSH, operand: 42 },
      { op: Op.PRINT },
      { op: Op.HALT },
    ];
    const result = new VM().execute(prog);
    expect(result.output).toEqual([42]);
  });

  it("respects max steps", () => {
    const prog = [{ op: Op.JMP, operand: 0 }];
    const result = new VM(10).execute(prog);
    expect(result.stack).toEqual([]);
  });

  it("boolean operations", () => {
    const prog = [
      { op: Op.PUSH, operand: 1 },
      { op: Op.NOT },
      { op: Op.PUSH, operand: 1 },
      { op: Op.PUSH, operand: 0 },
      { op: Op.OR },
      { op: Op.HALT },
    ];
    const result = new VM().execute(prog);
    expect(result.stack).toEqual([0, 1]);
  });
});

describe("disassemble", () => {
  it("produces readable output", () => {
    const prog = [
      { op: Op.PUSH, operand: 5 },
      { op: Op.PUSH, operand: 3 },
      { op: Op.ADD },
      { op: Op.HALT },
    ];
    const text = disassemble(prog);
    expect(text).toContain("PUSH 5");
    expect(text).toContain("ADD");
    expect(text).toContain("HALT");
  });
});
