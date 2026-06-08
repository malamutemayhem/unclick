export class RingBuffer<T> {
  private buffer: (T | undefined)[];
  private head = 0;
  private tail = 0;
  private count = 0;
  private readonly cap: number;

  constructor(capacity: number) {
    this.cap = capacity;
    this.buffer = new Array(capacity);
  }

  push(value: T): void {
    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.cap;
    if (this.count === this.cap) {
      this.head = (this.head + 1) % this.cap;
    } else {
      this.count++;
    }
  }

  shift(): T | undefined {
    if (this.count === 0) return undefined;
    const value = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.cap;
    this.count--;
    return value;
  }

  peek(): T | undefined {
    if (this.count === 0) return undefined;
    return this.buffer[this.head];
  }

  peekLast(): T | undefined {
    if (this.count === 0) return undefined;
    const idx = (this.tail - 1 + this.cap) % this.cap;
    return this.buffer[idx];
  }

  get size(): number {
    return this.count;
  }

  get capacity(): number {
    return this.cap;
  }

  get isFull(): boolean {
    return this.count === this.cap;
  }

  get isEmpty(): boolean {
    return this.count === 0;
  }

  clear(): void {
    this.buffer = new Array(this.cap);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.count; i++) {
      result.push(this.buffer[(this.head + i) % this.cap] as T);
    }
    return result;
  }

  *[Symbol.iterator](): Iterator<T> {
    for (let i = 0; i < this.count; i++) {
      yield this.buffer[(this.head + i) % this.cap] as T;
    }
  }
}
