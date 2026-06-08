export interface Task {
  id: string;
  deps: string[];
  cost: number;
  status: "pending" | "running" | "done" | "failed" | "skipped";
}

export class TaskGraph {
  private tasks = new Map<string, Task>();

  addTask(id: string, deps: string[] = [], cost = 1): void {
    this.tasks.set(id, { id, deps, cost, status: "pending" });
  }

  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  topologicalSort(): string[] | null {
    const visited = new Set<string>();
    const temp = new Set<string>();
    const result: string[] = [];

    const visit = (id: string): boolean => {
      if (temp.has(id)) return false;
      if (visited.has(id)) return true;
      temp.add(id);
      const task = this.tasks.get(id);
      if (!task) return false;
      for (const dep of task.deps) {
        if (!visit(dep)) return false;
      }
      temp.delete(id);
      visited.add(id);
      result.push(id);
      return true;
    };

    for (const id of this.tasks.keys()) {
      if (!visit(id)) return null;
    }
    return result;
  }

  hasCycle(): boolean {
    return this.topologicalSort() === null;
  }

  ready(): string[] {
    const result: string[] = [];
    for (const [id, task] of this.tasks) {
      if (task.status !== "pending") continue;
      const allDepsDone = task.deps.every((d) => {
        const dep = this.tasks.get(d);
        return dep && dep.status === "done";
      });
      if (allDepsDone) result.push(id);
    }
    return result.sort();
  }

  run(id: string): boolean {
    const task = this.tasks.get(id);
    if (!task || task.status !== "pending") return false;
    const allDepsDone = task.deps.every((d) => {
      const dep = this.tasks.get(d);
      return dep && dep.status === "done";
    });
    if (!allDepsDone) return false;
    task.status = "running";
    return true;
  }

  complete(id: string): boolean {
    const task = this.tasks.get(id);
    if (!task || task.status !== "running") return false;
    task.status = "done";
    return true;
  }

  fail(id: string): void {
    const task = this.tasks.get(id);
    if (!task) return;
    task.status = "failed";
    this.skipDependents(id);
  }

  private skipDependents(failedId: string): void {
    for (const [, task] of this.tasks) {
      if (task.status !== "pending") continue;
      if (task.deps.includes(failedId)) {
        task.status = "skipped";
        this.skipDependents(task.id);
      }
    }
  }

  criticalPath(): string[] {
    const order = this.topologicalSort();
    if (!order) return [];
    const dist = new Map<string, number>();
    const prev = new Map<string, string | null>();

    for (const id of order) {
      dist.set(id, 0);
      prev.set(id, null);
    }

    for (const id of order) {
      const task = this.tasks.get(id)!;
      const currentDist = dist.get(id)!;
      for (const [otherId, otherTask] of this.tasks) {
        if (otherTask.deps.includes(id)) {
          const newDist = currentDist + task.cost;
          if (newDist > (dist.get(otherId) ?? 0)) {
            dist.set(otherId, newDist);
            prev.set(otherId, id);
          }
        }
      }
    }

    let endId = order[0];
    let maxDist = 0;
    for (const [id, d] of dist) {
      const task = this.tasks.get(id)!;
      if (d + task.cost > maxDist) {
        maxDist = d + task.cost;
        endId = id;
      }
    }

    const path: string[] = [];
    let cur: string | null = endId;
    while (cur !== null) {
      path.unshift(cur);
      cur = prev.get(cur) ?? null;
    }
    return path;
  }

  parallelSchedule(): string[][] {
    const order = this.topologicalSort();
    if (!order) return [];

    const levels = new Map<string, number>();
    for (const id of order) {
      const task = this.tasks.get(id)!;
      let maxDepLevel = -1;
      for (const dep of task.deps) {
        maxDepLevel = Math.max(maxDepLevel, levels.get(dep) ?? 0);
      }
      levels.set(id, maxDepLevel + 1);
    }

    const waves: string[][] = [];
    for (const [id, level] of levels) {
      while (waves.length <= level) waves.push([]);
      waves[level].push(id);
    }
    for (const wave of waves) wave.sort();
    return waves;
  }

  totalCost(): number {
    let total = 0;
    for (const task of this.tasks.values()) {
      total += task.cost;
    }
    return total;
  }

  taskCount(): number {
    return this.tasks.size;
  }

  dependents(id: string): string[] {
    const result: string[] = [];
    for (const [otherId, task] of this.tasks) {
      if (task.deps.includes(id)) result.push(otherId);
    }
    return result.sort();
  }

  transitiveDeps(id: string): Set<string> {
    const result = new Set<string>();
    const visit = (current: string) => {
      const task = this.tasks.get(current);
      if (!task) return;
      for (const dep of task.deps) {
        if (!result.has(dep)) {
          result.add(dep);
          visit(dep);
        }
      }
    };
    visit(id);
    return result;
  }

  reset(): void {
    for (const task of this.tasks.values()) {
      task.status = "pending";
    }
  }
}
