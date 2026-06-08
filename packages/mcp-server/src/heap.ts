export class BinaryHeap<T> {
  private items: T[] = [];
  private compareFn: (a: T, b: T) => number;

  constructor(compareFn?: (a: T, b: T) => number) {
    this.compareFn = compareFn ?? ((a: any, b: any) => a - b);
  }

  get size(): number { return this.items.length; }

  peek(): T | undefined { return this.items[0]; }

  push(value: T): void {
    this.items.push(value);
    this.bubbleUp(this.items.length - 1);
  }

  pop(): T | undefined {
    if (this.items.length === 0) return undefined;
    const top = this.items[0];
    const last = this.items.pop()!;
    if (this.items.length > 0) {
      this.items[0] = last;
      this.sinkDown(0);
    }
    return top;
  }

  toArray(): T[] {
    return [...this.items].sort(this.compareFn);
  }

  clear(): void {
    this.items = [];
  }

  static fromArray<U>(arr: U[], compareFn?: (a: U, b: U) => number): BinaryHeap<U> {
    const heap = new BinaryHeap<U>(compareFn);
    for (const item of arr) heap.push(item);
    return heap;
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.compareFn(this.items[i], this.items[parent]) >= 0) break;
      [this.items[i], this.items[parent]] = [this.items[parent], this.items[i]];
      i = parent;
    }
  }

  private sinkDown(i: number): void {
    const len = this.items.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < len && this.compareFn(this.items[left], this.items[smallest]) < 0) smallest = left;
      if (right < len && this.compareFn(this.items[right], this.items[smallest]) < 0) smallest = right;
      if (smallest === i) break;
      [this.items[i], this.items[smallest]] = [this.items[smallest], this.items[i]];
      i = smallest;
    }
  }
}

export function minHeap<T>(): BinaryHeap<T> {
  return new BinaryHeap<T>();
}

export function maxHeap<T>(): BinaryHeap<T> {
  return new BinaryHeap<T>((a: any, b: any) => b - a);
}
