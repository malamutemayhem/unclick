export class PromisePool {
  private running = 0;
  private queue: (() => Promise<void>)[] = [];
  private readonly concurrency: number;
  private settled = 0;
  private errors: unknown[] = [];

  constructor(concurrency: number) {
    this.concurrency = concurrency;
  }

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const task = async () => {
        try {
          const result = await fn();
          this.settled++;
          resolve(result);
        } catch (err) {
          this.settled++;
          this.errors.push(err);
          reject(err);
        } finally {
          this.running--;
          this.dequeue();
        }
      };

      if (this.running < this.concurrency) {
        this.running++;
        task();
      } else {
        this.queue.push(task);
      }
    });
  }

  async map<T, R>(items: T[], fn: (item: T) => Promise<R>): Promise<R[]> {
    return Promise.all(items.map((item) => this.add(() => fn(item))));
  }

  async settle<T, R>(items: T[], fn: (item: T) => Promise<R>): Promise<PromiseSettledResult<R>[]> {
    return Promise.allSettled(items.map((item) => this.add(() => fn(item))));
  }

  get activeCount(): number {
    return this.running;
  }

  get pendingCount(): number {
    return this.queue.length;
  }

  get settledCount(): number {
    return this.settled;
  }

  get errorCount(): number {
    return this.errors.length;
  }

  private dequeue(): void {
    if (this.queue.length > 0 && this.running < this.concurrency) {
      const task = this.queue.shift()!;
      this.running++;
      task();
    }
  }
}

export async function pMap<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  concurrency: number,
): Promise<R[]> {
  const pool = new PromisePool(concurrency);
  return pool.map(items, (item) => fn(item, items.indexOf(item)));
}

export async function pFilter<T>(
  items: T[],
  fn: (item: T) => Promise<boolean>,
  concurrency: number,
): Promise<T[]> {
  const pool = new PromisePool(concurrency);
  const results = await pool.map(items, async (item) => ({ item, keep: await fn(item) }));
  return results.filter((r) => r.keep).map((r) => r.item);
}
