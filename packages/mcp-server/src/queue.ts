export class Queue<T> {
  private items: T[] = [];
  private head = 0;

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    if (this.head >= this.items.length) return undefined;
    const item = this.items[this.head];
    this.head++;
    if (this.head > 100 && this.head > this.items.length / 2) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }
    return item;
  }

  peek(): T | undefined {
    return this.items[this.head];
  }

  get size(): number {
    return this.items.length - this.head;
  }

  get isEmpty(): boolean {
    return this.size === 0;
  }

  clear(): void {
    this.items = [];
    this.head = 0;
  }

  toArray(): T[] {
    return this.items.slice(this.head);
  }

  [Symbol.iterator](): Iterator<T> {
    let i = this.head;
    const items = this.items;
    return {
      next(): IteratorResult<T> {
        if (i >= items.length) return { done: true, value: undefined };
        return { done: false, value: items[i++] };
      },
    };
  }
}

export class PriorityQueue<T> {
  private items: Array<{ value: T; priority: number }> = [];

  enqueue(value: T, priority: number): void {
    const entry = { value, priority };
    let i = this.items.length - 1;
    while (i >= 0 && this.items[i].priority > priority) i--;
    this.items.splice(i + 1, 0, entry);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.value;
  }

  peek(): T | undefined {
    return this.items[0]?.value;
  }

  get size(): number {
    return this.items.length;
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): T[] {
    return this.items.map((e) => e.value);
  }
}
