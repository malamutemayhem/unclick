export class AsyncQueue<T> {
  private items: T[] = [];
  private waiters: Array<(value: T) => void> = [];
  private closed = false;

  get size(): number { return this.items.length; }
  get isClosed(): boolean { return this.closed; }
  get waiting(): number { return this.waiters.length; }

  push(item: T): void {
    if (this.closed) throw new Error("Queue is closed");
    if (this.waiters.length > 0) {
      const resolve = this.waiters.shift()!;
      resolve(item);
    } else {
      this.items.push(item);
    }
  }

  async pop(): Promise<T> {
    if (this.items.length > 0) return this.items.shift()!;
    if (this.closed) throw new Error("Queue is closed and empty");
    return new Promise<T>((resolve) => this.waiters.push(resolve));
  }

  tryPop(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  close(): void {
    this.closed = true;
    for (const waiter of this.waiters) {
      (waiter as any)(undefined);
    }
    this.waiters = [];
  }

  drain(): T[] {
    const result = [...this.items];
    this.items = [];
    return result;
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<T> {
    while (!this.closed || this.items.length > 0) {
      if (this.items.length > 0) {
        yield this.items.shift()!;
      } else if (this.closed) {
        break;
      } else {
        const item = await this.pop();
        if (item !== undefined) yield item;
        else break;
      }
    }
  }
}
