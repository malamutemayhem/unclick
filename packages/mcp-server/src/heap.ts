export class MinHeap<T> {
  private items: Array<{ value: T; priority: number }> = [];

  push(value: T, priority: number): void {
    this.items.push({ value, priority });
    this.bubbleUp(this.items.length - 1);
  }

  pop(): T | undefined {
    if (this.items.length === 0) return undefined;
    const top = this.items[0].value;
    const last = this.items.pop()!;
    if (this.items.length > 0) {
      this.items[0] = last;
      this.sinkDown(0);
    }
    return top;
  }

  peek(): T | undefined {
    return this.items.length > 0 ? this.items[0].value : undefined;
  }

  peekPriority(): number | undefined {
    return this.items.length > 0 ? this.items[0].priority : undefined;
  }

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): T[] {
    return [...this.items].sort((a, b) => a.priority - b.priority).map((i) => i.value);
  }

  private bubbleUp(idx: number): void {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.items[parent].priority <= this.items[idx].priority) break;
      [this.items[parent], this.items[idx]] = [this.items[idx], this.items[parent]];
      idx = parent;
    }
  }

  private sinkDown(idx: number): void {
    const length = this.items.length;
    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      if (left < length && this.items[left].priority < this.items[smallest].priority) smallest = left;
      if (right < length && this.items[right].priority < this.items[smallest].priority) smallest = right;
      if (smallest === idx) break;
      [this.items[smallest], this.items[idx]] = [this.items[idx], this.items[smallest]];
      idx = smallest;
    }
  }
}

export class MaxHeap<T> {
  private min = new MinHeap<T>();

  push(value: T, priority: number): void {
    this.min.push(value, -priority);
  }

  pop(): T | undefined {
    return this.min.pop();
  }

  peek(): T | undefined {
    return this.min.peek();
  }

  get size(): number {
    return this.min.size;
  }

  isEmpty(): boolean {
    return this.min.isEmpty();
  }

  clear(): void {
    this.min.clear();
  }
}
