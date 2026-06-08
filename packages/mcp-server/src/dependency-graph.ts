export class DependencyGraph {
  private edges = new Map<string, Set<string>>();
  private reverseEdges = new Map<string, Set<string>>();

  addNode(id: string): void {
    if (!this.edges.has(id)) this.edges.set(id, new Set());
    if (!this.reverseEdges.has(id)) this.reverseEdges.set(id, new Set());
  }

  addDependency(from: string, to: string): void {
    this.addNode(from);
    this.addNode(to);
    this.edges.get(from)!.add(to);
    this.reverseEdges.get(to)!.add(from);
  }

  dependenciesOf(id: string): string[] {
    return [...(this.edges.get(id) ?? [])];
  }

  dependantsOf(id: string): string[] {
    return [...(this.reverseEdges.get(id) ?? [])];
  }

  nodes(): string[] {
    return [...this.edges.keys()];
  }

  hasCycle(): boolean {
    const visited = new Set<string>();
    const stack = new Set<string>();
    const dfs = (node: string): boolean => {
      if (stack.has(node)) return true;
      if (visited.has(node)) return false;
      visited.add(node);
      stack.add(node);
      for (const dep of this.edges.get(node) ?? []) {
        if (dfs(dep)) return true;
      }
      stack.delete(node);
      return false;
    };
    for (const node of this.edges.keys()) {
      if (dfs(node)) return true;
    }
    return false;
  }

  topologicalOrder(): string[] {
    const inDegree = new Map<string, number>();
    for (const node of this.edges.keys()) inDegree.set(node, 0);
    for (const deps of this.edges.values()) {
      for (const dep of deps) {
        inDegree.set(dep, (inDegree.get(dep) ?? 0) + 1);
      }
    }
    const queue: string[] = [];
    for (const [node, deg] of inDegree) {
      if (deg === 0) queue.push(node);
    }
    const result: string[] = [];
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node);
      for (const dep of this.edges.get(node) ?? []) {
        const newDeg = inDegree.get(dep)! - 1;
        inDegree.set(dep, newDeg);
        if (newDeg === 0) queue.push(dep);
      }
    }
    if (result.length !== this.edges.size) throw new Error("Cycle detected");
    return result;
  }

  transitiveDependencies(id: string): string[] {
    const result = new Set<string>();
    const visit = (node: string) => {
      for (const dep of this.edges.get(node) ?? []) {
        if (!result.has(dep)) {
          result.add(dep);
          visit(dep);
        }
      }
    };
    visit(id);
    return [...result];
  }
}
