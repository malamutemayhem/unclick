import { describe, it, expect } from "vitest";
import { VM, OpCode, Assembler } from "../vm-bytecode.js";

describe("VM", () => {
  it("pushes and adds", () => {
    const vm = new VM();
    const output = vm.execute([
      { op: OpCode.PUSH, operand: 3 },
      { op: OpCode.PUSH, operand: 4 },
      { op: OpCode.ADD },
      { op: OpCode.PRINT },
      { op: OpCode.HALT },
    ]);
    expect(output).toEqual([7]);
  });

  it("subtracts and multiplies", () => {
    const vm = new VM();
    const output = vm.execute([
      { op: OpCode.PUSH, operand: 10 },
      { op: OpCode.PUSH, operand: 3 },
      { op: OpCode.SUB },
      { op: OpCode.PUSH, operand: 2 },
      { op: OpCode.MUL },
      { op: OpCode.PRINT },
      { op: OpCode.HALT },
    ]);
    expect(output).toEqual([14]);
  });

  it("division and modulo", () => {
    const vm = new VM();
    const output = vm.execute([
      { op: OpCode.PUSH, operand: 17 },
      { op: OpCode.PUSH, operand: 5 },
      { op: OpCode.DIV },
      { op: OpCode.PRINT },
      { op: OpCode.PUSH, operand: 17 },
      { op: OpCode.PUSH, operand: 5 },
      { op: OpCode.MOD },
      { op: OpCode.PRINT },
      { op: OpCode.HALT },
    ]);
    expect(output).toEqual([3, 2]);
  });

  it("comparison operators", () => {
    const vm = new VM();
    const output = vm.execute([
      { op: OpCode.PUSH, operand: 5 },
      { op: OpCode.PUSH, operand: 3 },
      { op: OpCode.GT },
      { op: OpCode.PRINT },
      { op: OpCode.PUSH, operand: 2 },
      { op: OpCode.PUSH, operand: 2 },
      { op: OpCode.EQ },
      { op: OpCode.PRINT },
      { op: OpCode.HALT },
    ]);
    expect(output).toEqual([1, 1]);
  });

  it("conditional jump", () => {
    const vm = new VM();
    const output = vm.execute([
      { op: OpCode.PUSH, operand: 0 },
      { op: OpCode.JZ, operand: 4 },
      { op: OpCode.PUSH, operand: 99 },
      { op: OpCode.PRINT },
      { op: OpCode.PUSH, operand: 42 },
      { op: OpCode.PRINT },
      { op: OpCode.HALT },
    ]);
    expect(output).toEqual([42]);
  });

  it("store and load memory", () => {
    const vm = new VM();
    const output = vm.execute([
      { op: OpCode.PUSH, operand: 100 },
      { op: OpCode.STORE, operand: 0 },
      { op: OpCode.LOAD, operand: 0 },
      { op: OpCode.PRINT },
      { op: OpCode.HALT },
    ]);
    expect(output).toEqual([100]);
  });

  it("dup and swap", () => {
    const vm = new VM();
    const output = vm.execute([
      { op: OpCode.PUSH, operand: 5 },
      { op: OpCode.DUP },
      { op: OpCode.ADD },
      { op: OpCode.PRINT },
      { op: OpCode.HALT },
    ]);
    expect(output).toEqual([10]);
  });

  it("call and ret", () => {
    const vm = new VM();
    const output = vm.execute([
      { op: OpCode.PUSH, operand: 10 },
      { op: OpCode.CALL, operand: 5 },
      { op: OpCode.PRINT },
      { op: OpCode.HALT },
      { op: OpCode.HALT },
      { op: OpCode.PUSH, operand: 20 },
      { op: OpCode.ADD },
      { op: OpCode.RET },
    ]);
    expect(output).toEqual([30]);
  });

  it("negation and not", () => {
    const vm = new VM();
    const output = vm.execute([
      { op: OpCode.PUSH, operand: 5 },
      { op: OpCode.NEG },
      { op: OpCode.PRINT },
      { op: OpCode.PUSH, operand: 0 },
      { op: OpCode.NOT },
      { op: OpCode.PRINT },
      { op: OpCode.HALT },
    ]);
    expect(output).toEqual([-5, 1]);
  });

  it("reports state", () => {
    const vm = new VM();
    vm.execute([
      { op: OpCode.PUSH, operand: 42 },
      { op: OpCode.HALT },
    ]);
    expect(vm.getStack()).toEqual([42]);
    expect(vm.isHalted()).toBe(true);
    expect(vm.getStepCount()).toBe(2);
  });
});

describe("Assembler", () => {
  it("assembles simple program", () => {
    const program = Assembler.assemble(`
      PUSH 5
      PUSH 3
      ADD
      PRINT
      HALT
    `);
    const vm = new VM();
    expect(vm.execute(program)).toEqual([8]);
  });

  it("handles labels", () => {
    const program = Assembler.assemble(`
      PUSH 1
      JMP skip
      PUSH 99
      PRINT
skip:
      PUSH 42
      PRINT
      HALT
    `);
    const vm = new VM();
    expect(vm.execute(program)).toEqual([42]);
  });

  it("ignores comments", () => {
    const program = Assembler.assemble(`
      ; this is a comment
      PUSH 7
      PRINT
      HALT
    `);
    const vm = new VM();
    expect(vm.execute(program)).toEqual([7]);
  });
});
