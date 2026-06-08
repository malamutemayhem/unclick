interface Waiter<T> {
  resolve: (result: IteratorResult<T>) => void;
}

export class StreamBuffer<T> {
  private buffer: T[] = [];
  private waiters: Array<Waiter<T>> = [];
  private _done = false;
  private readonly highWaterMark: number;

  constructor(highWaterMark = 16) {
    this.highWaterMark = highWaterMark;
  }

  get length(): number {
    return this.buffer.length;
  }

  get isDone(): boolean {
    return this._done;
  }

  get isFull(): boolean {
    return this.buffer.length >= this.highWaterMark;
  }

  push(value: T): boolean {
    if (this._done) throw new Error("Stream is closed");

    if (this.waiters.length > 0) {
      const waiter = this.waiters.shift()!;
      waiter.resolve({ value, done: false });
      return true;
    }

    this.buffer.push(value);
    return this.buffer.length < this.highWaterMark;
  }

  end(): void {
    this._done = true;
    for (const waiter of this.waiters) {
      waiter.resolve({ value: undefined as T, done: true });
    }
    this.waiters = [];
  }

  async next(): Promise<IteratorResult<T>> {
    if (this.buffer.length > 0) {
      return { value: this.buffer.shift()!, done: false };
    }
    if (this._done) {
      return { value: undefined as T, done: true };
    }
    return new Promise<IteratorResult<T>>((resolve) => {
      this.waiters.push({ resolve });
    });
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<T> {
    while (true) {
      const result = await this.next();
      if (result.done) return;
      yield result.value;
    }
  }

  async collect(): Promise<T[]> {
    const items: T[] = [];
    for await (const item of this) {
      items.push(item);
    }
    return items;
  }
}
