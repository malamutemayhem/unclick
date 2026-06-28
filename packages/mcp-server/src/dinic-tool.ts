import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function dinicMaxFlow(args: Record<string, unknown>) {
  const vertexCount = args.vertex_count as number;
  const edges = args.edges as [number, number, number][];
  const source = args.source as number;
  const sink = args.sink as number;

  if (typeof vertexCount !== "number" || !Number.isInteger(vertexCount) || vertexCount < 2) {
    throw new Error("vertex_count must be an integer >= 2");
  }
  if (vertexCount > 10_000) {
    throw new Error("vertex_count must be at most 10,000");
  }
  if (!Array.isArray(edges)) {
    throw new Error("edges must be an array of [u, v, capacity] triples");
  }
  if (edges.length > 100_000) {
    throw new Error("at most 100,000 edges supported");
  }
  if (typeof source !== "number" || typeof sink !== "number") {
    throw new Error("source and sink must be numbers");
  }
  if (source < 0 || source >= vertexCount || sink < 0 || sink >= vertexCount) {
    throw new Error("source and sink must be in range [0, vertex_count)");
  }
  if (source === sink) {
    throw new Error("source and sink must differ");
  }

  const adj: Array<Array<{ to: number; cap: number; rev: number }>> = Array.from(
    { length: vertexCount },
    () => [],
  );

  function addEdge(u: number, v: number, cap: number): void {
    adj[u].push({ to: v, cap, rev: adj[v].length });
    adj[v].push({ to: u, cap: 0, rev: adj[u].length - 1 });
  }

  for (const e of edges) {
    if (!Array.isArray(e) || e.length !== 3) throw new Error("each edge must be [u, v, capacity]");
    const [u, v, c] = e;
    if (typeof u !== "number" || typeof v !== "number" || typeof c !== "number") {
      throw new Error("edge values must be numbers");
    }
    if (!Number.isInteger(u) || !Number.isInteger(v)) throw new Error("vertices must be integers");
    if (u < 0 || u >= vertexCount || v < 0 || v >= vertexCount) {
      throw new Error("vertices must be in range [0, vertex_count)");
    }
    if (c < 0) throw new Error("capacity must be non-negative");
    addEdge(u, v, c);
  }

  const level = new Int32Array(vertexCount);
  const iter = new Int32Array(vertexCount);

  function bfs(): boolean {
    level.fill(-1);
    const queue: number[] = [source];
    level[source] = 0;
    let head = 0;
    while (head < queue.length) {
      const v = queue[head++];
      for (const e of adj[v]) {
        if (e.cap > 0 && level[e.to] < 0) {
          level[e.to] = level[v] + 1;
          queue.push(e.to);
        }
      }
    }
    return level[sink] >= 0;
  }

  function dfs(v: number, f: number): number {
    if (v === sink) return f;
    for (; iter[v] < adj[v].length; iter[v]++) {
      const e = adj[v][iter[v]];
      if (e.cap > 0 && level[v] < level[e.to]) {
        const d = dfs(e.to, Math.min(f, e.cap));
        if (d > 0) {
          e.cap -= d;
          adj[e.to][e.rev].cap += d;
          return d;
        }
      }
    }
    return 0;
  }

  let flow = 0;
  let phases = 0;
  while (bfs()) {
    iter.fill(0);
    let d: number;
    while ((d = dfs(source, Infinity)) > 0) {
      flow += d;
    }
    phases++;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Dinic's algorithm for maximum flow in networks"],
  };

  return stampMeta(
    {
      vertex_count: vertexCount,
      edge_count: edges.length,
      max_flow: flow,
      phases,
    },
    meta,
  );
}
