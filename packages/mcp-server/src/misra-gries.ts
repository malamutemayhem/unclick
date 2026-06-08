export class MisraGries<T> {
  private counters: Map<T, number> = new Map();
  private k: number;
  private _total = 0;

  constructor(k: number) {
    this.k = k;
  }

  add(item: T): void {
    this._total++;
    if (this.counters.has(item)) {
      this.counters.set(item, this.counters.get(item)! + 1);
      return;
    }
    if (this.counters.size < this.k - 1) {
      this.counters.set(item, 1);
      return;
    }
    const toRemove: T[] = [];
    for (const [key, count] of this.counters) {
      const newCount = count - 1;
      if (newCount === 0) {
        toRemove.push(key);
      } else {
        this.counters.set(key, newCount);
      }
    }
    for (const key of toRemove) {
      this.counters.delete(key);
    }
  }

  addMany(items: T[]): void {
    for (const item of items) this.add(item);
  }

  estimate(item: T): number {
    return this.counters.get(item) || 0;
  }

  candidates(): Map<T, number> {
    return new Map(this.counters);
  }

  total(): number {
    return this._total;
  }

  threshold(): number {
    return Math.ceil(this._total / this.k);
  }

  isFrequent(item: T): boolean {
    return this.counters.has(item);
  }

  topItems(): T[] {
    return [...this.counters.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([key]) => key);
  }
}
