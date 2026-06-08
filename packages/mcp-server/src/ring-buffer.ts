export class RingBuffer<T> {
  private buffer: (T | undefined)[];
  private head = 0;
  private count = 0;
  private capacity: number;

  constructor(capacity: number) {
    if (capacity < 1) throw new Error("Capacity must be at least 1");
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }

  push(item: T): T | undefined {
    const evicted = this.isFull() ? this.buffer[this.head] : undefined;
    this.buffer[(this.head + this.count) % this.capacity] = item;
    if (this.isFull()) {
      this.head = (this.head + 1) % this.capacity;
    } else {
      this.count++;
    }
    return evicted;
  }

  shift(): T | undefined {
    if (this.count === 0) return undefined;
    const item = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.count--;
    return item;
  }

  peek(): T | undefined {
    if (this.count === 0) return undefined;
    return this.buffer[this.head];
  }

  peekLast(): T | undefined {
    if (this.count === 0) return undefined;
    return this.buffer[(this.head + this.count - 1) % this.capacity];
  }

  at(index: number): T | undefined {
    if (index < 0 || index >= this.count) return undefined;
    return this.buffer[(this.head + index) % this.capacity];
  }

  toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.count; i++) {
      result.push(this.buffer[(this.head + i) % this.capacity] as T);
    }
    return result;
  }

  isFull(): boolean {
    return this.count === this.capacity;
  }

  get size(): number {
    return this.count;
  }

  get maxCapacity(): number {
    return this.capacity;
  }

  clear(): void {
    this.buffer = new Array(this.capacity);
    this.head = 0;
    this.count = 0;
  }
}
