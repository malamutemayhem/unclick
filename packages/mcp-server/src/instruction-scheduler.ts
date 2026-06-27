export interface Instruction {
  id: number;
  name: string;
  latency: number;
  reads: string[];
  writes: string[];
  unit: "alu" | "mem" | "branch" | "mul";
}

export interface ScheduleSlot {
  cycle: number;
  instruction: Instruction;
  unit: string;
}

export class InstructionScheduler {
  private instructions: Instruction[] = [];
  private nextId = 0;

  add(name: string, latency: number, reads: string[], writes: string[], unit: Instruction["unit"] = "alu"): Instruction {
    const instr: Instruction = { id: this.nextId++, name, latency, reads: [...reads], writes: [...writes], unit };
    this.instructions.push(instr);
    return instr;
  }

  buildDependencyGraph(): Map<number, number[]> {
    const deps = new Map<number, number[]>();
    for (const instr of this.instructions) deps.set(instr.id, []);

    for (let i = 0; i < this.instructions.length; i++) {
      for (let j = i + 1; j < this.instructions.length; j++) {
        const a = this.instructions[i];
        const b = this.instructions[j];

        const rawDep = a.writes.some((w) => b.reads.includes(w));
        const warDep = a.reads.some((r) => b.writes.includes(r));
        const wawDep = a.writes.some((w) => b.writes.includes(w));

        if (rawDep || warDep || wawDep) {
          deps.get(b.id)!.push(a.id);
        }
      }
    }
    return deps;
  }

  scheduleInOrder(): ScheduleSlot[] {
    const schedule: ScheduleSlot[] = [];
    let cycle = 0;
    const finishTimes = new Map<number, number>();

    for (const instr of this.instructions) {
      const deps = this.buildDependencyGraph().get(instr.id) ?? [];
      let earliest = cycle;
      for (const depId of deps) {
        const ft = finishTimes.get(depId) ?? 0;
        earliest = Math.max(earliest, ft);
      }
      schedule.push({ cycle: earliest, instruction: { ...instr }, unit: instr.unit });
      finishTimes.set(instr.id, earliest + instr.latency);
      cycle = earliest + 1;
    }

    return schedule;
  }

  scheduleListScheduling(): ScheduleSlot[] {
    const deps = this.buildDependencyGraph();
    const schedule: ScheduleSlot[] = [];
    const finishTimes = new Map<number, number>();
    const scheduled = new Set<number>();
    const unitBusy = new Map<string, number>();

    const priorities = new Map<number, number>();
    for (const instr of this.instructions) {
      priorities.set(instr.id, this.computePriority(instr.id, deps));
    }

    let cycle = 0;
    const maxCycles = this.instructions.length * 10;

    while (scheduled.size < this.instructions.length && cycle < maxCycles) {
      const ready = this.instructions.filter((instr) => {
        if (scheduled.has(instr.id)) return false;
        const instrDeps = deps.get(instr.id) ?? [];
        return instrDeps.every((d) => (finishTimes.get(d) ?? Infinity) <= cycle);
      });

      ready.sort((a, b) => (priorities.get(b.id) ?? 0) - (priorities.get(a.id) ?? 0));

      for (const instr of ready) {
        const unitFree = (unitBusy.get(instr.unit) ?? 0) <= cycle;
        if (unitFree) {
          schedule.push({ cycle, instruction: { ...instr }, unit: instr.unit });
          finishTimes.set(instr.id, cycle + instr.latency);
          unitBusy.set(instr.unit, cycle + 1);
          scheduled.add(instr.id);
        }
      }

      cycle++;
    }

    return schedule;
  }

  private computePriority(id: number, deps: Map<number, number[]>): number {
    const instr = this.instructions.find((i) => i.id === id);
    if (!instr) return 0;

    let maxSucc = 0;
    for (const other of this.instructions) {
      const otherDeps = deps.get(other.id) ?? [];
      if (otherDeps.includes(id)) {
        maxSucc = Math.max(maxSucc, this.computePriority(other.id, deps));
      }
    }
    return instr.latency + maxSucc;
  }

  get count(): number {
    return this.instructions.length;
  }

  getInstructions(): Instruction[] {
    return this.instructions.map((i) => ({ ...i, reads: [...i.reads], writes: [...i.writes] }));
  }

  clear(): void {
    this.instructions = [];
    this.nextId = 0;
  }

  criticalPathLength(): number {
    const deps = this.buildDependencyGraph();
    let maxLen = 0;
    for (const instr of this.instructions) {
      maxLen = Math.max(maxLen, this.computePriority(instr.id, deps));
    }
    return maxLen;
  }
}
