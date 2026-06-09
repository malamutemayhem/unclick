export type IROpcode =
  | "const" | "load" | "store"
  | "add" | "sub" | "mul" | "div" | "mod" | "neg"
  | "eq" | "ne" | "lt" | "le" | "gt" | "ge"
  | "and" | "or" | "not"
  | "jmp" | "jz" | "jnz"
  | "call" | "ret"
  | "nop" | "phi";

export interface IRInstr {
  id: number;
  op: IROpcode;
  dest?: string;
  args: string[];
  value?: number;
  label?: string;
}

export class IRBlock {
  label: string;
  instrs: IRInstr[] = [];
  successors: string[] = [];

  constructor(label: string) {
    this.label = label;
  }
}

let nextId = 0;

export function irConst(dest: string, value: number): IRInstr {
  return { id: nextId++, op: "const", dest, args: [], value };
}

export function irBinOp(op: IROpcode, dest: string, left: string, right: string): IRInstr {
  return { id: nextId++, op, dest, args: [left, right] };
}

export function irLoad(dest: string, addr: string): IRInstr {
  return { id: nextId++, op: "load", dest, args: [addr] };
}

export function irStore(addr: string, val: string): IRInstr {
  return { id: nextId++, op: "store", args: [addr, val] };
}

export function irNop(): IRInstr {
  return { id: nextId++, op: "nop", args: [] };
}

export function irJmp(label: string): IRInstr {
  return { id: nextId++, op: "jmp", args: [], label };
}

export function constantFold(instrs: IRInstr[]): IRInstr[] {
  const constants = new Map<string, number>();
  const result: IRInstr[] = [];

  for (const instr of instrs) {
    if (instr.op === "const" && instr.dest && instr.value !== undefined) {
      constants.set(instr.dest, instr.value);
      result.push(instr);
      continue;
    }

    const binaryOps: Record<string, (a: number, b: number) => number> = {
      add: (a, b) => a + b,
      sub: (a, b) => a - b,
      mul: (a, b) => a * b,
      div: (a, b) => b !== 0 ? Math.trunc(a / b) : 0,
      mod: (a, b) => b !== 0 ? a % b : 0,
    };

    const fn = binaryOps[instr.op];
    if (fn && instr.args.length === 2 && instr.dest) {
      const a = constants.get(instr.args[0]);
      const b = constants.get(instr.args[1]);
      if (a !== undefined && b !== undefined) {
        const val = fn(a, b);
        constants.set(instr.dest, val);
        result.push({ ...instr, op: "const", args: [], value: val });
        continue;
      }
    }

    result.push(instr);
  }

  return result;
}

export function deadCodeElimination(instrs: IRInstr[]): IRInstr[] {
  const used = new Set<string>();

  for (const instr of instrs) {
    for (const arg of instr.args) used.add(arg);
  }

  return instrs.filter(instr => {
    if (instr.op === "nop") return false;
    if (instr.op === "store" || instr.op === "call" || instr.op === "ret" ||
        instr.op === "jmp" || instr.op === "jz" || instr.op === "jnz") return true;
    if (instr.dest && !used.has(instr.dest)) return false;
    return true;
  });
}

export function copyPropagation(instrs: IRInstr[]): IRInstr[] {
  const copies = new Map<string, string>();

  function resolve(name: string): string {
    let current = name;
    const visited = new Set<string>();
    while (copies.has(current) && !visited.has(current)) {
      visited.add(current);
      current = copies.get(current)!;
    }
    return current;
  }

  return instrs.map(instr => {
    const newInstr = { ...instr, args: instr.args.map(a => resolve(a)) };

    if (instr.op === "load" && instr.dest && instr.args.length === 1) {
      copies.set(instr.dest, resolve(instr.args[0]));
    }

    return newInstr;
  });
}

export function strengthReduction(instrs: IRInstr[]): IRInstr[] {
  const constants = new Map<string, number>();

  return instrs.map(instr => {
    if (instr.op === "const" && instr.dest !== undefined && instr.value !== undefined) {
      constants.set(instr.dest, instr.value);
    }

    if (instr.op === "mul" && instr.dest && instr.args.length === 2) {
      const bVal = constants.get(instr.args[1]);
      if (bVal !== undefined && bVal > 0 && (bVal & (bVal - 1)) === 0) {
        const shift = Math.log2(bVal);
        return { ...instr, op: "add" as IROpcode, args: [instr.args[0], `#shl${shift}`] };
      }
    }

    if (instr.op === "div" && instr.dest && instr.args.length === 2) {
      const bVal = constants.get(instr.args[1]);
      if (bVal !== undefined && bVal > 0 && (bVal & (bVal - 1)) === 0) {
        const shift = Math.log2(bVal);
        return { ...instr, op: "add" as IROpcode, args: [instr.args[0], `#shr${shift}`] };
      }
    }

    return instr;
  });
}

export function optimize(instrs: IRInstr[]): IRInstr[] {
  let current = instrs;
  current = constantFold(current);
  current = copyPropagation(current);
  current = deadCodeElimination(current);
  current = strengthReduction(current);
  return current;
}

export function resetIdCounter(): void {
  nextId = 0;
}
