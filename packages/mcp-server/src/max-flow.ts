export class MaxFlow {
  private capacity: number[][];
  private n: number;

  constructor(n: number) {
    this.n = n;
    this.capacity = Array.from({ length: n }, () => new Array(n).fill(0));
  }

  addEdge(from: number, to: number, cap: number): void {
    this.capacity[from][to] += cap;
  }

  private bfs(source: number, sink: number, parent: number[]): boolean {
    const visited = new Array(this.n).fill(false);
    visited[source] = true;
    const queue = [source];
    while (queue.length > 0) {
      const u = queue.shift()!;
      for (let v = 0; v < this.n; v++) {
        if (!visited[v] && this.capacity[u][v] > 0) {
          visited[v] = true;
          parent[v] = u;
          if (v === sink) return true;
          queue.push(v);
        }
      }
    }
    return false;
  }

  edmondsKarp(source: number, sink: number): number {
    const residual = this.capacity.map((row) => [...row]);
    let totalFlow = 0;
    const parent = new Array(this.n).fill(-1);

    const bfs = (): boolean => {
      const visited = new Array(this.n).fill(false);
      visited[source] = true;
      const queue = [source];
      parent.fill(-1);
      while (queue.length > 0) {
        const u = queue.shift()!;
        for (let v = 0; v < this.n; v++) {
          if (!visited[v] && residual[u][v] > 0) {
            visited[v] = true;
            parent[v] = u;
            if (v === sink) return true;
            queue.push(v);
          }
        }
      }
      return false;
    };

    while (bfs()) {
      let pathFlow = Infinity;
      for (let v = sink; v !== source; v = parent[v]) {
        const u = parent[v];
        pathFlow = Math.min(pathFlow, residual[u][v]);
      }
      for (let v = sink; v !== source; v = parent[v]) {
        const u = parent[v];
        residual[u][v] -= pathFlow;
        residual[v][u] += pathFlow;
      }
      totalFlow += pathFlow;
    }
    return totalFlow;
  }

  minCut(source: number, sink: number): { flow: number; cut: [number, number][] } {
    const residual = this.capacity.map((row) => [...row]);
    let totalFlow = 0;
    const parent = new Array(this.n).fill(-1);

    const bfs = (): boolean => {
      const visited = new Array(this.n).fill(false);
      visited[source] = true;
      const queue = [source];
      parent.fill(-1);
      while (queue.length > 0) {
        const u = queue.shift()!;
        for (let v = 0; v < this.n; v++) {
          if (!visited[v] && residual[u][v] > 0) {
            visited[v] = true;
            parent[v] = u;
            if (v === sink) return true;
            queue.push(v);
          }
        }
      }
      return false;
    };

    while (bfs()) {
      let pathFlow = Infinity;
      for (let v = sink; v !== source; v = parent[v]) {
        pathFlow = Math.min(pathFlow, residual[parent[v]][v]);
      }
      for (let v = sink; v !== source; v = parent[v]) {
        residual[parent[v]][v] -= pathFlow;
        residual[v][parent[v]] += pathFlow;
      }
      totalFlow += pathFlow;
    }

    const reachable = new Array(this.n).fill(false);
    const queue = [source];
    reachable[source] = true;
    while (queue.length > 0) {
      const u = queue.shift()!;
      for (let v = 0; v < this.n; v++) {
        if (!reachable[v] && residual[u][v] > 0) {
          reachable[v] = true;
          queue.push(v);
        }
      }
    }

    const cut: [number, number][] = [];
    for (let u = 0; u < this.n; u++) {
      for (let v = 0; v < this.n; v++) {
        if (reachable[u] && !reachable[v] && this.capacity[u][v] > 0) {
          cut.push([u, v]);
        }
      }
    }
    return { flow: totalFlow, cut };
  }

  nodeCount(): number {
    return this.n;
  }
}
