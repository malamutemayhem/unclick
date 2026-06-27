interface DinicEdge {
  to: number;
  cap: number;
  flow: number;
  rev: number;
}

export class DinicFlow {
  private graph: DinicEdge[][] = [];
  private level: number[] = [];
  private iter: number[] = [];
  private n: number;

  constructor(n: number) {
    this.n = n;
    for (let i = 0; i < n; i++) this.graph.push([]);
    this.level = new Array(n);
    this.iter = new Array(n);
  }

  addEdge(from: number, to: number, cap: number): void {
    this.graph[from].push({ to, cap, flow: 0, rev: this.graph[to].length });
    this.graph[to].push({ to: from, cap: 0, flow: 0, rev: this.graph[from].length - 1 });
  }

  private bfs(s: number): boolean {
    this.level.fill(-1);
    const queue = [s];
    this.level[s] = 0;
    let head = 0;
    while (head < queue.length) {
      const v = queue[head++];
      for (const e of this.graph[v]) {
        if (e.cap - e.flow > 0 && this.level[e.to] < 0) {
          this.level[e.to] = this.level[v] + 1;
          queue.push(e.to);
        }
      }
    }
    return this.level[this.n - 1] >= 0;
  }

  private dfs(v: number, t: number, f: number): number {
    if (v === t) return f;
    for (; this.iter[v] < this.graph[v].length; this.iter[v]++) {
      const e = this.graph[v][this.iter[v]];
      if (e.cap - e.flow > 0 && this.level[v] < this.level[e.to]) {
        const d = this.dfs(e.to, t, Math.min(f, e.cap - e.flow));
        if (d > 0) {
          e.flow += d;
          this.graph[e.to][e.rev].flow -= d;
          return d;
        }
      }
    }
    return 0;
  }

  maxFlow(s: number, t: number): number {
    let flow = 0;
    while (this.bfs(s)) {
      this.iter.fill(0);
      let d: number;
      while ((d = this.dfs(s, t, Infinity)) > 0) {
        flow += d;
      }
    }
    return flow;
  }

  nodeCount(): number {
    return this.n;
  }

  getFlow(from: number, to: number): number {
    for (const e of this.graph[from]) {
      if (e.to === to && e.cap > 0) return e.flow;
    }
    return 0;
  }
}
