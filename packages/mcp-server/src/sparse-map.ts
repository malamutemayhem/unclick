export class SparseMap<V> {
  private dense: { key: number; value: V }[] = [];
  private sparse: number[] = [];
  private maxKey = 0;

  constructor(maxCapacity = 65536) {
    this.sparse = new Array(maxCapacity).fill(-1);
    this.maxKey = maxCapacity;
  }

  get size(): number { return this.dense.length; }

  set(key: number, value: V): void {
    if (key < 0 || key >= this.maxKey) throw new RangeError(`Key ${key} out of range [0, ${this.maxKey})`);
    const idx = this.sparse[key];
    if (idx >= 0 && idx < this.dense.length && this.dense[idx].key === key) {
      this.dense[idx].value = value;
    } else {
      this.sparse[key] = this.dense.length;
      this.dense.push({ key, value });
    }
  }

  get(key: number): V | undefined {
    if (key < 0 || key >= this.maxKey) return undefined;
    const idx = this.sparse[key];
    if (idx >= 0 && idx < this.dense.length && this.dense[idx].key === key) {
      return this.dense[idx].value;
    }
    return undefined;
  }

  has(key: number): boolean {
    if (key < 0 || key >= this.maxKey) return false;
    const idx = this.sparse[key];
    return idx >= 0 && idx < this.dense.length && this.dense[idx].key === key;
  }

  delete(key: number): boolean {
    if (!this.has(key)) return false;
    const idx = this.sparse[key];
    const last = this.dense[this.dense.length - 1];
    this.dense[idx] = last;
    this.sparse[last.key] = idx;
    this.sparse[key] = -1;
    this.dense.pop();
    return true;
  }

  clear(): void {
    for (const entry of this.dense) {
      this.sparse[entry.key] = -1;
    }
    this.dense.length = 0;
  }

  keys(): number[] {
    return this.dense.map((e) => e.key);
  }

  values(): V[] {
    return this.dense.map((e) => e.value);
  }

  entries(): [number, V][] {
    return this.dense.map((e) => [e.key, e.value]);
  }

  forEach(fn: (value: V, key: number) => void): void {
    for (const entry of this.dense) {
      fn(entry.value, entry.key);
    }
  }
}
