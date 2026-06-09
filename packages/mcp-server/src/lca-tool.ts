import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function lowestCommonAncestor(args: Record<string, unknown>) {
  const vertexCount = args.vertex_count as number;
  const edges = args.edges as [number, number][];
  const queries = args.queries as [number, number][];
  const root = (args.root as number) ?? 0;

  if (typeof vertexCount !== "number" || !Number.isInteger(vertexCount) || vertexCount < 1) {
    throw new Error("vertex_count must be a positive integer");
  }
  if (vertexCount > 50_000) {
    throw new Error("vertex_count must be at most 50,000");
  }
  if (!Array.isArray(edges) || edges.length !== vertexCount - 1) {
    throw new Error("a tree with N vertices must have exactly N-1 edges");
  }
  if (!Array.isArray(queries) || queries.length === 0) {
    throw new Error("queries must be a non-empty array of [u, v] pairs");
  }
  if (queries.length > 50_000) {
    throw new Error("at most 50,000 queries");
  }
  if (root < 0 || root >= vertexCount) {
    throw new Error("root must be in range [0, vertex_count)");
  }

  const adj: number[][] = Array.from({ length: vertexCount }, () => []);
  for (const e of edges) {
    if (!Array.isArray(e) || e.length !== 2) throw new Error("each edge must be [u, v]");
    const [u, v] = e;
    if (typeof u !== "number" || typeof v !== "number") throw new Error("vertices must be numbers");
    if (u < 0 || u >= vertexCount || v < 0 || v >= vertexCount) {
      throw new Error("vertices must be in range [0, vertex_count)");
    }
    adj[u].push(v);
    adj[v].push(u);
  }

  const LOG = Math.max(1, Math.ceil(Math.log2(vertexCount + 1)));
  const depth = new Int32Array(vertexCount).fill(-1);
  const up: Int32Array[] = Array.from({ length: LOG }, () => new Int32Array(vertexCount).fill(-1));

  const stack: Array<{ v: number; parent: number; i: number }> = [{ v: root, parent: -1, i: 0 }];
  depth[root] = 0;
  up[0][root] = root;

  while (stack.length > 0) {
    const frame = stack[stack.length - 1];
    if (frame.i < adj[frame.v].length) {
      const next = adj[frame.v][frame.i++];
      if (next !== frame.parent) {
        depth[next] = depth[frame.v] + 1;
        up[0][next] = frame.v;
        for (let k = 1; k < LOG; k++) {
          up[k][next] = up[k - 1][up[k - 1][next]];
        }
        stack.push({ v: next, parent: frame.v, i: 0 });
      }
    } else {
      stack.pop();
    }
  }

  function lca(u: number, v: number): number {
    let a = u;
    let b = v;
    if (depth[a] < depth[b]) [a, b] = [b, a];
    let diff = depth[a] - depth[b];
    for (let k = 0; k < LOG; k++) {
      if ((diff >> k) & 1) a = up[k][a];
    }
    if (a === b) return a;
    for (let k = LOG - 1; k >= 0; k--) {
      if (up[k][a] !== up[k][b]) {
        a = up[k][a];
        b = up[k][b];
      }
    }
    return up[0][a];
  }

  const results: Array<{ u: number; v: number; lca: number; distance: number }> = [];
  for (const q of queries) {
    if (!Array.isArray(q) || q.length !== 2) throw new Error("each query must be [u, v]");
    const [u, v] = q;
    if (typeof u !== "number" || typeof v !== "number") throw new Error("query vertices must be numbers");
    if (u < 0 || u >= vertexCount || v < 0 || v >= vertexCount) {
      throw new Error("query vertices must be in range [0, vertex_count)");
    }
    const ancestor = lca(u, v);
    results.push({
      u,
      v,
      lca: ancestor,
      distance: depth[u] + depth[v] - 2 * depth[ancestor],
    });
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use LCA for tree path queries and distance computation"],
  };

  return stampMeta(
    {
      vertex_count: vertexCount,
      root,
      query_count: queries.length,
      results,
    },
    meta,
  );
}
