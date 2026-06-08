export class SparseArray<T> {
  private data = new Map<number, T>();
  private maxIndex = -1;

  set(index: number, value: T): void {
    this.data.set(index, value);
    if (index > this.maxIndex) this.maxIndex = index;
  }

  get(index: number): T | undefined {
    return this.data.get(index);
  }

  has(index: number): boolean {
    return this.data.has(index);
  }

  delete(index: number): boolean {
    return this.data.delete(index);
  }

  get size(): number {
    return this.data.size;
  }

  get length(): number {
    return this.maxIndex + 1;
  }

  get density(): number {
    if (this.maxIndex < 0) return 0;
    return this.data.size / (this.maxIndex + 1);
  }

  indices(): number[] {
    return [...this.data.keys()].sort((a, b) => a - b);
  }

  values(): T[] {
    return this.indices().map((i) => this.data.get(i)!);
  }

  entries(): [number, T][] {
    return this.indices().map((i) => [i, this.data.get(i)!]);
  }

  forEach(fn: (value: T, index: number) => void): void {
    for (const [i, v] of this.entries()) {
      fn(v, i);
    }
  }

  map<R>(fn: (value: T, index: number) => R): SparseArray<R> {
    const result = new SparseArray<R>();
    for (const [i, v] of this.data) {
      result.set(i, fn(v, i));
    }
    return result;
  }

  filter(predicate: (value: T, index: number) => boolean): SparseArray<T> {
    const result = new SparseArray<T>();
    for (const [i, v] of this.data) {
      if (predicate(v, i)) result.set(i, v);
    }
    return result;
  }

  toDense(defaultValue: T): T[] {
    const arr: T[] = [];
    for (let i = 0; i <= this.maxIndex; i++) {
      arr.push(this.data.has(i) ? this.data.get(i)! : defaultValue);
    }
    return arr;
  }

  clear(): void {
    this.data.clear();
    this.maxIndex = -1;
  }
}
