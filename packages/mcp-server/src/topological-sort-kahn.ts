export class KahnTopologicalSort {
  private adj: Map<number, number[]> = new Map();
  private nodes: Set<number> = new Set();

  constructor(edges: [number, number][]) {
    for (const [u, v] of edges) {
      this.nodes.add(u);
      this.nodes.add(v);
      if (!this.adj.has(u)) this.adj.set(u, []);
      if (!this.adj.has(v)) this.adj.set(v, []);
      this.adj.get(u)!.push(v);
    }
  }

  sort(): number[] | null {
    const inDegree = new Map<number, number>();
    for (const node of this.nodes) inDegree.set(node, 0);
    for (const neighbors of this.adj.values()) {
      for (const v of neighbors) {
        inDegree.set(v, (inDegree.get(v) || 0) + 1);
      }
    }

    const queue: number[] = [];
    for (const [node, deg] of inDegree) {
      if (deg === 0) queue.push(node);
    }
    queue.sort((a, b) => a - b);

    const result: number[] = [];
    while (queue.length > 0) {
      const u = queue.shift()!;
      result.push(u);
      for (const v of this.adj.get(u) || []) {
        const newDeg = inDegree.get(v)! - 1;
        inDegree.set(v, newDeg);
        if (newDeg === 0) {
          const idx = queue.findIndex((x) => x > v);
          if (idx === -1) queue.push(v);
          else queue.splice(idx, 0, v);
        }
      }
    }

    return result.length === this.nodes.size ? result : null;
  }

  hasCycle(): boolean {
    return this.sort() === null;
  }

  levels(): number[][] | null {
    const inDegree = new Map<number, number>();
    for (const node of this.nodes) inDegree.set(node, 0);
    for (const neighbors of this.adj.values()) {
      for (const v of neighbors) {
        inDegree.set(v, (inDegree.get(v) || 0) + 1);
      }
    }

    let queue: number[] = [];
    for (const [node, deg] of inDegree) {
      if (deg === 0) queue.push(node);
    }

    const result: number[][] = [];
    let processed = 0;
    while (queue.length > 0) {
      result.push([...queue]);
      processed += queue.length;
      const next: number[] = [];
      for (const u of queue) {
        for (const v of this.adj.get(u) || []) {
          const newDeg = inDegree.get(v)! - 1;
          inDegree.set(v, newDeg);
          if (newDeg === 0) next.push(v);
        }
      }
      queue = next;
    }

    return processed === this.nodes.size ? result : null;
  }

  nodeCount(): number {
    return this.nodes.size;
  }
}
