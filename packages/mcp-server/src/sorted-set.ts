export class SortedSet<T> {
  private items: T[] = [];
  private compareFn: (a: T, b: T) => number;

  constructor(compare?: (a: T, b: T) => number) {
    this.compareFn = compare || ((a: T, b: T) => (a as number) - (b as number));
  }

  get size(): number { return this.items.length; }

  add(value: T): boolean {
    const idx = this.findIndex(value);
    if (idx < this.items.length && this.compareFn(this.items[idx], value) === 0) return false;
    this.items.splice(idx, 0, value);
    return true;
  }

  has(value: T): boolean {
    const idx = this.findIndex(value);
    return idx < this.items.length && this.compareFn(this.items[idx], value) === 0;
  }

  delete(value: T): boolean {
    const idx = this.findIndex(value);
    if (idx < this.items.length && this.compareFn(this.items[idx], value) === 0) {
      this.items.splice(idx, 1);
      return true;
    }
    return false;
  }

  first(): T | undefined { return this.items[0]; }
  last(): T | undefined { return this.items[this.items.length - 1]; }
  at(index: number): T | undefined { return this.items[index]; }

  range(from: T, to: T): T[] {
    const start = this.findIndex(from);
    const result: T[] = [];
    for (let i = start; i < this.items.length; i++) {
      if (this.compareFn(this.items[i], to) > 0) break;
      result.push(this.items[i]);
    }
    return result;
  }

  toArray(): T[] { return [...this.items]; }
  clear(): void { this.items.length = 0; }

  *[Symbol.iterator](): Iterator<T> {
    for (const item of this.items) yield item;
  }

  private findIndex(value: T): number {
    let lo = 0, hi = this.items.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.compareFn(this.items[mid], value) < 0) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  static from<T>(values: T[], compare?: (a: T, b: T) => number): SortedSet<T> {
    const set = new SortedSet<T>(compare);
    for (const v of values) set.add(v);
    return set;
  }
}
