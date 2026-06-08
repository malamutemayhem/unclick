type Task<T> = () => Promise<T>;

export class AsyncQueue {
  private queue: Array<{ task: Task<unknown>; resolve: (v: unknown) => void; reject: (e: unknown) => void }> = [];
  private running = 0;
  private readonly concurrency: number;
  private paused = false;

  constructor(concurrency: number = 1) {
    this.concurrency = concurrency;
  }

  add<T>(task: Task<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ task: task as Task<unknown>, resolve: resolve as (v: unknown) => void, reject });
      this.run();
    });
  }

  private async run(): Promise<void> {
    if (this.paused) return;
    while (this.running < this.concurrency && this.queue.length > 0) {
      const item = this.queue.shift()!;
      this.running++;
      try {
        const result = await item.task();
        item.resolve(result);
      } catch (err) {
        item.reject(err);
      } finally {
        this.running--;
        this.run();
      }
    }
  }

  pause(): void {
    this.paused = true;
  }

  resume(): void {
    this.paused = false;
    this.run();
  }

  get pending(): number {
    return this.queue.length;
  }

  get active(): number {
    return this.running;
  }

  get size(): number {
    return this.queue.length + this.running;
  }

  get isPaused(): boolean {
    return this.paused;
  }
}
