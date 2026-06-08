export interface QueueOptions {
  concurrency?: number;
  timeout?: number;
}

interface QueueEntry<T> {
  fn: () => Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: any) => void;
}

export class TaskQueue {
  private queue: QueueEntry<any>[] = [];
  private running = 0;
  private concurrency: number;
  private timeout: number;

  constructor(options: QueueOptions = {}) {
    this.concurrency = options.concurrency ?? 1;
    this.timeout = options.timeout ?? 0;
  }

  get pending(): number {
    return this.queue.length;
  }

  get active(): number {
    return this.running;
  }

  add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.drain();
    });
  }

  async addAll<T>(fns: Array<() => Promise<T>>): Promise<T[]> {
    return Promise.all(fns.map((fn) => this.add(fn)));
  }

  clear(): void {
    for (const entry of this.queue) {
      entry.reject(new Error("Queue cleared"));
    }
    this.queue.length = 0;
  }

  private drain(): void {
    while (this.running < this.concurrency && this.queue.length > 0) {
      const entry = this.queue.shift()!;
      this.running++;
      this.run(entry);
    }
  }

  private run<T>(entry: QueueEntry<T>): void {
    let settled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const settle = (fn: () => void) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      this.running--;
      fn();
      this.drain();
    };

    if (this.timeout > 0) {
      timer = setTimeout(() => {
        settle(() => entry.reject(new Error("Task timed out")));
      }, this.timeout);
    }

    entry.fn().then(
      (val) => settle(() => entry.resolve(val)),
      (err) => settle(() => entry.reject(err))
    );
  }
}
