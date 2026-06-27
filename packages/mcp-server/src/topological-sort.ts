export function topologicalSort<T extends string | number>(
  nodes: T[],
  edges: [T, T][],
): T[] {
  const graph = new Map<T, Set<T>>();
  const inDegree = new Map<T, number>();

  for (const node of nodes) {
    graph.set(node, new Set());
    inDegree.set(node, 0);
  }

  for (const [from, to] of edges) {
    graph.get(from)?.add(to);
    inDegree.set(to, (inDegree.get(to) || 0) + 1);
  }

  const queue: T[] = [];
  for (const [node, degree] of inDegree) {
    if (degree === 0) queue.push(node);
  }

  const result: T[] = [];
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    for (const neighbor of graph.get(node) || []) {
      const newDegree = (inDegree.get(neighbor) || 0) - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) queue.push(neighbor);
    }
  }

  if (result.length !== nodes.length) {
    throw new Error("Cycle detected - topological sort not possible");
  }

  return result;
}

export function parallelLevels<T extends string | number>(
  nodes: T[],
  edges: [T, T][],
): T[][] {
  const graph = new Map<T, Set<T>>();
  const inDegree = new Map<T, number>();

  for (const node of nodes) {
    graph.set(node, new Set());
    inDegree.set(node, 0);
  }

  for (const [from, to] of edges) {
    graph.get(from)?.add(to);
    inDegree.set(to, (inDegree.get(to) || 0) + 1);
  }

  let current: T[] = [];
  for (const [node, degree] of inDegree) {
    if (degree === 0) current.push(node);
  }

  const levels: T[][] = [];
  let processed = 0;

  while (current.length > 0) {
    levels.push(current);
    processed += current.length;
    const next: T[] = [];
    for (const node of current) {
      for (const neighbor of graph.get(node) || []) {
        const newDegree = (inDegree.get(neighbor) || 0) - 1;
        inDegree.set(neighbor, newDegree);
        if (newDegree === 0) next.push(neighbor);
      }
    }
    current = next;
  }

  if (processed !== nodes.length) {
    throw new Error("Cycle detected");
  }

  return levels;
}

export function hasCycle<T extends string | number>(
  nodes: T[],
  edges: [T, T][],
): boolean {
  try {
    topologicalSort(nodes, edges);
    return false;
  } catch {
    return true;
  }
}
