export interface ScheduledTask {
  id: number;
  callback: () => void;
  nextRun: number;
  interval?: number;
  cancelled: boolean;
}

export class Scheduler {
  private tasks: ScheduledTask[] = [];
  private nextId = 1;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private _running = false;

  get running(): boolean {
    return this._running;
  }

  get taskCount(): number {
    return this.tasks.filter((t) => !t.cancelled).length;
  }

  setTimeout(callback: () => void, delayMs: number): number {
    const id = this.nextId++;
    const task: ScheduledTask = {
      id,
      callback,
      nextRun: Date.now() + delayMs,
      cancelled: false,
    };
    this.tasks.push(task);
    this.scheduleNext();
    return id;
  }

  setInterval(callback: () => void, intervalMs: number): number {
    const id = this.nextId++;
    const task: ScheduledTask = {
      id,
      callback,
      nextRun: Date.now() + intervalMs,
      interval: intervalMs,
      cancelled: false,
    };
    this.tasks.push(task);
    this.scheduleNext();
    return id;
  }

  cancel(id: number): boolean {
    const task = this.tasks.find((t) => t.id === id);
    if (!task || task.cancelled) return false;
    task.cancelled = true;
    return true;
  }

  cancelAll(): void {
    for (const task of this.tasks) task.cancelled = true;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this._running = false;
  }

  private scheduleNext(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    const active = this.tasks.filter((t) => !t.cancelled);
    if (active.length === 0) {
      this._running = false;
      return;
    }

    active.sort((a, b) => a.nextRun - b.nextRun);
    const next = active[0];
    const delay = Math.max(0, next.nextRun - Date.now());

    this._running = true;
    this.timer = setTimeout(() => {
      this.tick();
    }, delay);
  }

  private tick(): void {
    const now = Date.now();
    const due = this.tasks.filter((t) => !t.cancelled && t.nextRun <= now);

    for (const task of due) {
      if (task.cancelled) continue;
      try {
        task.callback();
      } catch {}

      if (task.interval) {
        task.nextRun = now + task.interval;
      } else {
        task.cancelled = true;
      }
    }

    this.tasks = this.tasks.filter((t) => !t.cancelled);
    this.scheduleNext();
  }
}
