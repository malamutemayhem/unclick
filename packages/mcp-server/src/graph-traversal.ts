export interface Graph {
  adjacency: Map<string, string[]>;
}

export function createGraph(): Graph {
  return { adjacency: new Map() };
}

export function addEdge(g: Graph, from: string, to: string): void {
  if (!g.adjacency.has(from)) g.adjacency.set(from, []);
  g.adjacency.get(from)!.push(to);
}

export function addUndirectedEdge(g: Graph, a: string, b: string): void {
  addEdge(g, a, b);
  addEdge(g, b, a);
}

export function neighbors(g: Graph, node: string): string[] {
  return g.adjacency.get(node) ?? [];
}

export function bfs(g: Graph, start: string): string[] {
  const visited = new Set<string>();
  const queue: string[] = [start];
  const order: string[] = [];
  visited.add(start);
  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);
    for (const neighbor of neighbors(g, node)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}

export function dfs(g: Graph, start: string): string[] {
  const visited = new Set<string>();
  const order: string[] = [];
  function visit(node: string): void {
    if (visited.has(node)) return;
    visited.add(node);
    order.push(node);
    for (const neighbor of neighbors(g, node)) {
      visit(neighbor);
    }
  }
  visit(start);
  return order;
}

export function shortestPath(g: Graph, start: string, end: string): string[] | null {
  if (start === end) return [start];
  const visited = new Set<string>();
  const parent = new Map<string, string>();
  const queue: string[] = [start];
  visited.add(start);
  while (queue.length > 0) {
    const node = queue.shift()!;
    for (const neighbor of neighbors(g, node)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, node);
        if (neighbor === end) {
          const path: string[] = [];
          let cur: string | undefined = end;
          while (cur !== undefined) {
            path.unshift(cur);
            cur = parent.get(cur);
          }
          return path;
        }
        queue.push(neighbor);
      }
    }
  }
  return null;
}

export function connectedComponents(g: Graph): string[][] {
  const visited = new Set<string>();
  const components: string[][] = [];
  for (const node of g.adjacency.keys()) {
    if (!visited.has(node)) {
      const component = bfs(g, node);
      for (const n of component) visited.add(n);
      components.push(component);
    }
  }
  return components;
}

export function hasCycleDFS(g: Graph): boolean {
  const white = new Set<string>(g.adjacency.keys());
  const gray = new Set<string>();
  function visit(node: string): boolean {
    white.delete(node);
    gray.add(node);
    for (const neighbor of neighbors(g, node)) {
      if (gray.has(neighbor)) return true;
      if (white.has(neighbor) && visit(neighbor)) return true;
    }
    gray.delete(node);
    return false;
  }
  for (const node of [...white]) {
    if (white.has(node) && visit(node)) return true;
  }
  return false;
}
