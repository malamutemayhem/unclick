export function topologicalSort<T>(edges: [T, T][]): T[] {
  const graph = new Map<T, Set<T>>();
  const inDegree = new Map<T, number>();

  for (const [from, to] of edges) {
    if (!graph.has(from)) graph.set(from, new Set());
    if (!graph.has(to)) graph.set(to, new Set());
    if (!inDegree.has(from)) inDegree.set(from, 0);
    if (!inDegree.has(to)) inDegree.set(to, 0);
    graph.get(from)!.add(to);
    inDegree.set(to, (inDegree.get(to) ?? 0) + 1);
  }

  const queue: T[] = [];
  for (const [node, degree] of inDegree) {
    if (degree === 0) queue.push(node);
  }

  const result: T[] = [];
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    for (const neighbor of graph.get(node) ?? []) {
      const newDegree = (inDegree.get(neighbor) ?? 0) - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) queue.push(neighbor);
    }
  }

  if (result.length !== graph.size) throw new Error("Cycle detected");
  return result;
}

export function hasCycle<T>(edges: [T, T][]): boolean {
  try {
    topologicalSort(edges);
    return false;
  } catch {
    return true;
  }
}

export function dependencyOrder<T>(deps: Map<T, T[]>): T[] {
  const edges: [T, T][] = [];
  for (const [node, dependencies] of deps) {
    if (dependencies.length === 0) {
      if (!deps.has(node)) continue;
      edges.push([node, node]);
    }
    for (const dep of dependencies) {
      edges.push([dep, node]);
    }
  }
  const nodesWithNoDeps = [...deps.keys()].filter((k: T) => (deps.get(k) ?? []).length === 0);
  if (edges.length === 0) return nodesWithNoDeps;
  const sorted = topologicalSort(edges.filter(([a, b]) => a !== b));
  for (const node of nodesWithNoDeps) {
    if (!sorted.includes(node)) sorted.unshift(node);
  }
  return sorted;
}
