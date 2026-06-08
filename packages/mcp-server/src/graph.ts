export class Graph<T = string> {
  private adjacency = new Map<T, Set<T>>();
  private directed: boolean;

  constructor(directed = false) {
    this.directed = directed;
  }

  addNode(node: T): void {
    if (!this.adjacency.has(node)) {
      this.adjacency.set(node, new Set());
    }
  }

  addEdge(from: T, to: T): void {
    this.addNode(from);
    this.addNode(to);
    this.adjacency.get(from)!.add(to);
    if (!this.directed) {
      this.adjacency.get(to)!.add(from);
    }
  }

  hasNode(node: T): boolean {
    return this.adjacency.has(node);
  }

  hasEdge(from: T, to: T): boolean {
    return this.adjacency.get(from)?.has(to) ?? false;
  }

  neighbors(node: T): T[] {
    return [...(this.adjacency.get(node) ?? [])];
  }

  get nodes(): T[] {
    return [...this.adjacency.keys()];
  }

  get nodeCount(): number {
    return this.adjacency.size;
  }

  bfs(start: T): T[] {
    const visited = new Set<T>();
    const result: T[] = [];
    const queue: T[] = [start];
    visited.add(start);
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node);
      for (const neighbor of this.adjacency.get(node) ?? []) {
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
    const stack: T[] = [start];
    while (stack.length > 0) {
      const node = stack.pop()!;
      if (visited.has(node)) continue;
      visited.add(node);
      result.push(node);
      const neighbors = [...(this.adjacency.get(node) ?? [])];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i])) {
          stack.push(neighbors[i]);
        }
      }
    }
    return result;
  }

  shortestPath(from: T, to: T): T[] | null {
    if (!this.adjacency.has(from) || !this.adjacency.has(to)) return null;
    const visited = new Set<T>();
    const parent = new Map<T, T>();
    const queue: T[] = [from];
    visited.add(from);
    while (queue.length > 0) {
      const node = queue.shift()!;
      if (node === to) {
        const path: T[] = [];
        let current: T | undefined = to;
        while (current !== undefined) {
          path.unshift(current);
          current = parent.get(current);
        }
        return path;
      }
      for (const neighbor of this.adjacency.get(node) ?? []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          parent.set(neighbor, node);
          queue.push(neighbor);
        }
      }
    }
    return null;
  }

  hasCycle(): boolean {
    if (this.directed) return this.hasCycleDirected();
    return this.hasCycleUndirected();
  }

  private hasCycleDirected(): boolean {
    const white = new Set<T>(this.adjacency.keys());
    const gray = new Set<T>();
    for (const node of this.adjacency.keys()) {
      if (white.has(node) && this.dfsDetectCycle(node, white, gray)) return true;
    }
    return false;
  }

  private dfsDetectCycle(node: T, white: Set<T>, gray: Set<T>): boolean {
    white.delete(node);
    gray.add(node);
    for (const neighbor of this.adjacency.get(node) ?? []) {
      if (gray.has(neighbor)) return true;
      if (white.has(neighbor) && this.dfsDetectCycle(neighbor, white, gray)) return true;
    }
    gray.delete(node);
    return false;
  }

  private hasCycleUndirected(): boolean {
    const visited = new Set<T>();
    for (const node of this.adjacency.keys()) {
      if (!visited.has(node)) {
        if (this.dfsCycleUndirected(node, null, visited)) return true;
      }
    }
    return false;
  }

  private dfsCycleUndirected(node: T, parent: T | null, visited: Set<T>): boolean {
    visited.add(node);
    for (const neighbor of this.adjacency.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        if (this.dfsCycleUndirected(neighbor, node, visited)) return true;
      } else if (neighbor !== parent) {
        return true;
      }
    }
    return false;
  }
}
