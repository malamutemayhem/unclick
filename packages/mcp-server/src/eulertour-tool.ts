import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function eulerTour(args: Record<string, unknown>) {
  const vertexCount = args.vertex_count as number;
  const edges = args.edges as number[][];
  const root = (args.root as number) ?? 0;

  if (typeof vertexCount !== "number" || vertexCount < 1 || vertexCount > 100_000) {
    throw new Error("vertex_count must be between 1 and 100,000");
  }
  if (!Array.isArray(edges) || edges.length !== vertexCount - 1) {
    throw new Error("edges must have exactly vertex_count - 1 entries (tree)");
  }

  const n = vertexCount;
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    if (u < 0 || u >= n || v < 0 || v >= n) throw new Error("edge vertex out of range");
    adj[u].push(v);
    adj[v].push(u);
  }

  const tin = new Int32Array(n);
  const tout = new Int32Array(n);
  const depth = new Int32Array(n);
  const parent = new Int32Array(n).fill(-1);
  const tour: number[] = [];
  let timer = 0;

  const stack: Array<{ node: number; parentNode: number; childIdx: number }> = [
    { node: root, parentNode: -1, childIdx: 0 },
  ];
  depth[root] = 0;
  tin[root] = timer++;
  tour.push(root);

  while (stack.length > 0) {
    const top = stack[stack.length - 1];
    if (top.childIdx < adj[top.node].length) {
      const child = adj[top.node][top.childIdx++];
      if (child === top.parentNode) continue;
      parent[child] = top.node;
      depth[child] = depth[top.node] + 1;
      tin[child] = timer++;
      tour.push(child);
      stack.push({ node: child, parentNode: top.node, childIdx: 0 });
    } else {
      tout[top.node] = timer++;
      tour.push(top.node);
      stack.pop();
    }
  }

  const subtreeSize = new Int32Array(n).fill(1);
  const ordered = Array.from({ length: n }, (_, i) => i).sort((a, b) => depth[b] - depth[a]);
  for (const v of ordered) {
    if (parent[v] !== -1) {
      subtreeSize[parent[v]] += subtreeSize[v];
    }
  }

  const maxDepth = Math.max(...Array.from(depth));

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Euler tour for LCA queries, subtree sums, and range tree operations"],
  };

  return stampMeta(
    {
      vertex_count: n,
      root,
      max_depth: maxDepth,
      tour_length: tour.length,
      tin: Array.from(tin),
      tout: Array.from(tout),
      depth: Array.from(depth),
      parent: Array.from(parent),
      subtree_size: Array.from(subtreeSize),
    },
    meta,
  );
}
