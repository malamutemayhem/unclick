export class CentroidDecomposition {
  private adj: Map<number, number[]> = new Map();
  private subtreeSize: Map<number, number> = new Map();
  private removed: Set<number> = new Set();
  private centroidParent: Map<number, number> = new Map();
  private centroidChildren: Map<number, number[]> = new Map();
  private _root = -1;

  constructor(edges: [number, number][]) {
    const nodes = new Set<number>();
    for (const [u, v] of edges) {
      nodes.add(u);
      nodes.add(v);
      if (!this.adj.has(u)) this.adj.set(u, []);
      if (!this.adj.has(v)) this.adj.set(v, []);
      this.adj.get(u)!.push(v);
      this.adj.get(v)!.push(u);
    }
    if (nodes.size > 0) {
      const start = nodes.values().next().value!;
      this._root = this.decompose(start, -1);
    }
  }

  private computeSize(node: number, parent: number): number {
    let sz = 1;
    for (const next of this.adj.get(node) || []) {
      if (next !== parent && !this.removed.has(next)) {
        sz += this.computeSize(next, node);
      }
    }
    this.subtreeSize.set(node, sz);
    return sz;
  }

  private findCentroid(node: number, parent: number, treeSize: number): number {
    for (const next of this.adj.get(node) || []) {
      if (next !== parent && !this.removed.has(next)) {
        if (this.subtreeSize.get(next)! > treeSize / 2) {
          return this.findCentroid(next, node, treeSize);
        }
      }
    }
    return node;
  }

  private decompose(node: number, parent: number): number {
    const treeSize = this.computeSize(node, -1);
    const centroid = this.findCentroid(node, -1, treeSize);
    this.removed.add(centroid);
    this.centroidParent.set(centroid, parent);
    this.centroidChildren.set(centroid, []);

    for (const next of this.adj.get(centroid) || []) {
      if (!this.removed.has(next)) {
        const child = this.decompose(next, centroid);
        this.centroidChildren.get(centroid)!.push(child);
      }
    }
    return centroid;
  }

  root(): number {
    return this._root;
  }

  parent(node: number): number {
    return this.centroidParent.get(node) ?? -1;
  }

  children(node: number): number[] {
    return this.centroidChildren.get(node) || [];
  }

  depth(node: number): number {
    let d = 0;
    let cur = node;
    while (this.centroidParent.get(cur) !== -1 && this.centroidParent.has(cur)) {
      cur = this.centroidParent.get(cur)!;
      d++;
    }
    return d;
  }

  nodeCount(): number {
    return this.centroidParent.size;
  }
}
