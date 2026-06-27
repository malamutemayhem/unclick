export enum OpCode {
  PUSH = 0x01,
  POP = 0x02,
  DUP = 0x03,
  SWAP = 0x04,
  ADD = 0x10,
  SUB = 0x11,
  MUL = 0x12,
  DIV = 0x13,
  MOD = 0x14,
  NEG = 0x15,
  AND = 0x20,
  OR = 0x21,
  NOT = 0x22,
  EQ = 0x23,
  LT = 0x24,
  GT = 0x25,
  JMP = 0x30,
  JZ = 0x31,
  JNZ = 0x32,
  CALL = 0x33,
  RET = 0x34,
  LOAD = 0x40,
  STORE = 0x41,
  PRINT = 0x50,
  HALT = 0xFF,
}

export interface VMState {
  stack: number[];
  memory: Map<number, number>;
  output: number[];
  pc: number;
  callStack: number[];
  halted: boolean;
}

export function createVM(): VMState {
  return {
    stack: [],
    memory: new Map(),
    output: [],
    pc: 0,
    callStack: [],
    halted: false,
  };
}

export function execute(program: number[], state?: VMState, maxSteps = 10000): VMState {
  const vm = state ? { ...state, stack: [...state.stack], output: [...state.output], callStack: [...state.callStack], memory: new Map(state.memory) } : createVM();
  let steps = 0;

  while (!vm.halted && vm.pc < program.length && steps < maxSteps) {
    steps++;
    const op = program[vm.pc++];

    switch (op) {
      case OpCode.PUSH: {
        const val = program[vm.pc++];
        vm.stack.push(val);
        break;
      }
      case OpCode.POP:
        vm.stack.pop();
        break;
      case OpCode.DUP:
        vm.stack.push(vm.stack[vm.stack.length - 1]);
        break;
      case OpCode.SWAP: {
        const a = vm.stack.pop()!;
        const b = vm.stack.pop()!;
        vm.stack.push(a, b);
        break;
      }
      case OpCode.ADD: {
        const b = vm.stack.pop()!;
        const a = vm.stack.pop()!;
        vm.stack.push(a + b);
        break;
      }
      case OpCode.SUB: {
        const b = vm.stack.pop()!;
        const a = vm.stack.pop()!;
        vm.stack.push(a - b);
        break;
      }
      case OpCode.MUL: {
        const b = vm.stack.pop()!;
        const a = vm.stack.pop()!;
        vm.stack.push(a * b);
        break;
      }
      case OpCode.DIV: {
        const b = vm.stack.pop()!;
        const a = vm.stack.pop()!;
        vm.stack.push(Math.trunc(a / b));
        break;
      }
      case OpCode.MOD: {
        const b = vm.stack.pop()!;
        const a = vm.stack.pop()!;
        vm.stack.push(a % b);
        break;
      }
      case OpCode.NEG:
        vm.stack.push(-vm.stack.pop()!);
        break;
      case OpCode.AND: {
        const b = vm.stack.pop()!;
        const a = vm.stack.pop()!;
        vm.stack.push(a & b);
        break;
      }
      case OpCode.OR: {
        const b = vm.stack.pop()!;
        const a = vm.stack.pop()!;
        vm.stack.push(a | b);
        break;
      }
      case OpCode.NOT:
        vm.stack.push(vm.stack.pop()! === 0 ? 1 : 0);
        break;
      case OpCode.EQ: {
        const b = vm.stack.pop()!;
        const a = vm.stack.pop()!;
        vm.stack.push(a === b ? 1 : 0);
        break;
      }
      case OpCode.LT: {
        const b = vm.stack.pop()!;
        const a = vm.stack.pop()!;
        vm.stack.push(a < b ? 1 : 0);
        break;
      }
      case OpCode.GT: {
        const b = vm.stack.pop()!;
        const a = vm.stack.pop()!;
        vm.stack.push(a > b ? 1 : 0);
        break;
      }
      case OpCode.JMP:
        vm.pc = program[vm.pc];
        break;
      case OpCode.JZ: {
        const addr = program[vm.pc++];
        if (vm.stack.pop()! === 0) vm.pc = addr;
        break;
      }
      case OpCode.JNZ: {
        const addr = program[vm.pc++];
        if (vm.stack.pop()! !== 0) vm.pc = addr;
        break;
      }
      case OpCode.CALL:
        vm.callStack.push(vm.pc + 1);
        vm.pc = program[vm.pc];
        break;
      case OpCode.RET:
        vm.pc = vm.callStack.pop()!;
        break;
      case OpCode.LOAD: {
        const addr = program[vm.pc++];
        vm.stack.push(vm.memory.get(addr) ?? 0);
        break;
      }
      case OpCode.STORE: {
        const addr = program[vm.pc++];
        vm.memory.set(addr, vm.stack.pop()!);
        break;
      }
      case OpCode.PRINT:
        vm.output.push(vm.stack[vm.stack.length - 1]);
        break;
      case OpCode.HALT:
        vm.halted = true;
        break;
    }
  }

  return vm;
}

export function assemble(source: string): number[] {
  const labels = new Map<string, number>();
  const lines = source.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith(";"));
  const program: (number | string)[] = [];

  for (const line of lines) {
    if (line.endsWith(":")) {
      labels.set(line.slice(0, -1), program.length);
      continue;
    }
    const parts = line.split(/\s+/);
    const op = parts[0].toUpperCase();
    const opcode = OpCode[op as keyof typeof OpCode];
    if (opcode === undefined) throw new Error(`Unknown opcode: ${op}`);
    program.push(opcode);
    if (parts.length > 1) {
      const arg = parts[1];
      const num = Number(arg);
      program.push(isNaN(num) ? arg : num);
    }
  }

  return program.map((v) => {
    if (typeof v === "string") {
      const addr = labels.get(v);
      if (addr === undefined) throw new Error(`Undefined label: ${v}`);
      return addr;
    }
    return v;
  });
}

export function disassemble(program: number[]): string {
  const lines: string[] = [];
  let i = 0;
  while (i < program.length) {
    const op = program[i];
    const name = OpCode[op] ?? `0x${op.toString(16)}`;
    const needsArg = [
      OpCode.PUSH, OpCode.JMP, OpCode.JZ, OpCode.JNZ,
      OpCode.CALL, OpCode.LOAD, OpCode.STORE,
    ].includes(op);
    if (needsArg && i + 1 < program.length) {
      lines.push(`${i}: ${name} ${program[i + 1]}`);
      i += 2;
    } else {
      lines.push(`${i}: ${name}`);
      i++;
    }
  }
  return lines.join("\n");
}
