export class AsyncQueue<T> {
  private buffer: T[] = [];
  private waiters: ((value: T) => void)[] = [];
  private closed = false;

  push(item: T): void {
    if (this.closed) throw new Error("Queue is closed");
    if (this.waiters.length > 0) {
      const resolve = this.waiters.shift()!;
      resolve(item);
    } else {
      this.buffer.push(item);
    }
  }

  async pop(): Promise<T> {
    if (this.buffer.length > 0) return this.buffer.shift()!;
    if (this.closed) throw new Error("Queue is closed");
    return new Promise<T>((resolve) => this.waiters.push(resolve));
  }

  tryPop(): T | undefined {
    return this.buffer.shift();
  }

  get size(): number {
    return this.buffer.length;
  }

  get waiting(): number {
    return this.waiters.length;
  }

  get isClosed(): boolean {
    return this.closed;
  }

  close(): void {
    this.closed = true;
    for (const waiter of this.waiters) {
      (waiter as unknown as (reason?: unknown) => void)(undefined);
    }
    this.waiters = [];
  }

  drain(): T[] {
    const items = this.buffer;
    this.buffer = [];
    return items;
  }
}
