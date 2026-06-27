export class ArticulationBridge {
  private adj: Map<number, number[]> = new Map();
  private _articulationPoints: Set<number> = new Set();
  private _bridges: [number, number][] = [];
  private disc: Map<number, number> = new Map();
  private low: Map<number, number> = new Map();
  private parent: Map<number, number> = new Map();
  private timer = 0;

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
    for (const node of nodes) {
      if (!this.disc.has(node)) {
        this.dfs(node);
      }
    }
  }

  private dfs(u: number): void {
    this.disc.set(u, this.timer);
    this.low.set(u, this.timer);
    this.timer++;
    let children = 0;

    for (const v of this.adj.get(u) || []) {
      if (!this.disc.has(v)) {
        children++;
        this.parent.set(v, u);
        this.dfs(v);
        this.low.set(u, Math.min(this.low.get(u)!, this.low.get(v)!));

        if (!this.parent.has(u) && children > 1) {
          this._articulationPoints.add(u);
        }
        if (this.parent.has(u) && this.low.get(v)! >= this.disc.get(u)!) {
          this._articulationPoints.add(u);
        }
        if (this.low.get(v)! > this.disc.get(u)!) {
          this._bridges.push([u, v]);
        }
      } else if (v !== this.parent.get(u)) {
        this.low.set(u, Math.min(this.low.get(u)!, this.disc.get(v)!));
      }
    }
  }

  articulationPoints(): number[] {
    return [...this._articulationPoints];
  }

  bridges(): [number, number][] {
    return this._bridges.map(([u, v]) => [u, v]);
  }

  isArticulationPoint(node: number): boolean {
    return this._articulationPoints.has(node);
  }

  isBridge(u: number, v: number): boolean {
    return this._bridges.some(
      ([a, b]) => (a === u && b === v) || (a === v && b === u)
    );
  }

  articulationPointCount(): number {
    return this._articulationPoints.size;
  }

  bridgeCount(): number {
    return this._bridges.length;
  }
}
