import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function centroidDecomposition(args: Record<string, unknown>) {
  const vertexCount = args.vertex_count as number;
  const edges = args.edges as [number, number][];

  if (typeof vertexCount !== "number" || !Number.isInteger(vertexCount) || vertexCount < 1) {
    throw new Error("vertex_count must be a positive integer");
  }
  if (vertexCount > 50_000) {
    throw new Error("vertex_count must be at most 50,000");
  }
  if (!Array.isArray(edges)) {
    throw new Error("edges must be an array of [u, v] pairs");
  }
  if (edges.length !== vertexCount - 1) {
    throw new Error("a tree with N vertices must have exactly N-1 edges");
  }

  const adj: number[][] = Array.from({ length: vertexCount }, () => []);
  for (const e of edges) {
    if (!Array.isArray(e) || e.length !== 2) throw new Error("each edge must be [u, v]");
    const [u, v] = e;
    if (typeof u !== "number" || typeof v !== "number") throw new Error("vertices must be numbers");
    if (!Number.isInteger(u) || !Number.isInteger(v)) throw new Error("vertices must be integers");
    if (u < 0 || u >= vertexCount || v < 0 || v >= vertexCount) {
      throw new Error("vertices must be in range [0, vertex_count)");
    }
    adj[u].push(v);
    adj[v].push(u);
  }

  const removed = new Uint8Array(vertexCount);
  const subtreeSize = new Int32Array(vertexCount);
  const centroidParent = new Int32Array(vertexCount).fill(-1);
  const centroidDepth = new Int32Array(vertexCount);
  let maxDepth = 0;

  function computeSize(v: number, parent: number): number {
    subtreeSize[v] = 1;
    for (const u of adj[v]) {
      if (u !== parent && !removed[u]) {
        subtreeSize[v] += computeSize(u, v);
      }
    }
    return subtreeSize[v];
  }

  function findCentroid(v: number, parent: number, treeSize: number): number {
    for (const u of adj[v]) {
      if (u !== parent && !removed[u] && subtreeSize[u] > treeSize / 2) {
        return findCentroid(u, v, treeSize);
      }
    }
    return v;
  }

  function decompose(v: number, depth: number): number {
    const treeSize = computeSize(v, -1);
    const centroid = findCentroid(v, -1, treeSize);
    removed[centroid] = 1;
    centroidDepth[centroid] = depth;
    if (depth > maxDepth) maxDepth = depth;

    for (const u of adj[centroid]) {
      if (!removed[u]) {
        const child = decompose(u, depth + 1);
        centroidParent[child] = centroid;
      }
    }

    return centroid;
  }

  const root = decompose(0, 0);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use centroid decomposition for efficient tree path queries"],
  };

  return stampMeta(
    {
      vertex_count: vertexCount,
      centroid_root: root,
      max_depth: maxDepth,
      centroid_parent: Array.from(centroidParent),
      centroid_depth: Array.from(centroidDepth),
    },
    meta,
  );
}
