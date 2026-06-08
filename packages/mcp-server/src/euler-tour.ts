export class EulerTour {
  private adj: Map<number, number[]> = new Map();
  private _tin: Map<number, number> = new Map();
  private _tout: Map<number, number> = new Map();
  private _depth: Map<number, number> = new Map();
  private _parent: Map<number, number> = new Map();
  private tour: number[] = [];
  private timer = 0;

  constructor(edges: [number, number][], root: number) {
    for (const [u, v] of edges) {
      if (!this.adj.has(u)) this.adj.set(u, []);
      if (!this.adj.has(v)) this.adj.set(v, []);
      this.adj.get(u)!.push(v);
      this.adj.get(v)!.push(u);
    }
    this.dfs(root, -1, 0);
  }

  private dfs(node: number, parent: number, depth: number): void {
    this._tin.set(node, this.timer++);
    this._depth.set(node, depth);
    this._parent.set(node, parent);
    this.tour.push(node);

    const neighbors = this.adj.get(node) || [];
    for (const next of neighbors) {
      if (next !== parent) {
        this.dfs(next, node, depth + 1);
        this.tour.push(node);
      }
    }
    this._tout.set(node, this.timer++);
  }

  tin(node: number): number {
    return this._tin.get(node) ?? -1;
  }

  tout(node: number): number {
    return this._tout.get(node) ?? -1;
  }

  depth(node: number): number {
    return this._depth.get(node) ?? -1;
  }

  parent(node: number): number {
    return this._parent.get(node) ?? -1;
  }

  isAncestor(u: number, v: number): boolean {
    const uIn = this._tin.get(u);
    const uOut = this._tout.get(u);
    const vIn = this._tin.get(v);
    const vOut = this._tout.get(v);
    if (uIn === undefined || uOut === undefined || vIn === undefined || vOut === undefined) {
      return false;
    }
    return uIn <= vIn && vOut <= uOut;
  }

  subtreeSize(node: number): number {
    const inT = this._tin.get(node);
    const outT = this._tout.get(node);
    if (inT === undefined || outT === undefined) return 0;
    return (outT - inT + 1) / 2;
  }

  getTour(): number[] {
    return [...this.tour];
  }

  nodeCount(): number {
    return this._tin.size;
  }
}
