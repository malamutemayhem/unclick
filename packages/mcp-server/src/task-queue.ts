type Task<T> = () => Promise<T>;

interface QueuedTask<T> {
  task: Task<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
  priority: number;
}

export class TaskQueue {
  private queue: QueuedTask<any>[] = [];
  private running = 0;
  private _concurrency: number;
  private _paused = false;
  private _completed = 0;
  private _failed = 0;

  constructor(concurrency = 1) {
    this._concurrency = concurrency;
  }

  get concurrency(): number { return this._concurrency; }
  get pending(): number { return this.queue.length; }
  get active(): number { return this.running; }
  get completed(): number { return this._completed; }
  get failed(): number { return this._failed; }
  get paused(): boolean { return this._paused; }

  add<T>(task: Task<T>, priority = 0): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ task, resolve, reject, priority });
      this.queue.sort((a, b) => b.priority - a.priority);
      this.drain();
    });
  }

  pause(): void {
    this._paused = true;
  }

  resume(): void {
    this._paused = false;
    this.drain();
  }

  clear(): void {
    for (const item of this.queue) {
      item.reject(new Error("Queue cleared"));
    }
    this.queue.length = 0;
  }

  async onIdle(): Promise<void> {
    if (this.running === 0 && this.queue.length === 0) return;
    return new Promise((resolve) => {
      const check = () => {
        if (this.running === 0 && this.queue.length === 0) {
          resolve();
        } else {
          setTimeout(check, 10);
        }
      };
      check();
    });
  }

  private drain(): void {
    if (this._paused) return;
    while (this.running < this._concurrency && this.queue.length > 0) {
      const item = this.queue.shift()!;
      this.running++;
      item.task().then(
        (value) => {
          this.running--;
          this._completed++;
          item.resolve(value);
          this.drain();
        },
        (err) => {
          this.running--;
          this._failed++;
          item.reject(err);
          this.drain();
        }
      );
    }
  }
}
