export function topologicalSort(nodes: string[], edges: [string, string][]): string[] {
  const inDegree = new Map<string, number>();
  const adj = new Map<string, string[]>();
  for (const node of nodes) {
    inDegree.set(node, 0);
    adj.set(node, []);
  }
  for (const [from, to] of edges) {
    adj.get(from)!.push(to);
    inDegree.set(to, (inDegree.get(to) ?? 0) + 1);
  }
  const queue: string[] = [];
  for (const [node, deg] of inDegree) {
    if (deg === 0) queue.push(node);
  }
  const result: string[] = [];
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    for (const neighbor of adj.get(node) ?? []) {
      const deg = inDegree.get(neighbor)! - 1;
      inDegree.set(neighbor, deg);
      if (deg === 0) queue.push(neighbor);
    }
  }
  if (result.length !== nodes.length) throw new Error("Cycle detected");
  return result;
}

export function hasCycle(nodes: string[], edges: [string, string][]): boolean {
  try {
    topologicalSort(nodes, edges);
    return false;
  } catch {
    return true;
  }
}

export function layers(nodes: string[], edges: [string, string][]): string[][] {
  const inDegree = new Map<string, number>();
  const adj = new Map<string, string[]>();
  for (const node of nodes) {
    inDegree.set(node, 0);
    adj.set(node, []);
  }
  for (const [from, to] of edges) {
    adj.get(from)!.push(to);
    inDegree.set(to, (inDegree.get(to) ?? 0) + 1);
  }
  let current: string[] = [];
  for (const [node, deg] of inDegree) {
    if (deg === 0) current.push(node);
  }
  const result: string[][] = [];
  let processed = 0;
  while (current.length > 0) {
    result.push([...current]);
    processed += current.length;
    const next: string[] = [];
    for (const node of current) {
      for (const neighbor of adj.get(node) ?? []) {
        const deg = inDegree.get(neighbor)! - 1;
        inDegree.set(neighbor, deg);
        if (deg === 0) next.push(neighbor);
      }
    }
    current = next;
  }
  if (processed !== nodes.length) throw new Error("Cycle detected");
  return result;
}
