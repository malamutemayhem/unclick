export interface DagNode<T = unknown> {
  id: string;
  data: T;
  dependencies: string[];
}

export interface DagExecutionResult<T = unknown> {
  nodeId: string;
  result: T;
  durationMs: number;
  error?: string;
}

export class WorkflowDag<T = unknown> {
  private nodes = new Map<string, DagNode<T>>();

  addNode(id: string, data: T, dependencies: string[] = []): this {
    this.nodes.set(id, { id, data, dependencies });
    return this;
  }

  removeNode(id: string): boolean {
    if (!this.nodes.has(id)) return false;
    this.nodes.delete(id);
    for (const node of this.nodes.values()) {
      node.dependencies = node.dependencies.filter((d) => d !== id);
    }
    return true;
  }

  getNode(id: string): DagNode<T> | undefined {
    return this.nodes.get(id);
  }

  getRoots(): DagNode<T>[] {
    return [...this.nodes.values()].filter((n) => n.dependencies.length === 0);
  }

  getLeaves(): DagNode<T>[] {
    const hasChildren = new Set<string>();
    for (const node of this.nodes.values()) {
      for (const dep of node.dependencies) hasChildren.add(dep);
    }
    return [...this.nodes.values()].filter((n) => !hasChildren.has(n.id));
  }

  getDependents(id: string): DagNode<T>[] {
    return [...this.nodes.values()].filter((n) => n.dependencies.includes(id));
  }

  topologicalSort(): string[] {
    const visited = new Set<string>();
    const order: string[] = [];
    const visiting = new Set<string>();

    const visit = (id: string) => {
      if (visited.has(id)) return;
      if (visiting.has(id)) throw new Error(`Cycle detected involving node: ${id}`);
      visiting.add(id);
      const node = this.nodes.get(id);
      if (node) {
        for (const dep of node.dependencies) visit(dep);
      }
      visiting.delete(id);
      visited.add(id);
      order.push(id);
    };

    for (const id of this.nodes.keys()) visit(id);
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

  executionLayers(): string[][] {
    const sorted = this.topologicalSort();
    const layers: string[][] = [];
    const layerMap = new Map<string, number>();

    for (const id of sorted) {
      const node = this.nodes.get(id)!;
      let layer = 0;
      for (const dep of node.dependencies) {
        layer = Math.max(layer, (layerMap.get(dep) ?? 0) + 1);
      }
      layerMap.set(id, layer);
      while (layers.length <= layer) layers.push([]);
      layers[layer].push(id);
    }

    return layers;
  }

  get size(): number {
    return this.nodes.size;
  }

  clear(): void {
    this.nodes.clear();
  }

  validate(): string[] {
    const errors: string[] = [];
    for (const node of this.nodes.values()) {
      for (const dep of node.dependencies) {
        if (!this.nodes.has(dep)) {
          errors.push(`Node "${node.id}" depends on missing node "${dep}"`);
        }
      }
    }
    if (this.hasCycle()) errors.push("DAG contains a cycle");
    return errors;
  }
}
