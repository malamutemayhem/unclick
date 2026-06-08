export type Priority = "high" | "normal" | "low";

export interface Task<T = unknown> {
  id: string;
  fn: () => Promise<T>;
  priority: Priority;
  addedAt: number;
}

interface QueuedTask<T = unknown> extends Task<T> {
  resolve: (value: T) => void;
  reject: (error: Error) => void;
}

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, normal: 1, low: 2 };

export class TaskQueue {
  private queue: QueuedTask[] = [];
  private running = 0;
  private maxConcurrent: number;
  private completed = 0;
  private failed = 0;

  constructor(maxConcurrent = 1) {
    this.maxConcurrent = maxConcurrent;
  }

  add<T>(id: string, fn: () => Promise<T>, priority: Priority = "normal"): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const task: QueuedTask<T> = { id, fn, priority, addedAt: Date.now(), resolve, reject };
      this.queue.push(task as QueuedTask);
      this.queue.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
      this.process();
    });
  }

  get pending(): number { return this.queue.length; }
  get active(): number { return this.running; }
  get completedCount(): number { return this.completed; }
  get failedCount(): number { return this.failed; }

  has(id: string): boolean {
    return this.queue.some((t) => t.id === id);
  }

  cancel(id: string): boolean {
    const idx = this.queue.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    const [task] = this.queue.splice(idx, 1);
    task.reject(new Error("Task cancelled"));
    return true;
  }

  clear(): void {
    for (const task of this.queue) {
      task.reject(new Error("Queue cleared"));
    }
    this.queue.length = 0;
  }

  private process(): void {
    while (this.running < this.maxConcurrent && this.queue.length > 0) {
      const task = this.queue.shift()!;
      this.running++;
      task.fn()
        .then((result) => { this.completed++; task.resolve(result); })
        .catch((err) => { this.failed++; task.reject(err instanceof Error ? err : new Error(String(err))); })
        .finally(() => { this.running--; this.process(); });
    }
  }
}
