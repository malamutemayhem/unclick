import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function kosarajuScc(args: Record<string, unknown>) {
  const vertices = Number(args.vertices);
  const edges = args.edges as [number, number][];
  if (!Number.isInteger(vertices) || vertices < 1) {
    throw new Error("vertices must be a positive integer");
  }
  if (!Array.isArray(edges)) {
    throw new Error("edges must be an array of [from, to] pairs");
  }
  if (vertices > 10_000) {
    throw new Error("vertices must be at most 10,000");
  }

  const adj: number[][] = Array.from({ length: vertices }, () => []);
  const radj: number[][] = Array.from({ length: vertices }, () => []);

  for (const [u, v] of edges) {
    if (u < 0 || u >= vertices || v < 0 || v >= vertices) {
      throw new Error(`edge [${u},${v}] references vertex out of range`);
    }
    adj[u].push(v);
    radj[v].push(u);
  }

  const visited = new Uint8Array(vertices);
  const order: number[] = [];

  function dfs1(u: number) {
    const stack: [number, number][] = [[u, 0]];
    visited[u] = 1;
    while (stack.length > 0) {
      const [node, idx] = stack[stack.length - 1];
      if (idx < adj[node].length) {
        stack[stack.length - 1][1]++;
        const next = adj[node][idx];
        if (!visited[next]) {
          visited[next] = 1;
          stack.push([next, 0]);
        }
      } else {
        order.push(node);
        stack.pop();
      }
    }
  }

  for (let i = 0; i < vertices; i++) {
    if (!visited[i]) dfs1(i);
  }

  visited.fill(0);
  const components: number[][] = [];

  function dfs2(u: number): number[] {
    const comp: number[] = [];
    const stack = [u];
    visited[u] = 1;
    while (stack.length > 0) {
      const node = stack.pop()!;
      comp.push(node);
      for (const next of radj[node]) {
        if (!visited[next]) {
          visited[next] = 1;
          stack.push(next);
        }
      }
    }
    return comp;
  }

  for (let i = order.length - 1; i >= 0; i--) {
    if (!visited[order[i]]) {
      components.push(dfs2(order[i]).sort((a, b) => a - b));
    }
  }

  components.sort((a, b) => a[0] - b[0]);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Kosaraju's algorithm for graph connectivity analysis"],
  };

  return stampMeta(
    {
      vertex_count: vertices,
      edge_count: edges.length,
      scc_count: components.length,
      components,
      is_strongly_connected: components.length === 1,
    },
    meta,
  );
}
