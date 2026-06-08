export interface TaskResult<T> {
  id: string;
  result?: T;
  error?: string;
  duration: number;
}

export class TaskQueue {
  private queue: Array<{ id: string; fn: () => Promise<unknown>; resolve: (v: unknown) => void; reject: (e: unknown) => void }> = [];
  private running = 0;
  private concurrency: number;
  private results: TaskResult<unknown>[] = [];
  private counter = 0;

  constructor(concurrency = 1) {
    this.concurrency = concurrency;
  }

  add<T>(fn: () => Promise<T>): Promise<T> {
    const id = `task_${++this.counter}`;
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ id, fn, resolve: resolve as (v: unknown) => void, reject });
      this.drain();
    });
  }

  private drain(): void {
    while (this.running < this.concurrency && this.queue.length > 0) {
      const task = this.queue.shift()!;
      this.running++;
      const start = Date.now();
      task.fn()
        .then((result) => {
          this.results.push({ id: task.id, result, duration: Date.now() - start });
          task.resolve(result);
        })
        .catch((err) => {
          this.results.push({ id: task.id, error: String(err), duration: Date.now() - start });
          task.reject(err);
        })
        .finally(() => {
          this.running--;
          this.drain();
        });
    }
  }

  get pending(): number {
    return this.queue.length;
  }

  get active(): number {
    return this.running;
  }

  get completed(): number {
    return this.results.length;
  }

  getResults(): TaskResult<unknown>[] {
    return [...this.results];
  }

  clear(): void {
    this.queue = [];
    this.results = [];
  }
}
