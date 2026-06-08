export type NodeId = string;

export interface DataflowNode<T = unknown> {
  id: NodeId;
  inputs: NodeId[];
  compute: (values: T[]) => T;
  value?: T;
  dirty: boolean;
}

export class DataflowGraph<T = unknown> {
  private nodes = new Map<NodeId, DataflowNode<T>>();
  private dependents = new Map<NodeId, Set<NodeId>>();

  addSource(id: NodeId, value: T): void {
    this.nodes.set(id, { id, inputs: [], compute: () => value, value, dirty: false });
    if (!this.dependents.has(id)) this.dependents.set(id, new Set());
  }

  addComputed(id: NodeId, inputs: NodeId[], compute: (values: T[]) => T): void {
    this.nodes.set(id, { id, inputs, compute, dirty: true });
    if (!this.dependents.has(id)) this.dependents.set(id, new Set());
    for (const inp of inputs) {
      if (!this.dependents.has(inp)) this.dependents.set(inp, new Set());
      this.dependents.get(inp)!.add(id);
    }
  }

  setValue(id: NodeId, value: T): void {
    const node = this.nodes.get(id);
    if (!node) throw new Error(`Node not found: ${id}`);
    node.value = value;
    node.compute = () => value;
    node.dirty = false;
    this.markDirty(id);
  }

  getValue(id: NodeId): T | undefined {
    const node = this.nodes.get(id);
    if (!node) return undefined;
    if (node.dirty) this.evaluate(id);
    return node.value;
  }

  private markDirty(id: NodeId): void {
    const deps = this.dependents.get(id);
    if (!deps) return;
    for (const dep of deps) {
      const node = this.nodes.get(dep);
      if (node && !node.dirty) {
        node.dirty = true;
        this.markDirty(dep);
      }
    }
  }

  private evaluate(id: NodeId): void {
    const node = this.nodes.get(id);
    if (!node) return;

    for (const inp of node.inputs) {
      const inputNode = this.nodes.get(inp);
      if (inputNode?.dirty) this.evaluate(inp);
    }

    const inputValues = node.inputs.map((inp) => this.nodes.get(inp)!.value!);
    node.value = node.compute(inputValues);
    node.dirty = false;
  }

  propagate(): void {
    const order = this.topologicalSort();
    for (const id of order) {
      const node = this.nodes.get(id)!;
      if (node.dirty) {
        const inputValues = node.inputs.map((inp) => this.nodes.get(inp)!.value!);
        node.value = node.compute(inputValues);
        node.dirty = false;
      }
    }
  }

  private topologicalSort(): NodeId[] {
    const visited = new Set<NodeId>();
    const result: NodeId[] = [];

    const visit = (id: NodeId) => {
      if (visited.has(id)) return;
      visited.add(id);
      const node = this.nodes.get(id);
      if (node) {
        for (const inp of node.inputs) visit(inp);
      }
      result.push(id);
    };

    for (const id of this.nodes.keys()) visit(id);
    return result;
  }

  removeNode(id: NodeId): void {
    this.nodes.delete(id);
    this.dependents.delete(id);
    for (const deps of this.dependents.values()) {
      deps.delete(id);
    }
  }

  nodeIds(): NodeId[] {
    return [...this.nodes.keys()];
  }

  isDirty(id: NodeId): boolean {
    return this.nodes.get(id)?.dirty ?? false;
  }

  snapshot(): Map<NodeId, T | undefined> {
    this.propagate();
    const result = new Map<NodeId, T | undefined>();
    for (const [id, node] of this.nodes) {
      result.set(id, node.value);
    }
    return result;
  }
}
