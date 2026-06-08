export class SparseArray<T> {
  private data = new Map<number, T>();
  private _length = 0;

  get length(): number {
    return this._length;
  }

  get count(): number {
    return this.data.size;
  }

  set(index: number, value: T): void {
    this.data.set(index, value);
    if (index >= this._length) this._length = index + 1;
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

  clear(): void {
    this.data.clear();
    this._length = 0;
  }

  indices(): number[] {
    return [...this.data.keys()].sort((a, b) => a - b);
  }

  values(): T[] {
    return this.indices().map((i) => this.data.get(i)!);
  }

  entries(): Array<[number, T]> {
    return this.indices().map((i) => [i, this.data.get(i)!]);
  }

  forEach(fn: (value: T, index: number) => void): void {
    for (const [index, value] of this.data) {
      fn(value, index);
    }
  }

  map<U>(fn: (value: T, index: number) => U): SparseArray<U> {
    const result = new SparseArray<U>();
    for (const [index, value] of this.data) {
      result.set(index, fn(value, index));
    }
    return result;
  }

  filter(fn: (value: T, index: number) => boolean): SparseArray<T> {
    const result = new SparseArray<T>();
    for (const [index, value] of this.data) {
      if (fn(value, index)) result.set(index, value);
    }
    return result;
  }

  compact(): T[] {
    return this.values();
  }
}
