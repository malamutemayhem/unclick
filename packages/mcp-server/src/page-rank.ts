export class Graph {
  private adjacency = new Map<string, Set<string>>();

  addNode(id: string): void {
    if (!this.adjacency.has(id)) {
      this.adjacency.set(id, new Set());
    }
  }

  addEdge(from: string, to: string): void {
    this.addNode(from);
    this.addNode(to);
    this.adjacency.get(from)!.add(to);
  }

  removeEdge(from: string, to: string): boolean {
    const neighbors = this.adjacency.get(from);
    if (!neighbors) return false;
    return neighbors.delete(to);
  }

  outDegree(node: string): number {
    return this.adjacency.get(node)?.size ?? 0;
  }

  inDegree(node: string): number {
    let count = 0;
    for (const neighbors of this.adjacency.values()) {
      if (neighbors.has(node)) count++;
    }
    return count;
  }

  neighbors(node: string): string[] {
    return [...(this.adjacency.get(node) ?? [])];
  }

  nodes(): string[] {
    return [...this.adjacency.keys()];
  }

  nodeCount(): number {
    return this.adjacency.size;
  }

  edgeCount(): number {
    let count = 0;
    for (const neighbors of this.adjacency.values()) {
      count += neighbors.size;
    }
    return count;
  }

  hasEdge(from: string, to: string): boolean {
    return this.adjacency.get(from)?.has(to) ?? false;
  }
}

export function pageRank(
  graph: Graph,
  dampingFactor = 0.85,
  iterations = 20,
  tolerance = 1e-6
): Map<string, number> {
  const nodes = graph.nodes();
  const n = nodes.length;
  if (n === 0) return new Map();

  let ranks = new Map<string, number>();
  for (const node of nodes) {
    ranks.set(node, 1 / n);
  }

  for (let iter = 0; iter < iterations; iter++) {
    const newRanks = new Map<string, number>();
    let maxDiff = 0;

    for (const node of nodes) {
      let sum = 0;
      for (const other of nodes) {
        if (graph.hasEdge(other, node)) {
          const outDeg = graph.outDegree(other);
          if (outDeg > 0) {
            sum += ranks.get(other)! / outDeg;
          }
        }
      }
      const rank = (1 - dampingFactor) / n + dampingFactor * sum;
      newRanks.set(node, rank);
      maxDiff = Math.max(maxDiff, Math.abs(rank - ranks.get(node)!));
    }

    ranks = newRanks;
    if (maxDiff < tolerance) break;
  }

  return ranks;
}

export function hitsAlgorithm(
  graph: Graph,
  iterations = 20
): { authorities: Map<string, number>; hubs: Map<string, number> } {
  const nodes = graph.nodes();
  const n = nodes.length;
  if (n === 0) return { authorities: new Map(), hubs: new Map() };

  let auth = new Map<string, number>();
  let hub = new Map<string, number>();
  for (const node of nodes) {
    auth.set(node, 1);
    hub.set(node, 1);
  }

  for (let iter = 0; iter < iterations; iter++) {
    const newAuth = new Map<string, number>();
    const newHub = new Map<string, number>();

    for (const node of nodes) {
      let authScore = 0;
      for (const other of nodes) {
        if (graph.hasEdge(other, node)) {
          authScore += hub.get(other)!;
        }
      }
      newAuth.set(node, authScore);
    }

    for (const node of nodes) {
      let hubScore = 0;
      for (const neighbor of graph.neighbors(node)) {
        hubScore += newAuth.get(neighbor)!;
      }
      newHub.set(node, hubScore);
    }

    const authNorm = Math.sqrt([...newAuth.values()].reduce((s, v) => s + v * v, 0)) || 1;
    const hubNorm = Math.sqrt([...newHub.values()].reduce((s, v) => s + v * v, 0)) || 1;

    auth = new Map([...newAuth].map(([k, v]) => [k, v / authNorm]));
    hub = new Map([...newHub].map(([k, v]) => [k, v / hubNorm]));
  }

  return { authorities: auth, hubs: hub };
}
