export interface ScheduledTask {
  id: string;
  fn: () => void | Promise<void>;
  interval: number;
  nextRun: number;
  repeat: boolean;
}

export class TaskScheduler {
  private tasks = new Map<string, ScheduledTask>();
  private timers = new Map<string, ReturnType<typeof setTimeout>>();
  private running = false;
  private nextId = 0;

  schedule(fn: () => void | Promise<void>, delay: number, repeat = false): string {
    const id = `task-${this.nextId++}`;
    const task: ScheduledTask = { id, fn, interval: delay, nextRun: Date.now() + delay, repeat };
    this.tasks.set(id, task);
    if (this.running) this.scheduleTimer(task);
    return id;
  }

  cancel(id: string): boolean {
    const timer = this.timers.get(id);
    if (timer) clearTimeout(timer);
    this.timers.delete(id);
    return this.tasks.delete(id);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    for (const task of this.tasks.values()) {
      this.scheduleTimer(task);
    }
  }

  stop(): void {
    this.running = false;
    for (const timer of this.timers.values()) clearTimeout(timer);
    this.timers.clear();
  }

  get isRunning(): boolean { return this.running; }
  get taskCount(): number { return this.tasks.size; }

  private scheduleTimer(task: ScheduledTask): void {
    const delay = Math.max(0, task.nextRun - Date.now());
    const timer = setTimeout(async () => {
      this.timers.delete(task.id);
      try {
        await task.fn();
      } catch (_) {}
      if (task.repeat && this.tasks.has(task.id)) {
        task.nextRun = Date.now() + task.interval;
        if (this.running) this.scheduleTimer(task);
      } else {
        this.tasks.delete(task.id);
      }
    }, delay);
    this.timers.set(task.id, timer);
  }
}
