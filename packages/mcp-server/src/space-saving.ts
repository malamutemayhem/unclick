interface SSEntry<T> {
  item: T;
  count: number;
  overEstimate: number;
}

export class SpaceSaving<T> {
  private entries: Map<T, SSEntry<T>> = new Map();
  private capacity: number;
  private _total = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  add(item: T, count = 1): void {
    this._total += count;
    if (this.entries.has(item)) {
      const e = this.entries.get(item)!;
      e.count += count;
      return;
    }
    if (this.entries.size < this.capacity) {
      this.entries.set(item, { item, count, overEstimate: 0 });
      return;
    }
    let minEntry: SSEntry<T> | null = null;
    for (const e of this.entries.values()) {
      if (!minEntry || e.count < minEntry.count) {
        minEntry = e;
      }
    }
    if (minEntry) {
      this.entries.delete(minEntry.item);
      this.entries.set(item, {
        item,
        count: minEntry.count + count,
        overEstimate: minEntry.count,
      });
    }
  }

  estimate(item: T): number {
    const e = this.entries.get(item);
    return e ? e.count : 0;
  }

  guaranteed(item: T): number {
    const e = this.entries.get(item);
    return e ? e.count - e.overEstimate : 0;
  }

  topK(k: number): { item: T; count: number }[] {
    return [...this.entries.values()]
      .sort((a, b) => b.count - a.count)
      .slice(0, k)
      .map((e) => ({ item: e.item, count: e.count }));
  }

  contains(item: T): boolean {
    return this.entries.has(item);
  }

  total(): number {
    return this._total;
  }

  size(): number {
    return this.entries.size;
  }
}
