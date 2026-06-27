export class RingBuffer<T> {
  private buffer: (T | undefined)[];
  private head = 0;
  private tail = 0;
  private _size = 0;

  constructor(private capacity: number) {
    if (capacity < 1) throw new Error("Capacity must be at least 1");
    this.buffer = new Array(capacity);
  }

  get size(): number { return this._size; }
  get full(): boolean { return this._size === this.capacity; }
  get empty(): boolean { return this._size === 0; }

  push(item: T): T | undefined {
    let overwritten: T | undefined;
    if (this._size === this.capacity) {
      overwritten = this.buffer[this.head] as T;
      this.head = (this.head + 1) % this.capacity;
    } else {
      this._size++;
    }
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    return overwritten;
  }

  shift(): T | undefined {
    if (this._size === 0) return undefined;
    const item = this.buffer[this.head] as T;
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this._size--;
    return item;
  }

  peek(): T | undefined {
    if (this._size === 0) return undefined;
    return this.buffer[this.head] as T;
  }

  peekLast(): T | undefined {
    if (this._size === 0) return undefined;
    const idx = (this.tail - 1 + this.capacity) % this.capacity;
    return this.buffer[idx] as T;
  }

  at(index: number): T | undefined {
    if (index < 0 || index >= this._size) return undefined;
    return this.buffer[(this.head + index) % this.capacity] as T;
  }

  clear(): void {
    this.buffer = new Array(this.capacity);
    this.head = 0;
    this.tail = 0;
    this._size = 0;
  }

  toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this._size; i++) {
      result.push(this.buffer[(this.head + i) % this.capacity] as T);
    }
    return result;
  }

  *[Symbol.iterator](): Iterator<T> {
    for (let i = 0; i < this._size; i++) {
      yield this.buffer[(this.head + i) % this.capacity] as T;
    }
  }
}
