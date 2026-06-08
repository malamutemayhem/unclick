export class RingBuffer<T> {
  private buffer: Array<T | undefined>;
  private head = 0;
  private tail = 0;
  private _size = 0;
  private _capacity: number;

  constructor(capacity: number) {
    this._capacity = capacity;
    this.buffer = new Array(capacity);
  }

  push(item: T): T | undefined {
    let evicted: T | undefined;
    if (this._size === this._capacity) {
      evicted = this.buffer[this.head];
      this.head = (this.head + 1) % this._capacity;
      this._size--;
    }
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this._capacity;
    this._size++;
    return evicted;
  }

  shift(): T | undefined {
    if (this._size === 0) return undefined;
    const item = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this._capacity;
    this._size--;
    return item;
  }

  peek(): T | undefined {
    if (this._size === 0) return undefined;
    return this.buffer[this.head];
  }

  peekLast(): T | undefined {
    if (this._size === 0) return undefined;
    const idx = (this.tail - 1 + this._capacity) % this._capacity;
    return this.buffer[idx];
  }

  at(index: number): T | undefined {
    if (index < 0 || index >= this._size) return undefined;
    return this.buffer[(this.head + index) % this._capacity];
  }

  get size(): number {
    return this._size;
  }

  get capacity(): number {
    return this._capacity;
  }

  get isFull(): boolean {
    return this._size === this._capacity;
  }

  clear(): void {
    this.buffer = new Array(this._capacity);
    this.head = 0;
    this.tail = 0;
    this._size = 0;
  }

  toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this._size; i++) {
      result.push(this.buffer[(this.head + i) % this._capacity] as T);
    }
    return result;
  }
}
