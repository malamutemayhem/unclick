export interface ScheduledTask {
  id: string;
  fn: () => void | Promise<void>;
  intervalMs: number;
  nextRun: number;
  running: boolean;
}

export class Scheduler {
  private tasks = new Map<string, ScheduledTask>();
  private timer: ReturnType<typeof setInterval> | null = null;
  private tickInterval: number;

  constructor(tickInterval = 1000) {
    this.tickInterval = tickInterval;
  }

  schedule(id: string, fn: () => void | Promise<void>, intervalMs: number, immediate = false): void {
    this.tasks.set(id, {
      id,
      fn,
      intervalMs,
      nextRun: immediate ? Date.now() : Date.now() + intervalMs,
      running: false,
    });
    if (!this.timer) this.start();
  }

  unschedule(id: string): boolean {
    const deleted = this.tasks.delete(id);
    if (this.tasks.size === 0) this.stop();
    return deleted;
  }

  get taskCount(): number { return this.tasks.size; }

  isScheduled(id: string): boolean { return this.tasks.has(id); }

  async tick(): Promise<void> {
    const now = Date.now();
    for (const task of this.tasks.values()) {
      if (task.running || now < task.nextRun) continue;
      task.running = true;
      try {
        await task.fn();
      } catch {
        // swallow
      } finally {
        task.running = false;
        task.nextRun = Date.now() + task.intervalMs;
      }
    }
  }

  start(): void {
    if (this.timer) return;
    this.timer = setInterval(() => this.tick(), this.tickInterval);
  }

  stop(): void {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  }

  clear(): void {
    this.tasks.clear();
    this.stop();
  }
}
