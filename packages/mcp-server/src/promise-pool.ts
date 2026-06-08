export class PromisePool {
  private readonly concurrency: number;

  constructor(concurrency: number) {
    this.concurrency = concurrency;
  }

  async run<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
    const results: T[] = new Array(tasks.length);
    let nextIndex = 0;

    const runNext = async (): Promise<void> => {
      while (nextIndex < tasks.length) {
        const index = nextIndex++;
        results[index] = await tasks[index]();
      }
    };

    const workers = Array.from({ length: Math.min(this.concurrency, tasks.length) }, () => runNext());
    await Promise.all(workers);
    return results;
  }

  async settled<T>(tasks: Array<() => Promise<T>>): Promise<Array<PromiseSettledResult<T>>> {
    const results: Array<PromiseSettledResult<T>> = new Array(tasks.length);
    let nextIndex = 0;

    const runNext = async (): Promise<void> => {
      while (nextIndex < tasks.length) {
        const index = nextIndex++;
        try {
          const value = await tasks[index]();
          results[index] = { status: "fulfilled", value };
        } catch (reason) {
          results[index] = { status: "rejected", reason };
        }
      }
    };

    const workers = Array.from({ length: Math.min(this.concurrency, tasks.length) }, () => runNext());
    await Promise.all(workers);
    return results;
  }
}

export async function mapPool<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  concurrency: number,
): Promise<R[]> {
  const pool = new PromisePool(concurrency);
  return pool.run(items.map((item: T, i: number) => () => fn(item, i)));
}
