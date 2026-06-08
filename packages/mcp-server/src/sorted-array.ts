type Comparator<T> = (a: T, b: T) => number;

export class SortedArray<T> {
  private items: T[] = [];
  private compare: Comparator<T>;

  constructor(compare: Comparator<T>) {
    this.compare = compare;
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
    let lo = 0, hi = this.items.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >>> 1;
      const cmp = this.compare(this.items[mid], value);
      if (cmp === 0) return mid;
      if (cmp < 0) lo = mid + 1;
      else hi = mid - 1;
    }
    return -1;
  }

  at(index: number): T | undefined {
    return this.items[index];
  }

  get size(): number {
    return this.items.length;
  }

  toArray(): T[] {
    return [...this.items];
  }

  first(): T | undefined {
    return this.items[0];
  }

  last(): T | undefined {
    return this.items[this.items.length - 1];
  }

  range(from: T, to: T): T[] {
    const result: T[] = [];
    const start = this.findInsertIndex(from);
    for (let i = start; i < this.items.length; i++) {
      if (this.compare(this.items[i], to) > 0) break;
      result.push(this.items[i]);
    }
    return result;
  }

  private findInsertIndex(value: T): number {
    let lo = 0, hi = this.items.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (this.compare(this.items[mid], value) < 0) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
}
