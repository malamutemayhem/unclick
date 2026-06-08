export class RingBuffer<T> {
  private buffer: (T | undefined)[];
  private head = 0;
  private tail = 0;
  private _size = 0;
  private _capacity: number;

  constructor(capacity: number) {
    if (capacity < 1) throw new Error("Capacity must be at least 1");
    this._capacity = capacity;
    this.buffer = new Array(capacity);
  }

  get capacity(): number { return this._capacity; }
  get size(): number { return this._size; }
  get isFull(): boolean { return this._size === this._capacity; }
  get isEmpty(): boolean { return this._size === 0; }

  push(value: T): T | undefined {
    let evicted: T | undefined;
    if (this._size === this._capacity) {
      evicted = this.buffer[this.head] as T;
      this.head = (this.head + 1) % this._capacity;
      this._size--;
    }
    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this._capacity;
    this._size++;
    return evicted;
  }

  shift(): T | undefined {
    if (this._size === 0) return undefined;
    const value = this.buffer[this.head] as T;
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this._capacity;
    this._size--;
    return value;
  }

  peek(): T | undefined {
    if (this._size === 0) return undefined;
    return this.buffer[this.head] as T;
  }

  peekLast(): T | undefined {
    if (this._size === 0) return undefined;
    const idx = (this.tail - 1 + this._capacity) % this._capacity;
    return this.buffer[idx] as T;
  }

  toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this._size; i++) {
      result.push(this.buffer[(this.head + i) % this._capacity] as T);
    }
    return result;
  }

  clear(): void {
    this.buffer = new Array(this._capacity);
    this.head = 0;
    this.tail = 0;
    this._size = 0;
  }

  *[Symbol.iterator](): Iterator<T> {
    for (let i = 0; i < this._size; i++) {
      yield this.buffer[(this.head + i) % this._capacity] as T;
    }
  }
}
