export type IROpcode =
  | "const" | "load" | "store" | "add" | "sub" | "mul" | "div" | "mod"
  | "neg" | "eq" | "ne" | "lt" | "gt" | "le" | "ge"
  | "and" | "or" | "not"
  | "jump" | "branch" | "call" | "ret" | "label" | "phi" | "nop";

export interface IRInstruction {
  op: IROpcode;
  dest?: string;
  args: string[];
  label?: string;
}

export interface BasicBlock {
  id: string;
  instructions: IRInstruction[];
  successors: string[];
  predecessors: string[];
}

export class IRBuilder {
  private instructions: IRInstruction[] = [];
  private nextTemp = 0;
  private nextLabel = 0;

  temp(): string {
    return `t${this.nextTemp++}`;
  }

  newLabel(): string {
    return `L${this.nextLabel++}`;
  }

  emitConst(value: string): string {
    const dest = this.temp();
    this.instructions.push({ op: "const", dest, args: [value] });
    return dest;
  }

  emitBinOp(op: "add" | "sub" | "mul" | "div" | "mod", left: string, right: string): string {
    const dest = this.temp();
    this.instructions.push({ op, dest, args: [left, right] });
    return dest;
  }

  emitCmp(op: "eq" | "ne" | "lt" | "gt" | "le" | "ge", left: string, right: string): string {
    const dest = this.temp();
    this.instructions.push({ op, dest, args: [left, right] });
    return dest;
  }

  emitLoad(name: string): string {
    const dest = this.temp();
    this.instructions.push({ op: "load", dest, args: [name] });
    return dest;
  }

  emitStore(name: string, value: string): void {
    this.instructions.push({ op: "store", args: [name, value] });
  }

  emitLabel(label: string): void {
    this.instructions.push({ op: "label", label, args: [] });
  }

  emitJump(label: string): void {
    this.instructions.push({ op: "jump", args: [label] });
  }

  emitBranch(cond: string, trueLabel: string, falseLabel: string): void {
    this.instructions.push({ op: "branch", args: [cond, trueLabel, falseLabel] });
  }

  emitCall(func: string, callArgs: string[]): string {
    const dest = this.temp();
    this.instructions.push({ op: "call", dest, args: [func, ...callArgs] });
    return dest;
  }

  emitReturn(value: string): void {
    this.instructions.push({ op: "ret", args: [value] });
  }

  emitNeg(value: string): string {
    const dest = this.temp();
    this.instructions.push({ op: "neg", dest, args: [value] });
    return dest;
  }

  emitNot(value: string): string {
    const dest = this.temp();
    this.instructions.push({ op: "not", dest, args: [value] });
    return dest;
  }

  getInstructions(): IRInstruction[] {
    return [...this.instructions];
  }

  instructionCount(): number {
    return this.instructions.length;
  }
}

export function buildCFG(instructions: IRInstruction[]): BasicBlock[] {
  const blocks: BasicBlock[] = [];
  let current: IRInstruction[] = [];
  let currentId = "entry";

  const flush = () => {
    if (current.length > 0) {
      blocks.push({ id: currentId, instructions: [...current], successors: [], predecessors: [] });
      current = [];
    }
  };

  for (const inst of instructions) {
    if (inst.op === "label") {
      flush();
      currentId = inst.label!;
      current.push(inst);
    } else if (inst.op === "jump") {
      current.push(inst);
      const block: BasicBlock = {
        id: currentId,
        instructions: [...current],
        successors: [inst.args[0]],
        predecessors: [],
      };
      blocks.push(block);
      current = [];
      currentId = `block_${blocks.length}`;
    } else if (inst.op === "branch") {
      current.push(inst);
      const block: BasicBlock = {
        id: currentId,
        instructions: [...current],
        successors: [inst.args[1], inst.args[2]],
        predecessors: [],
      };
      blocks.push(block);
      current = [];
      currentId = `block_${blocks.length}`;
    } else if (inst.op === "ret") {
      current.push(inst);
      flush();
      currentId = `block_${blocks.length}`;
    } else {
      current.push(inst);
    }
  }

  flush();

  for (const block of blocks) {
    for (const succ of block.successors) {
      const target = blocks.find((b) => b.id === succ);
      if (target && !target.predecessors.includes(block.id)) {
        target.predecessors.push(block.id);
      }
    }
  }

  return blocks;
}

export function countUses(instructions: IRInstruction[]): Map<string, number> {
  const uses = new Map<string, number>();
  for (const inst of instructions) {
    for (const arg of inst.args) {
      uses.set(arg, (uses.get(arg) ?? 0) + 1);
    }
  }
  return uses;
}

export function deadCodeElimination(instructions: IRInstruction[]): IRInstruction[] {
  const uses = countUses(instructions);
  return instructions.filter((inst) => {
    if (!inst.dest) return true;
    if (inst.op === "call") return true;
    return (uses.get(inst.dest) ?? 0) > 0;
  });
}
