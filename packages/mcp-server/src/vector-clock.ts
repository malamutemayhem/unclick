export class VectorClock {
  private clock: Map<string, number>;

  constructor(initial?: Record<string, number>) {
    this.clock = new Map(initial ? Object.entries(initial) : []);
  }

  increment(nodeId: string): void {
    this.clock.set(nodeId, (this.clock.get(nodeId) || 0) + 1);
  }

  get(nodeId: string): number {
    return this.clock.get(nodeId) || 0;
  }

  merge(other: VectorClock): VectorClock {
    const result = new VectorClock();
    for (const [k, v] of this.clock) {
      result.clock.set(k, v);
    }
    for (const [k, v] of other.clock) {
      result.clock.set(k, Math.max(result.clock.get(k) || 0, v));
    }
    return result;
  }

  send(nodeId: string): VectorClock {
    const copy = this.copy();
    copy.increment(nodeId);
    return copy;
  }

  receive(nodeId: string, other: VectorClock): VectorClock {
    const merged = this.merge(other);
    merged.increment(nodeId);
    return merged;
  }

  happensBefore(other: VectorClock): boolean {
    let atLeastOneLess = false;
    const allKeys = new Set([...this.clock.keys(), ...other.clock.keys()]);
    for (const k of allKeys) {
      const a = this.get(k);
      const b = other.get(k);
      if (a > b) return false;
      if (a < b) atLeastOneLess = true;
    }
    return atLeastOneLess;
  }

  isConcurrent(other: VectorClock): boolean {
    return !this.happensBefore(other) && !other.happensBefore(this) && !this.equals(other);
  }

  equals(other: VectorClock): boolean {
    const allKeys = new Set([...this.clock.keys(), ...other.clock.keys()]);
    for (const k of allKeys) {
      if (this.get(k) !== other.get(k)) return false;
    }
    return true;
  }

  copy(): VectorClock {
    const result = new VectorClock();
    for (const [k, v] of this.clock) {
      result.clock.set(k, v);
    }
    return result;
  }

  toRecord(): Record<string, number> {
    const obj: Record<string, number> = {};
    for (const [k, v] of this.clock) {
      obj[k] = v;
    }
    return obj;
  }

  nodes(): string[] {
    return [...this.clock.keys()];
  }
}
