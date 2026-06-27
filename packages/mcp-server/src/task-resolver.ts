export interface Task {
  id: string;
  dependencies: string[];
  action?: () => unknown;
}

export interface ExecutionPlan {
  phases: string[][];
  order: string[];
}

export function resolve(tasks: Task[]): ExecutionPlan {
  const taskMap = new Map<string, Task>();
  for (const t of tasks) taskMap.set(t.id, t);

  const inDegree = new Map<string, number>();
  const dependents = new Map<string, string[]>();
  for (const t of tasks) {
    if (!inDegree.has(t.id)) inDegree.set(t.id, 0);
    for (const dep of t.dependencies) {
      if (!dependents.has(dep)) dependents.set(dep, []);
      dependents.get(dep)!.push(t.id);
      inDegree.set(t.id, (inDegree.get(t.id) ?? 0) + 1);
    }
  }

  const phases: string[][] = [];
  const order: string[] = [];
  let ready = [...inDegree.entries()].filter(([, d]) => d === 0).map(([id]) => id);
  const processed = new Set<string>();

  while (ready.length > 0) {
    ready.sort();
    phases.push([...ready]);
    const nextReady: string[] = [];
    for (const id of ready) {
      processed.add(id);
      order.push(id);
      for (const dep of dependents.get(id) ?? []) {
        const newDeg = (inDegree.get(dep) ?? 0) - 1;
        inDegree.set(dep, newDeg);
        if (newDeg === 0) nextReady.push(dep);
      }
    }
    ready = nextReady;
  }

  if (processed.size < tasks.length) {
    throw new Error("Circular dependency detected");
  }

  return { phases, order };
}

export function canRun(plan: ExecutionPlan, completed: Set<string>): string[] {
  for (const phase of plan.phases) {
    const pending = phase.filter((id) => !completed.has(id));
    if (pending.length > 0) return pending;
  }
  return [];
}

export function criticalPath(tasks: Task[]): string[] {
  const plan = resolve(tasks);
  const longest: string[] = [];
  for (const phase of plan.phases) {
    if (phase.length > 0) longest.push(phase[0]);
  }
  return longest;
}
