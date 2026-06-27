export class CircularBuffer<T> {
  private buffer: (T | undefined)[];
  private head = 0;
  private _size = 0;
  private readonly capacity: number;

  constructor(capacity: number) {
    if (capacity < 1) throw new Error("Capacity must be at least 1");
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }

  get size(): number {
    return this._size;
  }

  get isFull(): boolean {
    return this._size === this.capacity;
  }

  push(value: T): T | undefined {
    let evicted: T | undefined;
    const writeIdx = (this.head + this._size) % this.capacity;
    if (this._size === this.capacity) {
      evicted = this.buffer[this.head] as T;
      this.head = (this.head + 1) % this.capacity;
    } else {
      this._size++;
    }
    this.buffer[writeIdx] = value;
    return evicted;
  }

  shift(): T | undefined {
    if (this._size === 0) return undefined;
    const value = this.buffer[this.head] as T;
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this._size--;
    return value;
  }

  peek(): T | undefined {
    if (this._size === 0) return undefined;
    return this.buffer[this.head] as T;
  }

  peekLast(): T | undefined {
    if (this._size === 0) return undefined;
    const idx = (this.head + this._size - 1) % this.capacity;
    return this.buffer[idx] as T;
  }

  at(index: number): T | undefined {
    if (index < 0 || index >= this._size) return undefined;
    return this.buffer[(this.head + index) % this.capacity] as T;
  }

  toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this._size; i++) {
      result.push(this.buffer[(this.head + i) % this.capacity] as T);
    }
    return result;
  }

  clear(): void {
    this.buffer = new Array(this.capacity);
    this.head = 0;
    this._size = 0;
  }
}
