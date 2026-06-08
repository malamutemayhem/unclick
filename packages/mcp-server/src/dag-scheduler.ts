export interface Task<T = void> {
  id: string;
  deps: string[];
  run: () => Promise<T>;
}

export interface SchedulerResult<T = void> {
  results: Map<string, T>;
  order: string[];
}

export async function schedule<T = void>(
  tasks: Task<T>[],
  concurrency = Infinity
): Promise<SchedulerResult<T>> {
  const taskMap = new Map(tasks.map((t) => [t.id, t]));
  const inDegree = new Map<string, number>();
  const dependents = new Map<string, string[]>();
  const results = new Map<string, T>();
  const order: string[] = [];

  for (const task of tasks) {
    inDegree.set(task.id, task.deps.length);
    for (const dep of task.deps) {
      const list = dependents.get(dep) ?? [];
      list.push(task.id);
      dependents.set(dep, list);
    }
  }

  const ready: string[] = [];
  for (const [id, deg] of inDegree) {
    if (deg === 0) ready.push(id);
  }

  let running = 0;
  const waiters: Array<() => void> = [];

  function onComplete(id: string, result: T): void {
    results.set(id, result);
    order.push(id);
    running--;

    for (const dep of dependents.get(id) ?? []) {
      const newDeg = inDegree.get(dep)! - 1;
      inDegree.set(dep, newDeg);
      if (newDeg === 0) ready.push(dep);
    }

    const waiter = waiters.shift();
    if (waiter) waiter();
  }

  function waitForSlot(): Promise<void> {
    if (running < concurrency) return Promise.resolve();
    return new Promise<void>((resolve) => waiters.push(resolve));
  }

  while (ready.length > 0 || running > 0) {
    while (ready.length > 0 && running < concurrency) {
      const id = ready.shift()!;
      running++;
      const task = taskMap.get(id)!;
      task.run().then((result) => onComplete(id, result));
    }
    if (running > 0) {
      await waitForSlot();
    }
  }

  if (order.length !== tasks.length) {
    throw new Error("Cycle detected or missing dependency");
  }

  return { results, order };
}
