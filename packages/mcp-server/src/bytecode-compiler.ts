export enum Op {
  PUSH = 0,
  POP,
  DUP,
  SWAP,
  ADD,
  SUB,
  MUL,
  DIV,
  MOD,
  NEG,
  EQ,
  NE,
  LT,
  GT,
  LE,
  GE,
  AND,
  OR,
  NOT,
  LOAD,
  STORE,
  JMP,
  JZ,
  JNZ,
  CALL,
  RET,
  PRINT,
  HALT,
}

export interface Instruction {
  op: Op;
  operand?: number;
}

export class Bytecode {
  private instructions: Instruction[] = [];
  private labels = new Map<string, number>();
  private patches: { index: number; label: string }[] = [];

  emit(op: Op, operand?: number): number {
    const idx = this.instructions.length;
    this.instructions.push({ op, operand });
    return idx;
  }

  label(name: string): void {
    this.labels.set(name, this.instructions.length);
  }

  emitJump(op: Op, label: string): number {
    const idx = this.emit(op, 0);
    this.patches.push({ index: idx, label });
    return idx;
  }

  resolve(): Instruction[] {
    for (const patch of this.patches) {
      const target = this.labels.get(patch.label);
      if (target === undefined) throw new Error(`Unknown label: ${patch.label}`);
      this.instructions[patch.index].operand = target;
    }
    return [...this.instructions];
  }

  get size(): number {
    return this.instructions.length;
  }
}

export class VM {
  private stack: number[] = [];
  private vars = new Map<number, number>();
  private callStack: number[] = [];
  private pc = 0;
  private output: number[] = [];
  private maxSteps: number;

  constructor(maxSteps = 10000) {
    this.maxSteps = maxSteps;
  }

  execute(program: Instruction[]): { stack: number[]; output: number[]; vars: Map<number, number> } {
    this.stack = [];
    this.vars = new Map();
    this.callStack = [];
    this.pc = 0;
    this.output = [];
    let steps = 0;

    while (this.pc < program.length && steps < this.maxSteps) {
      const inst = program[this.pc];
      steps++;

      switch (inst.op) {
        case Op.PUSH:
          this.stack.push(inst.operand!);
          break;
        case Op.POP:
          this.stack.pop();
          break;
        case Op.DUP:
          this.stack.push(this.stack[this.stack.length - 1]);
          break;
        case Op.SWAP: {
          const a = this.stack.pop()!;
          const b = this.stack.pop()!;
          this.stack.push(a, b);
          break;
        }
        case Op.ADD:
          this.binOp((a, b) => a + b);
          break;
        case Op.SUB:
          this.binOp((a, b) => a - b);
          break;
        case Op.MUL:
          this.binOp((a, b) => a * b);
          break;
        case Op.DIV:
          this.binOp((a, b) => (b === 0 ? 0 : Math.trunc(a / b)));
          break;
        case Op.MOD:
          this.binOp((a, b) => (b === 0 ? 0 : a % b));
          break;
        case Op.NEG:
          this.stack.push(-this.stack.pop()!);
          break;
        case Op.EQ:
          this.binOp((a, b) => (a === b ? 1 : 0));
          break;
        case Op.NE:
          this.binOp((a, b) => (a !== b ? 1 : 0));
          break;
        case Op.LT:
          this.binOp((a, b) => (a < b ? 1 : 0));
          break;
        case Op.GT:
          this.binOp((a, b) => (a > b ? 1 : 0));
          break;
        case Op.LE:
          this.binOp((a, b) => (a <= b ? 1 : 0));
          break;
        case Op.GE:
          this.binOp((a, b) => (a >= b ? 1 : 0));
          break;
        case Op.AND:
          this.binOp((a, b) => (a && b ? 1 : 0));
          break;
        case Op.OR:
          this.binOp((a, b) => (a || b ? 1 : 0));
          break;
        case Op.NOT:
          this.stack.push(this.stack.pop()! ? 0 : 1);
          break;
        case Op.LOAD:
          this.stack.push(this.vars.get(inst.operand!) ?? 0);
          break;
        case Op.STORE:
          this.vars.set(inst.operand!, this.stack.pop()!);
          break;
        case Op.JMP:
          this.pc = inst.operand!;
          continue;
        case Op.JZ:
          if (this.stack.pop()! === 0) {
            this.pc = inst.operand!;
            continue;
          }
          break;
        case Op.JNZ:
          if (this.stack.pop()! !== 0) {
            this.pc = inst.operand!;
            continue;
          }
          break;
        case Op.CALL:
          this.callStack.push(this.pc + 1);
          this.pc = inst.operand!;
          continue;
        case Op.RET: {
          const ret = this.callStack.pop();
          if (ret === undefined) return this.result();
          this.pc = ret;
          continue;
        }
        case Op.PRINT:
          this.output.push(this.stack[this.stack.length - 1]);
          break;
        case Op.HALT:
          return this.result();
      }
      this.pc++;
    }
    return this.result();
  }

  private binOp(fn: (a: number, b: number) => number): void {
    const b = this.stack.pop()!;
    const a = this.stack.pop()!;
    this.stack.push(fn(a, b));
  }

  private result(): { stack: number[]; output: number[]; vars: Map<number, number> } {
    return { stack: [...this.stack], output: [...this.output], vars: new Map(this.vars) };
  }
}

export function disassemble(program: Instruction[]): string {
  const names = Object.keys(Op).filter((k) => isNaN(Number(k)));
  return program
    .map((inst, i) => {
      const name = names[inst.op] ?? `OP_${inst.op}`;
      return inst.operand !== undefined ? `${i}: ${name} ${inst.operand}` : `${i}: ${name}`;
    })
    .join("\n");
}
