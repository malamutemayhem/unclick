export class SortedArray<T> {
  private items: T[] = [];
  private compare: (a: T, b: T) => number;

  constructor(compare?: (a: T, b: T) => number) {
    this.compare = compare ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }

  insert(item: T): number {
    const idx = this.findInsertIndex(item);
    this.items.splice(idx, 0, item);
    return idx;
  }

  remove(item: T): boolean {
    const idx = this.indexOf(item);
    if (idx < 0) return false;
    this.items.splice(idx, 1);
    return true;
  }

  indexOf(item: T): number {
    let lo = 0;
    let hi = this.items.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >>> 1;
      const cmp = this.compare(this.items[mid], item);
      if (cmp === 0) return mid;
      if (cmp < 0) lo = mid + 1;
      else hi = mid - 1;
    }
    return -1;
  }

  has(item: T): boolean {
    return this.indexOf(item) >= 0;
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

  toArray(): T[] {
    return [...this.items];
  }

  range(from: T, to: T): T[] {
    const result: T[] = [];
    for (const item of this.items) {
      if (this.compare(item, from) >= 0 && this.compare(item, to) <= 0) {
        result.push(item);
      }
      if (this.compare(item, to) > 0) break;
    }
    return result;
  }

  private findInsertIndex(item: T): number {
    let lo = 0;
    let hi = this.items.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (this.compare(this.items[mid], item) < 0) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
}
