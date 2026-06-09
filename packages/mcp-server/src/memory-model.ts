export type Ordering = "relaxed" | "acquire" | "release" | "acq-rel" | "seq-cst";

export interface MemoryOp {
  id: number;
  thread: number;
  type: "load" | "store" | "fence";
  address?: number;
  value?: number;
  ordering: Ordering;
  timestamp: number;
}

export interface MemoryState {
  address: number;
  value: number;
  lastWriter: number;
  timestamp: number;
}

export class MemoryModel {
  private ops: MemoryOp[] = [];
  private memory = new Map<number, MemoryState>();
  private threadClocks = new Map<number, number>();
  private nextId = 0;
  private globalClock = 0;

  store(thread: number, address: number, value: number, ordering: Ordering = "seq-cst"): MemoryOp {
    this.globalClock++;
    const clock = this.advanceThread(thread);
    const op: MemoryOp = {
      id: this.nextId++,
      thread,
      type: "store",
      address,
      value,
      ordering,
      timestamp: clock,
    };
    this.ops.push(op);
    this.memory.set(address, { address, value, lastWriter: thread, timestamp: clock });
    return op;
  }

  load(thread: number, address: number, ordering: Ordering = "seq-cst"): { op: MemoryOp; value: number } {
    this.globalClock++;
    const clock = this.advanceThread(thread);
    const state = this.memory.get(address);
    const value = state ? state.value : 0;

    const op: MemoryOp = {
      id: this.nextId++,
      thread,
      type: "load",
      address,
      value,
      ordering,
      timestamp: clock,
    };
    this.ops.push(op);
    return { op, value };
  }

  fence(thread: number, ordering: Ordering = "seq-cst"): MemoryOp {
    this.globalClock++;
    const clock = this.advanceThread(thread);
    const op: MemoryOp = {
      id: this.nextId++,
      thread,
      type: "fence",
      ordering,
      timestamp: clock,
    };
    this.ops.push(op);
    return op;
  }

  private advanceThread(thread: number): number {
    const current = this.threadClocks.get(thread) ?? 0;
    const next = Math.max(current + 1, this.globalClock);
    this.threadClocks.set(thread, next);
    return next;
  }

  getMemory(address: number): number {
    const state = this.memory.get(address);
    return state ? state.value : 0;
  }

  getMemoryState(address: number): MemoryState | null {
    const state = this.memory.get(address);
    return state ? { ...state } : null;
  }

  happensBeforeCheck(op1: MemoryOp, op2: MemoryOp): boolean {
    if (op1.thread === op2.thread) return op1.timestamp < op2.timestamp;

    if (op1.type === "store" && op2.type === "load" && op1.address === op2.address) {
      if (op1.ordering === "release" || op1.ordering === "acq-rel" || op1.ordering === "seq-cst") {
        if (op2.ordering === "acquire" || op2.ordering === "acq-rel" || op2.ordering === "seq-cst") {
          return op1.timestamp < op2.timestamp;
        }
      }
    }

    return false;
  }

  hasDataRace(addr: number): boolean {
    const opsAtAddr = this.ops.filter((o) => o.address === addr);
    for (let i = 0; i < opsAtAddr.length; i++) {
      for (let j = i + 1; j < opsAtAddr.length; j++) {
        const a = opsAtAddr[i];
        const b = opsAtAddr[j];
        if (a.thread === b.thread) continue;
        if (a.type === "load" && b.type === "load") continue;
        if (!this.happensBeforeCheck(a, b) && !this.happensBeforeCheck(b, a)) {
          if (a.ordering === "relaxed" || b.ordering === "relaxed") return true;
        }
      }
    }
    return false;
  }

  getOps(thread?: number): MemoryOp[] {
    const ops = thread !== undefined ? this.ops.filter((o) => o.thread === thread) : this.ops;
    return ops.map((o) => ({ ...o }));
  }

  get opCount(): number {
    return this.ops.length;
  }

  get threadCount(): number {
    return this.threadClocks.size;
  }

  reset(): void {
    this.ops = [];
    this.memory.clear();
    this.threadClocks.clear();
    this.nextId = 0;
    this.globalClock = 0;
  }
}
