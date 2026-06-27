export interface ScheduledTask<T = unknown> {
  id: string;
  priority: number;
  data: T;
  scheduledAt: number;
  executeAfter?: number;
}

export class PriorityScheduler<T = unknown> {
  private tasks: ScheduledTask<T>[] = [];
  private nextId = 1;

  schedule(data: T, priority = 0, executeAfter?: number): string {
    const id = `task-${this.nextId++}`;
    const task: ScheduledTask<T> = {
      id,
      priority,
      data,
      scheduledAt: Date.now(),
      executeAfter,
    };
    this.tasks.push(task);
    this.tasks.sort((a, b) => b.priority - a.priority || a.scheduledAt - b.scheduledAt);
    return id;
  }

  next(now?: number): ScheduledTask<T> | undefined {
    const currentTime = now ?? Date.now();
    const idx = this.tasks.findIndex(
      (t) => t.executeAfter === undefined || t.executeAfter <= currentTime,
    );
    if (idx === -1) return undefined;
    return this.tasks.splice(idx, 1)[0];
  }

  peek(): ScheduledTask<T> | undefined {
    return this.tasks[0];
  }

  cancel(id: string): boolean {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    this.tasks.splice(idx, 1);
    return true;
  }

  reschedule(id: string, newPriority: number): boolean {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return false;
    task.priority = newPriority;
    this.tasks.sort((a, b) => b.priority - a.priority || a.scheduledAt - b.scheduledAt);
    return true;
  }

  get size(): number {
    return this.tasks.length;
  }

  drain(): ScheduledTask<T>[] {
    const all = this.tasks.splice(0);
    return all;
  }

  clear(): void {
    this.tasks.length = 0;
  }
}
