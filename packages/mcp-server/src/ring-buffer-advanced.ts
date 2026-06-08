export class RingBuffer<T> {
  private buffer: (T | undefined)[];
  private head = 0;
  private tail = 0;
  private count = 0;
  private capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }

  push(item: T): T | undefined {
    let evicted: T | undefined;
    if (this.count === this.capacity) {
      evicted = this.buffer[this.head];
      this.head = (this.head + 1) % this.capacity;
      this.count--;
    }
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    this.count++;
    return evicted;
  }

  pop(): T | undefined {
    if (this.count === 0) return undefined;
    this.tail = (this.tail - 1 + this.capacity) % this.capacity;
    const item = this.buffer[this.tail];
    this.buffer[this.tail] = undefined;
    this.count--;
    return item;
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
    return this.buffer[(this.tail - 1 + this.capacity) % this.capacity];
  }

  get(index: number): T | undefined {
    if (index < 0 || index >= this.count) return undefined;
    return this.buffer[(this.head + index) % this.capacity];
  }

  size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  isFull(): boolean {
    return this.count === this.capacity;
  }

  getCapacity(): number {
    return this.capacity;
  }

  clear(): void {
    this.buffer = new Array(this.capacity);
    this.head = 0;
    this.tail = 0;
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

  find(predicate: (item: T) => boolean): T | undefined {
    for (let i = 0; i < this.count; i++) {
      const item = this.buffer[(this.head + i) % this.capacity] as T;
      if (predicate(item)) return item;
    }
    return undefined;
  }

  filter(predicate: (item: T) => boolean): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.count; i++) {
      const item = this.buffer[(this.head + i) % this.capacity] as T;
      if (predicate(item)) result.push(item);
    }
    return result;
  }

  drain(): T[] {
    const items = this.toArray();
    this.clear();
    return items;
  }
}
