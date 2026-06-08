export class Graph<T = string> {
  private adjacency = new Map<T, Set<T>>();
  private directed: boolean;

  constructor(directed = false) {
    this.directed = directed;
  }

  addNode(node: T): void {
    if (!this.adjacency.has(node)) this.adjacency.set(node, new Set());
  }

  addEdge(from: T, to: T): void {
    this.addNode(from);
    this.addNode(to);
    this.adjacency.get(from)!.add(to);
    if (!this.directed) this.adjacency.get(to)!.add(from);
  }

  removeEdge(from: T, to: T): void {
    this.adjacency.get(from)?.delete(to);
    if (!this.directed) this.adjacency.get(to)?.delete(from);
  }

  removeNode(node: T): void {
    this.adjacency.delete(node);
    for (const neighbors of this.adjacency.values()) {
      neighbors.delete(node);
    }
  }

  hasNode(node: T): boolean {
    return this.adjacency.has(node);
  }

  hasEdge(from: T, to: T): boolean {
    return this.adjacency.get(from)?.has(to) === true;
  }

  neighbors(node: T): T[] {
    return [...(this.adjacency.get(node) ?? [])];
  }

  nodes(): T[] {
    return [...this.adjacency.keys()];
  }

  get nodeCount(): number {
    return this.adjacency.size;
  }

  bfs(start: T): T[] {
    const visited = new Set<T>();
    const queue: T[] = [start];
    const result: T[] = [];
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
    const visit = (node: T): void => {
      if (visited.has(node)) return;
      visited.add(node);
      result.push(node);
      for (const neighbor of this.adjacency.get(node) ?? []) {
        visit(neighbor);
      }
    };
    visit(start);
    return result;
  }

  shortestPath(start: T, end: T): T[] | null {
    if (!this.hasNode(start) || !this.hasNode(end)) return null;
    const visited = new Set<T>();
    const queue: T[][] = [[start]];
    visited.add(start);
    while (queue.length > 0) {
      const path = queue.shift()!;
      const node = path[path.length - 1];
      if (node === end) return path;
      for (const neighbor of this.adjacency.get(node) ?? []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
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
    const white = new Set(this.adjacency.keys());
    const gray = new Set<T>();
    const visit = (node: T): boolean => {
      white.delete(node);
      gray.add(node);
      for (const neighbor of this.adjacency.get(node) ?? []) {
        if (gray.has(neighbor)) return true;
        if (white.has(neighbor) && visit(neighbor)) return true;
      }
      gray.delete(node);
      return false;
    };
    for (const node of [...white]) {
      if (white.has(node) && visit(node)) return true;
    }
    return false;
  }

  private hasCycleUndirected(): boolean {
    const visited = new Set<T>();
    const visit = (node: T, parent: T | null): boolean => {
      visited.add(node);
      for (const neighbor of this.adjacency.get(node) ?? []) {
        if (!visited.has(neighbor)) {
          if (visit(neighbor, node)) return true;
        } else if (neighbor !== parent) {
          return true;
        }
      }
      return false;
    };
    for (const node of this.adjacency.keys()) {
      if (!visited.has(node) && visit(node, null)) return true;
    }
    return false;
  }
}
