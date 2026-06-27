export type PipelineStage = "IF" | "ID" | "EX" | "MEM" | "WB";

export interface PipelineInstruction {
  id: number;
  name: string;
  stage: PipelineStage | "stall" | "done";
  cycle: number;
  readsRegs: string[];
  writesReg?: string;
}

export interface PipelineCycle {
  cycle: number;
  stages: Map<PipelineStage, PipelineInstruction | null>;
  stalls: number;
  flushes: number;
}

const STAGES: PipelineStage[] = ["IF", "ID", "EX", "MEM", "WB"];

export class PipelineSim {
  private instructions: PipelineInstruction[] = [];
  private history: PipelineCycle[] = [];
  private currentCycle = 0;
  private nextId = 0;
  private totalStalls = 0;
  private totalFlushes = 0;
  private forwardingEnabled: boolean;

  constructor(forwarding = false) {
    this.forwardingEnabled = forwarding;
  }

  addInstruction(name: string, readsRegs: string[] = [], writesReg?: string): void {
    this.instructions.push({
      id: this.nextId++,
      name,
      stage: "IF",
      cycle: 0,
      readsRegs: [...readsRegs],
      writesReg,
    });
  }

  step(): PipelineCycle {
    this.currentCycle++;
    const stages = new Map<PipelineStage, PipelineInstruction | null>();
    for (const s of STAGES) stages.set(s, null);

    let stalls = 0;
    let flushes = 0;

    const active = this.instructions.filter(
      (i) => i.stage !== "done" && i.stage !== "stall"
    );

    for (let i = active.length - 1; i >= 0; i--) {
      const instr = active[i];
      if (instr.stage === "done") continue;

      const currentIdx = STAGES.indexOf(instr.stage as PipelineStage);
      if (currentIdx === -1) continue;

      if (currentIdx < STAGES.length - 1) {
        const nextStage = STAGES[currentIdx + 1];
        if (!stages.get(nextStage)) {
          if (currentIdx === 0 && this.hasDataHazard(instr, active.slice(0, i))) {
            stalls++;
            this.totalStalls++;
            stages.set(instr.stage as PipelineStage, instr);
          } else {
            instr.stage = nextStage;
            instr.cycle = this.currentCycle;
            stages.set(nextStage, instr);
          }
        } else {
          stages.set(instr.stage as PipelineStage, instr);
        }
      } else {
        instr.stage = "done";
      }
    }

    const next = this.instructions.find((i) => i.stage === "IF" && i.cycle === 0);
    if (next && !stages.get("IF")) {
      next.cycle = this.currentCycle;
      stages.set("IF", next);
    }

    const cycle: PipelineCycle = { cycle: this.currentCycle, stages, stalls, flushes };
    this.history.push(cycle);
    return cycle;
  }

  private hasDataHazard(instr: PipelineInstruction, preceding: PipelineInstruction[]): boolean {
    for (const prev of preceding) {
      if (!prev.writesReg) continue;
      if (instr.readsRegs.includes(prev.writesReg)) {
        const prevStageIdx = STAGES.indexOf(prev.stage as PipelineStage);
        if (this.forwardingEnabled) {
          return prevStageIdx < 2;
        }
        return prevStageIdx < 4;
      }
    }
    return false;
  }

  run(maxCycles = 100): PipelineCycle[] {
    for (let i = 0; i < maxCycles; i++) {
      this.step();
      if (this.instructions.every((i) => i.stage === "done")) break;
    }
    return this.history;
  }

  flush(): void {
    const flushed = this.instructions.filter((i) => i.stage !== "done").length;
    this.totalFlushes += flushed;
    for (const instr of this.instructions) {
      if (instr.stage !== "done") {
        instr.stage = "done";
      }
    }
  }

  get cycleCount(): number {
    return this.currentCycle;
  }

  get stallCount(): number {
    return this.totalStalls;
  }

  get flushCount(): number {
    return this.totalFlushes;
  }

  get ipc(): number {
    const completed = this.instructions.filter((i) => i.stage === "done").length;
    return this.currentCycle > 0 ? completed / this.currentCycle : 0;
  }

  get instructionCount(): number {
    return this.instructions.length;
  }

  getHistory(): PipelineCycle[] {
    return this.history;
  }

  isDone(): boolean {
    return this.instructions.every((i) => i.stage === "done");
  }
}
