export class HeavyLightDecomposition {
  private adj: number[][] = [];
  private parent: number[] = [];
  private depth: number[] = [];
  private subtreeSize: number[] = [];
  private chainHead: number[] = [];
  private position: number[] = [];
  private n: number;
  private posCounter = 0;

  constructor(n: number, edges: [number, number][], root = 0) {
    this.n = n;
    this.adj = Array.from({ length: n }, () => []);
    this.parent = new Array(n).fill(-1);
    this.depth = new Array(n).fill(0);
    this.subtreeSize = new Array(n).fill(1);
    this.chainHead = new Array(n).fill(-1);
    this.position = new Array(n).fill(0);

    for (const [u, v] of edges) {
      this.adj[u].push(v);
      this.adj[v].push(u);
    }

    this.dfs(root);
    this.decompose(root, root);
  }

  private dfs(root: number): void {
    const stack: [number, number, boolean][] = [[root, -1, false]];
    while (stack.length > 0) {
      const [node, par, returning] = stack.pop()!;
      if (returning) {
        for (const next of this.adj[node]) {
          if (next !== par) {
            this.subtreeSize[node] += this.subtreeSize[next];
          }
        }
        continue;
      }
      this.parent[node] = par;
      this.depth[node] = par === -1 ? 0 : this.depth[par] + 1;
      stack.push([node, par, true]);
      for (const next of this.adj[node]) {
        if (next !== par) {
          stack.push([next, node, false]);
        }
      }
    }
  }

  private decompose(node: number, head: number): void {
    const stack: [number, number][] = [[node, head]];
    while (stack.length > 0) {
      const [cur, curHead] = stack.pop()!;
      this.chainHead[cur] = curHead;
      this.position[cur] = this.posCounter++;

      let heavyChild = -1;
      let heavySize = 0;
      for (const next of this.adj[cur]) {
        if (next !== this.parent[cur] && this.subtreeSize[next] > heavySize) {
          heavyChild = next;
          heavySize = this.subtreeSize[next];
        }
      }

      const lightChildren: number[] = [];
      for (const next of this.adj[cur]) {
        if (next !== this.parent[cur] && next !== heavyChild) {
          lightChildren.push(next);
        }
      }

      for (let i = lightChildren.length - 1; i >= 0; i--) {
        stack.push([lightChildren[i], lightChildren[i]]);
      }

      if (heavyChild !== -1) {
        stack.push([heavyChild, curHead]);
      }
    }
  }

  pathSegments(u: number, v: number): [number, number][] {
    const segments: [number, number][] = [];
    while (this.chainHead[u] !== this.chainHead[v]) {
      if (this.depth[this.chainHead[u]] < this.depth[this.chainHead[v]]) {
        [u, v] = [v, u];
      }
      segments.push([this.position[this.chainHead[u]], this.position[u]]);
      u = this.parent[this.chainHead[u]];
    }
    if (this.depth[u] > this.depth[v]) [u, v] = [v, u];
    segments.push([this.position[u], this.position[v]]);
    return segments;
  }

  lca(u: number, v: number): number {
    while (this.chainHead[u] !== this.chainHead[v]) {
      if (this.depth[this.chainHead[u]] < this.depth[this.chainHead[v]]) {
        [u, v] = [v, u];
      }
      u = this.parent[this.chainHead[u]];
    }
    return this.depth[u] <= this.depth[v] ? u : v;
  }

  getDepth(node: number): number {
    return this.depth[node];
  }

  getPosition(node: number): number {
    return this.position[node];
  }

  getParent(node: number): number {
    return this.parent[node];
  }

  nodeCount(): number {
    return this.n;
  }
}
