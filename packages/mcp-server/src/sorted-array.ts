export class SortedArray<T> {
  private items: T[] = [];
  private readonly compare: (a: T, b: T) => number;

  constructor(compare?: (a: T, b: T) => number) {
    this.compare = compare || ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));
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

  indexOf(value: T): number {
    let lo = 0;
    let hi = this.items.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >>> 1;
      const cmp = this.compare(this.items[mid], value);
      if (cmp === 0) return mid;
      if (cmp < 0) lo = mid + 1;
      else hi = mid - 1;
    }
    return -1;
  }

  has(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  at(index: number): T | undefined {
    return this.items[index];
  }

  get first(): T | undefined {
    return this.items[0];
  }

  get last(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }

  range(from: T, to: T): T[] {
    const result: T[] = [];
    for (const item of this.items) {
      if (this.compare(item, from) >= 0 && this.compare(item, to) <= 0) {
        result.push(item);
      }
    }
    return result;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): T[] {
    return [...this.items];
  }

  *[Symbol.iterator](): Iterator<T> {
    yield* this.items;
  }

  private findInsertIndex(value: T): number {
    let lo = 0;
    let hi = this.items.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (this.compare(this.items[mid], value) < 0) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
}
