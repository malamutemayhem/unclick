export class KosarajuSCC {
  private adj: Map<number, number[]> = new Map();
  private radj: Map<number, number[]> = new Map();
  private nodes: Set<number> = new Set();
  private sccs: number[][] = [];

  constructor(edges: [number, number][]) {
    for (const [u, v] of edges) {
      this.nodes.add(u);
      this.nodes.add(v);
      if (!this.adj.has(u)) this.adj.set(u, []);
      if (!this.adj.has(v)) this.adj.set(v, []);
      if (!this.radj.has(u)) this.radj.set(u, []);
      if (!this.radj.has(v)) this.radj.set(v, []);
      this.adj.get(u)!.push(v);
      this.radj.get(v)!.push(u);
    }
    this.compute();
  }

  private compute(): void {
    const visited = new Set<number>();
    const order: number[] = [];

    const dfs1 = (v: number): void => {
      visited.add(v);
      for (const w of this.adj.get(v) || []) {
        if (!visited.has(w)) dfs1(w);
      }
      order.push(v);
    };

    for (const node of this.nodes) {
      if (!visited.has(node)) dfs1(node);
    }

    const assigned = new Set<number>();
    const dfs2 = (v: number, component: number[]): void => {
      assigned.add(v);
      component.push(v);
      for (const w of this.radj.get(v) || []) {
        if (!assigned.has(w)) dfs2(w, component);
      }
    };

    for (let i = order.length - 1; i >= 0; i--) {
      const v = order[i];
      if (!assigned.has(v)) {
        const component: number[] = [];
        dfs2(v, component);
        this.sccs.push(component);
      }
    }
  }

  components(): number[][] {
    return this.sccs.map((c) => [...c]);
  }

  componentCount(): number {
    return this.sccs.length;
  }

  componentOf(node: number): number[] | undefined {
    for (const scc of this.sccs) {
      if (scc.includes(node)) return [...scc];
    }
    return undefined;
  }

  isStronglyConnected(): boolean {
    return this.sccs.length === 1;
  }

  nodeCount(): number {
    return this.nodes.size;
  }
}
