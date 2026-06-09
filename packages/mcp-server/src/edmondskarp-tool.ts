import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function edmondsKarp(args: Record<string, unknown>) {
  const vertices = Number(args.vertices);
  const edges = args.edges as [number, number, number][];
  const source = Number(args.source ?? 0);
  const sink = Number(args.sink ?? vertices - 1);

  if (!Number.isInteger(vertices) || vertices < 2) {
    throw new Error("vertices must be an integer >= 2");
  }
  if (vertices > 1000) {
    throw new Error("vertices must be at most 1,000");
  }
  if (!Array.isArray(edges)) {
    throw new Error("edges must be an array of [from, to, capacity] triples");
  }
  if (source < 0 || source >= vertices || sink < 0 || sink >= vertices) {
    throw new Error("source and sink must be valid vertex indices");
  }
  if (source === sink) {
    throw new Error("source and sink must differ");
  }

  const cap: number[][] = Array.from({ length: vertices }, () => new Array(vertices).fill(0));
  const adj: number[][] = Array.from({ length: vertices }, () => []);

  for (const [u, v, c] of edges) {
    if (u < 0 || u >= vertices || v < 0 || v >= vertices) {
      throw new Error(`edge [${u},${v}] references vertex out of range`);
    }
    if (typeof c !== "number" || c < 0) {
      throw new Error("capacity must be a non-negative number");
    }
    cap[u][v] += c;
    adj[u].push(v);
    adj[v].push(u);
  }

  let maxFlow = 0;
  let augmentations = 0;

  while (true) {
    const parent = new Int32Array(vertices).fill(-1);
    parent[source] = source;
    const queue = [source];
    let head = 0;

    while (head < queue.length && parent[sink] === -1) {
      const u = queue[head++];
      for (const v of adj[u]) {
        if (parent[v] === -1 && cap[u][v] > 0) {
          parent[v] = u;
          queue.push(v);
        }
      }
    }

    if (parent[sink] === -1) break;

    let bottleneck = Infinity;
    let v = sink;
    while (v !== source) {
      const u = parent[v];
      bottleneck = Math.min(bottleneck, cap[u][v]);
      v = u;
    }

    v = sink;
    while (v !== source) {
      const u = parent[v];
      cap[u][v] -= bottleneck;
      cap[v][u] += bottleneck;
      v = u;
    }

    maxFlow += bottleneck;
    augmentations++;
  }

  const minCutSide: number[] = [];
  const visited = new Uint8Array(vertices);
  const stack = [source];
  visited[source] = 1;
  while (stack.length > 0) {
    const u = stack.pop()!;
    minCutSide.push(u);
    for (const v of adj[u]) {
      if (!visited[v] && cap[u][v] > 0) {
        visited[v] = 1;
        stack.push(v);
      }
    }
  }
  minCutSide.sort((a, b) => a - b);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Edmonds-Karp for maximum flow / minimum cut problems"],
  };

  return stampMeta(
    {
      max_flow: maxFlow,
      augmenting_paths: augmentations,
      source,
      sink,
      vertex_count: vertices,
      edge_count: edges.length,
      min_cut_source_side: minCutSide,
    },
    meta,
  );
}
