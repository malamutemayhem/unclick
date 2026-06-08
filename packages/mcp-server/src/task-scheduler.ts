export interface ScheduledTask {
  id: string;
  fn: () => void | Promise<void>;
  intervalMs: number;
  timer?: ReturnType<typeof setInterval>;
  running: boolean;
  lastRun?: number;
  runCount: number;
}

export class TaskScheduler {
  private tasks = new Map<string, ScheduledTask>();

  schedule(id: string, fn: () => void | Promise<void>, intervalMs: number): void {
    if (this.tasks.has(id)) this.cancel(id);

    const task: ScheduledTask = { id, fn, intervalMs, running: false, runCount: 0 };
    const timer = setInterval(() => {
      if (task.running) return;
      task.running = true;
      try {
        const result = task.fn();
        if (result && typeof (result as Promise<void>).then === "function") {
          (result as Promise<void>).then(
            () => { task.runCount++; task.lastRun = Date.now(); task.running = false; },
            () => { task.running = false; },
          );
        } else {
          task.runCount++;
          task.lastRun = Date.now();
          task.running = false;
        }
      } catch {
        task.running = false;
      }
    }, intervalMs);
    task.timer = timer;
    this.tasks.set(id, task);
  }

  cancel(id: string): boolean {
    const task = this.tasks.get(id);
    if (!task) return false;
    if (task.timer) clearInterval(task.timer);
    this.tasks.delete(id);
    return true;
  }

  cancelAll(): void {
    for (const [id] of this.tasks) this.cancel(id);
  }

  isScheduled(id: string): boolean {
    return this.tasks.has(id);
  }

  getStats(id: string): { runCount: number; lastRun?: number } | undefined {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    return { runCount: task.runCount, lastRun: task.lastRun };
  }

  get size(): number {
    return this.tasks.size;
  }
}
