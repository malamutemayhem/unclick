type Task<T> = () => Promise<T>;

export class AsyncQueue {
  private queue: Array<{ task: Task<unknown>; resolve: (v: unknown) => void; reject: (e: unknown) => void }> = [];
  private running = 0;
  private readonly concurrency: number;
  private drainResolvers: Array<() => void> = [];
  private paused = false;

  constructor(concurrency: number = 1) {
    this.concurrency = concurrency;
  }

  push<T>(task: Task<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ task: task as Task<unknown>, resolve: resolve as (v: unknown) => void, reject });
      this.process();
    });
  }

  pause(): void {
    this.paused = true;
  }

  resume(): void {
    this.paused = false;
    this.process();
  }

  async drain(): Promise<void> {
    if (this.running === 0 && this.queue.length === 0) return;
    return new Promise<void>((resolve) => {
      this.drainResolvers.push(resolve);
    });
  }

  get pending(): number {
    return this.queue.length;
  }

  get active(): number {
    return this.running;
  }

  get isPaused(): boolean {
    return this.paused;
  }

  clear(): void {
    for (const item of this.queue) {
      item.reject(new Error("Queue cleared"));
    }
    this.queue = [];
  }

  private process(): void {
    while (!this.paused && this.running < this.concurrency && this.queue.length > 0) {
      const item = this.queue.shift()!;
      this.running++;
      item.task().then(
        (value) => {
          this.running--;
          item.resolve(value);
          this.checkDrain();
          this.process();
        },
        (error) => {
          this.running--;
          item.reject(error);
          this.checkDrain();
          this.process();
        },
      );
    }
  }

  private checkDrain(): void {
    if (this.running === 0 && this.queue.length === 0) {
      for (const resolve of this.drainResolvers) resolve();
      this.drainResolvers = [];
    }
  }
}
