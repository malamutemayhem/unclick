export class PromisePool {
  private concurrency: number;
  private running = 0;
  private queue: Array<() => void> = [];

  constructor(concurrency: number) {
    if (concurrency < 1) throw new Error("Concurrency must be at least 1");
    this.concurrency = concurrency;
  }

  async run<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }

  async map<T, R>(items: T[], fn: (item: T, index: number) => Promise<R>): Promise<R[]> {
    const results: R[] = new Array(items.length);
    const tasks = items.map((item, i) =>
      this.run(() => fn(item, i).then((r) => { results[i] = r; return r; }))
    );
    await Promise.all(tasks);
    return results;
  }

  async settle<T, R>(
    items: T[],
    fn: (item: T, index: number) => Promise<R>
  ): Promise<Array<{ status: "fulfilled"; value: R } | { status: "rejected"; reason: any }>> {
    const results: Array<{ status: "fulfilled"; value: R } | { status: "rejected"; reason: any }> = [];
    const tasks = items.map((item, i) =>
      this.run(() => fn(item, i)).then(
        (value) => { results[i] = { status: "fulfilled", value }; },
        (reason) => { results[i] = { status: "rejected", reason }; }
      )
    );
    await Promise.all(tasks);
    return results;
  }

  get pending(): number { return this.queue.length; }
  get active(): number { return this.running; }

  private acquire(): Promise<void> {
    if (this.running < this.concurrency) {
      this.running++;
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => this.queue.push(resolve));
  }

  private release(): void {
    if (this.queue.length > 0) {
      const next = this.queue.shift()!;
      next();
    } else {
      this.running--;
    }
  }
}
