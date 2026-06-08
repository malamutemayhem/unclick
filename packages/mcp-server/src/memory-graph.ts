export interface GraphNode {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

export interface GraphEdge {
  from: string;
  to: string;
  relation: string;
  weight: number;
  metadata?: Record<string, unknown>;
}

export class MemoryGraph {
  private nodes = new Map<string, GraphNode>();
  private edges: GraphEdge[] = [];

  addNode(id: string, type: string, data: Record<string, unknown> = {}): this {
    this.nodes.set(id, { id, type, data });
    return this;
  }

  removeNode(id: string): boolean {
    if (!this.nodes.has(id)) return false;
    this.nodes.delete(id);
    this.edges = this.edges.filter((e) => e.from !== id && e.to !== id);
    return true;
  }

  addEdge(from: string, to: string, relation: string, weight = 1, metadata?: Record<string, unknown>): this {
    this.edges.push({ from, to, relation, weight, metadata });
    return this;
  }

  removeEdge(from: string, to: string, relation?: string): number {
    const before = this.edges.length;
    this.edges = this.edges.filter(
      (e) => !(e.from === from && e.to === to && (!relation || e.relation === relation)),
    );
    return before - this.edges.length;
  }

  getNode(id: string): GraphNode | undefined {
    return this.nodes.get(id);
  }

  getEdges(nodeId: string, direction: "out" | "in" | "both" = "both"): GraphEdge[] {
    return this.edges.filter((e) => {
      if (direction === "out") return e.from === nodeId;
      if (direction === "in") return e.to === nodeId;
      return e.from === nodeId || e.to === nodeId;
    });
  }

  getNeighbors(nodeId: string): GraphNode[] {
    const ids = new Set<string>();
    for (const edge of this.edges) {
      if (edge.from === nodeId) ids.add(edge.to);
      if (edge.to === nodeId) ids.add(edge.from);
    }
    return [...ids].map((id) => this.nodes.get(id)!).filter(Boolean);
  }

  findPath(fromId: string, toId: string): string[] | null {
    const visited = new Set<string>();
    const queue: string[][] = [[fromId]];
    while (queue.length > 0) {
      const path = queue.shift()!;
      const current = path[path.length - 1];
      if (current === toId) return path;
      if (visited.has(current)) continue;
      visited.add(current);
      for (const neighbor of this.getNeighbors(current)) {
        if (!visited.has(neighbor.id)) {
          queue.push([...path, neighbor.id]);
        }
      }
    }
    return null;
  }

  getByType(type: string): GraphNode[] {
    return [...this.nodes.values()].filter((n) => n.type === type);
  }

  getRelated(nodeId: string, relation: string): GraphNode[] {
    return this.edges
      .filter((e) => e.from === nodeId && e.relation === relation)
      .map((e) => this.nodes.get(e.to)!)
      .filter(Boolean);
  }

  get nodeCount(): number {
    return this.nodes.size;
  }

  get edgeCount(): number {
    return this.edges.length;
  }

  clear(): void {
    this.nodes.clear();
    this.edges = [];
  }

  allNodes(): GraphNode[] {
    return [...this.nodes.values()];
  }

  allEdges(): GraphEdge[] {
    return [...this.edges];
  }
}
