export interface Snapshot<T> {
  state: T;
  timestamp: number;
  label?: string;
}

export class StateHistory<T> {
  private snapshots: Snapshot<T>[] = [];
  private maxSnapshots: number;

  constructor(maxSnapshots = 50) {
    this.maxSnapshots = maxSnapshots;
  }

  save(state: T, label?: string): void {
    this.snapshots.push({
      state: structuredClone(state),
      timestamp: Date.now(),
      label,
    });
    if (this.snapshots.length > this.maxSnapshots) {
      this.snapshots.shift();
    }
  }

  get latest(): Snapshot<T> | undefined {
    return this.snapshots[this.snapshots.length - 1];
  }

  get oldest(): Snapshot<T> | undefined {
    return this.snapshots[0];
  }

  get count(): number { return this.snapshots.length; }

  at(index: number): Snapshot<T> | undefined {
    return this.snapshots[index];
  }

  findByLabel(label: string): Snapshot<T> | undefined {
    for (let i = this.snapshots.length - 1; i >= 0; i--) {
      if (this.snapshots[i].label === label) return this.snapshots[i];
    }
    return undefined;
  }

  since(timestamp: number): Snapshot<T>[] {
    return this.snapshots.filter((s) => s.timestamp >= timestamp);
  }

  revert(index: number): T | undefined {
    const snap = this.snapshots[index];
    if (!snap) return undefined;
    this.snapshots.length = index + 1;
    return structuredClone(snap.state);
  }

  clear(): void { this.snapshots.length = 0; }

  toArray(): Snapshot<T>[] { return [...this.snapshots]; }

  diff(from: number, to: number): { from: Snapshot<T>; to: Snapshot<T> } | undefined {
    const f = this.snapshots[from];
    const t = this.snapshots[to];
    if (!f || !t) return undefined;
    return { from: f, to: t };
  }
}
