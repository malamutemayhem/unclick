export class Graph<T> {
  private adjacency = new Map<string, Set<string>>();
  private nodes = new Map<string, T>();
  private directed: boolean;

  constructor(directed: boolean = false) {
    this.directed = directed;
  }

  addNode(id: string, data: T): this {
    this.nodes.set(id, data);
    if (!this.adjacency.has(id)) this.adjacency.set(id, new Set());
    return this;
  }

  addEdge(from: string, to: string): this {
    if (!this.adjacency.has(from)) this.adjacency.set(from, new Set());
    if (!this.adjacency.has(to)) this.adjacency.set(to, new Set());
    this.adjacency.get(from)!.add(to);
    if (!this.directed) this.adjacency.get(to)!.add(from);
    return this;
  }

  hasNode(id: string): boolean {
    return this.nodes.has(id);
  }

  hasEdge(from: string, to: string): boolean {
    return this.adjacency.get(from)?.has(to) ?? false;
  }

  neighbors(id: string): string[] {
    return [...(this.adjacency.get(id) ?? [])];
  }

  getNode(id: string): T | undefined {
    return this.nodes.get(id);
  }

  bfs(start: string): string[] {
    const visited = new Set<string>();
    const queue = [start];
    const result: string[] = [];
    while (queue.length > 0) {
      const node = queue.shift()!;
      if (visited.has(node)) continue;
      visited.add(node);
      result.push(node);
      for (const neighbor of this.adjacency.get(node) ?? []) {
        if (!visited.has(neighbor)) queue.push(neighbor);
      }
    }
    return result;
  }

  dfs(start: string): string[] {
    const visited = new Set<string>();
    const result: string[] = [];
    const visit = (node: string) => {
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

  shortestPath(from: string, to: string): string[] | null {
    const visited = new Set<string>();
    const queue: string[][] = [[from]];
    while (queue.length > 0) {
      const path = queue.shift()!;
      const node = path[path.length - 1];
      if (node === to) return path;
      if (visited.has(node)) continue;
      visited.add(node);
      for (const neighbor of this.adjacency.get(node) ?? []) {
        if (!visited.has(neighbor)) queue.push([...path, neighbor]);
      }
    }
    return null;
  }

  get size(): number {
    return this.nodes.size;
  }

  nodeIds(): string[] {
    return [...this.nodes.keys()];
  }

  removeNode(id: string): boolean {
    if (!this.nodes.has(id)) return false;
    this.nodes.delete(id);
    this.adjacency.delete(id);
    for (const neighbors of this.adjacency.values()) {
      neighbors.delete(id);
    }
    return true;
  }
}
