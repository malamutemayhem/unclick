interface Edge {
  to: string;
  weight: number;
}

export class WeightedGraph {
  private adjacency = new Map<string, Edge[]>();

  addNode(node: string): void {
    if (!this.adjacency.has(node)) this.adjacency.set(node, []);
  }

  addEdge(from: string, to: string, weight: number, bidirectional = true): void {
    this.addNode(from);
    this.addNode(to);
    this.adjacency.get(from)!.push({ to, weight });
    if (bidirectional) this.adjacency.get(to)!.push({ to: from, weight });
  }

  get nodes(): string[] { return [...this.adjacency.keys()]; }
  get nodeCount(): number { return this.adjacency.size; }

  neighbors(node: string): Edge[] {
    return this.adjacency.get(node) || [];
  }

  dijkstra(start: string): { distances: Map<string, number>; previous: Map<string, string | null> } {
    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const visited = new Set<string>();

    for (const node of this.adjacency.keys()) {
      distances.set(node, Infinity);
      previous.set(node, null);
    }
    distances.set(start, 0);

    while (visited.size < this.adjacency.size) {
      let current: string | null = null;
      let minDist = Infinity;
      for (const [node, dist] of distances) {
        if (!visited.has(node) && dist < minDist) {
          current = node;
          minDist = dist;
        }
      }
      if (current === null) break;
      visited.add(current);

      for (const edge of this.adjacency.get(current)!) {
        if (visited.has(edge.to)) continue;
        const alt = minDist + edge.weight;
        if (alt < distances.get(edge.to)!) {
          distances.set(edge.to, alt);
          previous.set(edge.to, current);
        }
      }
    }

    return { distances, previous };
  }

  shortestPath(from: string, to: string): { path: string[]; distance: number } | null {
    const { distances, previous } = this.dijkstra(from);
    const dist = distances.get(to);
    if (dist === undefined || dist === Infinity) return null;

    const path: string[] = [];
    let current: string | null = to;
    while (current !== null) {
      path.unshift(current);
      current = previous.get(current) ?? null;
    }

    return { path, distance: dist };
  }

  hasNode(node: string): boolean { return this.adjacency.has(node); }

  edgeWeight(from: string, to: string): number | undefined {
    const edges = this.adjacency.get(from);
    if (!edges) return undefined;
    const edge = edges.find((e) => e.to === to);
    return edge?.weight;
  }

  removeNode(node: string): boolean {
    if (!this.adjacency.has(node)) return false;
    this.adjacency.delete(node);
    for (const edges of this.adjacency.values()) {
      for (let i = edges.length - 1; i >= 0; i--) {
        if (edges[i].to === node) edges.splice(i, 1);
      }
    }
    return true;
  }
}
