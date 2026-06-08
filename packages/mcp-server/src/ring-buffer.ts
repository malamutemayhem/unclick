export class RingBuffer<T> {
  private buffer: (T | undefined)[];
  private head = 0;
  private tail = 0;
  private full = false;
  readonly capacity: number;

  constructor(capacity: number) {
    if (capacity < 1) throw new Error("Capacity must be at least 1");
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }

  push(item: T): T | undefined {
    let evicted: T | undefined;
    if (this.full) {
      evicted = this.buffer[this.head];
      this.head = (this.head + 1) % this.capacity;
    }
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    if (this.tail === this.head) this.full = true;
    return evicted;
  }

  shift(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.full = false;
    return item;
  }

  peek(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.buffer[this.head];
  }

  peekLast(): T | undefined {
    if (this.isEmpty()) return undefined;
    const idx = (this.tail - 1 + this.capacity) % this.capacity;
    return this.buffer[idx];
  }

  get size(): number {
    if (this.full) return this.capacity;
    return (this.tail - this.head + this.capacity) % this.capacity;
  }

  isEmpty(): boolean { return !this.full && this.head === this.tail; }
  isFull(): boolean { return this.full; }

  clear(): void {
    this.buffer = new Array(this.capacity);
    this.head = 0;
    this.tail = 0;
    this.full = false;
  }

  toArray(): T[] {
    const result: T[] = [];
    const len = this.size;
    for (let i = 0; i < len; i++) {
      result.push(this.buffer[(this.head + i) % this.capacity] as T);
    }
    return result;
  }

  *[Symbol.iterator](): Iterator<T> {
    const len = this.size;
    for (let i = 0; i < len; i++) {
      yield this.buffer[(this.head + i) % this.capacity] as T;
    }
  }
}
