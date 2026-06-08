export class Graph<T = string> {
  private adjacency = new Map<T, Set<T>>();

  addNode(node: T): this {
    if (!this.adjacency.has(node)) this.adjacency.set(node, new Set());
    return this;
  }

  addEdge(from: T, to: T): this {
    this.addNode(from);
    this.addNode(to);
    this.adjacency.get(from)!.add(to);
    return this;
  }

  removeEdge(from: T, to: T): this {
    this.adjacency.get(from)?.delete(to);
    return this;
  }

  removeNode(node: T): this {
    this.adjacency.delete(node);
    for (const neighbors of this.adjacency.values()) {
      neighbors.delete(node);
    }
    return this;
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

  get nodeCount(): number {
    return this.adjacency.size;
  }

  get edgeCount(): number {
    let count = 0;
    for (const neighbors of this.adjacency.values()) count += neighbors.size;
    return count;
  }

  nodes(): T[] {
    return [...this.adjacency.keys()];
  }

  dfs(start: T, visitor: (node: T) => void): void {
    const visited = new Set<T>();
    const stack: T[] = [start];
    while (stack.length > 0) {
      const node = stack.pop()!;
      if (visited.has(node)) continue;
      visited.add(node);
      visitor(node);
      const adj = this.adjacency.get(node);
      if (adj) {
        for (const neighbor of [...adj].reverse()) {
          if (!visited.has(neighbor)) stack.push(neighbor);
        }
      }
    }
  }

  bfs(start: T, visitor: (node: T) => void): void {
    const visited = new Set<T>();
    const queue: T[] = [start];
    visited.add(start);
    while (queue.length > 0) {
      const node = queue.shift()!;
      visitor(node);
      const adj = this.adjacency.get(node);
      if (adj) {
        for (const neighbor of adj) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
    }
  }

  shortestPath(start: T, end: T): T[] | null {
    if (!this.adjacency.has(start) || !this.adjacency.has(end)) return null;
    if (start === end) return [start];
    const visited = new Set<T>();
    const parent = new Map<T, T>();
    const queue: T[] = [start];
    visited.add(start);
    while (queue.length > 0) {
      const node = queue.shift()!;
      const adj = this.adjacency.get(node);
      if (!adj) continue;
      for (const neighbor of adj) {
        if (visited.has(neighbor)) continue;
        visited.add(neighbor);
        parent.set(neighbor, node);
        if (neighbor === end) {
          const path: T[] = [];
          let current: T | undefined = end;
          while (current !== undefined) {
            path.unshift(current);
            current = parent.get(current);
          }
          return path;
        }
        queue.push(neighbor);
      }
    }
    return null;
  }

  hasCycle(): boolean {
    const white = new Set<T>(this.adjacency.keys());
    const gray = new Set<T>();
    const dfs = (node: T): boolean => {
      white.delete(node);
      gray.add(node);
      const adj = this.adjacency.get(node);
      if (adj) {
        for (const neighbor of adj) {
          if (gray.has(neighbor)) return true;
          if (white.has(neighbor) && dfs(neighbor)) return true;
        }
      }
      gray.delete(node);
      return false;
    };
    for (const node of [...white]) {
      if (white.has(node) && dfs(node)) return true;
    }
    return false;
  }

  inDegree(node: T): number {
    let count = 0;
    for (const neighbors of this.adjacency.values()) {
      if (neighbors.has(node)) count++;
    }
    return count;
  }

  outDegree(node: T): number {
    return this.adjacency.get(node)?.size ?? 0;
  }

  transpose(): Graph<T> {
    const g = new Graph<T>();
    for (const node of this.adjacency.keys()) g.addNode(node);
    for (const [from, neighbors] of this.adjacency) {
      for (const to of neighbors) g.addEdge(to, from);
    }
    return g;
  }
}
