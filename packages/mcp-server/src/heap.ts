type Comparator<T> = (a: T, b: T) => number;

export class Heap<T> {
  private items: T[] = [];
  private compare: Comparator<T>;

  constructor(compare: Comparator<T>) {
    this.compare = compare;
  }

  get size(): number {
    return this.items.length;
  }

  peek(): T | undefined {
    return this.items[0];
  }

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
    return [...this.items].sort(this.compare);
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const parent = (i - 1) >>> 1;
      if (this.compare(this.items[i], this.items[parent]) >= 0) break;
      [this.items[i], this.items[parent]] = [this.items[parent], this.items[i]];
      i = parent;
    }
  }

  private sinkDown(i: number): void {
    const n = this.items.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this.compare(this.items[left], this.items[smallest]) < 0) smallest = left;
      if (right < n && this.compare(this.items[right], this.items[smallest]) < 0) smallest = right;
      if (smallest === i) break;
      [this.items[i], this.items[smallest]] = [this.items[smallest], this.items[i]];
      i = smallest;
    }
  }
}

export function minHeap(): Heap<number> {
  return new Heap<number>((a, b) => a - b);
}

export function maxHeap(): Heap<number> {
  return new Heap<number>((a, b) => b - a);
}

export function heapSort<T>(items: T[], compare: Comparator<T>): T[] {
  const h = new Heap<T>(compare);
  for (const item of items) h.push(item);
  const result: T[] = [];
  while (h.size > 0) result.push(h.pop()!);
  return result;
}
