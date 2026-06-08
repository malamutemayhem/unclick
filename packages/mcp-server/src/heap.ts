export class Heap<T> {
  private data: T[] = [];
  private readonly compareFn: (a: T, b: T) => number;

  constructor(compare?: (a: T, b: T) => number) {
    this.compareFn = compare ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }

  static minHeap<T>(): Heap<T> {
    return new Heap<T>((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }

  static maxHeap<T>(): Heap<T> {
    return new Heap<T>((a, b) => (a > b ? -1 : a < b ? 1 : 0));
  }

  static from<T>(items: T[], compare?: (a: T, b: T) => number): Heap<T> {
    const heap = new Heap<T>(compare);
    heap.data = [...items];
    for (let i = Math.floor(heap.data.length / 2) - 1; i >= 0; i--) {
      heap.siftDown(i);
    }
    return heap;
  }

  get size(): number {
    return this.data.length;
  }

  get isEmpty(): boolean {
    return this.data.length === 0;
  }

  push(value: T): void {
    this.data.push(value);
    this.siftUp(this.data.length - 1);
  }

  pop(): T | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.siftDown(0);
    }
    return top;
  }

  peek(): T | undefined {
    return this.data[0];
  }

  toArray(): T[] {
    return [...this.data].sort(this.compareFn);
  }

  private siftUp(idx: number): void {
    while (idx > 0) {
      const parent = (idx - 1) >>> 1;
      if (this.compareFn(this.data[idx], this.data[parent]) >= 0) break;
      [this.data[idx], this.data[parent]] = [this.data[parent], this.data[idx]];
      idx = parent;
    }
  }

  private siftDown(idx: number): void {
    const len = this.data.length;
    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      if (left < len && this.compareFn(this.data[left], this.data[smallest]) < 0) {
        smallest = left;
      }
      if (right < len && this.compareFn(this.data[right], this.data[smallest]) < 0) {
        smallest = right;
      }
      if (smallest === idx) break;
      [this.data[idx], this.data[smallest]] = [this.data[smallest], this.data[idx]];
      idx = smallest;
    }
  }
}
