export class SortedMap<K, V> {
  private keys: K[] = [];
  private values: V[] = [];
  private readonly compareFn: (a: K, b: K) => number;

  constructor(compare?: (a: K, b: K) => number) {
    this.compareFn = compare ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }

  get size(): number {
    return this.keys.length;
  }

  set(key: K, value: V): void {
    const idx = this.findIndex(key);
    if (idx < this.keys.length && this.compareFn(this.keys[idx], key) === 0) {
      this.values[idx] = value;
    } else {
      this.keys.splice(idx, 0, key);
      this.values.splice(idx, 0, value);
    }
  }

  get(key: K): V | undefined {
    const idx = this.findIndex(key);
    if (idx < this.keys.length && this.compareFn(this.keys[idx], key) === 0) {
      return this.values[idx];
    }
    return undefined;
  }

  has(key: K): boolean {
    const idx = this.findIndex(key);
    return idx < this.keys.length && this.compareFn(this.keys[idx], key) === 0;
  }

  delete(key: K): boolean {
    const idx = this.findIndex(key);
    if (idx < this.keys.length && this.compareFn(this.keys[idx], key) === 0) {
      this.keys.splice(idx, 1);
      this.values.splice(idx, 1);
      return true;
    }
    return false;
  }

  min(): [K, V] | undefined {
    if (this.keys.length === 0) return undefined;
    return [this.keys[0], this.values[0]];
  }

  max(): [K, V] | undefined {
    if (this.keys.length === 0) return undefined;
    const last = this.keys.length - 1;
    return [this.keys[last], this.values[last]];
  }

  range(from: K, to: K): Array<[K, V]> {
    const result: Array<[K, V]> = [];
    const start = this.findIndex(from);
    for (let i = start; i < this.keys.length; i++) {
      if (this.compareFn(this.keys[i], to) > 0) break;
      result.push([this.keys[i], this.values[i]]);
    }
    return result;
  }

  entries(): Array<[K, V]> {
    return this.keys.map((k, i) => [k, this.values[i]]);
  }

  clear(): void {
    this.keys = [];
    this.values = [];
  }

  private findIndex(key: K): number {
    let lo = 0;
    let hi = this.keys.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (this.compareFn(this.keys[mid], key) < 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return lo;
  }
}
