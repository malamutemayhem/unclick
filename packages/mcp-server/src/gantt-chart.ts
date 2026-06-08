export interface GanttTask {
  id: string;
  name: string;
  start: number;
  duration: number;
  dependencies: string[];
  progress: number;
  assignee?: string;
}

export class GanttChart {
  private tasks: Map<string, GanttTask> = new Map();

  addTask(task: GanttTask): void {
    this.tasks.set(task.id, { ...task });
  }

  removeTask(id: string): boolean {
    return this.tasks.delete(id);
  }

  getTask(id: string): GanttTask | undefined {
    return this.tasks.get(id);
  }

  taskCount(): number {
    return this.tasks.size;
  }

  endTime(id: string): number {
    const task = this.tasks.get(id);
    if (!task) return 0;
    return task.start + task.duration;
  }

  projectStart(): number {
    let min = Infinity;
    for (const task of this.tasks.values()) {
      if (task.start < min) min = task.start;
    }
    return min === Infinity ? 0 : min;
  }

  projectEnd(): number {
    let max = 0;
    for (const task of this.tasks.values()) {
      const end = task.start + task.duration;
      if (end > max) max = end;
    }
    return max;
  }

  projectDuration(): number {
    return this.projectEnd() - this.projectStart();
  }

  overallProgress(): number {
    if (this.tasks.size === 0) return 0;
    let total = 0;
    let weighted = 0;
    for (const task of this.tasks.values()) {
      total += task.duration;
      weighted += task.duration * task.progress;
    }
    return total > 0 ? weighted / total : 0;
  }

  criticalPath(): string[] {
    const ends: Map<string, number> = new Map();

    const getEnd = (id: string): number => {
      if (ends.has(id)) return ends.get(id)!;
      const task = this.tasks.get(id);
      if (!task) return 0;
      let depEnd = task.start;
      for (const dep of task.dependencies) {
        depEnd = Math.max(depEnd, getEnd(dep));
      }
      const end = depEnd + task.duration;
      ends.set(id, end);
      return end;
    };

    for (const id of this.tasks.keys()) {
      getEnd(id);
    }

    let maxEnd = 0;
    let endTask = "";
    for (const [id, end] of ends) {
      if (end > maxEnd) {
        maxEnd = end;
        endTask = id;
      }
    }

    const path: string[] = [];
    const buildPath = (id: string) => {
      path.unshift(id);
      const task = this.tasks.get(id);
      if (!task || task.dependencies.length === 0) return;
      let longestDep = "";
      let longestEnd = -1;
      for (const dep of task.dependencies) {
        const depEnd = ends.get(dep) ?? 0;
        if (depEnd > longestEnd) {
          longestEnd = depEnd;
          longestDep = dep;
        }
      }
      if (longestDep) buildPath(longestDep);
    };

    if (endTask) buildPath(endTask);
    return path;
  }

  validate(): string[] {
    const errors: string[] = [];
    for (const [id, task] of this.tasks) {
      for (const dep of task.dependencies) {
        if (!this.tasks.has(dep)) {
          errors.push(`Task "${id}" depends on missing task "${dep}"`);
        }
      }
    }
    return errors;
  }

  tasksByAssignee(assignee: string): GanttTask[] {
    return Array.from(this.tasks.values()).filter((t) => t.assignee === assignee);
  }

  delayedTasks(currentTime: number): GanttTask[] {
    return Array.from(this.tasks.values()).filter((t) => {
      const expectedProgress = Math.min(1, (currentTime - t.start) / t.duration);
      return t.progress < expectedProgress && expectedProgress > 0;
    });
  }
}
