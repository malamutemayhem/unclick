import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function graphCondensation(args: Record<string, unknown>) {
  const vertexCount = args.vertex_count as number;
  const edges = args.edges as number[][];

  if (typeof vertexCount !== "number" || vertexCount < 1 || vertexCount > 50_000) {
    throw new Error("vertex_count must be between 1 and 50,000");
  }
  if (!Array.isArray(edges) || edges.length > 200_000) {
    throw new Error("edges must be an array with at most 200,000 entries");
  }

  const n = vertexCount;
  const adj: number[][] = Array.from({ length: n }, () => []);
  const radj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    if (u < 0 || u >= n || v < 0 || v >= n) throw new Error("edge vertex out of range");
    adj[u].push(v);
    radj[v].push(u);
  }

  const visited = new Uint8Array(n);
  const order: number[] = [];

  function dfs1(u: number): void {
    const stack: Array<{ node: number; idx: number }> = [{ node: u, idx: 0 }];
    visited[u] = 1;
    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      if (top.idx < adj[top.node].length) {
        const v = adj[top.node][top.idx++];
        if (!visited[v]) {
          visited[v] = 1;
          stack.push({ node: v, idx: 0 });
        }
      } else {
        order.push(top.node);
        stack.pop();
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) dfs1(i);
  }

  const comp = new Int32Array(n).fill(-1);
  let numComp = 0;

  function dfs2(u: number, c: number): void {
    const stack = [u];
    comp[u] = c;
    while (stack.length > 0) {
      const node = stack.pop()!;
      for (const v of radj[node]) {
        if (comp[v] === -1) {
          comp[v] = c;
          stack.push(v);
        }
      }
    }
  }

  for (let i = n - 1; i >= 0; i--) {
    if (comp[order[i]] === -1) {
      dfs2(order[i], numComp);
      numComp++;
    }
  }

  const components: number[][] = Array.from({ length: numComp }, () => []);
  for (let i = 0; i < n; i++) components[comp[i]].push(i);

  const dagEdges = new Set<string>();
  const dagAdj: number[][] = Array.from({ length: numComp }, () => []);
  for (const [u, v] of edges) {
    if (comp[u] !== comp[v]) {
      const key = `${comp[u]},${comp[v]}`;
      if (!dagEdges.has(key)) {
        dagEdges.add(key);
        dagAdj[comp[u]].push(comp[v]);
      }
    }
  }

  const dagEdgeList: number[][] = [];
  for (const key of dagEdges) {
    const [a, b] = key.split(",").map(Number);
    dagEdgeList.push([a, b]);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use condensation DAG for reachability queries and topological ordering of SCCs"],
  };

  return stampMeta(
    {
      vertex_count: n,
      edge_count: edges.length,
      scc_count: numComp,
      components,
      dag_edges: dagEdgeList,
      dag_edge_count: dagEdgeList.length,
    },
    meta,
  );
}
