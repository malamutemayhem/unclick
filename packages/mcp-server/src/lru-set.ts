export class LRUSet<T> {
  private map = new Map<T, boolean>();

  constructor(private maxSize: number) {
    if (maxSize < 1) throw new Error("maxSize must be at least 1");
  }

  get size(): number {
    return this.map.size;
  }

  has(value: T): boolean {
    if (!this.map.has(value)) return false;
    this.map.delete(value);
    this.map.set(value, true);
    return true;
  }

  add(value: T): void {
    if (this.map.has(value)) {
      this.map.delete(value);
    }
    this.map.set(value, true);
    if (this.map.size > this.maxSize) {
      const oldest = this.map.keys().next().value!;
      this.map.delete(oldest);
    }
  }

  delete(value: T): boolean {
    return this.map.delete(value);
  }

  clear(): void {
    this.map.clear();
  }

  values(): T[] {
    return [...this.map.keys()];
  }

  oldest(): T | undefined {
    return this.map.keys().next().value;
  }

  newest(): T | undefined {
    const arr = [...this.map.keys()];
    return arr[arr.length - 1];
  }

  [Symbol.iterator](): Iterator<T> {
    return this.map.keys();
  }
}
