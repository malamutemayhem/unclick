type ScheduledTask = {
  id: string;
  pattern: string;
  fn: () => void | Promise<void>;
  lastRun: number;
};

export class CronScheduler {
  private tasks = new Map<string, ScheduledTask>();
  private running = false;
  private timer: ReturnType<typeof setInterval> | null = null;

  schedule(id: string, pattern: string, fn: () => void | Promise<void>): void {
    this.tasks.set(id, { id, pattern, fn, lastRun: 0 });
  }

  unschedule(id: string): boolean {
    return this.tasks.delete(id);
  }

  start(intervalMs: number = 1000): void {
    if (this.running) return;
    this.running = true;
    this.timer = setInterval(() => this.tick(), intervalMs);
  }

  stop(): void {
    this.running = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  get isRunning(): boolean {
    return this.running;
  }

  get taskCount(): number {
    return this.tasks.size;
  }

  taskIds(): string[] {
    return [...this.tasks.keys()];
  }

  async tick(now: Date = new Date()): Promise<string[]> {
    const ran: string[] = [];
    for (const task of this.tasks.values()) {
      if (matchesCron(task.pattern, now) && now.getTime() - task.lastRun >= 60000) {
        task.lastRun = now.getTime();
        await task.fn();
        ran.push(task.id);
      }
    }
    return ran;
  }
}

function matchesCron(pattern: string, date: Date): boolean {
  if (pattern === "* * * * *") return true;
  const parts = pattern.split(/\s+/);
  if (parts.length !== 5) return false;
  const [minute, hour, day, month, weekday] = parts;
  return (
    matchField(minute, date.getMinutes()) &&
    matchField(hour, date.getHours()) &&
    matchField(day, date.getDate()) &&
    matchField(month, date.getMonth() + 1) &&
    matchField(weekday, date.getDay())
  );
}

function matchField(field: string, value: number): boolean {
  if (field === "*") return true;
  for (const part of field.split(",")) {
    if (part.includes("/")) {
      const [, stepStr] = part.split("/");
      if (value % parseInt(stepStr, 10) === 0) return true;
    } else if (part.includes("-")) {
      const [lo, hi] = part.split("-").map(Number);
      if (value >= lo && value <= hi) return true;
    } else {
      if (parseInt(part, 10) === value) return true;
    }
  }
  return false;
}
