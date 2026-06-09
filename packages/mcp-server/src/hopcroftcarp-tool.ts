import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function hopcroftKarp(args: Record<string, unknown>) {
  const leftSize = Number(args.left_size);
  const rightSize = Number(args.right_size);
  const edges = args.edges as [number, number][];

  if (!Number.isInteger(leftSize) || leftSize < 1) {
    throw new Error("left_size must be a positive integer");
  }
  if (!Number.isInteger(rightSize) || rightSize < 1) {
    throw new Error("right_size must be a positive integer");
  }
  if (leftSize + rightSize > 10_000) {
    throw new Error("total vertices must be at most 10,000");
  }
  if (!Array.isArray(edges)) {
    throw new Error("edges must be an array of [left, right] pairs");
  }

  const adj: number[][] = Array.from({ length: leftSize }, () => []);
  for (const [u, v] of edges) {
    if (u < 0 || u >= leftSize || v < 0 || v >= rightSize) {
      throw new Error(`edge [${u},${v}] is out of range`);
    }
    adj[u].push(v);
  }

  const NIL = -1;
  const matchL = new Int32Array(leftSize).fill(NIL);
  const matchR = new Int32Array(rightSize).fill(NIL);
  const dist = new Int32Array(leftSize);

  function bfs(): boolean {
    const queue: number[] = [];
    for (let u = 0; u < leftSize; u++) {
      if (matchL[u] === NIL) {
        dist[u] = 0;
        queue.push(u);
      } else {
        dist[u] = 0x7fffffff;
      }
    }
    let found = false;
    let head = 0;
    while (head < queue.length) {
      const u = queue[head++];
      for (const v of adj[u]) {
        const w = matchR[v];
        if (w === NIL) {
          found = true;
        } else if (dist[w] === 0x7fffffff) {
          dist[w] = dist[u] + 1;
          queue.push(w);
        }
      }
    }
    return found;
  }

  function dfs(u: number): boolean {
    for (const v of adj[u]) {
      const w = matchR[v];
      if (w === NIL || (dist[w] === dist[u] + 1 && dfs(w))) {
        matchL[u] = v;
        matchR[v] = u;
        return true;
      }
    }
    dist[u] = 0x7fffffff;
    return false;
  }

  let matching = 0;
  let phases = 0;
  while (bfs()) {
    phases++;
    for (let u = 0; u < leftSize; u++) {
      if (matchL[u] === NIL && dfs(u)) {
        matching++;
      }
    }
  }

  const matchedPairs: [number, number][] = [];
  for (let u = 0; u < leftSize; u++) {
    if (matchL[u] !== NIL) {
      matchedPairs.push([u, matchL[u]]);
    }
  }

  const unmatchedLeft: number[] = [];
  const unmatchedRight: number[] = [];
  for (let u = 0; u < leftSize; u++) {
    if (matchL[u] === NIL) unmatchedLeft.push(u);
  }
  for (let v = 0; v < rightSize; v++) {
    if (matchR[v] === NIL) unmatchedRight.push(v);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Hopcroft-Karp for maximum bipartite matching in O(E * sqrt(V))"],
  };

  return stampMeta(
    {
      maximum_matching: matching,
      phases,
      left_size: leftSize,
      right_size: rightSize,
      edge_count: edges.length,
      matched_pairs: matchedPairs,
      unmatched_left: unmatchedLeft,
      unmatched_right: unmatchedRight,
      is_perfect_matching: matching === Math.min(leftSize, rightSize),
    },
    meta,
  );
}
