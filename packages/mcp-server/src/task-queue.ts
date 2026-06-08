type Task<T> = () => Promise<T>;

interface QueueEntry<T> {
  task: Task<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
}

export class TaskQueue {
  private queue: Array<QueueEntry<unknown>> = [];
  private running = 0;
  private readonly concurrency: number;
  private _paused = false;

  constructor(concurrency = 1) {
    this.concurrency = concurrency;
  }

  get pending(): number {
    return this.queue.length;
  }

  get active(): number {
    return this.running;
  }

  get isPaused(): boolean {
    return this._paused;
  }

  add<T>(task: Task<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ task, resolve, reject } as QueueEntry<unknown>);
      this.process();
    });
  }

  pause(): void {
    this._paused = true;
  }

  resume(): void {
    this._paused = false;
    this.process();
  }

  clear(): void {
    for (const entry of this.queue) {
      entry.reject(new Error("Queue cleared"));
    }
    this.queue = [];
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

  private process(): void {
    if (this._paused) return;
    while (this.running < this.concurrency && this.queue.length > 0) {
      const entry = this.queue.shift()!;
      this.running++;
      entry
        .task()
        .then((value) => entry.resolve(value))
        .catch((err) => entry.reject(err))
        .finally(() => {
          this.running--;
          this.process();
        });
    }
  }
}
