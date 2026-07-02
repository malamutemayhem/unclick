import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function maxIndependentSet(args: Record<string, unknown>) {
  const vertexCount = args.vertex_count as number;
  const edges = args.edges as [number, number][];

  if (typeof vertexCount !== "number" || !Number.isInteger(vertexCount) || vertexCount < 1) {
    throw new Error("vertex_count must be a positive integer");
  }
  if (vertexCount > 20) {
    throw new Error("vertex_count must be at most 20 for exact solution");
  }
  if (!Array.isArray(edges)) {
    throw new Error("edges must be an array of [u, v] pairs");
  }
  if (edges.length > 200) {
    throw new Error("at most 200 edges supported");
  }

  const neighborMask = new Int32Array(vertexCount);
  for (const e of edges) {
    if (!Array.isArray(e) || e.length !== 2) throw new Error("each edge must be [u, v]");
    const [u, v] = e;
    if (typeof u !== "number" || typeof v !== "number") throw new Error("vertices must be numbers");
    if (!Number.isInteger(u) || !Number.isInteger(v) || u < 0 || v < 0) {
      throw new Error("vertices must be non-negative integers");
    }
    if (u >= vertexCount || v >= vertexCount) throw new Error("vertices must be < vertex_count");
    if (u === v) throw new Error("self-loops not allowed");
    neighborMask[u] |= 1 << v;
    neighborMask[v] |= 1 << u;
  }

  let bestMask = 0;
  let bestSize = 0;

  for (let mask = 0; mask < (1 << vertexCount); mask++) {
    const size = popcount(mask);
    if (size <= bestSize) continue;

    let valid = true;
    for (let v = 0; v < vertexCount; v++) {
      if (!(mask & (1 << v))) continue;
      if (mask & neighborMask[v]) {
        valid = false;
        break;
      }
    }
    if (valid) {
      bestMask = mask;
      bestSize = size;
    }
  }

  const set: number[] = [];
  for (let i = 0; i < vertexCount; i++) {
    if (bestMask & (1 << i)) set.push(i);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use maximum independent set for graph optimization"],
  };

  return stampMeta(
    {
      vertex_count: vertexCount,
      edge_count: edges.length,
      max_independent_set_size: bestSize,
      independent_set: set,
      states_explored: 1 << vertexCount,
    },
    meta,
  );
}

function popcount(n: number): number {
  let count = 0;
  let v = n;
  while (v) {
    count += v & 1;
    v >>= 1;
  }
  return count;
}
