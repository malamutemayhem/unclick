interface Task<T> {
  id: string;
  deps: string[];
  fn: () => T | Promise<T>;
}

interface TaskResult<T> {
  id: string;
  result?: T;
  error?: unknown;
}

export class TaskDAG<T = unknown> {
  private tasks = new Map<string, Task<T>>();

  add(id: string, fn: () => T | Promise<T>, deps: string[] = []): this {
    if (this.tasks.has(id)) throw new Error(`Task "${id}" already exists`);
    this.tasks.set(id, { id, deps, fn });
    return this;
  }

  async run(): Promise<Map<string, TaskResult<T>>> {
    this.validateDeps();
    this.checkCycles();

    const results = new Map<string, TaskResult<T>>();
    const pending = new Map<string, Promise<void>>();

    const runTask = async (id: string): Promise<void> => {
      if (results.has(id)) return;
      if (pending.has(id)) return pending.get(id)!;

      const task = this.tasks.get(id)!;
      const promise = (async () => {
        await Promise.all(task.deps.map((dep) => runTask(dep)));

        const depFailed = task.deps.some((dep) => results.get(dep)?.error);
        if (depFailed) {
          results.set(id, { id, error: new Error("Dependency failed") });
          return;
        }

        try {
          const result = await task.fn();
          results.set(id, { id, result });
        } catch (error) {
          results.set(id, { id, error });
        }
      })();

      pending.set(id, promise);
      await promise;
    };

    await Promise.all([...this.tasks.keys()].map(runTask));
    return results;
  }

  get size(): number {
    return this.tasks.size;
  }

  private validateDeps(): void {
    for (const [id, task] of this.tasks) {
      for (const dep of task.deps) {
        if (!this.tasks.has(dep)) {
          throw new Error(`Task "${id}" depends on unknown task "${dep}"`);
        }
      }
    }
  }

  private checkCycles(): void {
    const visited = new Set<string>();
    const stack = new Set<string>();

    const visit = (id: string): void => {
      if (stack.has(id)) throw new Error(`Cycle detected involving "${id}"`);
      if (visited.has(id)) return;
      stack.add(id);
      for (const dep of this.tasks.get(id)!.deps) {
        visit(dep);
      }
      stack.delete(id);
      visited.add(id);
    };

    for (const id of this.tasks.keys()) visit(id);
  }
}
