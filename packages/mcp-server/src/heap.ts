export class Heap<T> {
  private data: T[] = [];
  private compare: (a: T, b: T) => number;

  constructor(compare?: (a: T, b: T) => number) {
    this.compare = compare ?? ((a: T, b: T) => (a as unknown as number) - (b as unknown as number));
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

  get size(): number {
    return this.data.length;
  }

  get isEmpty(): boolean {
    return this.data.length === 0;
  }

  toArray(): T[] {
    return [...this.data];
  }

  clear(): void {
    this.data = [];
  }

  static from<T>(values: T[], compare?: (a: T, b: T) => number): Heap<T> {
    const heap = new Heap<T>(compare);
    for (const v of values) heap.push(v);
    return heap;
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.compare(this.data[i], this.data[parent]) >= 0) break;
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
      if (left < n && this.compare(this.data[left], this.data[smallest]) < 0) smallest = left;
      if (right < n && this.compare(this.data[right], this.data[smallest]) < 0) smallest = right;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}

export function minHeap<T = number>(compare?: (a: T, b: T) => number): Heap<T> {
  return new Heap<T>(compare);
}

export function maxHeap<T = number>(compare?: (a: T, b: T) => number): Heap<T> {
  const cmp = compare ?? ((a: T, b: T) => (a as unknown as number) - (b as unknown as number));
  return new Heap<T>((a, b) => cmp(b, a));
}
