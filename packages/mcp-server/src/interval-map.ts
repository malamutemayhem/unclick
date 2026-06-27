interface IntervalEntry<V> {
  lo: number;
  hi: number;
  value: V;
}

export class IntervalMap<V> {
  private entries: IntervalEntry<V>[] = [];

  set(lo: number, hi: number, value: V): void {
    this.entries.push({ lo, hi, value });
  }

  get(point: number): V[] {
    const results: V[] = [];
    for (const e of this.entries) {
      if (point >= e.lo && point <= e.hi) {
        results.push(e.value);
      }
    }
    return results;
  }

  getFirst(point: number): V | undefined {
    for (const e of this.entries) {
      if (point >= e.lo && point <= e.hi) {
        return e.value;
      }
    }
    return undefined;
  }

  overlapping(lo: number, hi: number): IntervalEntry<V>[] {
    return this.entries.filter((e) => e.lo <= hi && e.hi >= lo);
  }

  remove(lo: number, hi: number): boolean {
    const idx = this.entries.findIndex((e) => e.lo === lo && e.hi === hi);
    if (idx === -1) return false;
    this.entries.splice(idx, 1);
    return true;
  }

  containsPoint(point: number): boolean {
    return this.entries.some((e) => point >= e.lo && point <= e.hi);
  }

  all(): IntervalEntry<V>[] {
    return [...this.entries];
  }

  size(): number {
    return this.entries.length;
  }

  clear(): void {
    this.entries = [];
  }

  span(): { lo: number; hi: number } | undefined {
    if (this.entries.length === 0) return undefined;
    let lo = Infinity;
    let hi = -Infinity;
    for (const e of this.entries) {
      if (e.lo < lo) lo = e.lo;
      if (e.hi > hi) hi = e.hi;
    }
    return { lo, hi };
  }
}
