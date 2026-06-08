export class SlidingWindow<T> {
  private buffer: T[] = [];
  private _capacity: number;

  constructor(capacity: number) {
    if (capacity < 1) throw new Error("Capacity must be at least 1");
    this._capacity = capacity;
  }

  get capacity(): number {
    return this._capacity;
  }

  get size(): number {
    return this.buffer.length;
  }

  get isFull(): boolean {
    return this.buffer.length >= this._capacity;
  }

  push(value: T): T | undefined {
    let evicted: T | undefined;
    if (this.buffer.length >= this._capacity) {
      evicted = this.buffer.shift();
    }
    this.buffer.push(value);
    return evicted;
  }

  toArray(): T[] {
    return [...this.buffer];
  }

  at(index: number): T | undefined {
    if (index < 0) index = this.buffer.length + index;
    return this.buffer[index];
  }

  latest(): T | undefined {
    return this.buffer[this.buffer.length - 1];
  }

  oldest(): T | undefined {
    return this.buffer[0];
  }

  clear(): void {
    this.buffer.length = 0;
  }

  reduce<U>(fn: (acc: U, val: T) => U, initial: U): U {
    return this.buffer.reduce(fn, initial);
  }

  some(fn: (val: T) => boolean): boolean {
    return this.buffer.some(fn);
  }

  every(fn: (val: T) => boolean): boolean {
    return this.buffer.every(fn);
  }

  *[Symbol.iterator](): Iterator<T> {
    for (const item of this.buffer) yield item;
  }
}
