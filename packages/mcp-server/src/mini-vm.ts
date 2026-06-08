export enum OpCode {
  PUSH = 0,
  POP = 1,
  ADD = 2,
  SUB = 3,
  MUL = 4,
  DIV = 5,
  MOD = 6,
  DUP = 7,
  SWAP = 8,
  LOAD = 9,
  STORE = 10,
  JMP = 11,
  JZ = 12,
  JNZ = 13,
  CMP_EQ = 14,
  CMP_LT = 15,
  CMP_GT = 16,
  PRINT = 17,
  HALT = 18,
  NEG = 19,
  CALL = 20,
  RET = 21,
}

export interface Instruction {
  op: OpCode;
  operand?: number;
}

export class MiniVM {
  private stack: number[] = [];
  private memory: number[] = new Array(256).fill(0);
  private callStack: number[] = [];
  private pc = 0;
  private halted = false;
  private output: number[] = [];
  private stepCount = 0;
  private readonly maxSteps: number;

  constructor(maxSteps: number = 10000) {
    this.maxSteps = maxSteps;
  }

  execute(program: Instruction[]): number[] {
    this.pc = 0;
    this.halted = false;
    this.stepCount = 0;
    this.output = [];
    while (!this.halted && this.pc < program.length && this.stepCount < this.maxSteps) {
      this.step(program[this.pc], program);
      this.stepCount++;
    }
    return this.output;
  }

  private step(instr: Instruction, _program: Instruction[]): void {
    switch (instr.op) {
      case OpCode.PUSH:
        this.stack.push(instr.operand!);
        this.pc++;
        break;
      case OpCode.POP:
        this.stack.pop();
        this.pc++;
        break;
      case OpCode.ADD: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a + b);
        this.pc++;
        break;
      }
      case OpCode.SUB: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a - b);
        this.pc++;
        break;
      }
      case OpCode.MUL: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a * b);
        this.pc++;
        break;
      }
      case OpCode.DIV: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(b === 0 ? 0 : Math.trunc(a / b));
        this.pc++;
        break;
      }
      case OpCode.MOD: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(b === 0 ? 0 : a % b);
        this.pc++;
        break;
      }
      case OpCode.DUP:
        this.stack.push(this.stack[this.stack.length - 1]);
        this.pc++;
        break;
      case OpCode.SWAP: {
        const x = this.stack.pop()!;
        const y = this.stack.pop()!;
        this.stack.push(x, y);
        this.pc++;
        break;
      }
      case OpCode.LOAD:
        this.stack.push(this.memory[instr.operand!]);
        this.pc++;
        break;
      case OpCode.STORE:
        this.memory[instr.operand!] = this.stack.pop()!;
        this.pc++;
        break;
      case OpCode.JMP:
        this.pc = instr.operand!;
        break;
      case OpCode.JZ:
        this.pc = this.stack.pop()! === 0 ? instr.operand! : this.pc + 1;
        break;
      case OpCode.JNZ:
        this.pc = this.stack.pop()! !== 0 ? instr.operand! : this.pc + 1;
        break;
      case OpCode.CMP_EQ: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a === b ? 1 : 0);
        this.pc++;
        break;
      }
      case OpCode.CMP_LT: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a < b ? 1 : 0);
        this.pc++;
        break;
      }
      case OpCode.CMP_GT: {
        const b = this.stack.pop()!;
        const a = this.stack.pop()!;
        this.stack.push(a > b ? 1 : 0);
        this.pc++;
        break;
      }
      case OpCode.NEG:
        this.stack.push(-this.stack.pop()!);
        this.pc++;
        break;
      case OpCode.PRINT:
        this.output.push(this.stack[this.stack.length - 1]);
        this.pc++;
        break;
      case OpCode.CALL:
        this.callStack.push(this.pc + 1);
        this.pc = instr.operand!;
        break;
      case OpCode.RET:
        this.pc = this.callStack.pop()!;
        break;
      case OpCode.HALT:
        this.halted = true;
        break;
    }
  }

  getStack(): number[] {
    return [...this.stack];
  }

  getMemory(addr: number): number {
    return this.memory[addr];
  }

  get steps(): number {
    return this.stepCount;
  }
}
