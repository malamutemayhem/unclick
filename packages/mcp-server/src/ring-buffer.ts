export class RingBuffer<T> {
  private buffer: Array<T | undefined>;
  private head = 0;
  private count = 0;
  readonly capacity: number;

  constructor(capacity: number) {
    if (capacity < 1) throw new Error("Capacity must be at least 1");
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }

  push(item: T): void {
    const idx = (this.head + this.count) % this.capacity;
    if (this.count === this.capacity) {
      this.head = (this.head + 1) % this.capacity;
    } else {
      this.count++;
    }
    this.buffer[idx] = item;
  }

  get(index: number): T | undefined {
    if (index < 0 || index >= this.count) return undefined;
    return this.buffer[(this.head + index) % this.capacity];
  }

  oldest(): T | undefined {
    return this.count > 0 ? this.buffer[this.head] : undefined;
  }

  newest(): T | undefined {
    if (this.count === 0) return undefined;
    return this.buffer[(this.head + this.count - 1) % this.capacity];
  }

  get size(): number {
    return this.count;
  }

  isFull(): boolean {
    return this.count === this.capacity;
  }

  clear(): void {
    this.buffer = new Array(this.capacity);
    this.head = 0;
    this.count = 0;
  }

  toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.count; i++) {
      result.push(this.buffer[(this.head + i) % this.capacity] as T);
    }
    return result;
  }

  forEach(fn: (item: T, index: number) => void): void {
    for (let i = 0; i < this.count; i++) {
      fn(this.buffer[(this.head + i) % this.capacity] as T, i);
    }
  }
}
