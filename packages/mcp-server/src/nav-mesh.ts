export interface NavNode {
  id: string;
  x: number;
  y: number;
}

export interface NavEdge {
  from: string;
  to: string;
  cost: number;
}

export class NavMesh {
  private nodes = new Map<string, NavNode>();
  private edges = new Map<string, NavEdge[]>();

  addNode(id: string, x: number, y: number): void {
    this.nodes.set(id, { id, x, y });
    if (!this.edges.has(id)) this.edges.set(id, []);
  }

  addEdge(from: string, to: string, cost?: number): void {
    const a = this.nodes.get(from);
    const b = this.nodes.get(to);
    if (!a || !b) return;

    const c = cost ?? Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    this.edges.get(from)!.push({ from, to, cost: c });
    this.edges.get(to)!.push({ from: to, to: from, cost: c });
  }

  findPath(startId: string, goalId: string): { path: string[]; cost: number } | null {
    const start = this.nodes.get(startId);
    const goal = this.nodes.get(goalId);
    if (!start || !goal) return null;

    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();
    const cameFrom = new Map<string, string>();
    const open = new Set<string>();
    const closed = new Set<string>();

    gScore.set(startId, 0);
    fScore.set(startId, this.heuristic(start, goal));
    open.add(startId);

    while (open.size > 0) {
      let current = "";
      let minF = Infinity;
      for (const id of open) {
        const f = fScore.get(id) ?? Infinity;
        if (f < minF) { minF = f; current = id; }
      }

      if (current === goalId) {
        return { path: this.buildPath(cameFrom, current), cost: gScore.get(current) ?? 0 };
      }

      open.delete(current);
      closed.add(current);

      for (const edge of this.edges.get(current) || []) {
        if (closed.has(edge.to)) continue;
        const tentativeG = (gScore.get(current) ?? 0) + edge.cost;
        if (tentativeG < (gScore.get(edge.to) ?? Infinity)) {
          cameFrom.set(edge.to, current);
          gScore.set(edge.to, tentativeG);
          const toNode = this.nodes.get(edge.to)!;
          fScore.set(edge.to, tentativeG + this.heuristic(toNode, goal));
          open.add(edge.to);
        }
      }
    }

    return null;
  }

  private heuristic(a: NavNode, b: NavNode): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }

  private buildPath(cameFrom: Map<string, string>, goal: string): string[] {
    const path: string[] = [goal];
    let current = goal;
    while (cameFrom.has(current)) {
      current = cameFrom.get(current)!;
      path.unshift(current);
    }
    return path;
  }

  getNode(id: string): NavNode | null {
    return this.nodes.get(id) || null;
  }

  getNeighbors(id: string): string[] {
    return (this.edges.get(id) || []).map(e => e.to);
  }

  get nodeCount(): number { return this.nodes.size; }

  get edgeCount(): number {
    let count = 0;
    for (const edges of this.edges.values()) count += edges.length;
    return count / 2;
  }

  removeNode(id: string): boolean {
    if (!this.nodes.has(id)) return false;
    this.nodes.delete(id);
    this.edges.delete(id);
    for (const [, edges] of this.edges) {
      for (let i = edges.length - 1; i >= 0; i--) {
        if (edges[i].to === id) edges.splice(i, 1);
      }
    }
    return true;
  }

  clear(): void {
    this.nodes.clear();
    this.edges.clear();
  }
}
