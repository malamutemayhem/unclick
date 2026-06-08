export class RingBuffer<T> {
  private buffer: (T | undefined)[];
  private capacity: number;
  private head = 0;
  private count = 0;

  constructor(capacity: number) {
    if (capacity < 1) throw new Error("Capacity must be at least 1");
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }

  push(item: T): T | undefined {
    const overwritten = this.isFull() ? this.buffer[this.head] : undefined;
    this.buffer[this.head] = item;
    this.head = (this.head + 1) % this.capacity;
    if (this.count < this.capacity) this.count++;
    return overwritten;
  }

  peek(): T | undefined {
    if (this.count === 0) return undefined;
    const idx = (this.head - this.count + this.capacity) % this.capacity;
    return this.buffer[idx];
  }

  peekLast(): T | undefined {
    if (this.count === 0) return undefined;
    return this.buffer[(this.head - 1 + this.capacity) % this.capacity];
  }

  toArray(): T[] {
    const result: T[] = [];
    const start = (this.head - this.count + this.capacity) % this.capacity;
    for (let i = 0; i < this.count; i++) {
      result.push(this.buffer[(start + i) % this.capacity] as T);
    }
    return result;
  }

  get size(): number {
    return this.count;
  }

  get maxCapacity(): number {
    return this.capacity;
  }

  isFull(): boolean {
    return this.count === this.capacity;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  clear(): void {
    this.buffer = new Array(this.capacity);
    this.head = 0;
    this.count = 0;
  }

  at(index: number): T | undefined {
    if (index < 0 || index >= this.count) return undefined;
    const start = (this.head - this.count + this.capacity) % this.capacity;
    return this.buffer[(start + index) % this.capacity];
  }
}
