type RMInstruction =
  | { op: "INC"; reg: number; next: number }
  | { op: "DEC"; reg: number; next: number; zero: number }
  | { op: "HALT" }
  | { op: "CLR"; reg: number; next: number }
  | { op: "CPY"; from: number; to: number; next: number }
  | { op: "JMP"; next: number };

export class RegisterMachine {
  private program: RMInstruction[] = [];
  private registers: Map<number, number> = new Map();

  addInstruction(inst: RMInstruction): number {
    this.program.push(inst);
    return this.program.length - 1;
  }

  setRegister(reg: number, value: number): void {
    this.registers.set(reg, value);
  }

  getRegister(reg: number): number {
    return this.registers.get(reg) || 0;
  }

  run(maxSteps = 10000): { halted: boolean; steps: number } {
    let pc = 0;
    let steps = 0;

    while (steps < maxSteps) {
      if (pc < 0 || pc >= this.program.length) {
        return { halted: true, steps };
      }

      const inst = this.program[pc];
      steps++;

      switch (inst.op) {
        case "INC": {
          const val = this.registers.get(inst.reg) || 0;
          this.registers.set(inst.reg, val + 1);
          pc = inst.next;
          break;
        }
        case "DEC": {
          const val = this.registers.get(inst.reg) || 0;
          if (val > 0) {
            this.registers.set(inst.reg, val - 1);
            pc = inst.next;
          } else {
            pc = inst.zero;
          }
          break;
        }
        case "CLR":
          this.registers.set(inst.reg, 0);
          pc = inst.next;
          break;
        case "CPY": {
          const val = this.registers.get(inst.from) || 0;
          this.registers.set(inst.to, val);
          pc = inst.next;
          break;
        }
        case "JMP":
          pc = inst.next;
          break;
        case "HALT":
          return { halted: true, steps };
      }
    }

    return { halted: false, steps };
  }

  reset(): void {
    this.registers.clear();
  }

  programSize(): number {
    return this.program.length;
  }

  allRegisters(): Map<number, number> {
    return new Map(this.registers);
  }
}
