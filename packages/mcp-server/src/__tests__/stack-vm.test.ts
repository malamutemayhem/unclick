import { describe, it, expect } from "vitest";
import { OpCode, createVM, execute, assemble, disassemble } from "../stack-vm.js";

describe("execute", () => {
  it("pushes and adds", () => {
    const program = [OpCode.PUSH, 3, OpCode.PUSH, 4, OpCode.ADD, OpCode.HALT];
    const vm = execute(program);
    expect(vm.stack).toEqual([7]);
  });

  it("subtracts", () => {
    const program = [OpCode.PUSH, 10, OpCode.PUSH, 3, OpCode.SUB, OpCode.HALT];
    const vm = execute(program);
    expect(vm.stack).toEqual([7]);
  });

  it("multiplies", () => {
    const program = [OpCode.PUSH, 6, OpCode.PUSH, 7, OpCode.MUL, OpCode.HALT];
    const vm = execute(program);
    expect(vm.stack).toEqual([42]);
  });

  it("divides with truncation", () => {
    const program = [OpCode.PUSH, 7, OpCode.PUSH, 2, OpCode.DIV, OpCode.HALT];
    const vm = execute(program);
    expect(vm.stack).toEqual([3]);
  });

  it("handles dup and swap", () => {
    const program = [OpCode.PUSH, 1, OpCode.PUSH, 2, OpCode.DUP, OpCode.HALT];
    const vm = execute(program);
    expect(vm.stack).toEqual([1, 2, 2]);
  });

  it("conditional jump (JZ)", () => {
    const program = [
      OpCode.PUSH, 0,
      OpCode.JZ, 8,
      OpCode.PUSH, 99,
      OpCode.HALT,
      0,
      OpCode.PUSH, 42,
      OpCode.HALT,
    ];
    const vm = execute(program);
    expect(vm.stack).toEqual([42]);
  });

  it("stores and loads memory", () => {
    const program = [
      OpCode.PUSH, 55,
      OpCode.STORE, 0,
      OpCode.LOAD, 0,
      OpCode.HALT,
    ];
    const vm = execute(program);
    expect(vm.stack).toEqual([55]);
  });

  it("prints to output", () => {
    const program = [OpCode.PUSH, 42, OpCode.PRINT, OpCode.HALT];
    const vm = execute(program);
    expect(vm.output).toEqual([42]);
  });

  it("calls and returns", () => {
    const program = [
      OpCode.PUSH, 10,
      OpCode.CALL, 8,
      OpCode.PRINT,
      OpCode.HALT,
      0, 0,
      OpCode.PUSH, 5,
      OpCode.ADD,
      OpCode.RET,
    ];
    const vm = execute(program);
    expect(vm.output).toEqual([15]);
  });

  it("respects max steps", () => {
    const program = [OpCode.JMP, 0];
    const vm = execute(program, undefined, 100);
    expect(vm.halted).toBe(false);
  });
});

describe("assemble", () => {
  it("assembles simple program", () => {
    const source = "PUSH 5\nPUSH 3\nADD\nHALT";
    const program = assemble(source);
    const vm = execute(program);
    expect(vm.stack).toEqual([8]);
  });

  it("resolves labels", () => {
    const source = `PUSH 0
JZ skip
PUSH 99
HALT
skip:
PUSH 42
HALT`;
    const program = assemble(source);
    const vm = execute(program);
    expect(vm.stack).toEqual([42]);
  });

  it("ignores comments", () => {
    const source = "; comment\nPUSH 1\nHALT";
    const program = assemble(source);
    const vm = execute(program);
    expect(vm.stack).toEqual([1]);
  });
});

describe("disassemble", () => {
  it("disassembles program", () => {
    const program = [OpCode.PUSH, 42, OpCode.HALT];
    const output = disassemble(program);
    expect(output).toContain("PUSH 42");
    expect(output).toContain("HALT");
  });
});
