type Task = {
  id: string;
  fn: () => Promise<void> | void;
  priority: number;
  dependencies: string[];
};

export class TaskScheduler {
  private tasks = new Map<string, Task>();
  private completed = new Set<string>();
  private running = new Set<string>();

  add(id: string, fn: () => Promise<void> | void, priority: number = 0, dependencies: string[] = []): this {
    this.tasks.set(id, { id, fn, priority, dependencies });
    return this;
  }

  remove(id: string): boolean {
    return this.tasks.delete(id);
  }

  getReady(): string[] {
    const ready: Task[] = [];
    for (const task of this.tasks.values()) {
      if (this.completed.has(task.id) || this.running.has(task.id)) continue;
      if (task.dependencies.every((d: string) => this.completed.has(d))) {
        ready.push(task);
      }
    }
    return ready.sort((a: Task, b: Task) => b.priority - a.priority).map((t: Task) => t.id);
  }

  async runNext(): Promise<string | null> {
    const ready = this.getReady();
    if (ready.length === 0) return null;
    const id = ready[0];
    const task = this.tasks.get(id)!;
    this.running.add(id);
    try {
      await task.fn();
      this.completed.add(id);
    } finally {
      this.running.delete(id);
    }
    return id;
  }

  async runAll(concurrency: number = 1): Promise<string[]> {
    const order: string[] = [];
    const runBatch = async (): Promise<void> => {
      const ready = this.getReady();
      if (ready.length === 0) return;
      const batch = ready.slice(0, concurrency);
      await Promise.all(
        batch.map(async (id: string) => {
          const task = this.tasks.get(id)!;
          this.running.add(id);
          try {
            await task.fn();
            this.completed.add(id);
            order.push(id);
          } finally {
            this.running.delete(id);
          }
        }),
      );
      await runBatch();
    };
    await runBatch();
    return order;
  }

  isComplete(id: string): boolean {
    return this.completed.has(id);
  }

  get allComplete(): boolean {
    return this.tasks.size > 0 && this.completed.size === this.tasks.size;
  }

  reset(): void {
    this.completed.clear();
    this.running.clear();
  }
}
