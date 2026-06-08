export class DAG<T = string> {
  private nodes = new Map<T, Set<T>>();

  addNode(node: T): this {
    if (!this.nodes.has(node)) this.nodes.set(node, new Set());
    return this;
  }

  addEdge(from: T, to: T): this {
    this.addNode(from);
    this.addNode(to);
    if (this.wouldCycle(from, to)) {
      throw new Error("Adding edge would create a cycle");
    }
    this.nodes.get(from)!.add(to);
    return this;
  }

  removeNode(node: T): boolean {
    if (!this.nodes.has(node)) return false;
    this.nodes.delete(node);
    for (const edges of this.nodes.values()) edges.delete(node);
    return true;
  }

  removeEdge(from: T, to: T): boolean {
    return this.nodes.get(from)?.delete(to) || false;
  }

  hasNode(node: T): boolean { return this.nodes.has(node); }
  hasEdge(from: T, to: T): boolean { return this.nodes.get(from)?.has(to) || false; }
  get nodeCount(): number { return this.nodes.size; }

  get edgeCount(): number {
    let count = 0;
    for (const edges of this.nodes.values()) count += edges.size;
    return count;
  }

  dependenciesOf(node: T): T[] {
    const edges = this.nodes.get(node);
    return edges ? [...edges] : [];
  }

  dependantsOf(node: T): T[] {
    const result: T[] = [];
    for (const [n, edges] of this.nodes) {
      if (edges.has(node)) result.push(n);
    }
    return result;
  }

  topologicalSort(): T[] {
    const visited = new Set<T>();
    const result: T[] = [];

    const visit = (node: T): void => {
      if (visited.has(node)) return;
      visited.add(node);
      const edges = this.nodes.get(node);
      if (edges) for (const dep of edges) visit(dep);
      result.push(node);
    };

    for (const node of this.nodes.keys()) visit(node);
    return result;
  }

  roots(): T[] {
    const hasIncoming = new Set<T>();
    for (const edges of this.nodes.values()) {
      for (const target of edges) hasIncoming.add(target);
    }
    return [...this.nodes.keys()].filter((n) => !hasIncoming.has(n));
  }

  leaves(): T[] {
    return [...this.nodes.entries()]
      .filter(([_, edges]) => edges.size === 0)
      .map(([node]) => node);
  }

  private wouldCycle(from: T, to: T): boolean {
    if (from === to) return true;
    const visited = new Set<T>();
    const stack = [to];
    while (stack.length > 0) {
      const current = stack.pop()!;
      if (current === from) return true;
      if (visited.has(current)) continue;
      visited.add(current);
      const edges = this.nodes.get(current);
      if (edges) for (const dep of edges) stack.push(dep);
    }
    return false;
  }
}
