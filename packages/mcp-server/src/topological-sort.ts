export function topologicalSort<T>(
  nodes: T[],
  edges: [T, T][],
  key: (node: T) => string = String
): T[] {
  const inDegree = new Map<string, number>();
  const adj = new Map<string, string[]>();
  const keyToNode = new Map<string, T>();

  for (const node of nodes) {
    const k = key(node);
    keyToNode.set(k, node);
    inDegree.set(k, 0);
    adj.set(k, []);
  }

  for (const [from, to] of edges) {
    const fk = key(from);
    const tk = key(to);
    adj.get(fk)!.push(tk);
    inDegree.set(tk, (inDegree.get(tk) ?? 0) + 1);
  }

  const queue: string[] = [];
  for (const [k, deg] of inDegree) {
    if (deg === 0) queue.push(k);
  }

  const result: T[] = [];
  while (queue.length > 0) {
    const k = queue.shift()!;
    result.push(keyToNode.get(k)!);
    for (const neighbor of adj.get(k) ?? []) {
      const newDeg = inDegree.get(neighbor)! - 1;
      inDegree.set(neighbor, newDeg);
      if (newDeg === 0) queue.push(neighbor);
    }
  }

  if (result.length !== nodes.length) {
    throw new Error("Cycle detected");
  }

  return result;
}

export function hasCycle<T>(
  nodes: T[],
  edges: [T, T][],
  key: (node: T) => string = String
): boolean {
  try {
    topologicalSort(nodes, edges, key);
    return false;
  } catch {
    return true;
  }
}

export function layers<T>(
  nodes: T[],
  edges: [T, T][],
  key: (node: T) => string = String
): T[][] {
  const inDegree = new Map<string, number>();
  const adj = new Map<string, string[]>();
  const keyToNode = new Map<string, T>();

  for (const node of nodes) {
    const k = key(node);
    keyToNode.set(k, node);
    inDegree.set(k, 0);
    adj.set(k, []);
  }

  for (const [from, to] of edges) {
    adj.get(key(from))!.push(key(to));
    inDegree.set(key(to), (inDegree.get(key(to)) ?? 0) + 1);
  }

  let current: string[] = [];
  for (const [k, deg] of inDegree) {
    if (deg === 0) current.push(k);
  }

  const result: T[][] = [];
  let processed = 0;

  while (current.length > 0) {
    result.push(current.map((k) => keyToNode.get(k)!));
    processed += current.length;
    const next: string[] = [];
    for (const k of current) {
      for (const neighbor of adj.get(k) ?? []) {
        const newDeg = inDegree.get(neighbor)! - 1;
        inDegree.set(neighbor, newDeg);
        if (newDeg === 0) next.push(neighbor);
      }
    }
    current = next;
  }

  if (processed !== nodes.length) {
    throw new Error("Cycle detected");
  }

  return result;
}
