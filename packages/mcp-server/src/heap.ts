export class MinHeap<T> {
  private data: T[] = [];
  private compareFn: (a: T, b: T) => number;

  constructor(compare?: (a: T, b: T) => number) {
    this.compareFn = compare || ((a: T, b: T) => (a as number) - (b as number));
  }

  get size(): number { return this.data.length; }

  peek(): T | undefined { return this.data[0]; }

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

  toArray(): T[] { return [...this.data]; }

  clear(): void { this.data.length = 0; }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.compareFn(this.data[i], this.data[parent]) >= 0) break;
      [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
      i = parent;
    }
  }

  private sinkDown(i: number): void {
    const len = this.data.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < len && this.compareFn(this.data[left], this.data[smallest]) < 0) smallest = left;
      if (right < len && this.compareFn(this.data[right], this.data[smallest]) < 0) smallest = right;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }

  static from<T>(values: T[], compare?: (a: T, b: T) => number): MinHeap<T> {
    const heap = new MinHeap<T>(compare);
    for (const v of values) heap.push(v);
    return heap;
  }
}

export class MaxHeap<T> {
  private inner: MinHeap<T>;

  constructor(compare?: (a: T, b: T) => number) {
    const cmp = compare || ((a: T, b: T) => (a as number) - (b as number));
    this.inner = new MinHeap<T>((a, b) => cmp(b, a));
  }

  get size(): number { return this.inner.size; }
  peek(): T | undefined { return this.inner.peek(); }
  push(value: T): void { this.inner.push(value); }
  pop(): T | undefined { return this.inner.pop(); }
  toArray(): T[] { return this.inner.toArray(); }
  clear(): void { this.inner.clear(); }

  static from<T>(values: T[], compare?: (a: T, b: T) => number): MaxHeap<T> {
    const heap = new MaxHeap<T>(compare);
    for (const v of values) heap.push(v);
    return heap;
  }
}
