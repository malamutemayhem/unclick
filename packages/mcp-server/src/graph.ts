export class Graph<T = string> {
  private adjacency = new Map<T, Set<T>>();
  private directed: boolean;

  constructor(directed = false) { this.directed = directed; }

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
    for (const [, neighbors] of this.adjacency) {
      neighbors.delete(node);
    }
  }

  neighbors(node: T): T[] {
    return [...(this.adjacency.get(node) || [])];
  }

  hasNode(node: T): boolean { return this.adjacency.has(node); }
  hasEdge(from: T, to: T): boolean { return this.adjacency.get(from)?.has(to) ?? false; }

  get nodeCount(): number { return this.adjacency.size; }
  get nodes(): T[] { return [...this.adjacency.keys()]; }

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
    const stack: T[] = [start];

    while (stack.length > 0) {
      const node = stack.pop()!;
      if (visited.has(node)) continue;
      visited.add(node);
      result.push(node);
      for (const neighbor of this.neighbors(node)) {
        if (!visited.has(neighbor)) stack.push(neighbor);
      }
    }
    return result;
  }

  shortestPath(start: T, end: T): T[] | null {
    const visited = new Set<T>();
    const queue: T[][] = [[start]];
    visited.add(start);

    while (queue.length > 0) {
      const path = queue.shift()!;
      const node = path[path.length - 1];
      if (node === end) return path;
      for (const neighbor of this.neighbors(node)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }
    return null;
  }

  isConnected(): boolean {
    if (this.adjacency.size === 0) return true;
    const start = this.adjacency.keys().next().value!;
    return this.bfs(start).length === this.adjacency.size;
  }
}
