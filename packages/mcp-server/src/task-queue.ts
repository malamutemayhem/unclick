type Task<T> = () => Promise<T>;

interface QueuedTask<T> {
  task: Task<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
  priority: number;
}

export class TaskQueue {
  private queue: QueuedTask<unknown>[] = [];
  private running = 0;
  private concurrency: number;
  private _completed = 0;
  private _failed = 0;

  constructor(concurrency = 1) {
    this.concurrency = concurrency;
  }

  add<T>(task: Task<T>, priority = 0): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ task: task as Task<unknown>, resolve: resolve as (v: unknown) => void, reject, priority });
      this.queue.sort((a, b) => b.priority - a.priority);
      this.run();
    });
  }

  get pending(): number {
    return this.queue.length;
  }

  get active(): number {
    return this.running;
  }

  get completed(): number {
    return this._completed;
  }

  get failed(): number {
    return this._failed;
  }

  private run(): void {
    while (this.running < this.concurrency && this.queue.length > 0) {
      const item = this.queue.shift()!;
      this.running++;
      item.task()
        .then((result) => {
          this._completed++;
          item.resolve(result);
        })
        .catch((err) => {
          this._failed++;
          item.reject(err);
        })
        .finally(() => {
          this.running--;
          this.run();
        });
    }
  }
}
