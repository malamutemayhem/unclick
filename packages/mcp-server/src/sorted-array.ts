export class SortedArray<T> {
  private items: T[] = [];
  private cmp: (a: T, b: T) => number;

  constructor(comparator?: (a: T, b: T) => number) {
    this.cmp = comparator || ((a: T, b: T) => (a as unknown as number) - (b as unknown as number));
  }

  get length(): number {
    return this.items.length;
  }

  insert(value: T): number {
    const idx = this.findInsertIndex(value);
    this.items.splice(idx, 0, value);
    return idx;
  }

  remove(value: T): boolean {
    const idx = this.indexOf(value);
    if (idx === -1) return false;
    this.items.splice(idx, 1);
    return true;
  }

  has(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  indexOf(value: T): number {
    let lo = 0;
    let hi = this.items.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >>> 1;
      const c = this.cmp(this.items[mid], value);
      if (c === 0) return mid;
      if (c < 0) lo = mid + 1;
      else hi = mid - 1;
    }
    return -1;
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  first(): T | undefined {
    return this.items[0];
  }

  last(): T | undefined {
    return this.items[this.items.length - 1];
  }

  range(from: T, to: T): T[] {
    const start = this.findInsertIndex(from);
    const result: T[] = [];
    for (let i = start; i < this.items.length; i++) {
      if (this.cmp(this.items[i], to) > 0) break;
      result.push(this.items[i]);
    }
    return result;
  }

  toArray(): T[] {
    return [...this.items];
  }

  clear(): void {
    this.items.length = 0;
  }

  *[Symbol.iterator](): Iterator<T> {
    for (const item of this.items) yield item;
  }

  static from<T>(items: T[], comparator?: (a: T, b: T) => number): SortedArray<T> {
    const sa = new SortedArray<T>(comparator);
    for (const item of items) sa.insert(item);
    return sa;
  }

  private findInsertIndex(value: T): number {
    let lo = 0;
    let hi = this.items.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (this.cmp(this.items[mid], value) < 0) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
}
