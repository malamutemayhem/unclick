export enum OpCode {
  PUSH = 0x01,
  POP = 0x02,
  ADD = 0x10,
  SUB = 0x11,
  MUL = 0x12,
  DIV = 0x13,
  MOD = 0x14,
  NEG = 0x15,
  EQ = 0x20,
  NE = 0x21,
  LT = 0x22,
  GT = 0x23,
  LE = 0x24,
  GE = 0x25,
  AND = 0x30,
  OR = 0x31,
  NOT = 0x32,
  LOAD = 0x40,
  STORE = 0x41,
  JMP = 0x50,
  JZ = 0x51,
  JNZ = 0x52,
  CALL = 0x60,
  RET = 0x61,
  DUP = 0x70,
  SWAP = 0x71,
  PRINT = 0x80,
  HALT = 0xFF,
}

export interface Instruction {
  op: OpCode;
  operand?: number;
}

export class VM {
  private stack: number[] = [];
  private memory: Map<number, number> = new Map();
  private callStack: number[] = [];
  private pc = 0;
  private output: number[] = [];
  private halted = false;
  private stepCount = 0;
  private maxSteps: number;

  constructor(maxSteps = 10000) {
    this.maxSteps = maxSteps;
  }

  execute(program: Instruction[]): number[] {
    this.pc = 0;
    this.stack = [];
    this.callStack = [];
    this.output = [];
    this.halted = false;
    this.stepCount = 0;

    while (this.pc < program.length && !this.halted && this.stepCount < this.maxSteps) {
      this.step(program);
      this.stepCount++;
    }

    return [...this.output];
  }

  private step(program: Instruction[]): void {
    const instr = program[this.pc];
    this.pc++;

    switch (instr.op) {
      case OpCode.PUSH:
        this.stack.push(instr.operand ?? 0);
        break;
      case OpCode.POP:
        this.stack.pop();
        break;
      case OpCode.ADD: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a + b);
        break;
      }
      case OpCode.SUB: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a - b);
        break;
      }
      case OpCode.MUL: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a * b);
        break;
      }
      case OpCode.DIV: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(b !== 0 ? Math.floor(a / b) : 0);
        break;
      }
      case OpCode.MOD: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(b !== 0 ? a % b : 0);
        break;
      }
      case OpCode.NEG:
        this.stack.push(-this.stack.pop()!);
        break;
      case OpCode.EQ: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a === b ? 1 : 0);
        break;
      }
      case OpCode.NE: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a !== b ? 1 : 0);
        break;
      }
      case OpCode.LT: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a < b ? 1 : 0);
        break;
      }
      case OpCode.GT: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a > b ? 1 : 0);
        break;
      }
      case OpCode.LE: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a <= b ? 1 : 0);
        break;
      }
      case OpCode.GE: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a >= b ? 1 : 0);
        break;
      }
      case OpCode.AND: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a && b ? 1 : 0);
        break;
      }
      case OpCode.OR: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a || b ? 1 : 0);
        break;
      }
      case OpCode.NOT:
        this.stack.push(this.stack.pop()! ? 0 : 1);
        break;
      case OpCode.LOAD:
        this.stack.push(this.memory.get(instr.operand ?? 0) ?? 0);
        break;
      case OpCode.STORE:
        this.memory.set(instr.operand ?? 0, this.stack.pop()!);
        break;
      case OpCode.JMP:
        this.pc = instr.operand ?? 0;
        break;
      case OpCode.JZ:
        if (this.stack.pop()! === 0) this.pc = instr.operand ?? 0;
        break;
      case OpCode.JNZ:
        if (this.stack.pop()! !== 0) this.pc = instr.operand ?? 0;
        break;
      case OpCode.CALL:
        this.callStack.push(this.pc);
        this.pc = instr.operand ?? 0;
        break;
      case OpCode.RET:
        this.pc = this.callStack.pop() ?? program.length;
        break;
      case OpCode.DUP:
        if (this.stack.length > 0) this.stack.push(this.stack[this.stack.length - 1]);
        break;
      case OpCode.SWAP: {
        const len = this.stack.length;
        if (len >= 2) [this.stack[len - 1], this.stack[len - 2]] = [this.stack[len - 2], this.stack[len - 1]];
        break;
      }
      case OpCode.PRINT:
        this.output.push(this.stack[this.stack.length - 1] ?? 0);
        break;
      case OpCode.HALT:
        this.halted = true;
        break;
    }
  }

  getStack(): number[] {
    return [...this.stack];
  }

  getMemory(): Map<number, number> {
    return new Map(this.memory);
  }

  getStepCount(): number {
    return this.stepCount;
  }

  isHalted(): boolean {
    return this.halted;
  }
}

export class Assembler {
  static assemble(source: string): Instruction[] {
    const instructions: Instruction[] = [];
    const labels = new Map<string, number>();
    const lines = source.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith(";"));

    let idx = 0;
    for (const line of lines) {
      if (line.endsWith(":")) {
        labels.set(line.slice(0, -1), idx);
      } else {
        idx++;
      }
    }

    for (const line of lines) {
      if (line.endsWith(":")) continue;
      const parts = line.split(/\s+/);
      const op = parts[0].toUpperCase();
      let operand: number | undefined;
      if (parts.length > 1) {
        operand = labels.get(parts[1]) ?? parseInt(parts[1], 10);
      }
      const opCode = OpCode[op as keyof typeof OpCode];
      if (opCode !== undefined) {
        instructions.push({ op: opCode, operand });
      }
    }

    return instructions;
  }
}
