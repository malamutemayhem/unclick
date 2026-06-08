export class DependencyGraph<T extends string = string> {
  private nodes = new Set<T>();
  private edges = new Map<T, Set<T>>();

  addNode(node: T): void {
    this.nodes.add(node);
    if (!this.edges.has(node)) this.edges.set(node, new Set());
  }

  addDependency(node: T, dependsOn: T): void {
    this.addNode(node);
    this.addNode(dependsOn);
    this.edges.get(node)!.add(dependsOn);
  }

  dependenciesOf(node: T): T[] {
    return [...(this.edges.get(node) ?? [])];
  }

  dependentsOf(node: T): T[] {
    const result: T[] = [];
    for (const [n, deps] of this.edges) {
      if (deps.has(node)) result.push(n);
    }
    return result;
  }

  topologicalSort(): T[] {
    const visited = new Set<T>();
    const temp = new Set<T>();
    const order: T[] = [];

    const visit = (node: T): void => {
      if (visited.has(node)) return;
      if (temp.has(node)) throw new CyclicDependencyError(node);
      temp.add(node);
      for (const dep of this.edges.get(node) ?? []) {
        visit(dep);
      }
      temp.delete(node);
      visited.add(node);
      order.push(node);
    };

    for (const node of this.nodes) {
      visit(node);
    }
    return order;
  }

  hasCycle(): boolean {
    try {
      this.topologicalSort();
      return false;
    } catch {
      return true;
    }
  }

  get size(): number {
    return this.nodes.size;
  }
}

export class CyclicDependencyError extends Error {
  readonly node: string;
  constructor(node: string) {
    super(`Cyclic dependency detected at node: ${node}`);
    this.name = "CyclicDependencyError";
    this.node = node;
  }
}
