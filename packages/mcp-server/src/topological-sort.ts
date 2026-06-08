export function topologicalSort<T>(
  nodes: T[],
  edges: Array<[T, T]>,
): T[] {
  const graph = new Map<T, T[]>();
  const inDegree = new Map<T, number>();

  for (const node of nodes) {
    graph.set(node, []);
    inDegree.set(node, 0);
  }

  for (const [from, to] of edges) {
    graph.get(from)!.push(to);
    inDegree.set(to, (inDegree.get(to) ?? 0) + 1);
  }

  const queue: T[] = [];
  for (const [node, degree] of inDegree) {
    if (degree === 0) queue.push(node);
  }

  const result: T[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);
    for (const neighbor of graph.get(current) ?? []) {
      const newDegree = (inDegree.get(neighbor) ?? 1) - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) queue.push(neighbor);
    }
  }

  if (result.length !== nodes.length) {
    throw new Error("Cycle detected: topological sort is not possible");
  }

  return result;
}

export function hasCycle<T>(nodes: T[], edges: Array<[T, T]>): boolean {
  try {
    topologicalSort(nodes, edges);
    return false;
  } catch {
    return true;
  }
}

export function dependencyOrder<T>(
  items: Map<T, T[]>,
): T[] {
  const nodes = [...items.keys()];
  const edges: Array<[T, T]> = [];
  for (const [node, deps] of items) {
    for (const dep of deps) {
      edges.push([dep, node]);
    }
  }
  return topologicalSort(nodes, edges);
}
