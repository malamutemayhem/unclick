export class MinHeap<T> {
  private data: T[] = [];
  private cmp: (a: T, b: T) => number;

  constructor(comparator?: (a: T, b: T) => number) {
    this.cmp = comparator || ((a: T, b: T) => (a as unknown as number) - (b as unknown as number));
  }

  get size(): number {
    return this.data.length;
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }

  push(value: T): void {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): T | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.sinkDown(0);
    }
    return top;
  }

  peek(): T | undefined {
    return this.data[0];
  }

  pushPop(value: T): T {
    if (this.data.length > 0 && this.cmp(this.data[0], value) < 0) {
      const top = this.data[0];
      this.data[0] = value;
      this.sinkDown(0);
      return top;
    }
    return value;
  }

  toArray(): T[] {
    return [...this.data].sort(this.cmp);
  }

  clear(): void {
    this.data.length = 0;
  }

  static from<T>(items: T[], comparator?: (a: T, b: T) => number): MinHeap<T> {
    const heap = new MinHeap<T>(comparator);
    for (const item of items) heap.push(item);
    return heap;
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const parent = (i - 1) >>> 1;
      if (this.cmp(this.data[i], this.data[parent]) >= 0) break;
      [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
      i = parent;
    }
  }

  private sinkDown(i: number): void {
    const n = this.data.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this.cmp(this.data[left], this.data[smallest]) < 0) smallest = left;
      if (right < n && this.cmp(this.data[right], this.data[smallest]) < 0) smallest = right;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}

export class MaxHeap<T> {
  private inner: MinHeap<T>;

  constructor(comparator?: (a: T, b: T) => number) {
    const cmp = comparator || ((a: T, b: T) => (a as unknown as number) - (b as unknown as number));
    this.inner = new MinHeap<T>((a, b) => cmp(b, a));
  }

  get size(): number { return this.inner.size; }
  isEmpty(): boolean { return this.inner.isEmpty(); }
  push(value: T): void { this.inner.push(value); }
  pop(): T | undefined { return this.inner.pop(); }
  peek(): T | undefined { return this.inner.peek(); }
  clear(): void { this.inner.clear(); }

  static from<T>(items: T[], comparator?: (a: T, b: T) => number): MaxHeap<T> {
    const heap = new MaxHeap<T>(comparator);
    for (const item of items) heap.push(item);
    return heap;
  }
}

export function heapSort<T>(items: T[], comparator?: (a: T, b: T) => number): T[] {
  const heap = MinHeap.from(items, comparator);
  const result: T[] = [];
  while (!heap.isEmpty()) {
    result.push(heap.pop()!);
  }
  return result;
}

export function kSmallest<T>(items: T[], k: number, comparator?: (a: T, b: T) => number): T[] {
  const heap = MinHeap.from(items, comparator);
  const result: T[] = [];
  for (let i = 0; i < k && !heap.isEmpty(); i++) {
    result.push(heap.pop()!);
  }
  return result;
}
