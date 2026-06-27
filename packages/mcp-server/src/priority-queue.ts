export class PriorityQueue<T> {
  private heap: T[] = [];
  private readonly compareFn: (a: T, b: T) => number;

  constructor(compareFn?: (a: T, b: T) => number) {
    this.compareFn = compareFn || ((a: T, b: T) => (a as unknown as number) - (b as unknown as number));
  }

  enqueue(item: T): void {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }
    return top;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  get size(): number {
    return this.heap.length;
  }

  get isEmpty(): boolean {
    return this.heap.length === 0;
  }

  toArray(): T[] {
    const result: T[] = [];
    const copy = new PriorityQueue<T>(this.compareFn);
    copy.heap = [...this.heap];
    while (!copy.isEmpty) {
      result.push(copy.dequeue()!);
    }
    return result;
  }

  clear(): void {
    this.heap = [];
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compareFn(this.heap[index], this.heap[parent]) >= 0) break;
      [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
      index = parent;
    }
  }

  private sinkDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      if (left < length && this.compareFn(this.heap[left], this.heap[smallest]) < 0) smallest = left;
      if (right < length && this.compareFn(this.heap[right], this.heap[smallest]) < 0) smallest = right;
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

export function nSmallest<T>(items: T[], n: number, compareFn?: (a: T, b: T) => number): T[] {
  const pq = new PriorityQueue<T>(compareFn);
  for (const item of items) pq.enqueue(item);
  const result: T[] = [];
  for (let i = 0; i < n && !pq.isEmpty; i++) {
    result.push(pq.dequeue()!);
  }
  return result;
}

export function nLargest<T>(items: T[], n: number, compareFn?: (a: T, b: T) => number): T[] {
  const cmp = compareFn || ((a: T, b: T) => (a as unknown as number) - (b as unknown as number));
  const reversed = (a: T, b: T) => cmp(b, a);
  return nSmallest(items, n, reversed);
}
