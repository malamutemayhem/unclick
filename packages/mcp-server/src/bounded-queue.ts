export class BoundedQueue<T> {
  private items: T[] = [];
  private readonly capacity: number;
  private droppedCount = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  enqueue(item: T): boolean {
    if (this.items.length >= this.capacity) {
      this.droppedCount++;
      return false;
    }
    this.items.push(item);
    return true;
  }

  enqueueForce(item: T): T | undefined {
    let evicted: T | undefined;
    if (this.items.length >= this.capacity) {
      evicted = this.items.shift();
    }
    this.items.push(item);
    return evicted;
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  get size(): number {
    return this.items.length;
  }

  get full(): boolean {
    return this.items.length >= this.capacity;
  }

  get empty(): boolean {
    return this.items.length === 0;
  }

  get dropped(): number {
    return this.droppedCount;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): T[] {
    return [...this.items];
  }

  drain(): T[] {
    const all = this.items;
    this.items = [];
    return all;
  }
}
