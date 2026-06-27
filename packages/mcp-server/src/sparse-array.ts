export class SparseArray<T> {
  private data = new Map<number, T>();
  private _length = 0;

  get length(): number { return this._length; }
  get count(): number { return this.data.size; }

  get(index: number): T | undefined {
    return this.data.get(index);
  }

  set(index: number, value: T): void {
    this.data.set(index, value);
    if (index >= this._length) this._length = index + 1;
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

  toArray(): (T | undefined)[] {
    const arr: (T | undefined)[] = new Array(this._length);
    for (const [index, value] of this.data) {
      arr[index] = value;
    }
    return arr;
  }

  indices(): number[] {
    return [...this.data.keys()].sort((a, b) => a - b);
  }

  values(): T[] {
    return [...this.data.values()];
  }

  entries(): [number, T][] {
    return [...this.data.entries()].sort(([a], [b]) => a - b);
  }
}
