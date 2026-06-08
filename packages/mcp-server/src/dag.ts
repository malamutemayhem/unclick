export class DAG<T> {
  private nodes = new Map<string, T>();
  private edges = new Map<string, Set<string>>();
  private reverseEdges = new Map<string, Set<string>>();

  addNode(id: string, data: T): this {
    this.nodes.set(id, data);
    if (!this.edges.has(id)) this.edges.set(id, new Set());
    if (!this.reverseEdges.has(id)) this.reverseEdges.set(id, new Set());
    return this;
  }

  addEdge(from: string, to: string): this {
    if (!this.edges.has(from)) this.edges.set(from, new Set());
    if (!this.reverseEdges.has(to)) this.reverseEdges.set(to, new Set());
    this.edges.get(from)!.add(to);
    this.reverseEdges.get(to)!.add(from);
    return this;
  }

  getNode(id: string): T | undefined {
    return this.nodes.get(id);
  }

  getDependencies(id: string): string[] {
    return [...(this.edges.get(id) ?? [])];
  }

  getDependents(id: string): string[] {
    return [...(this.reverseEdges.get(id) ?? [])];
  }

  topologicalSort(): string[] {
    const inDegree = new Map<string, number>();
    for (const id of this.nodes.keys()) inDegree.set(id, 0);
    for (const deps of this.edges.values()) {
      for (const dep of deps) {
        inDegree.set(dep, (inDegree.get(dep) ?? 0) + 1);
      }
    }
    const queue: string[] = [];
    for (const [id, deg] of inDegree) {
      if (deg === 0) queue.push(id);
    }
    const result: string[] = [];
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node);
      for (const dep of this.edges.get(node) ?? []) {
        const newDeg = (inDegree.get(dep) ?? 1) - 1;
        inDegree.set(dep, newDeg);
        if (newDeg === 0) queue.push(dep);
      }
    }
    if (result.length !== this.nodes.size) throw new Error("Cycle detected");
    return result;
  }

  hasCycle(): boolean {
    try { this.topologicalSort(); return false; } catch { return true; }
  }

  roots(): string[] {
    return [...this.nodes.keys()].filter((id) => {
      const deps = this.reverseEdges.get(id);
      return !deps || deps.size === 0;
    });
  }

  leaves(): string[] {
    return [...this.nodes.keys()].filter((id) => {
      const deps = this.edges.get(id);
      return !deps || deps.size === 0;
    });
  }

  get size(): number {
    return this.nodes.size;
  }

  nodeIds(): string[] {
    return [...this.nodes.keys()];
  }
}
