export type OverflowStrategy = "drop-oldest" | "drop-newest" | "reject";

export class BoundedQueue<T> {
  private items: T[] = [];
  private maxSize: number;
  private strategy: OverflowStrategy;

  constructor(maxSize: number, strategy: OverflowStrategy = "drop-oldest") {
    if (maxSize < 1) throw new Error("maxSize must be at least 1");
    this.maxSize = maxSize;
    this.strategy = strategy;
  }

  enqueue(item: T): boolean {
    if (this.items.length >= this.maxSize) {
      switch (this.strategy) {
        case "drop-oldest":
          this.items.shift();
          break;
        case "drop-newest":
          return false;
        case "reject":
          throw new Error("Queue is full");
      }
    }
    this.items.push(item);
    return true;
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

  get capacity(): number {
    return this.maxSize;
  }

  get isFull(): boolean {
    return this.items.length >= this.maxSize;
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): T[] {
    return [...this.items];
  }

  drain(): T[] {
    const result = this.items;
    this.items = [];
    return result;
  }
}
