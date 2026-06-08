interface QueuedTask<T> {
  fn: () => Promise<T>;
  priority: number;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
}

export interface TaskResult<T> {
  value?: T;
  error?: unknown;
  duration: number;
}

export class TaskQueueAsync {
  private queue: QueuedTask<unknown>[] = [];
  private running = 0;
  private readonly concurrency: number;
  private completed = 0;
  private failed = 0;
  private paused = false;

  constructor(concurrency: number = 1) {
    this.concurrency = Math.max(1, concurrency);
  }

  add<T>(fn: () => Promise<T>, priority: number = 0): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({
        fn: fn as () => Promise<unknown>,
        priority,
        resolve: resolve as (value: unknown) => void,
        reject,
      });
      this.queue.sort((a, b) => b.priority - a.priority);
      this.process();
    });
  }

  private process(): void {
    if (this.paused) return;
    while (this.running < this.concurrency && this.queue.length > 0) {
      const task = this.queue.shift()!;
      this.running++;
      const start = Date.now();
      task
        .fn()
        .then((value) => {
          this.completed++;
          task.resolve(value);
        })
        .catch((err) => {
          this.failed++;
          task.reject(err);
        })
        .finally(() => {
          this.running--;
          this.process();
        });
    }
  }

  pause(): void {
    this.paused = true;
  }

  resume(): void {
    this.paused = false;
    this.process();
  }

  clear(): number {
    const count = this.queue.length;
    for (const task of this.queue) {
      task.reject(new Error("Queue cleared"));
    }
    this.queue = [];
    return count;
  }

  get size(): number {
    return this.queue.length;
  }

  get pending(): number {
    return this.running;
  }

  get completedCount(): number {
    return this.completed;
  }

  get failedCount(): number {
    return this.failed;
  }

  get isPaused(): boolean {
    return this.paused;
  }

  async drain(): Promise<void> {
    if (this.queue.length === 0 && this.running === 0) return;
    return new Promise<void>((resolve) => {
      const check = (): void => {
        if (this.queue.length === 0 && this.running === 0) {
          resolve();
        } else {
          setTimeout(check, 1);
        }
      };
      check();
    });
  }

  static async map<T, U>(
    items: T[],
    fn: (item: T) => Promise<U>,
    concurrency: number = 4
  ): Promise<U[]> {
    const queue = new TaskQueueAsync(concurrency);
    const promises = items.map((item) => queue.add(() => fn(item)));
    return Promise.all(promises);
  }
}
