export interface DAGNode<T = unknown> {
  id: string;
  data: T;
  deps: string[];
}

export interface DAGResult<T = unknown> {
  id: string;
  data: T;
  result: unknown;
  duration: number;
  phase: number;
}

export function buildDAG<T>(nodes: DAGNode<T>[]): Map<string, DAGNode<T>> {
  const map = new Map<string, DAGNode<T>>();
  for (const node of nodes) {
    map.set(node.id, node);
  }
  for (const node of nodes) {
    for (const dep of node.deps) {
      if (!map.has(dep)) throw new Error(`Missing dependency: ${dep} (required by ${node.id})`);
    }
  }
  return map;
}

export function topologicalSort<T>(nodes: DAGNode<T>[]): string[][] {
  const graph = buildDAG(nodes);
  const inDegree = new Map<string, number>();

  for (const node of graph.values()) {
    if (!inDegree.has(node.id)) inDegree.set(node.id, 0);
    for (const dep of node.deps) {
      inDegree.set(node.id, (inDegree.get(node.id) ?? 0) + 1);
      if (!inDegree.has(dep)) inDegree.set(dep, 0);
    }
  }

  const phases: string[][] = [];
  const completed = new Set<string>();

  while (completed.size < graph.size) {
    const ready: string[] = [];
    for (const [id, deg] of inDegree) {
      if (!completed.has(id) && deg === 0) {
        ready.push(id);
      }
    }
    if (ready.length === 0) throw new Error("Cycle detected in DAG");
    phases.push(ready);
    for (const id of ready) {
      completed.add(id);
      for (const node of graph.values()) {
        if (node.deps.includes(id)) {
          inDegree.set(node.id, (inDegree.get(node.id) ?? 0) - 1);
        }
      }
    }
  }

  return phases;
}

export async function executeDAG<T>(
  nodes: DAGNode<T>[],
  executor: (node: DAGNode<T>, results: Map<string, unknown>) => Promise<unknown>,
): Promise<DAGResult<T>[]> {
  const phases = topologicalSort(nodes);
  const graph = buildDAG(nodes);
  const resultMap = new Map<string, unknown>();
  const results: DAGResult<T>[] = [];

  for (let pi = 0; pi < phases.length; pi++) {
    const phase = phases[pi];
    const phaseResults = await Promise.all(
      phase.map(async (id) => {
        const node = graph.get(id)!;
        const start = Date.now();
        const result = await executor(node, resultMap);
        return { id, data: node.data, result, duration: Date.now() - start, phase: pi };
      })
    );
    for (const r of phaseResults) {
      resultMap.set(r.id, r.result);
      results.push(r);
    }
  }

  return results;
}

export function findRoots<T>(nodes: DAGNode<T>[]): string[] {
  return nodes.filter((n) => n.deps.length === 0).map((n) => n.id);
}

export function findLeaves<T>(nodes: DAGNode<T>[]): string[] {
  const depOf = new Set<string>();
  for (const n of nodes) {
    for (const d of n.deps) depOf.add(d);
  }
  return nodes.filter((n) => !depOf.has(n.id)).map((n) => n.id);
}

export function criticalPath<T>(nodes: DAGNode<T>[]): string[] {
  const phases = topologicalSort(nodes);
  const dist = new Map<string, number>();
  const prev = new Map<string, string | null>();
  const graph = buildDAG(nodes);

  for (const node of graph.values()) {
    dist.set(node.id, 0);
    prev.set(node.id, null);
  }

  for (const phase of phases) {
    for (const id of phase) {
      const node = graph.get(id)!;
      for (const dep of node.deps) {
        const newDist = (dist.get(dep) ?? 0) + 1;
        if (newDist > (dist.get(id) ?? 0)) {
          dist.set(id, newDist);
          prev.set(id, dep);
        }
      }
    }
  }

  let maxId = "";
  let maxDist = -1;
  for (const [id, d] of dist) {
    if (d > maxDist) { maxDist = d; maxId = id; }
  }

  const path: string[] = [];
  let current: string | null = maxId;
  while (current !== null) {
    path.unshift(current);
    current = prev.get(current) ?? null;
  }
  return path;
}
