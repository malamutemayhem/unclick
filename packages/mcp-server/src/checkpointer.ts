export interface Checkpoint<T> {
  id: string;
  state: T;
  timestamp: number;
  label?: string;
  metadata?: Record<string, unknown>;
}

export class Checkpointer<T> {
  private checkpoints: Checkpoint<T>[] = [];
  private maxCheckpoints: number;
  private counter = 0;

  constructor(maxCheckpoints = 50) {
    this.maxCheckpoints = maxCheckpoints;
  }

  save(state: T, label?: string, metadata?: Record<string, unknown>): string {
    const id = `cp_${++this.counter}`;
    const checkpoint: Checkpoint<T> = {
      id,
      state: structuredClone(state),
      timestamp: Date.now(),
      label,
      metadata,
    };
    this.checkpoints.push(checkpoint);
    if (this.checkpoints.length > this.maxCheckpoints) {
      this.checkpoints.shift();
    }
    return id;
  }

  restore(id: string): T | undefined {
    const cp = this.checkpoints.find((c) => c.id === id);
    if (!cp) return undefined;
    return structuredClone(cp.state);
  }

  restoreLatest(): T | undefined {
    if (this.checkpoints.length === 0) return undefined;
    return structuredClone(this.checkpoints[this.checkpoints.length - 1].state);
  }

  restoreByLabel(label: string): T | undefined {
    const matches = this.checkpoints.filter((c) => c.label === label);
    if (matches.length === 0) return undefined;
    return structuredClone(matches[matches.length - 1].state);
  }

  list(): Checkpoint<T>[] {
    return this.checkpoints.map((c) => ({ ...c, state: structuredClone(c.state) }));
  }

  get(id: string): Checkpoint<T> | undefined {
    return this.checkpoints.find((c) => c.id === id);
  }

  delete(id: string): boolean {
    const idx = this.checkpoints.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    this.checkpoints.splice(idx, 1);
    return true;
  }

  get size(): number {
    return this.checkpoints.length;
  }

  clear(): void {
    this.checkpoints = [];
  }
}
