interface MCFEdge {
  to: number;
  cap: number;
  cost: number;
  flow: number;
  rev: number;
}

export class MinCostFlow {
  private graph: MCFEdge[][] = [];
  private n: number;

  constructor(n: number) {
    this.n = n;
    for (let i = 0; i < n; i++) this.graph.push([]);
  }

  addEdge(from: number, to: number, cap: number, cost: number): void {
    this.graph[from].push({ to, cap, cost, flow: 0, rev: this.graph[to].length });
    this.graph[to].push({ to: from, cap: 0, cost: -cost, flow: 0, rev: this.graph[from].length - 1 });
  }

  minCostFlow(s: number, t: number, maxFlow: number): { flow: number; cost: number } {
    let totalFlow = 0;
    let totalCost = 0;

    while (totalFlow < maxFlow) {
      const dist = new Array(this.n).fill(Infinity);
      const inQueue = new Array(this.n).fill(false);
      const prevNode = new Array(this.n).fill(-1);
      const prevEdge = new Array(this.n).fill(-1);

      dist[s] = 0;
      const queue = [s];
      inQueue[s] = true;

      while (queue.length > 0) {
        const v = queue.shift()!;
        inQueue[v] = false;
        for (let i = 0; i < this.graph[v].length; i++) {
          const e = this.graph[v][i];
          if (e.cap - e.flow > 0 && dist[v] + e.cost < dist[e.to]) {
            dist[e.to] = dist[v] + e.cost;
            prevNode[e.to] = v;
            prevEdge[e.to] = i;
            if (!inQueue[e.to]) {
              queue.push(e.to);
              inQueue[e.to] = true;
            }
          }
        }
      }

      if (dist[t] === Infinity) break;

      let pushFlow = maxFlow - totalFlow;
      let v = t;
      while (v !== s) {
        const e = this.graph[prevNode[v]][prevEdge[v]];
        pushFlow = Math.min(pushFlow, e.cap - e.flow);
        v = prevNode[v];
      }

      v = t;
      while (v !== s) {
        const e = this.graph[prevNode[v]][prevEdge[v]];
        e.flow += pushFlow;
        this.graph[v][e.rev].flow -= pushFlow;
        v = prevNode[v];
      }

      totalFlow += pushFlow;
      totalCost += pushFlow * dist[t];
    }

    return { flow: totalFlow, cost: totalCost };
  }

  nodeCount(): number {
    return this.n;
  }
}
