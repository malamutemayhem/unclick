export class RingAllocator<T> {
  private slots: (T | undefined)[];
  private head: number;
  private tail: number;
  private count: number;

  constructor(readonly capacity: number) {
    this.slots = new Array(capacity).fill(undefined);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  get size(): number { return this.count; }
  get isFull(): boolean { return this.count === this.capacity; }
  get isEmpty(): boolean { return this.count === 0; }

  allocate(item: T): T | undefined {
    let evicted: T | undefined;
    if (this.isFull) {
      evicted = this.slots[this.head];
      this.head = (this.head + 1) % this.capacity;
      this.count--;
    }
    this.slots[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    this.count++;
    return evicted;
  }

  release(): T | undefined {
    if (this.isEmpty) return undefined;
    const item = this.slots[this.head];
    this.slots[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.count--;
    return item;
  }

  peek(): T | undefined {
    if (this.isEmpty) return undefined;
    return this.slots[this.head];
  }

  peekLast(): T | undefined {
    if (this.isEmpty) return undefined;
    const idx = (this.tail - 1 + this.capacity) % this.capacity;
    return this.slots[idx];
  }

  toArray(): T[] {
    const result: T[] = [];
    let idx = this.head;
    for (let i = 0; i < this.count; i++) {
      result.push(this.slots[idx] as T);
      idx = (idx + 1) % this.capacity;
    }
    return result;
  }

  clear(): void {
    this.slots.fill(undefined);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  at(index: number): T | undefined {
    if (index < 0 || index >= this.count) return undefined;
    return this.slots[(this.head + index) % this.capacity];
  }

  *[Symbol.iterator](): Iterator<T> {
    let idx = this.head;
    for (let i = 0; i < this.count; i++) {
      yield this.slots[idx] as T;
      idx = (idx + 1) % this.capacity;
    }
  }
}
