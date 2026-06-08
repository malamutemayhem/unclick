export class DependencyGraph {
  private deps = new Map<string, Set<string>>();

  addNode(name: string): void {
    if (!this.deps.has(name)) this.deps.set(name, new Set());
  }

  addDependency(from: string, to: string): void {
    this.addNode(from);
    this.addNode(to);
    this.deps.get(from)!.add(to);
  }

  directDeps(name: string): string[] {
    return [...(this.deps.get(name) ?? [])];
  }

  allDeps(name: string): string[] {
    const visited = new Set<string>();
    const stack = [...(this.deps.get(name) ?? [])];
    while (stack.length > 0) {
      const node = stack.pop()!;
      if (visited.has(node)) continue;
      visited.add(node);
      for (const dep of this.deps.get(node) ?? []) {
        stack.push(dep);
      }
    }
    return [...visited];
  }

  dependents(name: string): string[] {
    const result: string[] = [];
    for (const [node, deps] of this.deps) {
      if (deps.has(name)) result.push(node);
    }
    return result;
  }

  hasCycle(): boolean {
    const visited = new Set<string>();
    const inStack = new Set<string>();
    const dfs = (node: string): boolean => {
      if (inStack.has(node)) return true;
      if (visited.has(node)) return false;
      visited.add(node);
      inStack.add(node);
      for (const dep of this.deps.get(node) ?? []) {
        if (dfs(dep)) return true;
      }
      inStack.delete(node);
      return false;
    };
    for (const node of this.deps.keys()) {
      if (dfs(node)) return true;
    }
    return false;
  }

  get nodes(): string[] {
    return [...this.deps.keys()];
  }

  removeNode(name: string): boolean {
    if (!this.deps.has(name)) return false;
    this.deps.delete(name);
    for (const deps of this.deps.values()) deps.delete(name);
    return true;
  }
}
