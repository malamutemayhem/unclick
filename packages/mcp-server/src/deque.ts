export class Deque<T> {
  private items: (T | undefined)[];
  private head: number;
  private tail: number;
  private _size: number;
  private capacity: number;

  constructor(initialCapacity = 16) {
    this.capacity = initialCapacity;
    this.items = new Array(this.capacity);
    this.head = 0;
    this.tail = 0;
    this._size = 0;
  }

  get size(): number {
    return this._size;
  }

  get isEmpty(): boolean {
    return this._size === 0;
  }

  pushBack(value: T): void {
    if (this._size === this.capacity) this.grow();
    this.items[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
    this._size++;
  }

  pushFront(value: T): void {
    if (this._size === this.capacity) this.grow();
    this.head = (this.head - 1 + this.capacity) % this.capacity;
    this.items[this.head] = value;
    this._size++;
  }

  popBack(): T | undefined {
    if (this._size === 0) return undefined;
    this.tail = (this.tail - 1 + this.capacity) % this.capacity;
    const value = this.items[this.tail];
    this.items[this.tail] = undefined;
    this._size--;
    return value;
  }

  popFront(): T | undefined {
    if (this._size === 0) return undefined;
    const value = this.items[this.head];
    this.items[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this._size--;
    return value;
  }

  peekFront(): T | undefined {
    if (this._size === 0) return undefined;
    return this.items[this.head];
  }

  peekBack(): T | undefined {
    if (this._size === 0) return undefined;
    return this.items[(this.tail - 1 + this.capacity) % this.capacity];
  }

  toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this._size; i++) {
      result.push(this.items[(this.head + i) % this.capacity] as T);
    }
    return result;
  }

  clear(): void {
    this.items = new Array(this.capacity);
    this.head = 0;
    this.tail = 0;
    this._size = 0;
  }

  private grow(): void {
    const newCapacity = this.capacity * 2;
    const newItems = new Array(newCapacity);
    for (let i = 0; i < this._size; i++) {
      newItems[i] = this.items[(this.head + i) % this.capacity];
    }
    this.items = newItems;
    this.head = 0;
    this.tail = this._size;
    this.capacity = newCapacity;
  }
}
