export class DeadlockDetector {
  private adj: Map<string, Set<string>> = new Map();

  addEdge(from: string, to: string): void {
    if (!this.adj.has(from)) this.adj.set(from, new Set());
    if (!this.adj.has(to)) this.adj.set(to, new Set());
    this.adj.get(from)!.add(to);
  }

  removeEdge(from: string, to: string): void {
    this.adj.get(from)?.delete(to);
  }

  hasDeadlock(): boolean {
    return this.findCycles().length > 0;
  }

  findCycles(): string[][] {
    const cycles: string[][] = [];
    const visited = new Set<string>();
    const onStack = new Set<string>();
    const path: string[] = [];

    const dfs = (node: string): void => {
      visited.add(node);
      onStack.add(node);
      path.push(node);

      const neighbors = this.adj.get(node) || new Set();
      for (const next of neighbors) {
        if (!visited.has(next)) {
          dfs(next);
        } else if (onStack.has(next)) {
          const cycleStart = path.indexOf(next);
          cycles.push(path.slice(cycleStart));
        }
      }

      path.pop();
      onStack.delete(node);
    };

    for (const node of this.adj.keys()) {
      if (!visited.has(node)) {
        dfs(node);
      }
    }

    return cycles;
  }

  nodes(): string[] {
    return [...this.adj.keys()];
  }

  edgeCount(): number {
    let count = 0;
    for (const neighbors of this.adj.values()) {
      count += neighbors.size;
    }
    return count;
  }

  clear(): void {
    this.adj.clear();
  }

  canAddWithoutDeadlock(from: string, to: string): boolean {
    this.addEdge(from, to);
    const deadlock = this.hasDeadlock();
    this.removeEdge(from, to);
    if (!this.adj.has(from) || this.adj.get(from)!.size === 0) {
      if (!([...this.adj.values()].some((s) => s.has(from)))) {
        this.adj.delete(from);
      }
    }
    return !deadlock;
  }
}
