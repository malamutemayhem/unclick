import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function topoCount(args: Record<string, unknown>) {
  const numNodes = Number(args.num_nodes);
  if (!Number.isInteger(numNodes) || numNodes < 1 || numNodes > 20) {
    throw new Error("num_nodes is required and must be an integer between 1 and 20.");
  }

  const edges = args.edges as number[][] | undefined;
  if (!Array.isArray(edges)) {
    throw new Error("edges is required and must be an array of [from, to] pairs.");
  }
  for (let i = 0; i < edges.length; i++) {
    const e = edges[i];
    if (
      !Array.isArray(e) ||
      e.length !== 2 ||
      !Number.isInteger(e[0]) ||
      !Number.isInteger(e[1]) ||
      e[0] < 0 ||
      e[0] >= numNodes ||
      e[1] < 0 ||
      e[1] >= numNodes
    ) {
      throw new Error(
        `edges[${i}] must be [from, to] with integers in [0, ${numNodes - 1}].`,
      );
    }
  }

  // Build adjacency: adj[u] contains set of v where u -> v
  const adj: Set<number>[] = Array.from({ length: numNodes }, () => new Set());
  // inDeg for cycle detection
  const inDeg = new Array(numNodes).fill(0);
  for (const [u, v] of edges) {
    if (!adj[u].has(v)) {
      adj[u].add(v);
      inDeg[v]++;
    }
  }

  // Check if it is a DAG using Kahn's algorithm (also gives us initial info)
  const isDag = checkDag(numNodes, adj, inDeg.slice());

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "The count grows factorially; large sparse DAGs can have many orderings",
      "Use toposort to obtain one specific valid ordering",
    ],
  };

  if (!isDag) {
    return stampMeta(
      { num_nodes: numNodes, num_edges: edges.length, count: 0, is_dag: false },
      meta,
    );
  }

  // For small graphs (numNodes <= 20), use DP with bitmask over subsets.
  // dp[mask] = number of topological orderings of the subgraph induced by the
  // nodes in mask, where we place nodes one at a time at the front.
  // A node v can be placed next (at the current position) if all its
  // predecessors are already placed (not in mask).
  //
  // Precompute for each node the bitmask of its predecessors (within the graph).
  const predMask = new Array(numNodes).fill(0);
  for (let u = 0; u < numNodes; u++) {
    for (const v of adj[u]) {
      predMask[v] |= 1 << u;
    }
  }

  const full = (1 << numNodes) - 1;
  // dp[mask] = number of ways to order the nodes in mask such that all
  // dependencies among them are respected.
  // We iterate over subsets from small to large.
  // For mask, we try to add any node v in mask whose predecessors are all
  // outside mask (i.e., already placed in earlier positions).
  const dp = new Float64Array(full + 1);
  dp[0] = 1;

  for (let mask = 0; mask <= full; mask++) {
    if (dp[mask] === 0) continue;
    // Try adding each node v not yet in mask
    for (let v = 0; v < numNodes; v++) {
      if (mask & (1 << v)) continue; // already placed
      // v can be placed next if all predecessors of v are already in mask
      if ((predMask[v] & ~mask) === 0) {
        dp[mask | (1 << v)] += dp[mask];
      }
    }
  }

  const count = dp[full];

  return stampMeta(
    { num_nodes: numNodes, num_edges: edges.length, count, is_dag: true },
    meta,
  );
}

function checkDag(n: number, adj: Set<number>[], inDeg: number[]): boolean {
  const queue: number[] = [];
  for (let i = 0; i < n; i++) {
    if (inDeg[i] === 0) queue.push(i);
  }
  let visited = 0;
  while (queue.length > 0) {
    const u = queue.shift()!;
    visited++;
    for (const v of adj[u]) {
      inDeg[v]--;
      if (inDeg[v] === 0) queue.push(v);
    }
  }
  return visited === n;
}
