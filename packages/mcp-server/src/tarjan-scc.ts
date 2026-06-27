export class TarjanSCC {
  private adj: Map<number, number[]> = new Map();
  private index = 0;
  private indices: Map<number, number> = new Map();
  private lowlinks: Map<number, number> = new Map();
  private onStack: Set<number> = new Set();
  private stack: number[] = [];
  private sccs: number[][] = [];

  constructor(edges: [number, number][]) {
    const nodes = new Set<number>();
    for (const [u, v] of edges) {
      nodes.add(u);
      nodes.add(v);
      if (!this.adj.has(u)) this.adj.set(u, []);
      this.adj.get(u)!.push(v);
      if (!this.adj.has(v)) this.adj.set(v, []);
    }
    for (const node of nodes) {
      if (!this.indices.has(node)) {
        this.strongconnect(node);
      }
    }
  }

  private strongconnect(v: number): void {
    this.indices.set(v, this.index);
    this.lowlinks.set(v, this.index);
    this.index++;
    this.stack.push(v);
    this.onStack.add(v);

    for (const w of this.adj.get(v) || []) {
      if (!this.indices.has(w)) {
        this.strongconnect(w);
        this.lowlinks.set(v, Math.min(this.lowlinks.get(v)!, this.lowlinks.get(w)!));
      } else if (this.onStack.has(w)) {
        this.lowlinks.set(v, Math.min(this.lowlinks.get(v)!, this.indices.get(w)!));
      }
    }

    if (this.lowlinks.get(v) === this.indices.get(v)) {
      const component: number[] = [];
      let w: number;
      do {
        w = this.stack.pop()!;
        this.onStack.delete(w);
        component.push(w);
      } while (w !== v);
      this.sccs.push(component);
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

  condensation(): Map<number, number[]> {
    const nodeToComp = new Map<number, number>();
    for (let i = 0; i < this.sccs.length; i++) {
      for (const node of this.sccs[i]) {
        nodeToComp.set(node, i);
      }
    }
    const dag = new Map<number, number[]>();
    for (let i = 0; i < this.sccs.length; i++) dag.set(i, []);
    for (const [u, neighbors] of this.adj) {
      const cu = nodeToComp.get(u)!;
      for (const v of neighbors) {
        const cv = nodeToComp.get(v)!;
        if (cu !== cv && !dag.get(cu)!.includes(cv)) {
          dag.get(cu)!.push(cv);
        }
      }
    }
    return dag;
  }
}
