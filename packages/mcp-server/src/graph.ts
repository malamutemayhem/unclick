export class Graph<T extends string | number = string> {
  private adjacency = new Map<T, Set<T>>();
  private weights = new Map<string, number>();
  private directed: boolean;

  constructor(directed = false) {
    this.directed = directed;
  }

  addNode(node: T): void {
    if (!this.adjacency.has(node)) {
      this.adjacency.set(node, new Set());
    }
  }

  addEdge(from: T, to: T, weight = 1): void {
    this.addNode(from);
    this.addNode(to);
    this.adjacency.get(from)!.add(to);
    this.weights.set(`${String(from)}->${String(to)}`, weight);
    if (!this.directed) {
      this.adjacency.get(to)!.add(from);
      this.weights.set(`${String(to)}->${String(from)}`, weight);
    }
  }

  neighbors(node: T): T[] {
    return [...(this.adjacency.get(node) || [])];
  }

  hasNode(node: T): boolean {
    return this.adjacency.has(node);
  }

  hasEdge(from: T, to: T): boolean {
    return this.adjacency.get(from)?.has(to) || false;
  }

  getWeight(from: T, to: T): number | undefined {
    return this.weights.get(`${String(from)}->${String(to)}`);
  }

  get nodeCount(): number {
    return this.adjacency.size;
  }

  get edgeCount(): number {
    let count = 0;
    for (const edges of this.adjacency.values()) count += edges.size;
    return this.directed ? count : count / 2;
  }

  nodes(): T[] {
    return [...this.adjacency.keys()];
  }

  bfs(start: T): T[] {
    const visited = new Set<T>();
    const queue: T[] = [start];
    const result: T[] = [];
    visited.add(start);

    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node);
      for (const neighbor of this.neighbors(node)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }

  dfs(start: T): T[] {
    const visited = new Set<T>();
    const result: T[] = [];

    const visit = (node: T) => {
      visited.add(node);
      result.push(node);
      for (const neighbor of this.neighbors(node)) {
        if (!visited.has(neighbor)) visit(neighbor);
      }
    };

    visit(start);
    return result;
  }

  shortestPath(start: T, end: T): { path: T[]; distance: number } | null {
    const dist = new Map<T, number>();
    const prev = new Map<T, T>();
    const unvisited = new Set<T>(this.adjacency.keys());

    for (const node of this.adjacency.keys()) {
      dist.set(node, Infinity);
    }
    dist.set(start, 0);

    while (unvisited.size > 0) {
      let current: T | null = null;
      let minDist = Infinity;
      for (const node of unvisited) {
        const d = dist.get(node)!;
        if (d < minDist) {
          minDist = d;
          current = node;
        }
      }
      if (current === null || minDist === Infinity) break;
      if (current === end) break;

      unvisited.delete(current);
      for (const neighbor of this.neighbors(current)) {
        if (!unvisited.has(neighbor)) continue;
        const w = this.getWeight(current, neighbor) || 1;
        const alt = dist.get(current)! + w;
        if (alt < dist.get(neighbor)!) {
          dist.set(neighbor, alt);
          prev.set(neighbor, current);
        }
      }
    }

    if (!dist.has(end) || dist.get(end) === Infinity) return null;

    const path: T[] = [];
    let cur: T | undefined = end;
    while (cur !== undefined) {
      path.unshift(cur);
      cur = prev.get(cur);
    }
    return { path, distance: dist.get(end)! };
  }

  hasCycle(): boolean {
    const visited = new Set<T>();
    const stack = new Set<T>();

    const dfs = (node: T): boolean => {
      visited.add(node);
      stack.add(node);
      for (const neighbor of this.neighbors(node)) {
        if (!visited.has(neighbor)) {
          if (dfs(neighbor)) return true;
        } else if (stack.has(neighbor)) {
          return true;
        }
      }
      stack.delete(node);
      return false;
    };

    for (const node of this.adjacency.keys()) {
      if (!visited.has(node) && dfs(node)) return true;
    }
    return false;
  }
}
