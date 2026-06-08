export class ChromaticNumber {
  private adj: Map<number, Set<number>> = new Map();
  private nodes: number[] = [];

  constructor(edges: [number, number][]) {
    const nodeSet = new Set<number>();
    for (const [u, v] of edges) {
      nodeSet.add(u);
      nodeSet.add(v);
      if (!this.adj.has(u)) this.adj.set(u, new Set());
      if (!this.adj.has(v)) this.adj.set(v, new Set());
      this.adj.get(u)!.add(v);
      this.adj.get(v)!.add(u);
    }
    this.nodes = [...nodeSet].sort((a, b) => a - b);
  }

  greedyColoring(): Map<number, number> {
    const colors = new Map<number, number>();
    const sorted = [...this.nodes].sort((a, b) => {
      return (this.adj.get(b)?.size || 0) - (this.adj.get(a)?.size || 0);
    });

    for (const node of sorted) {
      const neighborColors = new Set<number>();
      for (const neighbor of this.adj.get(node) || []) {
        if (colors.has(neighbor)) {
          neighborColors.add(colors.get(neighbor)!);
        }
      }
      let color = 0;
      while (neighborColors.has(color)) color++;
      colors.set(node, color);
    }
    return colors;
  }

  chromaticUpperBound(): number {
    const coloring = this.greedyColoring();
    return new Set(coloring.values()).size;
  }

  isValidColoring(coloring: Map<number, number>): boolean {
    for (const [u, neighbors] of this.adj) {
      for (const v of neighbors) {
        if (coloring.get(u) === coloring.get(v)) return false;
      }
    }
    return true;
  }

  isBipartite(): boolean {
    if (this.nodes.length === 0) return true;
    const color = new Map<number, number>();
    const queue: number[] = [];

    for (const start of this.nodes) {
      if (color.has(start)) continue;
      color.set(start, 0);
      queue.push(start);
      while (queue.length > 0) {
        const u = queue.shift()!;
        for (const v of this.adj.get(u) || []) {
          if (!color.has(v)) {
            color.set(v, 1 - color.get(u)!);
            queue.push(v);
          } else if (color.get(v) === color.get(u)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  maxDegree(): number {
    let max = 0;
    for (const neighbors of this.adj.values()) {
      if (neighbors.size > max) max = neighbors.size;
    }
    return max;
  }

  nodeCount(): number {
    return this.nodes.length;
  }
}
