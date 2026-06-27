export class VertexCover {
  private adj: Map<number, Set<number>> = new Map();
  private edges: [number, number][] = [];
  private nodes: Set<number> = new Set();

  constructor(edges: [number, number][]) {
    this.edges = edges;
    for (const [u, v] of edges) {
      this.nodes.add(u);
      this.nodes.add(v);
      if (!this.adj.has(u)) this.adj.set(u, new Set());
      if (!this.adj.has(v)) this.adj.set(v, new Set());
      this.adj.get(u)!.add(v);
      this.adj.get(v)!.add(u);
    }
  }

  greedyCover(): Set<number> {
    const cover = new Set<number>();
    const uncovered = new Set(this.edges.map((_, i) => i));

    while (uncovered.size > 0) {
      let bestNode = -1;
      let bestCount = 0;
      for (const node of this.nodes) {
        if (cover.has(node)) continue;
        let count = 0;
        for (const idx of uncovered) {
          const [u, v] = this.edges[idx];
          if (u === node || v === node) count++;
        }
        if (count > bestCount) {
          bestCount = count;
          bestNode = node;
        }
      }
      if (bestNode === -1) break;
      cover.add(bestNode);
      for (const idx of [...uncovered]) {
        const [u, v] = this.edges[idx];
        if (u === bestNode || v === bestNode) uncovered.delete(idx);
      }
    }
    return cover;
  }

  approx2Cover(): Set<number> {
    const cover = new Set<number>();
    const matched = new Set<number>();

    for (const [u, v] of this.edges) {
      if (!matched.has(u) && !matched.has(v)) {
        cover.add(u);
        cover.add(v);
        matched.add(u);
        matched.add(v);
      }
    }
    return cover;
  }

  isVertexCover(cover: Set<number>): boolean {
    for (const [u, v] of this.edges) {
      if (!cover.has(u) && !cover.has(v)) return false;
    }
    return true;
  }

  lowerBound(): number {
    const matching = new Set<number>();
    let count = 0;
    for (const [u, v] of this.edges) {
      if (!matching.has(u) && !matching.has(v)) {
        matching.add(u);
        matching.add(v);
        count++;
      }
    }
    return count;
  }

  nodeCount(): number {
    return this.nodes.size;
  }

  edgeCount(): number {
    return this.edges.length;
  }
}
