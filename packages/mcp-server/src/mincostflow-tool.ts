import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function minCostMaxFlow(args: Record<string, unknown>) {
  const vertexCount = args.vertex_count as number;
  const edges = args.edges as [number, number, number, number][];
  const source = args.source as number;
  const sink = args.sink as number;

  if (typeof vertexCount !== "number" || !Number.isInteger(vertexCount) || vertexCount < 2) {
    throw new Error("vertex_count must be an integer >= 2");
  }
  if (vertexCount > 5_000) {
    throw new Error("vertex_count must be at most 5,000");
  }
  if (!Array.isArray(edges)) {
    throw new Error("edges must be an array of [u, v, capacity, cost] tuples");
  }
  if (edges.length > 50_000) {
    throw new Error("at most 50,000 edges supported");
  }
  if (typeof source !== "number" || typeof sink !== "number") {
    throw new Error("source and sink must be numbers");
  }
  if (source < 0 || source >= vertexCount || sink < 0 || sink >= vertexCount) {
    throw new Error("source and sink must be in range [0, vertex_count)");
  }
  if (source === sink) throw new Error("source and sink must differ");

  const graph: Array<Array<{ to: number; cap: number; cost: number; rev: number }>> =
    Array.from({ length: vertexCount }, () => []);

  function addEdge(u: number, v: number, cap: number, cost: number): void {
    graph[u].push({ to: v, cap, cost, rev: graph[v].length });
    graph[v].push({ to: u, cap: 0, cost: -cost, rev: graph[u].length - 1 });
  }

  for (const e of edges) {
    if (!Array.isArray(e) || e.length !== 4) {
      throw new Error("each edge must be [u, v, capacity, cost]");
    }
    const [u, v, c, w] = e;
    if (typeof u !== "number" || typeof v !== "number" || typeof c !== "number" || typeof w !== "number") {
      throw new Error("edge values must be numbers");
    }
    if (!Number.isInteger(u) || !Number.isInteger(v)) throw new Error("vertices must be integers");
    if (u < 0 || u >= vertexCount || v < 0 || v >= vertexCount) {
      throw new Error("vertices must be in range [0, vertex_count)");
    }
    if (c < 0) throw new Error("capacity must be non-negative");
    addEdge(u, v, c, w);
  }

  let totalFlow = 0;
  let totalCost = 0;
  const INF = 1e15;

  while (true) {
    const dist = new Float64Array(vertexCount).fill(INF);
    const inQueue = new Uint8Array(vertexCount);
    const prevV = new Int32Array(vertexCount).fill(-1);
    const prevE = new Int32Array(vertexCount).fill(-1);

    dist[source] = 0;
    const queue: number[] = [source];
    inQueue[source] = 1;

    let head = 0;
    while (head < queue.length) {
      const v = queue[head++];
      inQueue[v] = 0;
      for (let i = 0; i < graph[v].length; i++) {
        const e = graph[v][i];
        if (e.cap > 0 && dist[v] + e.cost < dist[e.to] - 1e-9) {
          dist[e.to] = dist[v] + e.cost;
          prevV[e.to] = v;
          prevE[e.to] = i;
          if (!inQueue[e.to]) {
            inQueue[e.to] = 1;
            queue.push(e.to);
          }
        }
      }
    }

    if (dist[sink] >= INF) break;

    let augment = Infinity;
    for (let v = sink; v !== source; v = prevV[v]) {
      augment = Math.min(augment, graph[prevV[v]][prevE[v]].cap);
    }

    for (let v = sink; v !== source; v = prevV[v]) {
      const e = graph[prevV[v]][prevE[v]];
      e.cap -= augment;
      graph[v][e.rev].cap += augment;
    }

    totalFlow += augment;
    totalCost += augment * dist[sink];
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use min-cost max-flow for assignment and transportation problems"],
  };

  return stampMeta(
    {
      vertex_count: vertexCount,
      edge_count: edges.length,
      max_flow: totalFlow,
      min_cost: totalCost,
    },
    meta,
  );
}
