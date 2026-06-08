type TaskFn<T> = () => Promise<T>;

interface QueuedTask<T> {
  fn: TaskFn<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
  priority: number;
  addedAt: number;
}

export class TaskQueue {
  private queue: QueuedTask<unknown>[] = [];
  private running = 0;
  private readonly concurrency: number;
  private completed = 0;
  private failed = 0;
  private paused = false;

  constructor(concurrency = 1) {
    this.concurrency = concurrency;
  }

  add<T>(fn: TaskFn<T>, priority = 0): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({
        fn: fn as TaskFn<unknown>,
        resolve: resolve as (value: unknown) => void,
        reject,
        priority,
        addedAt: Date.now(),
      });
      this.queue.sort((a, b) => b.priority - a.priority);
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

  clear(): void {
    for (const task of this.queue) {
      task.reject(new Error("Queue cleared"));
    }
    this.queue = [];
  }

  get size(): number {
    return this.queue.length;
  }

  get activeCount(): number {
    return this.running;
  }

  get pendingCount(): number {
    return this.queue.length;
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
    return new Promise((resolve) => {
      const check = () => {
        if (this.queue.length === 0 && this.running === 0) {
          resolve();
        } else {
          setTimeout(check, 10);
        }
      };
      check();
    });
  }

  private process(): void {
    if (this.paused) return;
    while (this.running < this.concurrency && this.queue.length > 0) {
      const task = this.queue.shift()!;
      this.running++;
      task.fn().then(
        (result) => {
          this.running--;
          this.completed++;
          task.resolve(result);
          this.process();
        },
        (error) => {
          this.running--;
          this.failed++;
          task.reject(error);
          this.process();
        },
      );
    }
  }
}
